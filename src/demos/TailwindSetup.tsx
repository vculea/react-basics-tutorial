// Pas 9 — Tailwind CSS v4: utility-first + tokeni de temă.
//
// De ce: fără o bază de tokeni, fiecare developer inventează culori și spațieri
// diferite la fiecare pas. Tailwind rezolvă două probleme simultan:
//   1. Stilul stă lângă structură în markup — nu cauți prin fișiere paralele.
//   2. Valorile vin dintr-un set finit (scară de spacing, paletă OKLCH)
//      → UI consecvent prin construcție, nu prin disciplină manuală.
//
// Contra-obiecția "clasele lungi urâțesc markup-ul":
//   – Stilul e vizibil lângă element; nu mai pierzi timp căutând în CSS.
//   – Prettier (cu prettier-plugin-tailwindcss) sortează clasele canonic.
//
// Poanta demo-ului: același card în două variante comutabile.
// La dark mode, varianta cu style={} RĂMÂNE ALBĂ (culori hardcodate),
// varianta cu utilitare Tailwind se adaptează singur (tokeni → var() CSS).

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";

// ── Varianta 1: style={} cu culori hardcodate ────────────────────────────────
// Funcționează vizual, dar e fragil: culorile sunt inventate pe loc (#fafafa,
// #171717), nu aparțin unui sistem. La dark mode nu se adaptează deloc.
function CardManual() {
  const wrapStyle: CSSProperties = {
    backgroundColor: "#fafafa",
    color: "#171717",
    border: "1px solid #e5e5e5",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    maxWidth: "22rem"
  };
  // Valori inventate ad-hoc — nu există niciun token care să le lege între ele.
  const badgeStyle: CSSProperties = {
    display: "inline-block",
    backgroundColor: "#6d28d9",
    color: "#ffffff",
    padding: "0.2rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.8rem",
    marginBottom: "0.75rem"
  };
  const mutedStyle: CSSProperties = {
    marginTop: "0.5rem",
    fontSize: "0.875rem",
    color: "#6b7280"
  };
  return (
    <div style={wrapStyle}>
      <span style={badgeStyle}>style={"{}"}</span>
      <h3 style={{ margin: "0 0 0.25rem", color: "#171717", fontSize: "1.1rem" }}>Culori hardcodate</h3>
      <p style={mutedStyle}>
        <code>#fafafa</code> / <code>#171717</code>. Schimbă tema — cardul rămâne alb pentru că nu știe de dark mode.
      </p>
    </div>
  );
}

// ── Varianta 2: utilitare Tailwind pe tokeni de temă ────────────────────────
// bg-card, text-card-foreground etc. se traduc în var(--tw-card) la runtime.
// Clasa .dark pe <html> schimbă valorile CSS → toate componentele se adaptează
// simultan, fără nicio modificare în cod.
function CardTailwind() {
  return (
    <div className="border-border bg-card text-card-foreground max-w-sm rounded-lg border p-6">
      {/* rounded-lg = 0.5rem din scara Tailwind; nu e o valoare inventată */}
      <span className="bg-primary text-primary-foreground mb-3 inline-block rounded-full px-3 py-1 text-sm">Tailwind</span>
      <h3 className="mt-0 mb-1 text-lg">Tokeni de temă</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        <code>bg-card</code>, <code>text-muted-foreground</code>. Schimbă tema — cardul se adaptează singur, fără să umbli prin cod.
      </p>
    </div>
  );
}

// ── Demo principal ───────────────────────────────────────────────────────────
export function TailwindSetup() {
  const [dark, setDark] = useState(false);

  // Adăugăm / scoatem clasa .dark de pe <html> — acolo "vede" Tailwind tema.
  // Cleanup: când pleci din demo, resetăm ca celelalte demo-uri să nu fie afectate.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [dark]);

  return (
    <div>
      <button onClick={() => setDark(d => !d)} className="bg-primary text-primary-foreground mb-6 rounded-md px-4 py-2 text-sm font-medium transition-colors">
        Temă activă: {dark ? "întunecată 🌙" : "luminoasă ☀️"}
      </button>

      {/* Cele două carduri stau unul lângă altul ca să vezi diferența pe loc */}
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">Varianta 1 — style={"{}"} (hardcodat)</p>
          <CardManual />
        </div>
        <div>
          <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">Varianta 2 — utilitare Tailwind</p>
          <CardTailwind />
        </div>
      </div>
    </div>
  );
}
