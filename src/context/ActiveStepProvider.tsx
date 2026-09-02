// Pas 12 — Context API.
// De ce: activeId este folosit de meniul din header si de continutul paginii.
// Context il pune intr-o singura sursa, citita direct de orice descendent,
// fara props trecute prin componente care nu au nevoie de ele.

import { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type Step = {
  id: string;
  step: number;
  title: string;
  element: ReactNode;
};

type ActiveStepContextValue = {
  activeId: string;
  setActiveId: Dispatch<SetStateAction<string>>;
  steps: Step[];
};

type Props = {
  steps: Step[];
  children: ReactNode;
};

const ACTIVE_STEP_STORAGE_KEY = "active-step-id";

// undefined este intentionat: hook-ul poate detecta un consumator fara provider.
const ActiveStepContext = createContext<ActiveStepContextValue | undefined>(undefined);

export function ActiveStepProvider({ steps, children }: Props) {
  const [activeId, setActiveId] = useState(() => {
    const savedId = localStorage.getItem(ACTIVE_STEP_STORAGE_KEY);
    return savedId !== null && steps.some(step => step.id === savedId) ? savedId : steps[0].id;
  });

  useEffect(() => {
    localStorage.setItem(ACTIVE_STEP_STORAGE_KEY, activeId);
  }, [activeId]);

  return <ActiveStepContext.Provider value={{ activeId, setActiveId, steps }}>{children}</ActiveStepContext.Provider>;
}

export function useActiveStep() {
  const context = useContext(ActiveStepContext);

  if (context === undefined) {
    throw new Error("useActiveStep trebuie apelat sub <ActiveStepProvider>.");
  }

  return context;
}
