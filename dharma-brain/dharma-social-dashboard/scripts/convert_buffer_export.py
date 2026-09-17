"""One-off: convert a raw Buffer list_posts MCP result into the flat shape
transform.py expects: [{id, platform, sentAt, text, assetType, source, metrics}].
Usage: python convert_buffer_export.py <mcp_result.txt> <raw_posts.json>
"""
import json
import sys


def main():
    src_path, out_path = sys.argv[1], sys.argv[2]
    with open(src_path, encoding="utf-8") as f:
        wrapper = json.load(f)
    inner = json.loads(wrapper[0]["text"])

    posts = []
    for edge in inner["edges"]:
        n = edge["node"]
        assets = n.get("assets") or []
        first_asset = assets[0] if assets else {}
        raw_metrics = n.get("metrics") or []
        metrics = {m["type"]: m["value"] for m in raw_metrics} if isinstance(raw_metrics, list) else {}
        posts.append(
            {
                "id": n["id"],
                "platform": n["channelService"],
                "sentAt": n["sentAt"],
                "text": n.get("text") or "",
                "assetType": first_asset.get("type"),
                "source": first_asset.get("source"),
                "metrics": metrics,
            }
        )

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2)
    print(f"Wrote {len(posts)} posts -> {out_path}")


if __name__ == "__main__":
    main()
