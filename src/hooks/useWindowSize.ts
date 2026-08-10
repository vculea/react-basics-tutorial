// Hook care citeste dimensiunea ferestrei si se actualizeaza la fiecare resize.
// Demonstreaza al doilea use-case al hooks custom: logica cu efecte de bord
// (subscriptie la un eveniment browser) extrasa din componenta.

import { useState, useEffect } from "react";

type WindowSize = { width: number; height: number };

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    // Ne abonam la evenimentul resize al ferestrei...
    window.addEventListener("resize", handleResize);

    // ...si ne dezabonam cand componenta este demontata sau efectul se reexecuta.
    // Fara return, am acumula listener-i la fiecare montare — memory leak clasic.
    return () => window.removeEventListener("resize", handleResize);
  }, []); // [] = ruleaza o singura data, la montare

  return size;
}
