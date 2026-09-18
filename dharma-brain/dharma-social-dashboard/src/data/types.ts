export type ContentType = "video" | "still" | "poster";
export type Platform = "instagram" | "facebook" | "tiktok";

export type DisplayMetric = {
  key: string;
  label: string;
  value: number;
};

export type Post = {
  id: string;
  platform: Platform;
  sentAt: string;
  text: string;
  assetType: string | null;
  source: string | null;
  contentType: ContentType;
  hourLocal: number;
  engagement: number;
  displayMetrics: DisplayMetric[];
};

export type PlatformSummary = {
  postCount: number;
  engagement: number;
  byContentType: Partial<Record<ContentType, number>>;
};

export type HourlyTotal = {
  hour: number;
  postCount: number;
  engagement: number;
  deltaVsAvg: number | null;
};

export type DashboardData = {
  generatedAt: string;
  postCount: number;
  avgEngagementPerActiveHour: number;
  platformSummary: Record<Platform, PlatformSummary>;
  hourlyTotals: HourlyTotal[];
  posts: Post[];
};
