// Pas 2 — useState.
// De ce: o variabila normala se pierde la fiecare re-render, iar React nu afla
// ca s-a schimbat ceva. useState da valorii o identitate care supravietuieste
// re-render-ului si, in acelasi timp, cere lui React sa redeseneze componenta.
// Capcana: setCount nu modifica variabila pe loc — la randarea urmatoare
// primesti valoarea noua, nu cea scrisa inainte de apelul setter-ului.

import { useState } from "react";

// Variabila de modul — supravietuieste re-render-urilor, dar modificarea ei
// nu spune nimic lui React, deci UI-ul nu se actualizeaza.
let clickCount = 0;

// Counter este o functie obisnuita. React o RE-EXECUTA integral de fiecare data
// cand starea se schimba — similar cu un render() fortat in Java/C#.
// Nu exista un obiect persistent: React reconstituie rezultatul la fiecare apel.
export function Counter() {
  // useState(0) returneaza o pereche: [valoareaCurenta, functiaDeUpdate].
  // React memoreaza valoarea intre doua apeluri consecutive ale functiei Counter.
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* count vine direct din starea React — orice apel setCount declanseaza
          o re-rulare a functiei Counter si React actualizeaza DOM-ul. */}
      <p style={{ fontSize: "5rem", margin: "0.5rem 0" }}>{count}</p>

      {/* Forma cu functie (c => c + 1) e sigura cand mai multe update-uri
          se cumuleaza rapid: React garanteaza ca 'c' este intotdeauna valoarea
          cea mai recenta, nu o copie veche capturata intr-un closure anterior. */}
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button
        onClick={() =>
          setCount(c => {
            return c - 1;
          })
        }
      >
        -1
      </button>

      {/* Reset nu depinde de valoarea anterioara, deci forma simpla e corecta. */}
      <button onClick={() => setCount(0)}>Reset</button>
      <button
        type="button"
        onClick={() => {
          //   count++;
          clickCount++;
        }}
      >
        count++ ({clickCount})
      </button>
    </div>
  );
}
