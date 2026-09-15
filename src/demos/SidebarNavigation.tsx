// Pas 14 — meniu lateral de navigare (sidebar).
// De ce: nav-ul de sus (flex-wrap) devine incomod cand sunt multi pasi — un
// meniu vertical ramane usor de scanat indiferent de numarul lor. Tiparul nu
// se schimba: acelasi buton (DemoTab), aceeasi sursa unica de adevar
// (activeId din ActiveStepProvider) — doar containerul trece din flex-wrap
// (rand) in flex-col (coloana).
// Capcana: SidebarMenu citeste acelasi context ca nav-ul de sus, deci un
// click aici schimba pasul activ in toata aplicatia — nu e o lista izolata.

import { SidebarMenu } from "@/components/SidebarMenu";
import { CopyButton } from "@/components/CopyButton";

const routerSnippet = `import { NavLink } from "react-router-dom";

<nav className="flex w-72 flex-col gap-2">
  {steps.map(d => (
    <NavLink key={d.id} to={\`/pas/\${d.id}\`} className={({ isActive }) =>
      cn("rounded-md px-3 py-2 text-sm", isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")
    }>
      {d.title}
    </NavLink>
  ))}
</nav>`;

const futureSessionPrompt = `NU RULA ACEST PROMPT ACUM — e pentru o sesiune viitoare.

Leagă meniul lateral (SidebarMenu, demo SidebarNavigation) de URL cu
react-router-dom, la fel ca în nota din pasul 13 (ShareableLink). Cerințe:
- adaugă react-router-dom ca dependință nouă (discutată explicit)
- învelește App cu <BrowserRouter>
- fiecare buton din SidebarMenu devine <NavLink to={\`/pas/\${d.id}\`}>, în loc
  de onClick={() => setActiveId(d.id)}
- starea activă vine din prop-ul isActive al NavLink, nu din activeId === d.id
- nav-ul de sus (DemoTab din App.tsx) trece prin aceeași schimbare, ca să
  rămână consistent cu sidebar-ul
- ActiveStepProvider trece de la useState la citirea lui stepId din
  useParams, ca în pasul 13
- o cale necunoscută sau "/" redirecționează la primul pas din registru
- restul aplicației (registrul demos, componentele existente) rămâne neschimbat
- acesta e pasul 19 din docs/requirements.md, nu o modificare a pasului 14
- un singur commit, mesaj: "pas 19 — React Router (URL ca sursă de adevăr)"`;

const codeBlockClass = "border-border bg-muted text-foreground overflow-x-auto rounded-lg border p-4 text-left font-mono text-sm leading-6";

export function SidebarNavigation() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <p>
          Meniul de mai jos e <strong>real</strong>, nu o copie: citește același <code>useActiveStep()</code> ca nav-ul de sus, deci un click pe un item schimbă pasul activ în toată aplicația — exact ca butoanele de deasupra.
        </p>
        <p>
          Analogie: două meniuri diferite legate la același <code>ViewModel</code>/aceeași stare partajată — schimbi selecția dintr-un loc, celălalt UI reflectă automat noua valoare, pentru că amândouă citesc aceeași sursă.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2>Exemplu live</h2>
        <div className="border-border bg-card text-card-foreground flex gap-4 rounded-lg border p-4">
          <SidebarMenu />
          <p className="text-muted-foreground text-sm">Dă click pe un alt pas din stânga — te muți efectiv la acel demo, la fel ca la butoanele de sus.</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2>Cod de referință — cu URL (react-router-dom, neinstalat încă)</h2>
        <p className="text-muted-foreground text-sm">
          Când ajunge pasul 19 (vezi <code>ShareableLink</code>, pasul 13), fiecare buton devine un link real către <code>/pas/:stepId</code>, în loc de <code>onClick</code>.
        </p>
        <pre className={codeBlockClass}>{routerSnippet}</pre>
      </section>

      <section className="flex flex-col gap-3">
        <h2>Prompt pentru o sesiune viitoare (nu se execută acum)</h2>
        <div className="relative">
          <pre className="border-border bg-card text-card-foreground rounded-lg border p-4 pr-28 text-left font-mono text-sm leading-6 whitespace-pre-wrap">{futureSessionPrompt}</pre>
          <CopyButton text={futureSessionPrompt} />
        </div>
      </section>
    </div>
  );
}
