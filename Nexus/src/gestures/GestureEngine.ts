import type { GestureEvent, GestureType, HandFrame, HandPoint } from "@/types";
import { fingerExtension, palmCenter, pinchDistance } from "./gestureTypes";

const PINCH_ON = 0.055;
const PINCH_OFF = 0.08;
const OPEN_THRESHOLD = 0.22;
const CLOSED_THRESHOLD = 0.14;
const SWIPE_VELOCITY = 1.4;
const SWIPE_COOLDOWN_MS = 550;
const STILL_VARIANCE = 0.0025;
const STILL_HOLD_MS = 550;
const DEPTH_VELOCITY = 0.9;
const CIRCLE_ANGLE_THRESHOLD = Math.PI * 1.6;

interface HistoryPoint extends HandPoint {
  t: number;
}

export class GestureEngine {
  private history: HistoryPoint[] = [];
  private wasPinching = false;
  private lastSwipeAt = 0;
  private stillSince: number | null = null;
  private circleAngleAccum = 0;
  private circleLast: { x: number; y: number } | null = null;

  reset() {
    this.history = [];
    this.wasPinching = false;
    this.stillSince = null;
    this.circleAngleAccum = 0;
    this.circleLast = null;
  }

  process(hand: HandFrame | null, now: number): GestureEvent {
    if (!hand) {
      this.reset();
      return { type: "none", confidence: 0, hand: null };
    }

    const lm = hand.landmarks;
    const center = palmCenter(lm);
    this.history.push({ ...center, t: now });
    if (this.history.length > 12) this.history.shift();

    const velocity = this.computeVelocity();
    const extension = fingerExtension(lm);
    const pinchDist = pinchDistance(lm);
    const isPinching = this.wasPinching ? pinchDist > PINCH_OFF : pinchDist < PINCH_ON;
    const pinchTriggered = isPinching && !this.wasPinching;
    const pinchReleased = !isPinching && this.wasPinching;
    this.wasPinching = isPinching;

    if (pinchTriggered) {
      return { type: "pinch", confidence: 1 - pinchDist / PINCH_ON, hand, velocity };
    }
    if (pinchReleased) {
      return { type: "pinch_release", confidence: 0.9, hand, velocity };
    }
    if (isPinching) {
      return { type: "pinch", confidence: 0.8, hand, velocity };
    }

    const speed = Math.hypot(velocity.x, velocity.y);
    const canSwipe = now - this.lastSwipeAt > SWIPE_COOLDOWN_MS;
    if (canSwipe && speed > SWIPE_VELOCITY && extension > CLOSED_THRESHOLD) {
      this.lastSwipeAt = now;
      const type: GestureType = velocity.x > 0 ? "swipe_right" : "swipe_left";
      return { type, confidence: Math.min(1, speed / 3), hand, velocity };
    }

    if (Math.abs(velocity.z) > DEPTH_VELOCITY) {
      return {
        type: velocity.z < 0 ? "pull" : "push",
        confidence: Math.min(1, Math.abs(velocity.z) / 2),
        hand,
        velocity,
      };
    }

    const circleGesture = this.detectCircle(lm[8]);
    if (circleGesture) {
      return { type: "circle", confidence: 0.85, hand, velocity };
    }

    if (extension < CLOSED_THRESHOLD) {
      this.trackStillness(speed, now);
      return { type: "closed_hand", confidence: 0.7, hand, velocity };
    }

    if (extension > OPEN_THRESHOLD) {
      const stillLongEnough = this.trackStillness(speed, now);
      if (stillLongEnough) {
        return { type: "palm_hold", confidence: 0.9, hand, velocity };
      }
      return { type: "open_hand", confidence: 0.75, hand, velocity };
    }

    return { type: "none", confidence: 0.3, hand, velocity };
  }

  private computeVelocity() {
    if (this.history.length < 2) return { x: 0, y: 0, z: 0 };
    const a = this.history[this.history.length - 2];
    const b = this.history[this.history.length - 1];
    const dt = Math.max(1, b.t - a.t) / 1000;
    return { x: (b.x - a.x) / dt, y: (b.y - a.y) / dt, z: (b.z - a.z) / dt };
  }

  private trackStillness(speed: number, now: number) {
    if (speed < STILL_VARIANCE * 20) {
      if (this.stillSince === null) this.stillSince = now;
      return now - this.stillSince > STILL_HOLD_MS;
    }
    this.stillSince = null;
    return false;
  }

  private detectCircle(tip: HandPoint) {
    if (!this.circleLast) {
      this.circleLast = { x: tip.x, y: tip.y };
      return false;
    }
    const dx = tip.x - this.circleLast.x;
    const dy = tip.y - this.circleLast.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0.005) {
      const angle = Math.atan2(dy, dx);
      this.circleAngleAccum += angle;
      this.circleLast = { x: tip.x, y: tip.y };
    }
    if (Math.abs(this.circleAngleAccum) > CIRCLE_ANGLE_THRESHOLD) {
      this.circleAngleAccum = 0;
      return true;
    }
    return false;
  }
}
