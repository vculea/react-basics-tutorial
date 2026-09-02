// Pas 8 — path alias (@/).
// De ce il punem ACUM: shadcn/ui il cere explicit la initializare (il adaugam
// mai tarziu), dar e util oricum — mutarea unui fisier nu mai rupe importurile.
// Fara alias, fisierele adanci ajung la `../../../components/Button`, ceea ce
// e fragil si greu de citit.

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Acelasi import, imaginat din src/components/chat/message/Bubble.tsx (4 niveluri adanc).
// Constantele sunt siruri de text — ilustratie, nu import-uri reale.
const relativeExamples = ["// din src/components/chat/message/Bubble.tsx:", 'import { DemoTab }  from "../../../components/DemoTab";', 'import { Counter }  from "../../../demos/Counter";', 'import { useTimer } from "../../../hooks/useTimer";'];

const aliasExamples = ["// din src/components/chat/message/Bubble.tsx — acelasi fisier:", 'import { DemoTab }  from "@/components/DemoTab";', 'import { Counter }  from "@/demos/Counter";', 'import { useTimer } from "@/hooks/useTimer";'];

type Variant = "relative" | "alias";

export function PathAlias() {
  const [variant, setVariant] = useState<Variant>("relative");

  const examples = variant === "relative" ? relativeExamples : aliasExamples;

  return (
    <div className="flex flex-col gap-6">
      {/* Sectiunea de comutare */}
      <section className="flex flex-col gap-4">
        <p>
          Același import, scris în două feluri. Fișierul sursă imaginat: <code>src/components/chat/message/Bubble.tsx</code>
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant={variant === "relative" ? "default" : "secondary"} size="sm" onClick={() => setVariant("relative")}>
            Fără alias (relativ)
          </Button>
          <Button variant={variant === "alias" ? "default" : "secondary"} size="sm" onClick={() => setVariant("alias")}>
            Cu alias @/
          </Button>
        </div>
        <pre className="border-border bg-muted text-foreground overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-6">{examples.join("\n")}</pre>
      </section>

      {/* Carduri explicative — de ce AMBELE configuratii sunt necesare */}
      <section className="flex flex-col gap-4">
        <h2>De ce trebuie configurat în două locuri?</h2>
        <div className="flex flex-wrap gap-4">
          <div className="border-border bg-card text-card-foreground flex min-w-70 flex-1 flex-col gap-4 rounded-lg border p-4">
            <h3>
              <code>tsconfig.app.json</code> — TypeScript &amp; IDE
            </h3>
            <pre className="border-border bg-muted text-foreground overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-6">{`"baseUrl": ".",\n"paths": { "@/*": ["./src/*"] }`}</pre>
            <p>
              TypeScript citește <code>paths</code> pentru a ști că <code>@/</code> e un alias valid. Fără el, IDE-ul subliniază importul cu roșu, autocomplete-ul nu sugerează fișiere și „go to definition" nu funcționează.
            </p>
            <p className="text-destructive">
              Lipsește? → <strong>type-check eșuează</strong>, IDE se plânge.
            </p>
          </div>

          <div className="border-border bg-card text-card-foreground flex min-w-70 flex-1 flex-col gap-4 rounded-lg border p-4">
            <h3>
              <code>vite.config.ts</code> — bundler
            </h3>
            <pre className="border-border bg-muted text-foreground overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-6">{`resolve: {\n  alias: { "@": path.resolve(__dirname, "./src") }\n}`}</pre>
            <p>
              Vite rezolvă fizic fișierele pe disc. TypeScript <em>acceptă</em> sintaxa, dar la rulare/build Vite trebuie să știe unde să caute. Fără el, aplicația pornește, dar importurile <code>@/</code> eșuează cu „module not found".
            </p>
            <p className="text-destructive">
              Lipsește? → <strong>build crapă</strong>, chiar dacă TS e fericit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
