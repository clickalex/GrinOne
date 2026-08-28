import { useEffect, useState } from "react";

/* ===== LIVE COUNTDOWN TIMER (demo) ===== */
export function CountdownTimer({
  initialSeconds = 2 * 3600 + 14 * 60 + 37,
}: {
  initialSeconds?: number;
}) {
  const [remaining, setRemaining] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(
      () => setRemaining(prev => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, []);
  const units = [
    String(Math.floor(remaining / 3600)).padStart(2, "0"),
    String(Math.floor((remaining % 3600) / 60)).padStart(2, "0"),
    String(remaining % 60).padStart(2, "0"),
  ];
  return (
    <div
      className="flex gap-1"
      role="timer"
      aria-label={`Matching ends in ${units[0]} hours ${units[1]} minutes ${units[2]} seconds`}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="px-1.5 py-0.5 bg-[#0d0d0d] border border-[#f77f00]/20 rounded font-mono text-[10px] font-bold text-[#f77f00]"
        >
          {unit}
        </span>
      ))}
    </div>
  );
}
