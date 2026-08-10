import { useState } from "react";
import type { ReactNode } from "react";
import { Counter } from "./demos/Counter";
import { CounterClass } from "./demos/CounterClass";
import { PureFunctions } from "./demos/PureFunctions";
import { PrettierFormat } from "./demos/PrettierFormat";

// Registrul de demo-uri: adaugarea unui pas nou = un fisier nou in demos/ + o
// intrare noua aici. Nimic altceva nu se schimba in acest fisier.
type Demo = { id: string; step: number; title: string; element: ReactNode };

const demos: Demo[] = [
  { id: "counter", step: 1, title: "useState", element: <Counter /> },
  {
    id: "counter-class",
    step: 2,
    title: "class Component (vechi)",
    element: <CounterClass />,
  },
  {
    id: "pure-functions",
    step: 3,
    title: "funcții pure vs. impure",
    element: <PureFunctions />,
  },
  {
    id: "prettier-format",
    step: 4,
    title: "Prettier (formatare automată)",
    element: <PrettierFormat />,
  },
];

function App() {
  const [activeId, setActiveId] = useState(demos[0].id);
  const active = demos.find(d => d.id === activeId) ?? demos[0];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Selector temporar — va fi inlocuit cu meniu la pasul 19 (React Router). */}
      <select value={activeId} onChange={e => setActiveId(e.target.value)}>
        {demos.map(d => (
          <option key={d.id} value={d.id}>
            Pas {d.step} — {d.title}
          </option>
        ))}
      </select>
      <h1>
        Pas {active.step} — {active.title}
      </h1>
      {active.element}
    </div>
  );
}

export default App;
