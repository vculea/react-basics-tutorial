import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { SidebarMenu } from "@/components/SidebarMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ActiveStepProvider, useActiveStep } from "@/context/ActiveStepProvider";

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
  { id: "context", step: 12, title: "Context API (stare partajată)", element: <ContextDemo /> },
  { id: "shareable-link", step: 13, title: "URL ca sursă de adevăr (React Router)", element: <ShareableLink /> },
  { id: "sidebar-navigation", step: 14, title: "meniu de navigare (sidebar)", element: <SidebarNavigation /> },
];

function AppContent() {
  const { activeId, steps } = useActiveStep();
  const active = steps.find(demo => demo.id === activeId) ?? steps[0];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
          {active.step}
        </span>
        <h1 className="text-foreground text-lg font-semibold leading-tight sm:text-xl">
          {active.title}
        </h1>
        <span className="ml-auto text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Pasul {active.step} din {steps.length}
        </span>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        {active.element}
      </main>
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
            <div className="flex w-full h-screen overflow-hidden">
              <AppContent />
              <aside className="hidden w-64 flex-shrink-0 flex-col border-l border-border bg-card lg:flex">
                <div className="flex items-center justify-between border-b border-border px-4 py-4">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Navigare
                  </span>
                  <ThemeToggle />
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                  <SidebarMenu />
                </div>
                <div className="border-t border-border px-4 py-3 text-center text-[0.6rem] text-muted-foreground">
                  Curs React Basics
                </div>
              </aside>
            </div>
          </ActiveStepProvider>
        }
      />
      <Route path="*" element={<Navigate to={`/pas/${demos[0].id}`} replace />} />
    </Routes>
  );
}

export default App;
