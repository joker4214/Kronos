"use client";

import { useMemo } from "react";
import { useVoiceStore } from "@/stores/useVoiceStore";
import type { VoiceStatus } from "@/types";

const STATUS_LABEL: Record<VoiceStatus, string> = {
  offline: "OFFLINE",
  idle: "IDLE",
  listening: "LISTENING",
  thinking: "THINKING",
  streaming: "STREAMING",
  speaking: "SPEAKING",
  interrupted: "INTERRUPTED",
};

const STATUS_COLOR: Record<VoiceStatus, string> = {
  offline: "#5a6472",
  idle: "#5ec8ff",
  listening: "#67f0c2",
  thinking: "#ffb85e",
  streaming: "#ffb85e",
  speaking: "#5ec8ff",
  interrupted: "#ff6e6e",
};

const AWAKE_STATUSES: VoiceStatus[] = [
  "listening",
  "thinking",
  "streaming",
  "speaking",
  "interrupted",
];

function AssembledText({ text }: { text: string }) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="nexus-word mr-[0.35em]"
          style={{ animationDelay: `${Math.min(i, 40) * 18}ms` }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export function VoiceHUD() {
  const status = useVoiceStore((s) => s.status);
  const interim = useVoiceStore((s) => s.interimTranscript);
  const streamingText = useVoiceStore((s) => s.streamingText);
  const awake = AWAKE_STATUSES.includes(status);
  const color = STATUS_COLOR[status];

  return (
    <>
      {/* Global wake glow */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-700"
        style={{
          opacity: awake ? 1 : 0,
          background: `radial-gradient(ellipse at center, ${color}22 0%, transparent 65%)`,
        }}
      />
      {awake && (
        <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
          <div
            className="nexus-wake-ring h-[38vmin] w-[38vmin] rounded-full border"
            style={{ borderColor: `${color}88` }}
          />
          <div
            className="nexus-wake-ring h-[38vmin] w-[38vmin] rounded-full border absolute"
            style={{ borderColor: `${color}55`, animationDelay: "0.8s" }}
          />
        </div>
      )}

      {/* Floating holographic response text — replaces chat bubbles */}
      {streamingText && (
        <div className="pointer-events-none fixed inset-x-0 top-[18%] z-20 flex justify-center px-10">
          <p
            className="max-w-3xl text-center font-mono text-lg leading-relaxed tracking-wide"
            style={{ color, textShadow: `0 0 18px ${color}99` }}
          >
            <AssembledText text={streamingText} />
          </p>
        </div>
      )}

      {/* Status pill + live caption */}
      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2">
        <div
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] backdrop-blur-sm"
          style={{ color }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px 2px ${color}aa` }}
          />
          NEXUS · {STATUS_LABEL[status]}
        </div>
        {status === "listening" && interim && (
          <div className="max-w-xl truncate rounded-md bg-black/30 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur-sm">
            {interim}
          </div>
        )}
      </div>
    </>
  );
}
