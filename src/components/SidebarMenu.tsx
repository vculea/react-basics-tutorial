import { NavLink } from "react-router-dom";
import { useActiveStep } from "@/context/ActiveStepProvider";
import { cn } from "@/lib/utils";

export function SidebarMenu() {
  const { steps } = useActiveStep();

  return (
    <nav className="flex flex-col gap-1">
      {steps.map(d => (
        <NavLink
          key={d.id}
          to={`/pas/${d.id}`}
          className={({ isActive }) =>
            cn(
              "relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full text-[0.6rem] font-bold",
                  isActive
                    ? "bg-primary-foreground text-primary"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {d.step}
              </span>
              {d.title}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
