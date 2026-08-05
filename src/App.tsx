import { useState } from "react";
import type { ReactNode } from "react";
import { Counter } from "./demos/Counter";

// Registrul de demo-uri: adaugarea unui pas nou = un fisier nou in demos/ + o
// intrare noua aici. Nimic altceva nu se schimba in acest fisier.
type Demo = { id: string; step: number; title: string; element: ReactNode };

const demos: Demo[] = [
  { id: "counter", step: 2, title: "useState", element: <Counter /> },
];

function App() {
  // activeId va fi folosit de meniu cand adaugam mai multe demo-uri (pas 19).
  const [activeId] = useState("counter");
  // ?? demos[0] garanteaza ca 'active' nu e niciodata undefined — evitam ! (bang).
  const active = demos.find((d) => d.id === activeId) ?? demos[0];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>
        Pas {active.step} — {active.title}
      </h1>
      {active.element}
    </div>
  );
}

export default App;
