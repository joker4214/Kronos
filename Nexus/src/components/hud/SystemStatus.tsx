"use client";

import { useSystemStore } from "@/stores/useSystemStore";

export function SystemStatus() {
  const fps = useSystemStore((s) => s.fps);
  const gpu = useSystemStore((s) => s.gpu);
  const trackingActive = useSystemStore((s) => s.trackingActive);
  const trackingReady = useSystemStore((s) => s.trackingReady);

  return (
    <div className="pointer-events-none select-none font-mono text-[11px] tracking-wider text-cyan-200/80">
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            trackingReady ? "bg-cyan-300 shadow-[0_0_6px_2px_rgba(103,211,255,0.7)]" : "bg-orange-400/80"
          }`}
        />
        <span className="text-cyan-100/90">NEXUS OS</span>
      </div>
      <div className="opacity-70">FPS · {fps.toString().padStart(2, "0")}</div>
      <div className="opacity-70">
        TRACKING · {trackingReady ? (trackingActive ? "ACTIVE" : "IDLE") : "MOUSE FALLBACK"}
      </div>
      <div className="opacity-70">GPU · {gpu}</div>
    </div>
  );
}
