// Pas 10 — shadcn/ui: componente gata făcute, cod în proiect.
//
// De ce acest pas există:
//   Butoanele scrise de mână (stil inline sau Tailwind ad-hoc) pierd constant
//   stările: focus ring la Tab, cursor-not-allowed pe disabled, aria-* pentru
//   cititoarele de ecran. Le poți adăuga manual, dar le vei uita și le vei
//   re-adăuga la fiecare componentă nouă.
//   shadcn/ui rezolvă asta O DATĂ: copiază în proiect un buton complet, cu
//   toate stările și variantele tipate. Codul este AL TĂU — îl citești, îl
//   modifici, un agent AI îl poate edita direct, fără să aștepți un release.

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Varianta manuală ─────────────────────────────────────────────────────────
// Lipsuri concrete față de <Button>:
//   1. Niciun focus ring vizibil la navigarea cu Tab (accesibilitate spartă).
//   2. disabled care pare dezactivat DAR nu blochează focusul și nu schimbă
//      cursorul — Tab ajunge la el, pointer rămâne normal.
//   3. Nicio variantă tipată: fiecare buton nou = clase copiate de mână.
function ManualSection() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">Manual</h3>

      <Button variant="outline">Buton normal</Button>

      {/* disabled="false" + opacity → PARE dezactivat, dar Tab îl atinge,
          cursorul rămâne pointer și onClick încă funcționează */}
      <Button variant="outline" className={cn("cursor-pointer opacity-50")}>
        Buton „dezactivat" (fals)
      </Button>

      <p className="text-muted-foreground text-xs">
        Apasă <kbd className="border-border rounded border px-1">Tab</kbd> și observă: primul buton nu arată focus, al doilea primește focus deși pare dezactivat.
      </p>
    </div>
  );
}

// ── Varianta shadcn/ui ────────────────────────────────────────────────────────
// Aceleași butoane, dar din src/components/ui/button.tsx.
// focus-visible:ring-[3px] → focus ring clar la Tab.
// disabled:pointer-events-none disabled:opacity-50 → dezactivat corect: nu
//   primește focus, cursorul se schimbă, onClick nu se mai declanșează.
function ShadcnSection() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">shadcn/ui</h3>
      <Button>Buton normal</Button>
      <Button disabled>Buton dezactivat (real)</Button>
      <p className="text-muted-foreground text-xs">
        Apasă <kbd className="border-border rounded border px-1">Tab</kbd>: focus ring vizibil, butonul dezactivat e sărit complet.
      </p>
    </div>
  );
}

// Toate variantele disponibile, generate dintr-un array constant.
// `as const` îngheață tipul la valorile literale — fără el TypeScript ar infera
// string[], pierzând informația despre variante și generând erori la <Button>.
const variants = ["default", "secondary", "outline", "ghost", "link"] as const;

export function ShadcnSetup() {
  return (
    <div className="space-y-8">
      {/* Comparație pe două coloane */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="border-border bg-card text-card-foreground rounded-lg border p-5">
          <ManualSection />
        </div>
        <div className="border-border bg-card text-card-foreground rounded-lg border p-5">
          <ShadcnSection />
        </div>
      </div>

      {/* Toate variantele */}
      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground text-sm">
          Toate variantele — generate din <code>variants</code> array, zero cod duplicat:
        </p>
        <div className="flex flex-wrap gap-3">
          {variants.map(v => (
            // cn() compune clasele fără conflicte — dacă pasezi className din
            // exterior și variant intern, twMerge câștigătoarea corectă.
            <Button key={v} variant={v} className={cn()}>
              {v}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
