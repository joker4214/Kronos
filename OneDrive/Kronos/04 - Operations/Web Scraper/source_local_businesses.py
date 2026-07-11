#!/usr/bin/env python3
"""
Dharma's Web Scraper — local business sourcing (v2, local-business half only).

Automatically finds local businesses in a category + city using free, public,
no-API-key sources: Nominatim (geocoding) and Overpass API (OpenStreetMap
business data). Outputs a CSV in the exact format scraper.py expects, so you
can run the two scripts back-to-back:

    python3 source_local_businesses.py pet_store "Austin, TX" candidates.csv
    python3 scraper.py candidates.csv report.csv

Only businesses with a website listed in OpenStreetMap are included, since
the checker needs a URL to visit. This will miss businesses that have a
website OSM just doesn't know about — it's a starting list, not exhaustive.

Run this on your own computer (needs normal internet access) — same as
scraper.py, this session's sandbox can't reach outside sites.

Note on scope: this covers LOCAL BUSINESSES only. There's no free public API
for "list of Shopify stores in a niche" — that side of sourcing (ecommerce
stores) still needs to be manual for now (see README.md for how), or would
need a paid data source (e.g. BuiltWith, SimilarWeb) if you want to automate
it later.
"""
import csv
import sys
import time
import urllib.parse
import urllib.request
import json

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
OVERPASS_URL = "https://overpass-api.de/api/interpreter"
USER_AGENT = "Mozilla/5.0 (compatible; DharmaLeadSourcing/1.0; +https://dharmasemporium.com)"

# Common category -> OSM tag mapping. Pass a raw "key=value" (e.g. "shop=pet")
# directly as the category argument if yours isn't listed here.
CATEGORY_MAP = {
    "pet_store": "shop=pet",
    "restaurant": "amenity=restaurant",
    "cafe": "amenity=cafe",
    "salon": "shop=hairdresser",
    "gym": "leisure=fitness_centre",
    "clothing_store": "shop=clothes",
    "bakery": "shop=bakery",
    "florist": "shop=florist",
    "bookstore": "shop=books",
    "jewelry_store": "shop=jewelry",
    "furniture_store": "shop=furniture",
    "dentist": "amenity=dentist",
    "plumber": "craft=plumber",
}


def geocode_city(city):
    params = urllib.parse.urlencode({"q": city, "format": "json", "limit": 1})
    req = urllib.request.Request(f"{NOMINATIM_URL}?{params}", headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    if not data:
        raise ValueError(f"Could not geocode city: {city}")
    d = data[0]
    # boundingbox is [south, north, west, east] as strings
    south, north, west, east = [float(x) for x in d["boundingbox"]]
    return south, west, north, east  # (min_lat, min_lon, max_lat, max_lon) for Overpass bbox


def query_overpass(tag, bbox):
    key, _, value = tag.partition("=")
    south, west, north, east = bbox
    query = f"""
    [out:json][timeout:25];
    (
      node["{key}"="{value}"]({south},{west},{north},{east});
      way["{key}"="{value}"]({south},{west},{north},{east});
    );
    out center tags;
    """
    data = urllib.parse.urlencode({"data": query}).encode("utf-8")
    req = urllib.request.Request(OVERPASS_URL, data=data, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def extract_rows(elements, category, city):
    rows = []
    seen = set()
    for el in elements:
        tags = el.get("tags", {})
        website = tags.get("website") or tags.get("contact:website")
        name = tags.get("name")
        if not website or not name:
            continue
        if website in seen:
            continue
        seen.add(website)
        rows.append({"name": name, "url": website, "category": category, "city": city})
    return rows


def main():
    if len(sys.argv) != 4:
        print("Usage: python3 source_local_businesses.py <category> <city> <output_csv>")
        print(f"Known categories: {', '.join(CATEGORY_MAP)}")
        print("Or pass a raw OSM tag like 'shop=pet' directly as the category.")
        sys.exit(1)

    category_arg, city, out_path = sys.argv[1], sys.argv[2], sys.argv[3]
    tag = CATEGORY_MAP.get(category_arg, category_arg)
    if "=" not in tag:
        print(f"Unknown category '{category_arg}' and not a raw OSM tag (expected key=value).")
        print(f"Known categories: {', '.join(CATEGORY_MAP)}")
        sys.exit(1)

    print(f"Geocoding '{city}' ...")
    bbox = geocode_city(city)
    time.sleep(1)  # be polite to the free Nominatim service

    print(f"Querying OpenStreetMap for {tag} in that area ...")
    result = query_overpass(tag, bbox)
    elements = result.get("elements", [])
    rows = extract_rows(elements, category_arg, city)

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["name", "url", "category", "city"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"\nFound {len(elements)} matching businesses, {len(rows)} had a website listed.")
    print(f"Candidates written to {out_path} — run scraper.py on it next.")


if __name__ == "__main__":
    main()
