"use client";

import { useEffect, useRef } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { GestureEngine } from "@/gestures/GestureEngine";
import { useGestureStore } from "@/stores/useGestureStore";
import { useSystemStore } from "@/stores/useSystemStore";
import type { GestureEvent, HandFrame } from "@/types";

const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export function useHandTracking(onGesture: (event: GestureEvent) => void) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const engineRef = useRef(new GestureEngine());
  const rafRef = useRef<number | null>(null);
  const onGestureRef = useRef(onGesture);
  onGestureRef.current = onGesture;

  useEffect(() => {
    let cancelled = false;
    let landmarker: HandLandmarker | null = null;
    let stream: MediaStream | null = null;

    const { setTracking, pushLog } = useSystemStore.getState();

    async function init() {
      try {
        const vision = await FilesetResolver.forVisionTasks(WASM_URL);
        landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.6,
          minHandPresenceConfidence: 0.6,
          minTrackingConfidence: 0.6,
        });

        if (cancelled) return;

        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        const video = document.createElement("video");
        video.srcObject = stream;
        video.playsInline = true;
        video.muted = true;
        await video.play();
        videoRef.current = video;

        setTracking(true, true);
        pushLog("HAND TRACKING ONLINE", "info");

        let lastFrameTime = performance.now();

        const loop = () => {
          if (cancelled || !landmarker || !videoRef.current) return;
          const now = performance.now();

          if (video.readyState >= 2) {
            const result = landmarker.detectForVideo(video, now);
            let hand: HandFrame | null = null;
            if (result.landmarks && result.landmarks.length > 0) {
              hand = {
                landmarks: result.landmarks[0].map((p) => ({ x: p.x, y: p.y, z: p.z })),
                handedness:
                  (result.handedness[0]?.[0]?.categoryName as HandFrame["handedness"]) ??
                  "Unknown",
                timestamp: now,
              };
            }
            const event = engineRef.current.process(hand, now);
            onGestureRef.current(event);
          }

          lastFrameTime = now;
          rafRef.current = requestAnimationFrame(loop);
        };
        loop();
        void lastFrameTime;
      } catch (err) {
        console.error("Hand tracking init failed", err);
        setTracking(false, false);
        pushLog("HAND TRACKING UNAVAILABLE — MOUSE FALLBACK ACTIVE", "warn");
      }
    }

    init();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      landmarker?.close();
      stream?.getTracks().forEach((t) => t.stop());
      setTracking(false, false);
    };
  }, []);

  return videoRef;
}

export function bindGestureToStore(event: GestureEvent) {
  useGestureStore.getState().set({
    currentGesture: event.type,
    confidence: event.confidence,
    hand: event.hand,
    pinching: event.type === "pinch",
    frozen: event.type === "palm_hold",
  });
}
