import dashboardData from "@/data/dashboard-data.json";
import type { DashboardData, Platform } from "@/data/types";
import HourlyChart from "./HourlyChart";
import PlatformCard from "./PlatformCard";

const data = dashboardData as unknown as DashboardData;

const PLATFORMS: Platform[] = ["instagram", "facebook", "tiktok"];

function formatGeneratedAt(iso: string) {
  const dt = new Date(iso);
  return dt.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Detroit",
    timeZoneName: "short",
  });
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 bg-[var(--accent)] rounded flex items-center justify-center font-display font-bold text-lg shadow-[0_0_20px_rgba(47,95,255,0.5)]">
          D
        </div>
        <h1 className="font-display font-bold text-2xl">Social Performance Dashboard</h1>
      </div>
      <p className="text-sm text-[var(--gray-400)] mb-8">
        {data.postCount} sent posts across Instagram, Facebook &amp; TikTok · Last refreshed {formatGeneratedAt(data.generatedAt)} (America/Detroit) ·{" "}
        <a href="https://buffer.com" className="underline hover:text-[var(--accent-light)]">
          Buffer analytics
        </a>
      </p>

      <div className="bg-[var(--surface)] border border-white/10 rounded-lg p-6 mb-8">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="font-display font-bold text-lg">Total Engagement by Hour of Day</h2>
        </div>
        <p className="text-xs text-[var(--gray-400)] mb-4">
          Reactions + comments + shares + saves + clicks, combined across all platforms, shown as delta versus the
          average active hour.
        </p>
        <HourlyChart data={data.hourlyTotals} avg={data.avgEngagementPerActiveHour} />
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform}
            platform={platform}
            summary={data.platformSummary[platform]}
            posts={data.posts.filter((p) => p.platform === platform)}
          />
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-white/10 text-xs text-[var(--gray-400)] space-y-1.5">
        <p>
          <strong className="text-[var(--gray-100)]">Metric availability differs by platform</strong> — this is a
          Buffer/platform limitation, not a display choice. Instagram reports Saves but not Clicks. Facebook reports
          Clicks &amp; Impressions but not Saves. TikTok reports neither Clicks nor Saves natively.
        </p>
        <p>
          <strong className="text-[var(--gray-100)]">Content type</strong> is classified automatically: Video from
          the post&apos;s asset type; Poster vs. Still is a best-effort heuristic based on source (branded graphics
          vs. plain photos) pending a proper tagging convention on new posts.
        </p>
        <p>Refreshes automatically. Pulled from real Buffer post history back to {new Date(Math.min(...data.posts.map(p => new Date(p.sentAt).getTime()))).toLocaleDateString()}.</p>
      </div>
    </div>
  );
}
