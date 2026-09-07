"use client";

type SpeechRecognitionCtor = new () => SpeechRecognition;

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported() {
  return getRecognitionCtor() !== null;
}

interface Handlers {
  onInterim: (text: string) => void;
  onFinal: (text: string) => void;
  onSpeechStart: () => void;
  onEnd: () => void;
  onError: (message: string) => void;
}

/**
 * Wraps the browser SpeechRecognition API in continuous mode and keeps it
 * alive — the browser API stops itself periodically (silence, tab focus,
 * ~60s caps in some browsers), so `active` restarts it until the caller
 * calls stop().
 */
export class ContinuousRecognizer {
  private recognition: SpeechRecognition | null = null;
  private active = false;
  private handlers: Handlers;

  constructor(handlers: Handlers) {
    this.handlers = handlers;
  }

  start() {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      this.handlers.onError("Speech recognition is not supported in this browser.");
      return;
    }
    if (this.active) return;
    this.active = true;
    this.spin(Ctor);
  }

  stop() {
    this.active = false;
    this.recognition?.stop();
    this.recognition = null;
  }

  private spin(Ctor: SpeechRecognitionCtor) {
    if (!this.active) return;
    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onspeechstart = () => this.handlers.onSpeechStart();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0]?.transcript ?? "";
        if (result.isFinal) {
          this.handlers.onFinal(text.trim());
        } else {
          interim += text;
        }
      }
      if (interim) this.handlers.onInterim(interim.trim());
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        this.active = false; // permission denied — retrying won't help, stop the loop
      }
      this.handlers.onError(event.error);
    };

    recognition.onend = () => {
      this.handlers.onEnd();
      if (this.active) {
        // Browsers end recognition sessions on their own; restart seamlessly.
        setTimeout(() => this.spin(Ctor), 150);
      }
    };

    this.recognition = recognition;
    try {
      recognition.start();
    } catch {
      // start() throws if called while already started; safe to ignore.
    }
  }
}
