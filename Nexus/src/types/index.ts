export type ModuleId =
  | "instagram"
  | "stocks"
  | "projects"
  | "sports"
  | "calendar"
  | "weather"
  | "ai"
  | "news"
  | "music"
  | "system";

export interface CardDefinition {
  id: ModuleId;
  label: string;
  glyph: string;
  accent: string;
  description: string;
}

export type CardState =
  | "idle"
  | "hovered"
  | "selected"
  | "expanded"
  | "focused"
  | "dragging";

export type GestureType =
  | "none"
  | "open_hand"
  | "closed_hand"
  | "pinch"
  | "pinch_release"
  | "swipe_left"
  | "swipe_right"
  | "palm_hold"
  | "pull"
  | "push"
  | "circle";

export interface HandPoint {
  x: number;
  y: number;
  z: number;
}

export interface HandFrame {
  landmarks: HandPoint[];
  handedness: "Left" | "Right" | "Unknown";
  timestamp: number;
}

export interface GestureEvent {
  type: GestureType;
  confidence: number;
  hand: HandFrame | null;
  velocity?: { x: number; y: number; z: number };
}

export interface SystemLogEntry {
  id: number;
  time: string;
  message: string;
  level: "info" | "warn" | "error";
}

export type VoiceStatus =
  | "offline"
  | "idle"
  | "listening"
  | "thinking"
  | "streaming"
  | "speaking"
  | "interrupted";

export interface ConversationTurn {
  id: number;
  role: "user" | "assistant";
  text: string;
}
