"use client";

import { SystemStatus } from "./SystemStatus";
import { ClockDate } from "./ClockDate";
import { GestureIndicator } from "./GestureIndicator";
import { SystemLog } from "./SystemLog";

export function HUD() {
  return (
    <div className="pointer-events-none fixed inset-0 p-6 flex flex-col justify-between z-20">
      <div className="flex items-start justify-between">
        <SystemStatus />
        <ClockDate />
      </div>
      <div className="flex items-end justify-between">
        <SystemLog />
        <GestureIndicator />
      </div>
    </div>
  );
}
