"""
Transforms a raw Buffer posts export (list of {id, platform, sentAt, text,
assetType, source, metrics}) into the aggregated dataset the dashboard reads.

Usage: python transform.py <raw_posts.json> <output/dashboard-data.json>

The raw input is produced each refresh cycle by pulling every sent post via
the Buffer MCP tools (list_posts with includeMetrics=true), since Buffer's
API is only reachable through that MCP session, not from this script directly.
"""
import json
import sys
from collections import defaultdict
from datetime import datetime, timezone

LOCAL_OFFSET_HOURS = -4  # America/Detroit, EDT. Flip to -5 when DST ends.


def classify_content_type(post):
    if post.get("assetType") == "video":
        return "video"
    src = (post.get("source") or "").lower()
    if "ded-post" in src or "dharma-marketing-assets" in src or "founder.jpg" in src:
        return "poster"
    return "still"


def local_hour(sent_at_iso):
    dt = datetime.fromisoformat(sent_at_iso.replace("Z", "+00:00"))
    return (dt.hour + LOCAL_OFFSET_HOURS) % 24


PLATFORM_METRIC_FIELDS = {
    "instagram": ["reach", "views", "saves", "reactions", "comments", "shares", "engagementRate"],
    "facebook": ["impressions", "clicks", "reactions", "comments", "shares", "engagementRate"],
    "tiktok": ["reach", "views", "reactions", "comments", "shares", "engagementRate", "averageTimeWatched"],
}

METRIC_LABELS = {
    "reach": "Reach",
    "views": "Views",
    "saves": "Saves",
    "reactions": "Likes",
    "comments": "Comments",
    "shares": "Shares",
    "impressions": "Impressions",
    "clicks": "Clicks",
    "engagementRate": "Eng. Rate",
    "averageTimeWatched": "Avg Watch (s)",
}


def engagement_score(metrics):
    """Composite cross-platform interaction total for the hourly totals chart."""
    return (
        (metrics.get("reactions") or 0)
        + (metrics.get("comments") or 0)
        + (metrics.get("shares") or 0)
        + (metrics.get("saves") or 0)
        + (metrics.get("clicks") or 0)
    )


def main():
    raw_path, out_path = sys.argv[1], sys.argv[2]
    with open(raw_path, encoding="utf-8") as f:
        posts = json.load(f)

    for p in posts:
        p["contentType"] = classify_content_type(p)
        p["hourLocal"] = local_hour(p["sentAt"])
        p["engagement"] = engagement_score(p.get("metrics") or {})
        fields = PLATFORM_METRIC_FIELDS.get(p["platform"], [])
        p["displayMetrics"] = [
            {"key": k, "label": METRIC_LABELS[k], "value": (p.get("metrics") or {}).get(k)}
            for k in fields
            if (p.get("metrics") or {}).get(k) is not None
        ]

    # --- platform summary ---
    platform_summary = defaultdict(lambda: {"postCount": 0, "engagement": 0, "byContentType": defaultdict(int)})
    for p in posts:
        s = platform_summary[p["platform"]]
        s["postCount"] += 1
        s["engagement"] += p["engagement"]
        s["byContentType"][p["contentType"]] += 1

    platform_summary = {
        k: {
            "postCount": v["postCount"],
            "engagement": v["engagement"],
            "byContentType": dict(v["byContentType"]),
        }
        for k, v in platform_summary.items()
    }

    # --- hourly totals (all platforms combined) ---
    hourly = defaultdict(lambda: {"postCount": 0, "engagement": 0})
    for p in posts:
        h = hourly[p["hourLocal"]]
        h["postCount"] += 1
        h["engagement"] += p["engagement"]

    hours_with_data = [h for h in hourly if hourly[h]["postCount"] > 0]
    avg_engagement = (
        sum(hourly[h]["engagement"] for h in hours_with_data) / len(hours_with_data)
        if hours_with_data
        else 0
    )

    hourly_totals = []
    for h in range(24):
        entry = hourly.get(h, {"postCount": 0, "engagement": 0})
        delta = entry["engagement"] - avg_engagement if entry["postCount"] > 0 else None
        hourly_totals.append(
            {
                "hour": h,
                "postCount": entry["postCount"],
                "engagement": entry["engagement"],
                "deltaVsAvg": round(delta, 2) if delta is not None else None,
            }
        )

    # sort posts newest first for the per-platform lists
    posts_sorted = sorted(posts, key=lambda p: p["sentAt"], reverse=True)

    output = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "postCount": len(posts),
        "avgEngagementPerActiveHour": round(avg_engagement, 2),
        "platformSummary": platform_summary,
        "hourlyTotals": hourly_totals,
        "posts": posts_sorted,
    }

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    print(f"Wrote {len(posts)} posts -> {out_path}")


if __name__ == "__main__":
    main()
