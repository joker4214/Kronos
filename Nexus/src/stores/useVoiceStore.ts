import { create } from "zustand";
import type { ConversationTurn, VoiceStatus } from "@/types";

let turnId = 0;

interface VoiceState {
  status: VoiceStatus;
  supported: boolean;
  interimTranscript: string;
  streamingText: string;
  messages: ConversationTurn[];
  setStatus: (status: VoiceStatus) => void;
  setSupported: (supported: boolean) => void;
  setInterim: (text: string) => void;
  setStreamingText: (text: string) => void;
  appendStreamingText: (chunk: string) => void;
  pushMessage: (role: ConversationTurn["role"], text: string) => void;
  reset: () => void;
}

export const useVoiceStore = create<VoiceState>((set) => ({
  status: "offline",
  supported: false,
  interimTranscript: "",
  streamingText: "",
  messages: [],
  setStatus: (status) => set({ status }),
  setSupported: (supported) => set({ supported }),
  setInterim: (text) => set({ interimTranscript: text }),
  setStreamingText: (text) => set({ streamingText: text }),
  appendStreamingText: (chunk) =>
    set((s) => ({ streamingText: s.streamingText + chunk })),
  pushMessage: (role, text) =>
    set((s) => ({
      messages: [...s.messages.slice(-19), { id: turnId++, role, text }],
    })),
  reset: () => set({ interimTranscript: "", streamingText: "" }),
}));
