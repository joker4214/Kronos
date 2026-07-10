# Web Scraper — v1 checker + v2 local-business sourcing

## What it does

Takes a list of businesses (name + URL) and scores each site's homepage on the three signal groups you picked:

- **Technical** — SSL, load speed, mobile viewport tag, site reachability
- **Design** — stale copyright year, missing favicon (dated/neglected signals)
- **Visibility/SEO** — missing title, missing meta description, missing H1, no analytics/pixel, no clear CTA

A site is **flagged** as underperforming if it hits 3+ issues.

## Important: run this on your own computer, not in this session

This session's sandbox only has access to an allowlisted set of domains — it can't reach arbitrary business websites. The script itself is tested and works, but you'll need to run it locally where you have normal internet access.

## Setup (one-time, on your machine)

```
pip install requests beautifulsoup4
```

(`source_local_businesses.py` only uses Python's built-in libraries — nothing extra to install for that one.)

## How to run

### Option A — local businesses (now automated)

1. Run the sourcing script with a category and city:
   ```
   python3 source_local_businesses.py pet_store "Austin, TX" candidates.csv
   ```
   Known categories: `pet_store`, `restaurant`, `cafe`, `salon`, `gym`, `clothing_store`, `bakery`, `florist`, `bookstore`, `jewelry_store`, `furniture_store`, `dentist`, `plumber`. You can also pass a raw OpenStreetMap tag directly, e.g. `shop=pet`, if what you want isn't in that list.
2. This produces `candidates.csv` already in the right format — feed it straight into the checker:
   ```
   python3 scraper.py candidates.csv report.csv
   ```

This uses free, no-API-key public data (OpenStreetMap via Nominatim + Overpass), so it's a starting list, not exhaustive — it only finds businesses that have a website listed in OpenStreetMap.

### Option B — ecommerce/Shopify stores (still manual)

There's no free public API for "list of Shopify stores in a niche," so this side still needs a manual CSV: fill in `candidates_template.csv` yourself from store directories/roundup lists. Automating this would need a paid data source (e.g. BuiltWith, SimilarWeb) — worth considering later if this becomes the bottleneck.

3. Either way, open `report.csv` — sort by `flagged = YES` or by `score` (higher = more issues) to find your best outreach targets.

## Output columns

`ssl`, `load_time_s`, `mobile_viewport`, `copyright_year`, `has_analytics`, `has_meta_description`, `has_h1`, `has_cta`, `issues` (plain-English list), `score`, `flagged`.

## Next steps once this is proven out

- Move flagged prospects into `04 - Operations/CRM/Leads`
- If Shopify-side sourcing becomes the bottleneck, look at a paid data source to automate it too
- Could add a screenshot step or PageSpeed API call for a real performance score instead of the load-time proxy

*v1 checker built 2026-07-04. v2 local-business sourcing added 2026-07-04 — the Overpass/Nominatim calls couldn't be tested from this session's sandbox (no outside network access here either), so double check the first run works as expected on your machine.*
