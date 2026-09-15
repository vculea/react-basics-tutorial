// De ce e o componenta separata: DemoTab ramane neschimbat — doar containerul
// se randeaza vertical (flex-col) in loc de orizontal, ca la nav-ul de sus.
// Sursa de adevar ramane aceeasi: useActiveStep() din ActiveStepProvider.

import { DemoTab } from "@/components/DemoTab";
import { useActiveStep } from "@/context/ActiveStepProvider";

export function SidebarMenu() {
  const { activeId, setActiveId, steps } = useActiveStep();

  return (
    <nav className="flex w-72 shrink-0 flex-col gap-2">
      {steps.map(d => (
        <DemoTab
          key={d.id}
          step={d.step}
          title={d.title}
          active={d.id === activeId}
          onClick={() => setActiveId(d.id)}
          // textele lungi ("URL ca sursă de adevăr...") nu încap pe o linie ca
          // în nav-ul de sus — aici le lăsăm să se rupă pe mai multe rânduri
          // în loc să le tăiem cu overflow, ca titlul să rămână citibil integral.
          className="h-auto w-full items-start justify-start py-2 text-left whitespace-normal"
        />
      ))}
    </nav>
  );
}
