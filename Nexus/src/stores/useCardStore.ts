import { create } from "zustand";
import type { CardState, ModuleId } from "@/types";
import { CARD_DEFINITIONS } from "@/lib/cardData";

interface CardStoreState {
  rotation: number;
  targetRotation: number;
  cardStates: Record<ModuleId, CardState>;
  selectedId: ModuleId | null;
  expandedId: ModuleId | null;
  rotateBy: (delta: number) => void;
  setRotation: (r: number) => void;
  setCardState: (id: ModuleId, state: CardState) => void;
  select: (id: ModuleId | null) => void;
  expand: (id: ModuleId | null) => void;
}

const initialStates = Object.fromEntries(
  CARD_DEFINITIONS.map((c) => [c.id, "idle" as CardState])
) as Record<ModuleId, CardState>;

export const useCardStore = create<CardStoreState>((set, get) => ({
  rotation: 0,
  targetRotation: 0,
  cardStates: initialStates,
  selectedId: null,
  expandedId: null,
  rotateBy: (delta) => set({ targetRotation: get().targetRotation + delta }),
  setRotation: (r) => set({ rotation: r }),
  setCardState: (id, state) =>
    set((s) => ({ cardStates: { ...s.cardStates, [id]: state } })),
  select: (id) =>
    set((s) => ({
      selectedId: id,
      cardStates: Object.fromEntries(
        CARD_DEFINITIONS.map((c) => [
          c.id,
          c.id === id ? "selected" : s.expandedId === c.id ? "expanded" : "idle",
        ])
      ) as Record<ModuleId, CardState>,
    })),
  expand: (id) =>
    set((s) => ({
      expandedId: id,
      cardStates: Object.fromEntries(
        CARD_DEFINITIONS.map((c) => [
          c.id,
          c.id === id ? "expanded" : s.selectedId === c.id ? "selected" : "idle",
        ])
      ) as Record<ModuleId, CardState>,
    })),
}));
