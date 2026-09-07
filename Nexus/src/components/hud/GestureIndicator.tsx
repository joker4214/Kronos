"use client";

import { useGestureStore } from "@/stores/useGestureStore";

const LABELS: Record<string, string> = {
  none: "—",
  open_hand: "OPEN HAND",
  closed_hand: "CLOSED HAND",
  pinch: "PINCH",
  pinch_release: "RELEASE",
  swipe_left: "SWIPE ←",
  swipe_right: "SWIPE →",
  palm_hold: "PALM HOLD",
  pull: "PULL",
  push: "PUSH",
  circle: "CIRCLE (RESERVED)",
};

export function GestureIndicator() {
  const gesture = useGestureStore((s) => s.currentGesture);
  const confidence = useGestureStore((s) => s.confidence);

  return (
    <div className="pointer-events-none select-none text-right font-mono text-[11px] tracking-wider text-cyan-200/80">
      <div className="opacity-60">GESTURE</div>
      <div className="text-cyan-100 text-sm">{LABELS[gesture] ?? gesture}</div>
      <div className="mt-1 h-1 w-28 rounded-full bg-white/10 overflow-hidden ml-auto">
        <div
          className="h-full bg-cyan-300 transition-[width] duration-150"
          style={{ width: `${Math.round(confidence * 100)}%` }}
        />
      </div>
    </div>
  );
}
