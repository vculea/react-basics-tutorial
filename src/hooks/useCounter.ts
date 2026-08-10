// Hook custom: un hook e o functie normala al carei nume incepe cu "use".
// Regula asta exista ca React sa stie ca functia apeleaza alte hooks in interior
// si sa aplice aceleasi restrictii (nu se apeleaza conditional, nu in bucle).
// useCounter nu e magic — e doar un useState + trei callback-uri invelite intr-o functie.

import { useState, useCallback } from "react";

// Interfata publica a hook-ului: un obiect, nu un tuplu.
// Ca in Java: returnam un "DTO" cu campuri numite, nu un array de pozitii.
export type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export function useCounter(initial = 0, step = 1): CounterState {
  const [count, setCount] = useState(initial);

  // useCallback memoreaza functia intre randari — o reface DOAR daca `step` se schimba.
  // Fara useCallback, la fiecare randare s-ar crea o noua referinta de functie,
  // ceea ce ar forta re-randarea oricarei componente care primeste callback-ul ca prop.
  const increment = useCallback(() => setCount(c => c + step), [step]);
  const decrement = useCallback(() => setCount(c => c - step), [step]);

  // reset depinde de `initial`, nu de `step`.
  const reset = useCallback(() => setCount(initial), [initial]);

  return { count, increment, decrement, reset };
}
