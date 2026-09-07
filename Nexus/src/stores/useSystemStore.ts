import { create } from "zustand";
import type { SystemLogEntry } from "@/types";

interface SystemState {
  fps: number;
  gpu: string;
  trackingActive: boolean;
  trackingReady: boolean;
  quality: "high" | "medium" | "low";
  log: SystemLogEntry[];
  setFps: (fps: number) => void;
  setGpu: (gpu: string) => void;
  setTracking: (active: boolean, ready: boolean) => void;
  setQuality: (q: SystemState["quality"]) => void;
  pushLog: (message: string, level?: SystemLogEntry["level"]) => void;
}

let logId = 0;

export const useSystemStore = create<SystemState>((set) => ({
  fps: 0,
  gpu: "DETECTING…",
  trackingActive: false,
  trackingReady: false,
  quality: "high",
  log: [],
  setFps: (fps) => set({ fps }),
  setGpu: (gpu) => set({ gpu }),
  setTracking: (active, ready) =>
    set({ trackingActive: active, trackingReady: ready }),
  setQuality: (quality) => set({ quality }),
  pushLog: (message, level = "info") =>
    set((s) => ({
      log: [
        ...s.log.slice(-24),
        {
          id: logId++,
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
          message,
          level,
        },
      ],
    })),
}));
