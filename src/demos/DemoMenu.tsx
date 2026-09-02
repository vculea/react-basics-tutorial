// Pas 7 — meniu de navigare (pattern registry + activeId).
// De ce: cand ai mai multe demo-uri, un <select> nu mai e suficient.
// Tiparul e simplu: o sursa unica de adevar (activeId) din care se DERIVEAZA
// tot ce se vede — titlu, continut, buton activ — fara state suplimentar.

import { useState } from "react";
import { Button } from "@/components/ui/button";

type MiniDemo = { id: string; step: number; label: string; content: string };

const miniDemos: MiniDemo[] = [
  { id: "a", step: 1, label: "Alpha", content: "Conținut Alpha 🔴" },
  { id: "b", step: 2, label: "Beta", content: "Conținut Beta 🟢" },
  { id: "c", step: 3, label: "Gamma", content: "Conținut Gamma 🔵" }
];

export function DemoMenu() {
  // Singura bucata de state. Titlul si continutul de mai jos se DERIVEAZA din el.
  const [activeId, setActiveId] = useState(miniDemos[0].id);
  // find intoarce undefined daca nu gaseste — ?? pastreaza tipul non-undefined
  const active = miniDemos.find(d => d.id === activeId) ?? miniDemos[0];

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2>Tiparul meniului (miniatură, ~15 linii)</h2>
        <p>
          Sursa unică de adevăr: <code>activeId = &quot;{activeId}&quot;</code>. Titlul și conținutul de mai jos sunt <em>derivate</em> din el, nu state separat.
        </p>

        <nav className="flex flex-wrap gap-2">
          {miniDemos.map(d => (
            <Button key={d.id} variant={active.id === d.id ? "default" : "secondary"} size="sm" onClick={() => setActiveId(d.id)}>
              {d.label}
            </Button>
          ))}
        </nav>

        <div className="border-border bg-card text-card-foreground rounded-lg border p-4">
          <strong>{active.label}</strong> — {active.content}
        </div>
      </section>

      <hr className="border-border" />

      <section className="flex flex-col gap-4">
        <h2>LOCAL vs. GLOBAL — ce se întâmplă la refresh?</h2>

        <p>
          <strong>LOCAL — useState (ce folosim noi):</strong> <code>activeId</code> trăiește în memoria React. La refresh, React repornește complet — starea <em>dispare</em> și revii la primul demo.
        </p>

        <p>
          <strong>GLOBAL — context + localStorage:</strong> dacă scrii <code>activeId</code> în <code>localStorage</code> la fiecare schimbare și îl citești la montare ca valoare inițială pentru <code>useState</code>, selecția supraviețuiește refresh-ului.
          Același mecanism funcționează și cu URL-ul (query string sau hash).
        </p>

        <p className="text-muted-foreground text-sm">
          Pentru un lab de învățare, <code>useState</code> simplu e suficient. Dacă vrei persistență, o adaugi mai târziu fără să schimbi tiparul — doar valoarea inițială a <code>useState</code> vine dintr-o altă sursă.
        </p>
      </section>
    </div>
  );
}
