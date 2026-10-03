import type { Platform, PlatformSummary, Post } from "@/data/types";

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
};

const PLATFORM_ICON: Record<Platform, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.5c0-.3.2-.5.5-.5H15V8z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 4v10.5a2.5 2.5 0 1 1-2.5-2.5" />
      <path d="M14 4c.4 2 2 3.5 4 3.8" />
    </svg>
  ),
};

const CONTENT_TYPE_LABEL: Record<string, string> = {
  video: "Video",
  still: "Still",
  poster: "Poster",
};

function formatHour(h: number) {
  const period = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}${period}`;
}

export default function PlatformCard({
  platform,
  summary,
  posts,
}: {
  platform: Platform;
  summary: PlatformSummary;
  posts: Post[];
}) {
  const topPosts = posts.slice(0, 6);

  return (
    <div className="bg-[var(--surface)] border border-white/10 rounded-lg p-6 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="text-[var(--accent-light)]">{PLATFORM_ICON[platform]}</span>
          <h2 className="font-display font-bold text-lg">{PLATFORM_LABEL[platform]}</h2>
        </div>
        <span className="text-xs text-[var(--gray-400)]">{summary.postCount} posts</span>
      </div>

      <div className="flex gap-2 mb-5">
        {(["video", "still", "poster"] as const).map((ct) => {
          const count = summary.byContentType[ct] ?? 0;
          if (count === 0) return null;
          return (
            <div key={ct} className="flex-1 bg-white/[0.03] border border-white/10 rounded px-3 py-2 text-center">
              <div className="font-display font-bold text-lg">{count}</div>
              <div className="text-[10px] uppercase tracking-wide text-[var(--gray-400)]">
                {CONTENT_TYPE_LABEL[ct]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2.5">
        {topPosts.map((p) => (
          <div key={p.id} className="border-t border-white/5 pt-2.5 first:border-t-0 first:pt-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-white/[0.06] text-[var(--gray-400)]">
                {CONTENT_TYPE_LABEL[p.contentType]}
              </span>
              <span className="text-[11px] text-[var(--gray-400)] shrink-0">{formatHour(p.hourLocal)}</span>
            </div>
            <p className="text-sm text-[var(--gray-100)] line-clamp-1 mb-1.5">{p.text || "(no caption)"}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-[var(--gray-400)]">
              {p.displayMetrics.map((m) => (
                <span key={m.key}>
                  <span className="text-[var(--gray-100)] font-medium">{m.value}</span> {m.label}
                </span>
              ))}
            </div>
          </div>
        ))}
        {topPosts.length === 0 && (
          <p className="text-sm text-[var(--gray-400)]">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
