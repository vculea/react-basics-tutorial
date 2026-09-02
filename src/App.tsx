import type { ReactNode } from "react";
import { Counter } from "@/demos/Counter";
import { CounterClass } from "@/demos/CounterClass";
import { PureFunctions } from "@/demos/PureFunctions";
import { PrettierFormat } from "@/demos/PrettierFormat";
import { Timer } from "@/demos/Timer";
import { LiftingState } from "@/demos/LiftingState";
import { DemoMenu } from "@/demos/DemoMenu";
import { PathAlias } from "@/demos/PathAlias";
import { TailwindSetup } from "@/demos/TailwindSetup";
import { ShadcnSetup } from "@/demos/ShadcnSetup";
import { CustomHooks } from "@/demos/CustomHooks";
import { ContextDemo } from "@/demos/ContextDemo";
import { DemoTab } from "@/components/DemoTab";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ActiveStepProvider, useActiveStep } from "@/context/ActiveStepProvider";

// Sursa unica de adevar: activeId. Titlul, continutul si butonul selectat
// se DERIVEAZA din el — nu tinem in state si lista si elementul activ separat.
// Adaugarea unui pas nou = un fisier nou in demos/ + o intrare noua mai jos.
type Demo = { id: string; step: number; title: string; element: ReactNode };

const demos: Demo[] = [
  { id: "counter", step: 1, title: "useState", element: <Counter /> },
  { id: "counter-class", step: 2, title: "class Component (vechi)", element: <CounterClass /> },
  { id: "pure-functions", step: 3, title: "funcții pure vs. impure", element: <PureFunctions /> },
  { id: "prettier-format", step: 4, title: "Prettier (formatare automată)", element: <PrettierFormat /> },
  { id: "timer", step: 5, title: "useEffect (cronometru)", element: <Timer /> },
  { id: "lifting-state", step: 6, title: "Lifting State", element: <LiftingState /> },
  { id: "demo-menu", step: 7, title: "meniu de navigare", element: <DemoMenu /> },
  { id: "path-alias", step: 8, title: "path alias (@/)", element: <PathAlias /> },
  { id: "tailwind-setup", step: 9, title: "Tailwind CSS (utility-first)", element: <TailwindSetup /> },
  { id: "shadcn-setup", step: 10, title: "shadcn/ui (componente gata)", element: <ShadcnSetup /> },
  { id: "custom-hooks", step: 11, title: "custom hooks (useCounter, useWindowSize)", element: <CustomHooks /> },
  { id: "context", step: 12, title: "Context API (stare partajata)", element: <ContextDemo /> }
];

function AppContent() {
  const { activeId, setActiveId, steps } = useActiveStep();
  const active = steps.find(demo => demo.id === activeId) ?? steps[0];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* paddingTop lasă spațiu pentru badge-urile care depășesc chenarul butonului */}
      <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", paddingTop: "1rem", marginBottom: "1.5rem", alignItems: "center" }}>
        {steps.map(d => (
          <DemoTab key={d.id} step={d.step} title={d.title} active={d.id === activeId} onClick={() => setActiveId(d.id)} />
        ))}
        <ThemeToggle />
      </nav>
      <h1 style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", lineHeight: 1.3 }}>
        Pas {active.step} — {active.title}
      </h1>
      {active.element}
    </div>
  );
}

function App() {
  return (
    <ActiveStepProvider steps={demos}>
      <AppContent />
    </ActiveStepProvider>
  );
}

export default App;
