// Pas 3 — Funcții pure vs. impure în render.
// De ce: React re-randează o componentă ori de câte ori starea sau props-urile
// se schimbă. Dacă funcția care calculează UI-ul citește și valori din AFARA
// argumentelor sale (DOM, variabile globale mutabile), React nu știe că acele
// valori s-au schimbat — și nu re-randează. Rezultatul: UI-ul arată date vechi.
//
// Pură = primește TOT ce îi trebuie prin argumente, nu citește nimic din afară.
// Aceeași intrare → același rezultat, mereu, indiferent de starea lumii.
//
// Notă pentru cei veniți din Java:
//   `const RATE = 5` — pură. Un `const` legat la un primitiv nu se schimbă
//   niciodată; React o poate "vedea" static la compilare. E echivalent cu
//   `static final int RATE = 5` în Java.
//
//   `const config = { rate: 5 }` — NU protejează conținutul! `const` blochează
//   doar legătura (ca `final` pe o referință), nu valoarea obiectului. Dacă cineva
//   face `config.rate = 4.9`, toate funcțiile care citesc `config.rate` direct
//   vor returna alt rezultat fără ca React să știe — exact bug-ul de mai jos.
//
//   Orice valoare care se POATE schimba în timp trebuie să intre ca argument,
//   props sau state — altfel React nu are cum să știe când să re-randeze.

import { useState } from "react";

// ─── Constante de modul ───────────────────────────────────────────────────────
// Primitive imutabile: `const` + număr = legătura NU poate fi reasignată și
// valoarea NU se poate modifica. Funcțiile care le citesc rămân pure.
const RATE_INITIAL = 5;
const RATE_STEP = 0.05;
const COMISION_PCT = 0.01;
const COMISION_ID = "pure-comision";

// ─── Funcție PURĂ ─────────────────────────────────────────────────────────────
// Citește DOAR argumentele. Nu atinge DOM-ul, nu citește variabile mutabile.
// Același ron + rate → același EUR, mereu.
function pureConvert(ron: number, rate: number): number {
  return ron / rate;
}

// ─── Funcție IMPURĂ ───────────────────────────────────────────────────────────
// Are ACEEAȘI semnătură ca pureConvert, dar citește în plus din DOM.
// BUG: checkbox-ul nu e state React → bifarea lui nu declanșează re-render →
// React apelează impureConvert cu aceleași argumente ca înainte → returnează
// același rezultat → UI-ul afișează valoarea veche ("stale value").
// Abia la URMĂTORUL render (declanșat de altceva, ex. +10 la sumă) se aplică.
function impureConvert(ron: number, rate: number): number {
  const eur = ron / rate;
  // `as HTMLInputElement` e necesar: getElementById returnează Element | null,
  // iar `.checked` există doar pe HTMLInputElement.
  const checkbox = document.getElementById(
    COMISION_ID,
  ) as HTMLInputElement | null;
  if (checkbox?.checked) {
    return eur * (1 - COMISION_PCT);
  }
  return eur;
}

// ─── Componentă ──────────────────────────────────────────────────────────────
export function PureFunctions() {
  const [ron, setRon] = useState(100);
  // Cursul e state React tocmai ca să se vadă contrastul:
  // schimbarea lui declanșează re-render, bifarea checkbox-ului NU.
  const [rate, setRate] = useState(RATE_INITIAL);

  const addRon = (delta: number) => setRon((prev) => Math.max(0, prev + delta));

  const addRate = (delta: number) =>
    setRate((prev) => Math.round((prev + delta) * 100) / 100);

  return (
    <div style={{ fontFamily: "monospace", lineHeight: 2 }}>
      {/* ── Suma în RON ── */}
      <div>
        <button onClick={() => addRon(-10)}>−10</button>
        <span style={{ margin: "0 1rem" }}>{ron} RON</span>
        <button onClick={() => addRon(10)}>+10</button>
      </div>

      {/* ── Cursul zilei ── */}
      <div>
        <button onClick={() => addRate(-RATE_STEP)}>−</button>
        <span style={{ margin: "0 1rem" }}>1 EUR = {rate.toFixed(2)} RON</span>
        <button onClick={() => addRate(RATE_STEP)}>+</button>
      </div>

      {/* ── Checkbox NEcontrolat ─────────────────────────────────────────────
          Nu are useState, nu are onChange → React nu știe că s-a schimbat.
          Valoarea lui există doar în DOM, nu în starea React.
          Acesta e exact "intrarea ascunsă" a funcției impure. ── */}
      <div>
        <label>
          <input id={COMISION_ID} type="checkbox" /> aplică comision 1%
        </label>
      </div>

      {/* ── Rezultate paralele ── */}
      <table style={{ borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={th}>Funcție</th>
            <th style={th}>Rezultat</th>
            <th style={th}>Comportament</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>pureConvert</td>
            <td style={td}>{pureConvert(ron, rate).toFixed(2)} EUR</td>
            <td style={td}>✅ se actualizează instant la orice modificare</td>
          </tr>
          <tr>
            <td style={td}>impureConvert</td>
            <td style={td}>{impureConvert(ron, rate).toFixed(2)} EUR</td>
            <td style={td}>⚠️ comisionul se aplică abia la următorul render</td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: "1rem", color: "#666", fontSize: "0.9rem" }}>
        Pas de reproductibil: bifează „aplică comision" →{" "}
        <em>nimic nu se schimbă</em>. Apoi apasă +10 → impureConvert aplică
        comisionul abia acum. pureConvert nu are de unde să știe de checkbox —
        deci nici nu îl aplică.
      </p>
    </div>
  );
}

// Stiluri inline minime — fără dependințe noi
const th: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "0.4rem 0.8rem",
  background: "#f5f5f5",
};
const td: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "0.4rem 0.8rem",
};
