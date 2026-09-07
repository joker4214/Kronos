"use client";

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;
  const preferred =
    voices.find((v) => /Google US English|Samantha|Daniel|Aria|Neural/i.test(v.name)) ??
    voices.find((v) => v.lang.startsWith("en")) ??
    voices[0];
  cachedVoice = preferred;
  return preferred;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
  };
}

export function isTTSSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Speaks one chunk of text and resolves when it finishes (or is cancelled).
 * Does NOT cancel prior queued utterances — call cancelSpeech() first if
 * you need to interrupt.
 */
export function speak(text: string, onBoundaryWord?: () => void): Promise<void> {
  return new Promise((resolve) => {
    if (!isTTSSupported() || !text.trim()) {
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 1.02;
    utterance.pitch = 1.0;
    utterance.onboundary = () => onBoundaryWord?.();
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export function cancelSpeech() {
  if (isTTSSupported()) window.speechSynthesis.cancel();
}
