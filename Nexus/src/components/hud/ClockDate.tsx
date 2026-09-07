"use client";

import { useEffect, useState } from "react";

export function ClockDate() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const time = now.toLocaleTimeString("en-US", { hour12: false });
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="pointer-events-none select-none text-right font-mono text-cyan-100/90">
      <div className="text-xl tracking-[0.15em]">{time}</div>
      <div className="text-[11px] tracking-wider opacity-60">{date}</div>
    </div>
  );
}
