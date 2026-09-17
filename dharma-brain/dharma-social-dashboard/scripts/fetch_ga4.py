"""
Pulls site-wide traffic (sessions, pageviews) by hour-of-day from the GA4
Data API and writes it as a standalone JSON file for transform.py to merge.

This is a manual/in-session step for now, not part of the automated daily
refresh -- the refresh runs in an isolated cloud session that can't see the
service account key sitting on this machine. Re-run by hand until a
permanent home for the credential is decided.

Usage: python fetch_ga4.py <credentials.json> <property_id> <output.json> [days]
"""
import json
import sys

from google.oauth2 import service_account
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Dimension, Metric


def main():
    creds_path, property_id, out_path = sys.argv[1], sys.argv[2], sys.argv[3]
    days = int(sys.argv[4]) if len(sys.argv) > 4 else 30

    creds = service_account.Credentials.from_service_account_file(
        creds_path, scopes=["https://www.googleapis.com/auth/analytics.readonly"]
    )
    client = BetaAnalyticsDataClient(credentials=creds)

    req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        dimensions=[Dimension(name="hour")],
        metrics=[Metric(name="sessions"), Metric(name="screenPageViews")],
    )
    resp = client.run_report(req)

    by_hour = {h: {"sessions": 0, "pageviews": 0} for h in range(24)}
    for row in resp.rows:
        h = int(row.dimension_values[0].value)
        by_hour[h]["sessions"] += int(row.metric_values[0].value)
        by_hour[h]["pageviews"] += int(row.metric_values[1].value)

    hours_with_data = [h for h in by_hour if by_hour[h]["sessions"] > 0]
    avg_sessions = (
        sum(by_hour[h]["sessions"] for h in hours_with_data) / len(hours_with_data)
        if hours_with_data
        else 0
    )

    hourly = []
    for h in range(24):
        sessions = by_hour[h]["sessions"]
        pageviews = by_hour[h]["pageviews"]
        has_data = sessions > 0
        delta = round(sessions - avg_sessions, 2) if has_data else None
        hourly.append(
            {
                "hour": h,
                "sessions": sessions,
                "pageviews": pageviews,
                "deltaVsAvg": delta,
            }
        )

    output = {
        "propertyId": property_id,
        "dateRangeDays": days,
        "avgSessionsPerActiveHour": round(avg_sessions, 2),
        "hourly": hourly,
    }

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    total_sessions = sum(h["sessions"] for h in hourly)
    print(f"Wrote GA4 traffic ({total_sessions} sessions over last {days}d) -> {out_path}")


if __name__ == "__main__":
    main()
