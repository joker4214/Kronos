"use client";

import { useSystemStore } from "@/stores/useSystemStore";

const LEVEL_COLOR: Record<string, string> = {
  info: "text-cyan-200/70",
  warn: "text-orange-300/80",
  error: "text-red-400/80",
};

export function SystemLog() {
  const log = useSystemStore((s) => s.log);

  return (
    <div className="pointer-events-none select-none font-mono text-[10px] leading-relaxed max-w-xs">
      {log.slice(-6).map((entry) => (
        <div key={entry.id} className={LEVEL_COLOR[entry.level]}>
          <span className="opacity-40">{entry.time}</span> {entry.message}
        </div>
      ))}
    </div>
  );
}
