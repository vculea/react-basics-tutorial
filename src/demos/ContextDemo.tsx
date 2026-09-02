// Pas 12 — Context API.
// De ce: pasul activ este necesar in locuri diferite ale aplicatiei. Provider-ul
// este singura sursa de adevar, iar toti consumatorii impart aceeasi stare.
// Spre deosebire de Pas 11, doua apeluri useCounter creeaza instante separate.

import { useActiveStep } from "@/context/ActiveStepProvider";
import { useCounter } from "@/hooks/useCounter";
import { Button } from "@/components/ui/button";

const recipe = `1. const ActiveStepContext = createContext<ActiveStepContextValue | undefined>(undefined)
2. function ActiveStepProvider({ steps, children }) {
     const [activeId, setActiveId] = useState(() => citesteSiValideazaLocalStorage(steps))
     useEffect(() => localStorage.setItem("active-step-id", activeId), [activeId])
     return <ActiveStepContext.Provider value={{ activeId, setActiveId, steps }}>{children}</ActiveStepContext.Provider>
   }
3. function useActiveStep() {
     const context = useContext(ActiveStepContext)
     if (context === undefined) throw new Error("Lipseste ActiveStepProvider")
     return context
   }
4. <ActiveStepProvider steps={demos}>...consumatorii...</ActiveStepProvider>
5. const { activeId, setActiveId, steps } = useActiveStep()`;

type CounterPanelProps = {
  label: string;
  count: number;
  onIncrement: () => void;
};

function CounterPanel({ label, count, onIncrement }: CounterPanelProps) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "1rem" }}>
      <h3 style={{ marginTop: 0 }}>{label}</h3>
      <p>
        Persoane: <strong>{count}</strong>
      </p>
      <Button onClick={onIncrement}>+1</Button>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre style={{ overflowX: "auto", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: "4px", padding: "1rem", fontSize: "0.8rem" }}>
      <code>{children}</code>
    </pre>
  );
}

export function ContextDemo() {
  const { activeId, setActiveId, steps } = useActiveStep();
  const copii = useCounter(0, 1);
  const adulti = useCounter(0, 1);

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <p>
        Am primit fara prop: <code>activeId = &quot;{activeId}&quot;</code>. Schimba un tab din header: valoarea se actualizeaza aici.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        <section style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>GLOBAL — useContext</h2>
          <p>Acest dropdown si meniul din header scriu in aceeasi stare a provider-ului.</p>
          <select value={activeId} onChange={event => setActiveId(event.target.value)} style={{ maxWidth: "100%", padding: "0.5rem" }}>
            {steps.map(step => (
              <option key={step.id} value={step.id}>
                Pas {step.step} — {step.title}
              </option>
            ))}
          </select>
        </section>

        <section style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>LOCAL — useState, Pas 11</h2>
          <p>Fiecare apel useCounter are propria stare: copiii si adultii nu se influenteaza.</p>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <CounterPanel label="Copii" count={copii.count} onIncrement={copii.increment} />
            <CounterPanel label="Adulti" count={adulti.count} onIncrement={adulti.increment} />
          </div>
        </section>
      </div>

      <section>
        <h2>Reteta in 5 pasi</h2>
        <CodeBlock>{recipe}</CodeBlock>
      </section>
    </div>
  );
}
