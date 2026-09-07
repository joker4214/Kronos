# KIE.ai Video Generation — Setup & Working Request

Reference for generating short-form video content for System 1 (the DED content machine) using KIE.ai, running ByteDance's Seedance 2.0 model.

**Note on the name:** this service gets mangled by voice transcription a lot — "CHI," "K.E.," "KEI" have all shown up in past sessions. It's always **KIE.ai** (kie.ai).

## Where the credentials live

API key is in `OneDrive/Kronos/.env`, on the `API:` line at the bottom (same value as the `#KEI` line above it — same mangled label, same key). Never copy the actual key value into a note — reference this file instead.

## Status as of 2026-09-03

- API key confirmed **working** — a real request authenticated successfully.
- Account was at **0 credits** — request failed with `402 Credits insufficient`, not an auth error.
- Jason is topping up the KIE.ai balance (chose KIE.ai over Viewmax, the other connected video service, which was also at 0 credits).
- Once funded, the request below is ready to fire again as-is.

## API shape

- Create a job: `POST https://api.kie.ai/api/v1/jobs/createTask`
  - Header: `Authorization: Bearer <KIE_API_KEY>`
  - Body: `{"model": "...", "input": {...}}`
- Check status / get result: `GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=<taskId>`
  - Result video URL comes back in `resultJson`. **URLs are temporary** — download the finished video immediately, don't rely on the link surviving.

### `input` fields (Seedance 2.0)
- `prompt` (string) — visual direction, not the caption/copy text
- `first_frame_url` / `last_frame_url` (optional) — frame constraints
- `reference_image_urls` / `reference_video_urls` / `reference_audio_urls` (optional arrays) — **don't mix with first/last frame fields**, mutually exclusive
- `return_last_frame` (boolean)
- `generate_audio` (boolean)
- `resolution` (e.g. `"720p"`)
- `aspect_ratio` (e.g. `"9:16"` for Reels/TikTok, `"16:9"` for landscape)
- `duration` (integer, seconds)
- `web_search` (boolean)

Uploaded reference files expire after 3 days.

## Tested working request (ready to rerun once funded)

Built around System 1's "Three packages, one goal: your store grows" content piece (the promotional post, already sitting in Supabase `content_ideas`/`posts`).

```bash
curl -s -X POST "https://api.kie.ai/api/v1/jobs/createTask" \
  -H "Authorization: Bearer $KIE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "bytedance/seedance-2-fast",
    "input": {
      "prompt": "A confident, modern brand commercial for a boutique e-commerce design agency. Clean minimalist studio setting, deep charcoal background with a single electric-blue accent light sweeping across frame. Bold white sans-serif text animates in center-screen: first \"Your store looks amazing.\" then it cuts to \"So why isn'\''t anyone buying?\" Quick confident cuts: a laptop screen displaying a sleek Shopify storefront, hands scrolling through branded social media content, a clean analytics dashboard with an upward graph line in electric blue. Final frame: bold wordmark text \"Dharma'\''s Esthetic Design\" fades in, followed by \"Three packages. One goal: your store grows.\" Sleek, fast-paced, professional commercial editing style, no visible people, high production value, 4K quality feel.",
      "aspect_ratio": "9:16",
      "resolution": "720p",
      "duration": 10,
      "generate_audio": false
    }
  }'
```

Model chosen: `bytedance/seedance-2-fast` (faster/cheaper tier, ~4 min average generation vs ~5 min for the standard model) — fine for a first test; can swap to `bytedance/seedance-2` for higher quality once the pipeline is proven.

## How this connects to System 1

System 1's content machine (see the vault's System 1 — Content Machine note) has 7 real, brand-compliant content pieces already written to Supabase, but no image/video generation wired up yet. This is the tested path to close that gap — once one video generates successfully, the next step is wiring this into the actual content pipeline (generate video per post, attach the resulting URL to the `posts` row) instead of a one-off manual test.

## Related

- Task tracked in Notion (Tasks database, Dharma's Esthetic Design — Operations) and in `Active Priorities.md`: "Top up KIE.ai credits (for System 1 video generation)."
- Full session detail: vault daily note, 2026-09-03, Session 2.
