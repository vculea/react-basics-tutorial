// Pas 6 — Lifting State (ridicarea stării).
// De ce: dacă două componente afișează aceeași valoare în forme diferite,
// fiecare cu propria stare, ele se vor desincroniza inevitabil — exact
// ca doi câmpuri în DB care stochează același lucru.
// Soluția: o SINGURĂ sursă de adevăr în părintele comun; copiii primesc
// valoarea prin props și cer schimbarea prin callback — ei nu dețin nimic.

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Props explicite: ce primește și ce poate cere un PriceCard.
// `onChange` este echivalentul unui event listener din Java/C# —
// copilul îl apelează, părintele decide ce face cu noua valoare.
type PriceCardProps = {
  label: string;
  amount: number;
  currency: string;
  step?: number;
  onChange: (next: number) => void;
};

// Componentă COMPLET CONTROLATĂ: zero useState intern.
// Toată logica de „ce se întâmplă la click" stă în părinteLE,
// transmisă prin `onChange` — ca un parametru de tip funcție în Java.
function PriceCard({ label, amount, currency, step = 1, onChange }: PriceCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem", minWidth: 160 }}>
      <div style={{ fontWeight: "bold", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>
        {amount} <span style={{ fontSize: "0.85rem", opacity: 0.6 }}>{currency}</span>
      </div>
      {/* Butoanele NU modifică o stare locală — apelează `onChange`,
          iar părintele decide cum se propagă schimbarea. */}
      <Button variant="outline" size="sm" onClick={() => onChange(amount - step)}>
        −
      </Button>
      <Button variant="outline" size="sm" className="ml-2" onClick={() => onChange(amount + step)}>
        +
      </Button>
    </div>
  );
}

export function LiftingState() {
  // Singura sursă de adevăr: suma în RON.
  // Punctele nu sunt stocate nicăieri — sunt CALCULATE la fiecare render.
  const [amount, setAmount] = useState(10);
  const rate = 5; // 1 RON = 5 puncte (curs fictiv)

  return (
    <div>
      <p>
        Modifică valoarea din oricare card — celălalt se actualizează instant, pentru că ambele citesc <em>aceeași</em> variabilă de stare.
      </p>
      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Cardul în RON: citește direct `amount`, scrie direct prin `setAmount`. */}
        <PriceCard label="Sumă" amount={amount} currency="RON" onChange={setAmount} />

        {/* Cardul în puncte: afișează `amount * rate` (derivat, nu stocat),
            iar la onChange convertește înapoi în RON înainte de a seta starea.
            Math.round elimină zecimalele apărute la împărțire. */}
        <PriceCard label="Puncte fidelitate" amount={amount * rate} currency="pct" step={rate} onChange={next => setAmount(Math.round(next / rate))} />
      </div>
    </div>
  );
}
