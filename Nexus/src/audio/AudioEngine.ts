"use client";

let ctx: AudioContext | null = null;
let padGain: GainNode | null = null;
let started = false;

function getCtx() {
  if (!ctx && typeof window !== "undefined") {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return ctx;
}

export function startAmbientPad() {
  const c = getCtx();
  if (!c || started) return;
  started = true;

  padGain = c.createGain();
  padGain.gain.value = 0;
  padGain.connect(c.destination);
  padGain.gain.linearRampToValueAtTime(0.045, c.currentTime + 3);

  const freqs = [65.4, 98.0, 130.8, 164.8];
  freqs.forEach((f, i) => {
    const osc = c.createOscillator();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = f;

    const lfo = c.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.02;
    const lfoGain = c.createGain();
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    const gain = c.createGain();
    gain.gain.value = 1 / freqs.length;
    osc.connect(gain);
    gain.connect(padGain!);
    osc.start();
  });
}

export function playGestureChime(kind: "confirm" | "select" | "release" = "confirm") {
  const c = getCtx();
  if (!c) return;
  const freq = kind === "select" ? 880 : kind === "release" ? 440 : 660;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.value = 0.0001;
  osc.connect(gain);
  gain.connect(c.destination);
  const now = c.currentTime;
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
  osc.start(now);
  osc.stop(now + 0.3);
}
