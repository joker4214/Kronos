# AI Business Empire — Email Sequence

Drafted 2026-08-06. Ready to paste into whatever actually sends these (see the note at the bottom on delivery — nothing sends these automatically yet). Voice matches the quiz/site: direct, no corporate speak, no buzzwords. Structure follows the funnel plan in the vault's AI Business Empire Marketing Plan: deliver → goodwill → pitch cycle.

Recipients come from `data/quiz-leads.jsonl` on the Kronos VPS — each entry has `email`, `result` (their archetype: teacher/guide/builder/operator/connector), and `ts`.

---

## Email 1 — Sent immediately after quiz completion

**Subject:** Your result: the [Archetype] path

**Body:**
> Hey — here's your quiz result, recapped so you've got it in writing.
>
> You're a **[Archetype]**. [One-line recap of what that means — pull straight from the quiz's own KIT_NAMES short description for that archetype, e.g. for Operator: "You'd rather just handle it than teach someone how — an AI-powered done-for-you service is the move."]
>
> That's the *what*. If you want the *how* — your actual first offer, real pricing benchmarks, and one concrete thing to do in the next 48 hours — that's exactly what the [Archetype] Starter Kit covers. It's $7.
>
> [Get the Starter Kit → link to gumroad.com/l/yoshgq]
>
> If you want the full picture instead — all 10 steps from idea to actually making money, 50 fill-in-the-blank worksheets — that's the Map. $49.
>
> [Get the Full Map → link to gumroad.com/l/suped]
>
> Either way, glad you took the quiz. More soon.

*(Filled example, Operator — matches the one real test entry currently in the leads file:)*
> You're an **Operator**. You'd rather just handle it than teach someone how — an AI-powered done-for-you service is the move.

---

## Goodwill sequence — 3 emails, no pitch, one every few days

Repurposed from the same "build in public" material as the social content (see `04 - Operations/AI-Business-Empire-IG-TikTok-Content-Batch-1.md`) — real behind-the-scenes material, not manufactured. Per the fundamentals: give away the best stuff, it builds the goodwill that makes the eventual pitch easy.

### Goodwill 1 — The AI chief of staff story
**Subject:** The thing that actually taught me this

> A while back I built an AI assistant that runs a good chunk of my actual business — memory, notes, day-to-day ops. It's real, it's running right now, not a demo.
>
> Building it taught me something I didn't expect: most people don't fail at AI because they can't build. They fail because they don't know *what* to build. They chase features instead of picking one thing and going.
>
> That's the whole idea behind the quiz you took — one specific answer instead of a list of maybes.
>
> No pitch today. Just wanted you to know where this came from.

### Goodwill 2 — Why "just add AI" doesn't work
**Subject:** AI doesn't make you money (here's what does)

> Here's the thing almost nobody selling "AI business" content will tell you: AI isn't what makes money. The fundamentals do — a real offer, clear copy, a landing page that converts, something people actually want. Those made money before AI and they still do.
>
> What AI actually does is make you faster at the fundamentals. Point it at a business with no fundamentals and you get fast garbage. Point it at solid fundamentals and you get a small team's output from one person.
>
> That's why the quiz asks about how *you* actually work, not which AI tool you should learn. The tool comes after you know the answer.

### Goodwill 3 — The mistake that costs the most time
**Subject:** The thing that burns the most time (and how to skip it)

> If there's one mistake I see most, it's spending weeks perfecting something nobody asked for before ever finding out if anyone wants it.
>
> The fix isn't "work harder" — it's picking the one narrow thing your result pointed you toward, and shipping an ugly first version of it fast. A rough version people actually respond to beats a polished version nobody's seen.
>
> Your [Archetype] result already points at a specific first move. If you haven't looked at the Starter Kit yet, that's literally what it's for — the one thing to do in the next 48 hours, not a 6-month plan.
>
> [Get the Starter Kit → gumroad.com/l/yoshgq]

---

## Pitch cycle — 4 emails, to anyone who hasn't bought yet

### Pitch 1 — Content-led (soft open)
**Subject:** What's actually in the full Map

> Quick rundown of what the $49 Map actually covers, since a few people have asked: 10 lines, Foundation through Freedom — Foundation, Toolkit, Offers, Content, Leads, Sales, Delivery, Scaling, Monetization, Freedom. 50 fill-in-the-blank worksheets so you're never stuck wondering what's next.
>
> Not a course you watch. A map you actually fill in.
>
> [See the Map → gumroad.com/l/suped]

### Pitch 2 — Direct offer
**Subject:** The $49 Map

> Straight pitch: the Map is $49, one-time, no subscription. Every step from "just an idea" to actually making money, mapped out so you're not guessing what comes next.
>
> [Get it here → gumroad.com/l/suped]

### Pitch 3 — Urgency/deadline
**Subject:** Last call — [reason, e.g. "closing this price" / time-boxed bonus]

> *(Needs a real, honest reason before this one goes out — a fabricated countdown reads as fake and burns trust. Options: a genuine price change, a bonus that actually expires, or skip this email entirely if there's no real deadline to point to.)*

### Pitch 4 — Final hours, clickers only
**Subject:** Closing this out

> *(Send only to people who clicked Pitch 3 but didn't buy — a last, short nudge. Keep it to 2-3 sentences; anyone reading a 4th email in this cycle already knows what's being offered.)*

---

## Delivery — the actual gap

**Nothing sends these automatically right now.** `quiz-leads.jsonl` just gets appended to — there's no ESP (ActiveCampaign, Mailchimp, etc.) and no automation reading it. Two real options, not mutually exclusive:

1. **Right now, given volume is trivial (1 real entry as of 2026-08-06, which is Jason's own test):** send Email 1 by hand via Outlook as leads trickle in. Not worth automating for one person.
2. **Once real traffic starts landing on the quiz** (tied to the still-open "get a squeeze page driving traffic" item in Active Priorities): this needs a real send mechanism. Two paths:
   - **Reuse the Microsoft 365 connector already set up** (`jason@dharmasemporium.com`) — cheapest option, no new account, but blocked today on a `Mail.Send` permission error that needs an admin-consent fix (see 2026-08-06's daily note). Fine for occasional/manual sends, not built for real automated sequences (no unsubscribe handling, no drip scheduling).
   - **A real ESP** — jaredrhod's own recommendation is ActiveCampaign; a lighter/cheaper option (Mailchimp free tier, Resend, Buttondown) would also work fine at this volume. Needs Jason to create the account himself — that's not something I can do. Once it exists, wiring the quiz's email capture to it and building the automated sequence is straightforward.

Recommendation: don't build automation for a list of one. Revisit this the moment real traffic starts hitting the quiz — that's the actual trigger, not a calendar date.
