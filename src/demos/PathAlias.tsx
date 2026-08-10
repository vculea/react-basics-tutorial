// Pas 8 — path alias (@/).
// De ce il punem ACUM: shadcn/ui il cere explicit la initializare (il adaugam
// mai tarziu), dar e util oricum — mutarea unui fisier nu mai rupe importurile.
// Fara alias, fisierele adanci ajung la `../../../components/Button`, ceea ce
// e fragil si greu de citit.

import { useState } from "react";

// Acelasi import, imaginat din src/components/chat/message/Bubble.tsx (4 niveluri adanc).
// Constantele sunt siruri de text — ilustratie, nu import-uri reale.
const relativeExamples = ["// din src/components/chat/message/Bubble.tsx:", 'import { DemoTab }  from "../../../components/DemoTab";', 'import { Counter }  from "../../../demos/Counter";', 'import { useTimer } from "../../../hooks/useTimer";'];

const aliasExamples = ["// din src/components/chat/message/Bubble.tsx — acelasi fisier:", 'import { DemoTab }  from "@/components/DemoTab";', 'import { Counter }  from "@/demos/Counter";', 'import { useTimer } from "@/hooks/useTimer";'];

type Variant = "relative" | "alias";

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "1rem",
  flex: "1 1 280px"
};

const codeBlockStyle: React.CSSProperties = {
  background: "#f4f4f4",
  borderRadius: "4px",
  padding: "0.75rem 1rem",
  fontFamily: "monospace",
  fontSize: "0.85rem",
  lineHeight: "1.6",
  whiteSpace: "pre",
  overflowX: "auto"
};

export function PathAlias() {
  const [variant, setVariant] = useState<Variant>("relative");

  const examples = variant === "relative" ? relativeExamples : aliasExamples;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Sectiunea de comutare */}
      <section>
        <p style={{ marginTop: 0 }}>
          Același import, scris în două feluri. Fișierul sursă imaginat: <code>src/components/chat/message/Bubble.tsx</code>
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <button onClick={() => setVariant("relative")} style={{ fontWeight: variant === "relative" ? "bold" : "normal" }}>
            Fără alias (relativ)
          </button>
          <button onClick={() => setVariant("alias")} style={{ fontWeight: variant === "alias" ? "bold" : "normal" }}>
            Cu alias @/
          </button>
        </div>
        <div style={codeBlockStyle}>{examples.join("\n")}</div>
      </section>

      {/* Carduri explicative — de ce AMBELE configuratii sunt necesare */}
      <section>
        <h2 style={{ marginTop: 0 }}>De ce trebuie configurat în două locuri?</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              <code>tsconfig.app.json</code> — TypeScript &amp; IDE
            </h3>
            <div style={codeBlockStyle}>{`"baseUrl": ".",\n"paths": { "@/*": ["./src/*"] }`}</div>
            <p>
              TypeScript citește <code>paths</code> pentru a ști că <code>@/</code> e un alias valid. Fără el, IDE-ul subliniază importul cu roșu, autocomplete-ul nu sugerează fișiere și „go to definition" nu funcționează.
            </p>
            <p style={{ margin: 0, color: "#c00" }}>
              Lipsește? → <strong>type-check eșuează</strong>, IDE se plânge.
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              <code>vite.config.ts</code> — bundler
            </h3>
            <div style={codeBlockStyle}>{`resolve: {\n  alias: { "@": path.resolve(__dirname, "./src") }\n}`}</div>
            <p>
              Vite rezolvă fizic fișierele pe disc. TypeScript <em>acceptă</em> sintaxa, dar la rulare/build Vite trebuie să știe unde să caute. Fără el, aplicația pornește, dar importurile <code>@/</code> eșuează cu „module not found".
            </p>
            <p style={{ margin: 0, color: "#c00" }}>
              Lipsește? → <strong>build crapă</strong>, chiar dacă TS e fericit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
