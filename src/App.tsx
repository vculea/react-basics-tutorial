import type { ReactNode } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { ShareableLink } from "@/demos/ShareableLink";
import { SidebarNavigation } from "@/demos/SidebarNavigation";
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
  { id: "context", step: 12, title: "Context API (stare partajata)", element: <ContextDemo /> },
  { id: "shareable-link", step: 13, title: "URL ca sursă de adevăr (React Router)", element: <ShareableLink /> },
  { id: "sidebar-navigation", step: 14, title: "meniu de navigare (sidebar)", element: <SidebarNavigation /> }
];

function AppContent() {
  const navigate = useNavigate();
  const { activeId, steps } = useActiveStep();
  const active = steps.find(demo => demo.id === activeId) ?? steps[0];

  return (
    <div className="bg-background text-foreground min-h-svh px-4 py-6 sm:px-8">
      {/* paddingTop lasă spațiu pentru badge-urile care depășesc chenarul butonului */}
      <nav className="mb-6 flex flex-wrap items-center gap-3 pt-2">
        {steps.map(d => (
          <DemoTab key={d.id} step={d.step} title={d.title} active={d.id === activeId} onClick={() => navigate(`/pas/${d.id}`)} />
        ))}
        <ThemeToggle />
      </nav>
      <h1 className="text-foreground mb-8 text-2xl leading-tight font-semibold sm:text-3xl">
        Pas {active.step} — {active.title}
      </h1>
      {active.element}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/pas/:stepId"
        element={
          <ActiveStepProvider steps={demos}>
            <AppContent />
          </ActiveStepProvider>
        }
      />
      <Route path="*" element={<Navigate to={`/pas/${demos[0].id}`} replace />} />
    </Routes>
  );
}

export default App;
