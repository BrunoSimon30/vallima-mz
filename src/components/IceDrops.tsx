const DROPS = Array.from({ length: 22 }, (_, i) => {
  const n = i + 1;
  return {
    id: i,
    left: (n * 53) % 97,
    delay: -((n * 1.37) % 14),
    duration: 9 + (n % 6) * 1.7,
    height: 16 + (n % 5) * 8,
    drift: (n % 2 === 0 ? 14 : -12) + (n % 4) * 4,
  };
});

export function IceDrops() {
  return (
    <div className="ice-field" aria-hidden>
      {DROPS.map((drop) => (
        <span
          key={drop.id}
          className="ice-drop"
          style={{
            left: `${drop.left}%`,
            height: drop.height,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            ["--ice-drift" as string]: `${drop.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
