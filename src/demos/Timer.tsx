// Pas 5 — useEffect (cronometru + tracker de click-uri).
// De ce: efectele secundare (timere, event listeners, fetch) nu pot sta in
// corpul componentei, pentru ca React ruleaza corpul la fiecare re-render.
// useEffect le muta DUPA randare si ofera un mecanism de cleanup — echivalentul
// lui try/finally sau IDisposable din C#.
//
// Regula de baza: corpul componentei trebuie sa fie PUR (fara efecte secundare).
// Tot ce "porneste ceva in afara React" sta intr-un useEffect.

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Contor de modul: supravietuieste re-render-urilor si montarilor/demontarilor.
// Acceptabil DOAR in efecte, nu in corpul componentei (ar rula la fiecare render,
// la fel ca variabilele impure din pasul anterior).
let subscriptionCount = 0;

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // ─── EFECTUL 1: cronometru ────────────────────────────────────────────────
  // useEffect(fn, [running]) — React executa fn DUPA randare, ori de cate ori
  // valoarea din lista de dependente s-a schimbat (si la primul render).
  //
  // Cleanup = functia returnata din fn. React o apeleaza:
  //   1) INAINTE de re-rularea efectului (cand 'running' se schimba din nou)
  //   2) la unmount (cand componenta dispare din DOM)
  //
  // Fara cleanup, fiecare apasare Porneste/Pauza lasa un interval activ in
  // paralel — "zombie timers" care continua sa incrementeze seconds si nu
  // mai pot fi oprite (memory leak + comportament gresit).
  useEffect(() => {
    if (!running) {
      console.log("[Timer] efect rulat — running=false, nu pornesc intervalul");
      return; // nicio functie de cleanup returnata: nimic de oprit
    }

    console.log("[Timer] efect rulat — running=true, pornesc setInterval");
    const id = setInterval(() => {
      // Forma functionala garanteaza ca 's' e intotdeauna valoarea cea mai
      // recenta, chiar daca mai multe update-uri se cumuleaza (closure safety).
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: React il apeleaza INAINTE de re-rularea acestui efect si la
    // unmount. Vei vedea in consola ca apare INAINTE de urmatorul mesaj "efect rulat".
    return () => {
      console.log("[Timer] CLEANUP — clearInterval", id);
      clearInterval(id);
    };
  }, [running]);

  // ─── EFECTUL 2: tracker de click-uri ─────────────────────────────────────
  // [] = lista de dependente goala → efectul ruleaza O SINGURA DATA, la mount
  // (echivalentul lui componentDidMount din class components / OnInitialized din C#).
  //
  // INTENTIONAT fara dezabonare (fara return cu removeEventListener) — urmeaza
  // sa vedem impreuna ce se intampla in consola fara ea.
  useEffect(() => {
    subscriptionCount++;
    const myId = subscriptionCount; // capturat in closure: fiecare abonament
    // are propriul ID, chiar daca subscriptionCount creste ulterior
    console.log(`[Tracker] abonament #${myId} montat (total activ: ${subscriptionCount})`);

    function onBodyClick(event: MouseEvent) {
      const target = event.target as Element;
      const tag = target.tagName.toLowerCase();
      const pos = `${Math.round(event.pageX)}×${Math.round(event.pageY)}`;

      // De ce NU textContent: pe un click direct pe <body>, textContent
      // returneaza TOT textul paginii. Vrem doar nodurile de text DIRECTE
      // ale elementului tintit — cele cu nodeType === Node.TEXT_NODE.
      const ownText = Array.from(target.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => (n.textContent ?? "").trim())
        .filter(t => t.length > 0)
        .join(" ");

      // De ce classList si nu className: pe elemente SVG (ex. iconite lucide),
      // className NU este string — e SVGAnimatedString, iar .slice() ar esua.
      // Array.from(classList) functioneaza uniform pe orice element.
      const label = ownText.length > 0 ? `"${ownText}"` : Array.from(target.classList).slice(0, 3).join(".") || "(no class)";

      console.log(`[Tracker #${myId}] click → <${tag}> ${label} @ ${pos}`);
    }

    document.body.addEventListener("click", onBodyClick);
    // removeEventListener va fi adaugat impreuna cu trainerul,
    // dupa ce vedem in consola ce se intampla fara el.
  }, []);

  return (
    <div>
      <p style={{ fontSize: "5rem", margin: "0.5rem 0" }}>{seconds}s</p>
      <Button onClick={() => setRunning(r => !r)}>{running ? "Pauzeă" : "Pornește"}</Button>
      {/* Reset: opreste intervalul (setRunning false declanseaza cleanup-ul
          efectului 1) si reinitializeaza secundele. */}
      <Button
        variant="outline"
        onClick={() => {
          setRunning(false);
          setSeconds(0);
        }}
      >
        Reset
      </Button>
    </div>
  );
}
