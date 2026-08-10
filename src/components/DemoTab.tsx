// Butonul de navigare cu badge: titlul conceptului ramane lizibil,
// numarul pasului sta in coltul dreapta-sus fara sa inghesuiasca textul.

type Props = {
  step: number;
  title: string;
  active: boolean;
  onClick: () => void;
};

export function DemoTab({ step, title, active, onClick }: Props) {
  return (
    // position: relative + overflow implicit visible => badge-ul poate depasi
    // chenarul butonului fara sa fie decupat.
    <button
      onClick={onClick}
      style={{
        position: "relative",
        padding: "0.4rem 1rem",
        fontWeight: active ? "bold" : "normal",
        cursor: "pointer",
        background: active ? "#646cff" : "",
        color: active ? "#fff" : "",
        borderColor: active ? "#646cff" : "",
        borderRadius: "4px"
      }}
    >
      {title}
      <span
        style={{
          position: "absolute",
          top: "-0.55rem",
          right: "-0.55rem",
          fontSize: "0.65rem",
          background: "#646cff",
          color: "#fff",
          borderRadius: "50%",
          width: "1.25rem",
          height: "1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          pointerEvents: "none"
        }}
      >
        {step}
      </span>
    </button>
  );
}
