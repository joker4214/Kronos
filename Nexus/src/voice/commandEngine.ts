import type { ModuleId } from "@/types";

export type Command =
  | { type: "module"; id: ModuleId }
  | { type: "rotate"; dir: "left" | "right" }
  | { type: "search_youtube"; query: string }
  | { type: "none" };

const MODULE_ALIASES: Record<string, ModuleId> = {
  instagram: "instagram",
  ig: "instagram",
  stocks: "stocks",
  stock: "stocks",
  market: "stocks",
  markets: "stocks",
  projects: "projects",
  project: "projects",
  sports: "sports",
  scores: "sports",
  calendar: "calendar",
  schedule: "calendar",
  weather: "weather",
  news: "news",
  music: "music",
  system: "system",
  diagnostics: "system",
};

const MODULE_PATTERN = new RegExp(
  `^(?:open|show|go to|switch to|pull up)\\s+(?:the\\s+|my\\s+)?(${Object.keys(
    MODULE_ALIASES
  ).join("|")})\\b`,
  "i"
);

const ROTATE_PATTERN = /^rotate\s+(left|right)\b/i;
const YOUTUBE_PATTERN = /^search\s+youtube(?:\s+for)?\s+(.+)/i;

/**
 * Direct UI commands are matched here and executed immediately without a
 * round-trip to Gemini. Anything that doesn't match falls through to the
 * conversational assistant.
 */
export function parseCommand(rawTranscript: string): Command {
  const transcript = rawTranscript.trim();
  if (!transcript) return { type: "none" };

  const moduleMatch = transcript.match(MODULE_PATTERN);
  if (moduleMatch) {
    const id = MODULE_ALIASES[moduleMatch[1].toLowerCase()];
    if (id) return { type: "module", id };
  }

  const rotateMatch = transcript.match(ROTATE_PATTERN);
  if (rotateMatch) {
    return { type: "rotate", dir: rotateMatch[1].toLowerCase() as "left" | "right" };
  }

  const youtubeMatch = transcript.match(YOUTUBE_PATTERN);
  if (youtubeMatch) {
    return { type: "search_youtube", query: youtubeMatch[1].trim() };
  }

  return { type: "none" };
}

const WAKE_WORD = /\bnexus\b/i;

export function containsWakeWord(text: string) {
  return WAKE_WORD.test(text);
}

/** Strips a leading/embedded "nexus" so "nexus show projects" -> "show projects". */
export function stripWakeWord(text: string) {
  return text.replace(WAKE_WORD, "").replace(/^[,.\s]+/, "").trim();
}
