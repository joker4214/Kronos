import { create } from "zustand";
import type { GestureType, HandFrame } from "@/types";

interface GestureState {
  currentGesture: GestureType;
  confidence: number;
  hand: HandFrame | null;
  pinching: boolean;
  frozen: boolean;
  set: (partial: Partial<GestureState>) => void;
}

export const useGestureStore = create<GestureState>((set) => ({
  currentGesture: "none",
  confidence: 0,
  hand: null,
  pinching: false,
  frozen: false,
  set: (partial) => set(partial),
}));
