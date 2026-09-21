// Pas 12 — Context API.
// De ce: activeId este folosit de meniul din header si de continutul paginii.
// Context il pune intr-o singura sursa, citita direct de orice descendent,
// fara props trecute prin componente care nu au nevoie de ele.
//
// Pas 19 — URL ca sursa de adevar. activeId nu mai vine din useState ci din
// useParams (react-router-dom). Schimbarea se face printr-un navigate(), nu prin
// setState — asa URL-ul oglaseaza mereu pasul activ si un link trimis pe alt
// calculator deschide direct pasul potrivit, fara dependența de localStorage.

import { createContext, useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ReactNode } from "react";

export type Step = {
  id: string;
  step: number;
  title: string;
  element: ReactNode;
};

type ActiveStepContextValue = {
  activeId: string;
  setActiveId: (id: string) => void;
  steps: Step[];
};

type Props = {
  steps: Step[];
  children: ReactNode;
};

// undefined este intentionat: hook-ul poate detecta un consumator fara provider.
const ActiveStepContext = createContext<ActiveStepContextValue | undefined>(undefined);

export function ActiveStepProvider({ steps, children }: Props) {
  const { stepId } = useParams();
  const navigate = useNavigate();

  // stepId poate fi undefined (pe ruta "*") sau neconoscut — in ambe cazuri
  // revenim la primul pas. Folosim find(...)?.id ?? fallback pentru a evita
  // non-null assertion (Interzisă prin convenție de cod).
  const activeId = steps.find(step => step.id === stepId)?.id ?? steps[0].id;

  // setActiveId navighează prin URL în loc să modifice un useState — astfel
  // orice consumator al contextului (nav-ul, sidebar-ul, dropdown-ul din
  // ContextDemo) schimbă pasul prin router, nu prin stare locală.
  const setActiveId = useCallback((id: string) => navigate(`/pas/${id}`), [navigate]);

  return <ActiveStepContext.Provider value={{ activeId, setActiveId, steps }}>{children}</ActiveStepContext.Provider>;
}

export function useActiveStep() {
  const context = useContext(ActiveStepContext);

  if (context === undefined) {
    throw new Error("useActiveStep trebuie apelat sub <ActiveStepProvider>.");
  }

  return context;
}
