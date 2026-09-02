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
import { Button } from "@/components/ui/button";

// ── Varianta 1: style={} cu tokeni de temă ───────────────────────────────────
// Stilurile inline pot folosi tokenii existenți, dar utilitarele Tailwind păstrează
// spațierea și culorile lizibile direct în markup.
function CardManual() {
  return (
    <div className="border-border bg-card text-card-foreground flex max-w-sm flex-col gap-3 rounded-lg border p-6">
      <span className="bg-primary text-primary-foreground w-fit rounded-full px-3 py-1 text-sm">style={"{}"}</span>
      <h3 className="text-lg font-semibold">Tokeni în style</h3>
      <p className="text-muted-foreground text-sm">Tokenii CSS se pot folosi și în stiluri inline. Schimbă tema — cardul se adaptează fără culori hardcodate.</p>
    </div>
  );
}

// ── Varianta 2: utilitare Tailwind pe tokeni de temă ────────────────────────
// bg-card, text-card-foreground etc. se traduc în var(--tw-card) la runtime.
// Clasa .dark pe <html> schimbă valorile CSS → toate componentele se adaptează
// simultan, fără nicio modificare în cod.
function CardTailwind() {
  return (
    <div className="border-border bg-card text-card-foreground flex max-w-sm flex-col gap-3 rounded-lg border p-6">
      {/* rounded-lg = 0.5rem din scara Tailwind; nu e o valoare inventată */}
      <span className="bg-primary text-primary-foreground w-fit rounded-full px-3 py-1 text-sm">Tailwind</span>
      <h3 className="text-lg font-semibold">Tokeni de temă</h3>
      <p className="text-muted-foreground text-sm">
        <code>bg-card</code>, <code>text-muted-foreground</code>. Schimbă tema — cardul se adaptează singur, fără să umbli prin cod.
      </p>
    </div>
  );
}

// ── Demo principal ───────────────────────────────────────────────────────────
export function TailwindSetup() {
  // Preia tema curentă la montare — altfel suprascrie starea globală din ThemeToggle.
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  // La demontare, restaurează tema care era activă înainte să intri în demo.
  useEffect(() => {
    const original = document.documentElement.classList.contains("dark");
    return () => {
      document.documentElement.classList.toggle("dark", original);
    };
  }, []);

  // Sincronizează .dark cu starea locală la fiecare toggle din demo.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex flex-col gap-6">
      <Button onClick={() => setDark(d => !d)} className="self-start">
        Temă activă: {dark ? "întunecate 🌙" : "luminoasă ☀️"}
      </Button>

      {/* Cele două carduri stau unul lângă altul ca să vezi diferența pe loc */}
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Varianta 1 — style={"{}"} (tokeni)</p>
          <CardManual />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Varianta 2 — utilitare Tailwind</p>
          <CardTailwind />
        </div>
      </div>
    </div>
  );
}
