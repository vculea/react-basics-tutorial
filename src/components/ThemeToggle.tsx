// ThemeToggle: buton icon care comută clasa .dark pe <html>.
// Folosește <Button variant="outline" size="icon"> — exact modelul din cerință.

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  // Pornește sincronizat cu preferința sistemului; aplică .dark imediat.
  const [dark, setDark] = useState(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
    return prefersDark;
  });

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <Button variant="outline" size="icon" onClick={toggle} aria-label={dark ? "Activează tema luminoasă" : "Activează tema întunecată"}>
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
