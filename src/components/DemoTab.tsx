// Butonul de navigare cu badge: titlul conceptului rămâne lizibil,
// numărul pasului stă în colțul dreapta-sus fără să înghesuiască textul.
//
// variant={active ? "default" : "secondary"} → pasul activ se distinge prin
// culoare fără clase scrise de mână; shadcn gestionează și starea hover/focus.
// className="relative overflow-visible" → overflow-visible lasă badge-ul să
// depășească chenarul fără să fie decupat (overflow-hidden din button.tsx
// ar tăia span-ul absolut).

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  step: number;
  title: string;
  active: boolean;
  onClick: () => void;
  className?: string;
};

export function DemoTab({ step, title, active, onClick, className }: Props) {
  return (
    <Button variant={active ? "default" : "secondary"} size="sm" onClick={onClick} className={cn("relative overflow-visible", className)}>
      {title}
      {/* cn() compune clasele fără conflicte: varianta activă inversează
          culorile badge-ului față de varianta inactivă. */}
      <span className={cn("pointer-events-none absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full text-[0.6rem] font-bold", active ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground")}>{step}</span>
    </Button>
  );
}
