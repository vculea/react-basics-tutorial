// Pas 2 — useState.
// De ce: o variabila normala se pierde la fiecare re-render, iar React nu afla
// ca s-a schimbat ceva. useState da valorii o identitate care supravietuieste
// re-render-ului si, in acelasi timp, cere lui React sa redeseneze componenta.
// Capcana: setCount nu modifica variabila pe loc — la randarea urmatoare
// primesti valoarea noua, nu cea scrisa inainte de apelul setter-ului.

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      <p style={{ fontSize: "5rem", margin: "0.5rem 0", lineHeight: 1 }}>{count}</p>

      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Button variant="outline" size="sm" onClick={() => setCount(c => c + 1)}>
          +1
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCount(c => {
              return c - 1;
            })
          }
        >
          -1
        </Button>

        {/* Reset nu depinde de valoarea anterioara, deci forma simpla e corecta. */}
        <Button variant="secondary" size="sm" onClick={() => setCount(0)}>
          Reset
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => {
            clickCount++;
          }}
        >
          count++ ({clickCount})
        </Button>
      </div>
    </div>
  );
}
