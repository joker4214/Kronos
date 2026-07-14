# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Kronos?

Kronos is a minimal Next.js 14 (App Router) app deployed on Vercel — a content-generation agent for Dharma's Esthetic Design Center (a pet e-commerce web design agency). It stores projects in Supabase and uses the Anthropic SDK to generate weekly content ideas and captions in the brand voice.

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # serve production build
```

There is no test suite or linter configured.

## Environment variables

Required in `.env.local` (never committed):
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — server-side Supabase client (`app/lib/supabase.js`)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — used directly by `app/api/projects/route.js`
- `CLAUDE_API_KEY` — Anthropic SDK (`app/lib/claude.js`)

Note the split: `app/lib/supabase.js` exports a service-role client, but the projects route builds its own anon-key client. Both patterns exist in the codebase today.

## Architecture

- `app/page.js` — status page only ("Kronos Running").
- `app/api/projects/route.js` — GET/POST against the Supabase `projects` table.
- `app/lib/claude.js` — `generateContentIdeas()` and `generateCaption()`: prompt Claude for 5–7 weekly content ideas / a caption, matched to a brand voice passed in.
- `vercel.json` — declares a Vercel cron: `POST /api/cron/generate-content` every Monday 09:00. **That route does not exist yet** — implementing it is the intended wiring for the content pipeline. Also note the file on disk is currently named `vercel.json(config)`, which Vercel will not read; it must be renamed to `vercel.json` for the env/cron config to take effect.

## OneDrive/Kronos — the business vault (content, not code)

`OneDrive/Kronos/` is a snapshot of Jason's business knowledge vault: brand guide and assets (`01 - Foundation/`), marketing calendars and drafts (`02 - Marketing/`), offers, operations/CRM, and library templates. Treat it as source material to read (e.g., `01 - Foundation/Brand Guide.md` for the brand voice fed to `generateContentIdeas`), not as application code to modify.

Key guidance docs there:
- `VOICE.md` — no corporate speak, no buzzwords, keep everything as simple as possible.
- `WORKING-STYLE.md` — Jason is stretched across a 9–5 and this business: be concise and direct, no over-engineering, start simple and build, ask clarifying questions before big steps.

Write all user-facing copy and generated content to those voice rules.

## The atlas/ folder (branch `claude/employee-from-document-5zrzer` only)

`atlas/` is a separate project — a voice-driven lead-gen AI employee — with its own `CLAUDE.md`, and it has been split out to its own repository (`joker4214/atlas`). Keep the two strictly separate: never mix Atlas code into the Kronos app or Kronos app code into `atlas/`. New Atlas work belongs in the standalone atlas repo.
