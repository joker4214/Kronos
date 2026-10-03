"use client";

import { useState } from "react";
import type { HourlyTotal } from "@/data/types";

function formatHour(h: number) {
  const period = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}${period}`;
}

export default function HourlyChart({ data, avg }: { data: HourlyTotal[]; avg: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxAbsDelta = Math.max(1, ...data.map((d) => Math.abs(d.deltaVsAvg ?? 0)));
  const width = 1100;
  const height = 220;
  const barGap = 4;
  const barWidth = (width - barGap * 23) / 24;
  const midY = height / 2;
  const maxBarHeight = height / 2 - 24;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height + 40}`} width="100%" role="img" aria-label="Total engagement by hour, delta versus average">
        <line x1={0} y1={midY} x2={width} y2={midY} stroke="var(--gray-700)" strokeWidth={1} />
        {data.map((d, i) => {
          const x = i * (barWidth + barGap);
          const hasData = d.postCount > 0;
          const delta = d.deltaVsAvg ?? 0;
          const barH = hasData ? Math.max(6, (Math.abs(delta) / maxAbsDelta) * maxBarHeight) : 3;
          const isPositive = delta >= 0;
          const y = hasData ? (isPositive ? midY - barH : midY) : midY - 1.5;
          const fill = !hasData ? "var(--gray-700)" : isPositive ? "var(--accent-light)" : "var(--accent-orange)";

          return (
            <g
              key={d.hour}
              onMouseEnter={() => setHovered(d.hour)}
              onMouseLeave={() => setHovered(null)}
            >
              <rect x={x} y={0} width={barWidth} height={height} fill="transparent" />
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={Math.min(4, barWidth / 2)}
                fill={fill}
                opacity={hovered === null || hovered === d.hour ? 1 : 0.45}
              />
              <text
                x={x + barWidth / 2}
                y={height + 20}
                textAnchor="middle"
                fontSize="11"
                fill="var(--gray-400)"
              >
                {i % 2 === 0 ? formatHour(d.hour) : ""}
              </text>
            </g>
          );
        })}
      </svg>

      {hovered !== null && (
        <div className="absolute top-0 left-0 bg-[var(--surface)] border border-white/10 rounded px-3 py-2 text-xs pointer-events-none"
          style={{ transform: `translateX(${(hovered / 24) * 100}%)` }}
        >
          <div className="font-display font-bold">{formatHour(data[hovered].hour)}</div>
          <div className="text-[var(--gray-400)]">
            {data[hovered].postCount} post{data[hovered].postCount === 1 ? "" : "s"}
          </div>
          {data[hovered].postCount > 0 && (
            <div className={data[hovered].deltaVsAvg! >= 0 ? "text-[var(--accent-light)]" : "text-[var(--accent-orange)]"}>
              {data[hovered].engagement} engagement ({data[hovered].deltaVsAvg! >= 0 ? "+" : ""}
              {data[hovered].deltaVsAvg} vs avg)
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-5 mt-3 text-xs text-[var(--gray-400)]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "var(--accent-light)" }} />
          Above average ({avg.toFixed(2)} engagement/active hour)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "var(--accent-orange)" }} />
          Below average
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "var(--gray-700)" }} />
          No posts this hour
        </span>
      </div>
    </div>
  );
}
