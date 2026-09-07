export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const TAU = Math.PI * 2;

export function dist2D(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function angleOnRing(index: number, total: number, offset = 0) {
  return (index / total) * TAU + offset;
}

export function smoothDamp(current: number, target: number, smoothing: number, dt: number) {
  const t = 1 - Math.pow(1 - smoothing, dt * 60);
  return lerp(current, target, t);
}
