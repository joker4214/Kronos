"use client";

import { useEffect, useRef } from "react";
import { Scene } from "@/components/scene/Scene";
import { HUD } from "@/components/hud/HUD";
import { useHandTracking, bindGestureToStore } from "@/hooks/useHandTracking";
import { useSystemStore } from "@/stores/useSystemStore";
import { startAmbientPad } from "@/audio/AudioEngine";
import type { GestureEvent } from "@/types";

function detectGpu(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return "UNKNOWN";
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    if (!info) return "WEBGL";
    const renderer = gl.getParameter(info.UNMASKED_RENDERER_WEBGL) as string;
    return renderer.split("(")[0].trim().toUpperCase().slice(0, 28) || "WEBGL";
  } catch {
    return "UNKNOWN";
  }
}

export function NexusApp() {
  const audioStarted = useRef(false);
  const setGpu = useSystemStore((s) => s.setGpu);
  const pushLog = useSystemStore((s) => s.pushLog);

  useHandTracking((event: GestureEvent) => bindGestureToStore(event));

  useEffect(() => {
    setGpu(detectGpu());
    pushLog("NEXUS OS INITIALIZED", "info");
    pushLog("REQUESTING CAMERA ACCESS…", "info");
  }, [setGpu, pushLog]);

  const handleFirstInteract = () => {
    if (audioStarted.current) return;
    audioStarted.current = true;
    startAmbientPad();
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black"
      onPointerDown={handleFirstInteract}
    >
      <Scene />
      <HUD />
    </div>
  );
}
