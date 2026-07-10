#!/usr/bin/env python3
"""
Dharma's Web Scraper — v1: underperforming-site checker.

Takes a list of candidate businesses (name, url, category, city) and scores
each site's public homepage on three signal groups (per Jason's scoping call):
  - Technical   (SSL, load speed, mobile viewport tag, broken/missing homepage)
  - Design      (outdated-design heuristics: old copyright year, no favicon)
  - Visibility  (SEO/analytics: title, meta description, H1, analytics/pixel
                 tags, presence of a clear CTA)

This only reads public homepages (equivalent to what any visitor or a tool
like PageSpeed Insights sees) — no logins, no bypassing access controls.

Usage:
    python3 scraper.py candidates.csv report.csv

Input CSV columns required: name,url,category,city
Output CSV adds: ssl,load_time_s,mobile_viewport,copyright_year,has_analytics,
                  has_meta_description,has_h1,has_cta,issues,score,flagged

Run this on your own computer (needs normal internet access) — see README.md.
"""
import csv
import re
import sys
import time
from datetime import datetime
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

TIMEOUT = 10
USER_AGENT = "Mozilla/5.0 (compatible; DharmaSiteCheck/1.0; +https://dharmasemporium.com)"

CTA_WORDS = [
    "shop now", "buy now", "book now", "get started", "contact us",
    "learn more", "book a consult", "add to cart", "call now", "book an appointment",
    "schedule", "request a quote", "sign up", "subscribe",
]


def fetch(url):
    if not url.startswith("http"):
        url = "https://" + url
    start = time.time()
    try:
        resp = requests.get(url, timeout=TIMEOUT, headers={"User-Agent": USER_AGENT}, allow_redirects=True)
        elapsed = round(time.time() - start, 2)
        return resp, elapsed, None
    except requests.exceptions.RequestException as e:
        return None, None, str(e)


def check_site(name, url, category, city):
    row = {
        "name": name, "url": url, "category": category, "city": city,
        "ssl": "", "load_time_s": "", "mobile_viewport": "", "copyright_year": "",
        "has_analytics": "", "has_meta_description": "", "has_h1": "",
        "has_cta": "", "issues": "", "score": "", "flagged": "", "error": "",
    }

    resp, elapsed, err = fetch(url)
    if err:
        row["error"] = err
        row["issues"] = "site unreachable / broken"
        row["score"] = 0
        row["flagged"] = "YES"
        return row

    parsed = urlparse(resp.url)
    row["ssl"] = "yes" if parsed.scheme == "https" else "no"
    row["load_time_s"] = elapsed

    soup = BeautifulSoup(resp.text, "html.parser")
    issues = []

    # --- Technical ---
    if row["ssl"] == "no":
        issues.append("no SSL (http only)")
    if elapsed and elapsed > 3.0:
        issues.append(f"slow load ({elapsed}s)")

    viewport = soup.find("meta", attrs={"name": "viewport"})
    row["mobile_viewport"] = "yes" if viewport else "no"
    if not viewport:
        issues.append("no mobile viewport tag")

    # --- Design heuristics ---
    footer_text = " ".join(t.get_text(" ", strip=True) for t in soup.find_all(["footer"])) or resp.text[-3000:]
    year_match = re.search(r"(?:19|20)\d{2}", footer_text)
    current_year = datetime.now().year
    if year_match:
        yr = int(year_match.group(0))
        row["copyright_year"] = yr
        if current_year - yr >= 2:
            issues.append(f"stale copyright year ({yr})")
    favicon = soup.find("link", rel=lambda v: v and "icon" in v.lower()) if soup.find("link") else None
    if not favicon:
        issues.append("no favicon (polish signal)")

    # --- Visibility / SEO ---
    title = soup.find("title")
    if not title or not title.get_text(strip=True):
        issues.append("missing <title>")

    meta_desc = soup.find("meta", attrs={"name": "description"})
    row["has_meta_description"] = "yes" if meta_desc and meta_desc.get("content") else "no"
    if row["has_meta_description"] == "no":
        issues.append("no meta description")

    h1 = soup.find("h1")
    row["has_h1"] = "yes" if h1 else "no"
    if not h1:
        issues.append("no H1")

    page_lower = resp.text.lower()
    analytics_hit = any(tag in page_lower for tag in [
        "googletagmanager.com", "google-analytics.com", "gtag(", "connect.facebook.net", "fbq("
    ])
    row["has_analytics"] = "yes" if analytics_hit else "no"
    if not analytics_hit:
        issues.append("no analytics/pixel detected")

    cta_hit = any(word in page_lower for word in CTA_WORDS)
    row["has_cta"] = "yes" if cta_hit else "no"
    if not cta_hit:
        issues.append("no clear CTA text found")

    row["issues"] = "; ".join(issues)
    row["score"] = len(issues)
    row["flagged"] = "YES" if len(issues) >= 3 else "no"
    return row


def main():
    if len(sys.argv) != 3:
        print("Usage: python3 scraper.py candidates.csv report.csv")
        sys.exit(1)

    in_path, out_path = sys.argv[1], sys.argv[2]
    with open(in_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        candidates = list(reader)

    results = []
    for c in candidates:
        print(f"Checking {c.get('name')} — {c.get('url')} ...")
        results.append(check_site(c.get("name", ""), c.get("url", ""), c.get("category", ""), c.get("city", "")))

    fieldnames = list(results[0].keys()) if results else []
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    flagged = sum(1 for r in results if r["flagged"] == "YES")
    print(f"\nDone. {flagged}/{len(results)} flagged as underperforming. Report: {out_path}")


if __name__ == "__main__":
    main()
