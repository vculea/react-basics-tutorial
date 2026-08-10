// src/components/ui/button.tsx — COPIAT de npx shadcn add button (stil new-york).
//
// De ce NU e o dependenta npm:
//   shadcn/ui iti COPIAZA codul in proiect; nu importi dintr-un pachet extern.
//   Avantaj concret: poti modifica orice — culori, raze, dimensiuni — fara sa
//   astepti un release de la altcineva. Un agent AI poate edita acest fisier
//   direct, la fel ca orice alt fisier al tau.
//
// Variante tipate cu `cva` (class-variance-authority):
//   cva("clase-de-baza", { variants: { variant: {...}, size: {...} } })
//   Returneaza o functie; la apel pasezi { variant, size } si primesti sirul
//   final de clase. TypeScript cunoaste tipul fiecarei variante — daca scrii
//   variant="inexistent" compilatorul raporteaza eroare inainte sa rulezi codul.
//
// Accesibilitate inclusa din start:
//   focus-visible:ring-[3px] — focus ring vizibil la navigarea cu Tab
//   disabled:pointer-events-none disabled:opacity-50 — stare dezactivata corecta
//   aria-invalid:border-destructive — stari de validare pentru formulare

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Clase de baza: toate variantele le mostenesc.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  // asChild: in loc sa randeze un <button>, randeaza copilul transmis ca element.
  // Util cand vrei sa aplici stilul unui <a> sau <Link> fara sa schimbi varianta.
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
