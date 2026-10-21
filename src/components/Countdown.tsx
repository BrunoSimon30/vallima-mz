import { useEffect, useState } from "react";

export function Countdown({ target }: { target: Date }) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { d, h, m, s };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cells = [
    { label: "Days", value: t.d },
    { label: "Hours", value: t.h },
    { label: "Minutes", value: t.m },
    { label: "Seconds", value: t.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-2xl mx-auto">
      {cells.map((c) => (
        <div key={c.label} className="text-center">
          <div className="mx-auto size-[4.5rem] sm:size-24 rounded-full border border-gold/35 bg-card/60 backdrop-blur flex flex-col items-center justify-center shadow-soft">
            <div className="font-display text-2xl sm:text-4xl text-gold tabular-nums leading-none">
              {String(c.value).padStart(2, "0")}
            </div>
          </div>
          <div className="mt-3 text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
