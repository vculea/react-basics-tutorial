// Pas 11 — custom hooks.
// De ce: logica de numărare (useState + callback-uri) e identică pentru copii și adulți.
// Fara hook custom, am duplica cod. Cu hook custom, apelam useCounter de doua ori —
// fiecare apel are PROPRIA sa instanta de stare, complet independenta.
// Aceasta e diferenta fata de Context (lectia urmatoare): contextul IMPARTE o singura
// sursa; hook-ul custom apelat de doua ori creeaza doua copii separate.

import { useCounter } from "@/hooks/useCounter";
import { useWindowSize } from "@/hooks/useWindowSize";

// Preturile stau la nivel de modul — o singura sursa de adevar, nu valori "magice" in JSX.
const PRET_COPIL = 2;
const PRET_ADULT = 5;

// ─── GrupBox ────────────────────────────────────────────────────────────────
// Componenta de prezentare (presentation component): nu are stare proprie,
// primeste totul prin props. Echivalent cu un "dumb component" sau un View in MVC.
// Starea ramane sus, in CustomHooks, ca sa putem calcula totalul grupului.

type GrupBoxProps = {
  titlu: string;
  pretUnitar: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
};

function GrupBox({ titlu, pretUnitar, count, onIncrement, onDecrement, onReset }: GrupBoxProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        minWidth: "180px"
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem" }}>{titlu}</h3>
      <p style={{ margin: "0.25rem 0", color: "#666" }}>{pretUnitar} lei / persoană</p>
      <p style={{ margin: "0.25rem 0" }}>
        Persoane: <strong>{count}</strong>
      </p>
      <p style={{ margin: "0.25rem 0" }}>
        Subtotal: <strong>{count * pretUnitar} lei</strong>
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
        {/* disabled cand count === 0: nu vrem numar negativ de persoane */}
        <button onClick={onDecrement} disabled={count === 0}>
          −1
        </button>
        <button onClick={onIncrement}>+1</button>
        <button onClick={onReset} disabled={count === 0}>
          Reset
        </button>
      </div>
    </div>
  );
}

// ─── CustomHooks ────────────────────────────────────────────────────────────

export function CustomHooks() {
  // Doua apeluri ale aceluiasi hook = doua instante SEPARATE de stare.
  // +1 la copii nu stie nimic de adulti — la fel ca doua obiecte Counter
  // instantiate separat in Java: new Counter(), new Counter().
  const copii = useCounter(0, 1);
  const adulti = useCounter(0, 1);

  const fereastra = useWindowSize();

  // Date derivate: calculate la fiecare randare din starea existenta.
  // NU sunt useState — ar putea iesi din sincronism cu copii/adulti.
  const totalPersone = copii.count + adulti.count;
  const totalPret = copii.count * PRET_COPIL + adulti.count * PRET_ADULT;

  return (
    <div>
      {/* ── Cele doua box-uri de categorie ── */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <GrupBox titlu="Copii" pretUnitar={PRET_COPIL} count={copii.count} onIncrement={copii.increment} onDecrement={copii.decrement} onReset={copii.reset} />
        <GrupBox titlu="Adulți" pretUnitar={PRET_ADULT} count={adulti.count} onIncrement={adulti.increment} onDecrement={adulti.decrement} onReset={adulti.reset} />
      </div>

      {/* ── Totalul grupului — derivat, nu stare separata ── */}
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#f5f5f5",
          borderRadius: "8px",
          maxWidth: "380px"
        }}
      >
        <p style={{ margin: "0.25rem 0" }}>
          Total grup: <strong>{totalPersone} persoane</strong>
        </p>
        <p style={{ margin: "0.25rem 0" }}>
          Total de plată: <strong>{totalPret} lei</strong>
        </p>
      </div>

      {/* ── Dimensiunea ferestrei (al doilea hook custom) ── */}
      <p style={{ marginTop: "1rem", color: "#888", fontSize: "0.875rem" }}>
        Fereastra: {fereastra.width} × {fereastra.height} px (redimensioneaz-o ca să vezi live)
      </p>
    </div>
  );
}
