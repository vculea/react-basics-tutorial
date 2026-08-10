import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn() = clsx + twMerge.
// clsx construieste sirul de clase (accepta string, obiect, array, undefined).
// twMerge elimina conflictele Tailwind — daca treci "px-2 px-4", castiga "px-4".
// Fara twMerge, doua clase care controleaza aceeasi proprietate CSS raman amandoua
// in string, iar browserul aplica ultima — comportament fragil si greu de depanat.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
