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
    <div className="border-border bg-card text-card-foreground flex min-w-40 flex-col gap-3 rounded-lg border p-4">
      <div className="font-semibold">{label}</div>
      <div className="text-2xl font-semibold tabular-nums">
        {amount} <span className="text-muted-foreground text-sm font-normal">{currency}</span>
      </div>
      {/* Butoanele NU modifică o stare locală — apelează `onChange`,
          iar părintele decide cum se propagă schimbarea. */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onChange(amount - step)}>
          −
        </Button>
        <Button variant="outline" size="sm" onClick={() => onChange(amount + step)}>
          +
        </Button>
      </div>
    </div>
  );
}

export function LiftingState() {
  // Singura sursă de adevăr: suma în RON.
  // Punctele nu sunt stocate nicăieri — sunt CALCULATE la fiecare render.
  const [amount, setAmount] = useState(10);
  const rate = 5; // 1 RON = 5 puncte (curs fictiv)

  return (
    <div className="flex flex-col gap-6">
      <p>
        Modifică valoarea din oricare card — celălalt se actualizează instant, pentru că ambele citesc <em>aceeași</em> variabilă de stare.
      </p>
      <div className="flex flex-wrap gap-6">
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
