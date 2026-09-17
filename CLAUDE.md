# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo actually is

The repo is named "Kronos" but currently serves two unrelated things from the same Next.js app:

1. **The live site** (`app/page.js`, `components/dharma/*`) — the public marketing site for
   Dharma's Esthetic Design Center (`dharmasestheticdesign.com`), an e-commerce design agency.
   This is what's actually deployed and what most recent commits touch.
2. **Kronos itself** (`app/admin`, `app/api/{ideas,drafts,metrics,calendar,content,cron}`,
   `app/lib/claude.js`, `app/lib/supabase.js`, `prisma/`) — a Google Calendar → Claude →
   social media → analytics content pipeline, described in full in `SETUP.md`. It runs as
   the `/admin` dashboard on the same deployment.

`SETUP.md` documents the Kronos content pipeline (setup steps, DB schema, API endpoints,
workflow) in detail — read it before making changes there instead of duplicating it here.

## Commands

```bash
npm run dev      # start Next.js dev server (localhost:3000)
npm run build    # production build
npm start        # run production build
npx prisma migrate dev --name <name>   # after editing prisma/schema.prisma
npx prisma db push                     # push schema without a migration
```

There is no lint or test script configured in `package.json`.

## Data layer split

Two separate persistence backends are in play, not one:

- **Prisma / PostgreSQL** (`prisma/schema.prisma`) — `CalendarIdea`, `ContentDraft`, `Metric`,
  `ScheduledTask` models, driven by `DATABASE_URL`. This is what `SETUP.md`'s workflow describes.
- **Supabase** (`app/lib/supabase.js`) — a lazily-initialized client (`SUPABASE_URL` /
  `SUPABASE_SERVICE_ROLE_KEY`), exposed as `supabase.from(...)` via a Proxy so the client
  isn't constructed (and creds aren't validated) until first use.

Check which one a given API route under `app/api/` actually uses before assuming.

## Claude integration

`app/lib/claude.js` wraps `@anthropic-ai/sdk`, keyed by `CLAUDE_API_KEY` (note: this is a
different env var name than `ANTHROPIC_API_KEY`, which is what `.env.example`/`SETUP.md`
document — check which one is actually set before debugging "missing API key" errors).
Model calls are pinned to `claude-opus-4-8`. `generateContentIdeas` parses a JSON array out of free-text model output via regex
(`content.match(/\[[\s\S]*\]/)`) rather than structured output — a model response that
doesn't contain a bare JSON array will throw. `generateCaption` returns raw text directly.

## Deployment

Deploys to a single VPS (`72.167.33.208`) via `pm2`, proxied by nginx on ports 80/443 to the
Next.js app on :3000 (nginx must front it — running PM2 directly on :80 previously caused
static assets to load unreliably). Full steps, including the nginx config path and the
branch to deploy from, are in `deploy/README.md` — follow that rather than reinventing a
deploy process. `deploy/nginx-dharmasestheticdesign.conf` is the nginx vhost checked into
the repo; changes to it need to be manually re-copied to `/etc/nginx/sites-available/` on
the VPS and reloaded.

Vercel cron config exists in `vercel.json` (`/api/cron/generate-content`, weekly Monday) but
the actual deployment target per `deploy/README.md` is the VPS, not Vercel — treat
`vercel.json` as possibly stale rather than authoritative.

## Known gaps

- `public/founder.jpg` is missing (falls back to a "J" monogram avatar in the Team section).
- `public/favicon.png` (PNG fallback) is missing; only `favicon.svg` exists.
