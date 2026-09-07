import type { HandPoint } from "@/types";

export const LANDMARK = {
  WRIST: 0,
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  INDEX_TIP: 8,
  MIDDLE_MCP: 9,
  MIDDLE_TIP: 12,
  RING_MCP: 13,
  RING_TIP: 16,
  PINKY_MCP: 17,
  PINKY_TIP: 20,
} as const;

export function palmCenter(lm: HandPoint[]): HandPoint {
  const ids = [
    LANDMARK.WRIST,
    LANDMARK.INDEX_MCP,
    LANDMARK.MIDDLE_MCP,
    LANDMARK.RING_MCP,
    LANDMARK.PINKY_MCP,
  ];
  const sum = ids.reduce(
    (acc, i) => ({ x: acc.x + lm[i].x, y: acc.y + lm[i].y, z: acc.z + lm[i].z }),
    { x: 0, y: 0, z: 0 }
  );
  return { x: sum.x / ids.length, y: sum.y / ids.length, z: sum.z / ids.length };
}

export function fingerExtension(lm: HandPoint[]): number {
  const center = palmCenter(lm);
  const tips = [
    LANDMARK.INDEX_TIP,
    LANDMARK.MIDDLE_TIP,
    LANDMARK.RING_TIP,
    LANDMARK.PINKY_TIP,
  ];
  const avgDist =
    tips.reduce((acc, i) => acc + Math.hypot(lm[i].x - center.x, lm[i].y - center.y), 0) /
    tips.length;
  return avgDist;
}

export function pinchDistance(lm: HandPoint[]): number {
  const a = lm[LANDMARK.THUMB_TIP];
  const b = lm[LANDMARK.INDEX_TIP];
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}
