"use client";

import { useEffect, useRef } from "react";
import { useVoiceStore } from "@/stores/useVoiceStore";
import { useSystemStore } from "@/stores/useSystemStore";
import { useCardStore } from "@/stores/useCardStore";
import { useGestureStore } from "@/stores/useGestureStore";
import { playGestureChime } from "@/audio/AudioEngine";
import {
  ContinuousRecognizer,
  isSpeechRecognitionSupported,
} from "@/voice/speechRecognition";
import { cancelSpeech, isTTSSupported, speak } from "@/voice/tts";
import { containsWakeWord, parseCommand, stripWakeWord } from "@/voice/commandEngine";
import { CARD_DEFINITIONS } from "@/lib/cardData";

const SENTENCE_BOUNDARY = /(?<=[.!?])\s+/;

export function useVoiceAssistant() {
  const recognizerRef = useRef<ContinuousRecognizer | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const awakeRef = useRef(false);

  useEffect(() => {
    const { setStatus, setSupported, setInterim, reset, pushMessage, appendStreamingText, setStreamingText } =
      useVoiceStore.getState();
    const { pushLog } = useSystemStore.getState();

    const supported = isSpeechRecognitionSupported() && isTTSSupported();
    setSupported(supported);
    if (!supported) {
      setStatus("offline");
      pushLog("VOICE ASSISTANT OFFLINE — BROWSER LACKS SPEECH SUPPORT", "warn");
      return;
    }

    setStatus("idle");

    async function respondToQuery(query: string) {
      setStatus("thinking");
      pushMessage("user", query);
      setStreamingText("");

      const controller = new AbortController();
      abortRef.current = controller;

      const history = useVoiceStore
        .getState()
        .messages.slice(0, -1)
        .map((m) => ({ role: m.role, text: m.text }));

      let fullText = "";
      let spokenUpTo = 0;
      let firstChunk = true;

      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: query,
            history,
            currentModule: useCardStore.getState().expandedId,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Assistant request failed (${res.status})`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;

          if (firstChunk) {
            firstChunk = false;
            setStatus("streaming");
          }
          fullText += chunk;
          appendStreamingText(chunk);

          // Speak completed sentences as they arrive so speech begins
          // before the full response has finished streaming.
          const unspoken = fullText.slice(spokenUpTo);
          const sentences = unspoken.split(SENTENCE_BOUNDARY);
          if (sentences.length > 1) {
            const complete = sentences.slice(0, -1).join(" ");
            spokenUpTo += complete.length + 1;
            setStatus("speaking");
            await speak(complete);
          }
        }

        const remainder = fullText.slice(spokenUpTo).trim();
        if (remainder) {
          setStatus("speaking");
          await speak(remainder);
        }

        if (fullText.trim()) {
          pushMessage("assistant", fullText.trim());
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          pushLog("ASSISTANT REQUEST FAILED", "error");
          setStatus("speaking");
          await speak("Something went wrong reaching Gemini.");
        }
      } finally {
        abortRef.current = null;
        awakeRef.current = false;
        reset();
        setStatus("idle");
      }
    }

    function wake() {
      if (awakeRef.current) return;
      awakeRef.current = true;
      playGestureChime("select");
      pushLog("WAKE PHRASE DETECTED — LISTENING", "info");
      setStatus("listening");
    }

    async function handleFinal(rawText: string) {
      const state = useVoiceStore.getState();

      // Barge-in: if NEXUS was mid-response, the user talking over it means
      // "stop and listen to this instead."
      if (state.status === "speaking" || state.status === "streaming" || state.status === "thinking") {
        cancelSpeech();
        abortRef.current?.abort();
        setStatus("interrupted");
        pushLog("INTERRUPTED BY USER", "warn");
        awakeRef.current = true;
      }

      const hasWake = containsWakeWord(rawText);
      if (!awakeRef.current && !hasWake) return; // ignore ambient chatter

      wake();
      const text = hasWake ? stripWakeWord(rawText) : rawText.trim();
      setInterim("");
      if (!text) return; // "nexus" said alone — just stay awake and listening

      const command = parseCommand(text);
      switch (command.type) {
        case "module": {
          const def = CARD_DEFINITIONS.find((c) => c.id === command.id);
          useCardStore.getState().expand(command.id);
          setStatus("speaking");
          await speak(`Opening ${def?.label.toLowerCase() ?? command.id}.`);
          awakeRef.current = false;
          setStatus("idle");
          return;
        }
        case "rotate": {
          useCardStore.getState().rotateBy(command.dir === "left" ? -1.05 : 1.05);
          playGestureChime("confirm");
          awakeRef.current = false;
          setStatus("idle");
          return;
        }
        case "search_youtube": {
          setStatus("speaking");
          await speak(`Searching YouTube for ${command.query}.`);
          if (typeof window !== "undefined") {
            window.open(
              `https://www.youtube.com/results?search_query=${encodeURIComponent(command.query)}`,
              "_blank",
              "noopener,noreferrer"
            );
          }
          awakeRef.current = false;
          setStatus("idle");
          return;
        }
        default:
          await respondToQuery(text);
      }
    }

    const recognizer = new ContinuousRecognizer({
      onInterim: (text) => setInterim(text),
      onSpeechStart: () => {
        const status = useVoiceStore.getState().status;
        if (status === "speaking" || status === "streaming") {
          cancelSpeech();
          abortRef.current?.abort();
          setStatus("interrupted");
        }
      },
      onFinal: (text) => void handleFinal(text),
      onEnd: () => {},
      onError: (message) => {
        pushLog(`VOICE ERROR — ${message.toUpperCase()}`, "error");
        if (message === "not-allowed" || message === "service-not-allowed") {
          setStatus("offline");
          pushLog("MICROPHONE PERMISSION DENIED — VOICE OFFLINE", "warn");
        }
      },
    });

    recognizerRef.current = recognizer;
    recognizer.start();
    pushLog("VOICE ASSISTANT ONLINE — SAY \"NEXUS\" OR CIRCLE TO WAKE", "info");

    return () => {
      recognizer.stop();
      cancelSpeech();
      abortRef.current?.abort();
    };
  }, []);

  // Circle hand gesture is an alternate wake trigger alongside the wake word.
  useEffect(() => {
    let lastGesture = "none";
    const unsubscribe = useGestureStore.subscribe((state) => {
      if (state.currentGesture === "circle" && lastGesture !== "circle") {
        const voiceState = useVoiceStore.getState();
        if (voiceState.status === "idle" && !awakeRef.current) {
          awakeRef.current = true;
          playGestureChime("select");
          useSystemStore.getState().pushLog("WAKE GESTURE DETECTED — LISTENING", "info");
          voiceState.setStatus("listening");
        }
      }
      lastGesture = state.currentGesture;
    });
    return unsubscribe;
  }, []);
}
