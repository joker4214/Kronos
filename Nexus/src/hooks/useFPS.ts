"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSystemStore } from "@/stores/useSystemStore";

export function useFPSMeter() {
  const frames = useRef(0);
  const lastSample = useRef(0);
  const setFps = useSystemStore((s) => s.setFps);

  useFrame((state) => {
    frames.current++;
    const t = state.clock.getElapsedTime();
    if (t - lastSample.current > 0.5) {
      setFps(Math.round(frames.current / (t - lastSample.current)));
      frames.current = 0;
      lastSample.current = t;
    }
  });
}
