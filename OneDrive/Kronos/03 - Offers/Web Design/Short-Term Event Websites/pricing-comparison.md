# Short-Term Event Websites — Pricing Comparison

Working numbers, not final — adjust before this goes anywhere public.

## What we sell

A live website for a weekend or week-long event, hosted free on a named Vercel subdomain (e.g. `smithwedding2026.vercel.app`) with Supabase as the backend for any forms/RSVP/ticketing data. No domain purchase, so no per-event domain cost. Flat fee, no login, no maintenance for the client.

| Package | Runs for | Price | What's included |
|---|---|---|---|
| Weekend Pop-Up | 1–3 days | $199 flat | Single-page site on a named Vercel subdomain, live in 48 hrs, teardown handled |
| Week-Long Event | Up to 7 days | $299 flat | Same as above + RSVP/contact form (Supabase-backed), photo gallery |
| Custom Build | Multi-week or bigger | Starts at $599 | Multiple pages, ticketing/e-commerce, custom design pass |

*(2026-08-21 repricing — see Verification notes below for why these numbers changed from the original $450/$650/$950.)*

## Us vs. the alternatives

| | Us | DIY (Squarespace) | DIY (Carrd) | Freelance web designer |
|---|---|---|---|---|
| Upfront cost | Flat fee, all-in | $16–40/mo (annual plan) or $25–99/mo billed monthly | $9–49/yr (no monthly option) | $300–1,500+ typical |
| Domain | Free Vercel subdomain, no cost to us or you | You buy it yourself (~$15–20/yr) | You buy it yourself (~$15–20/yr), or free `.carrd.co` subdomain | Usually your responsibility |
| Turnaround | Live in 48 hrs | Hours to days of your own time | Faster than Squarespace, still your own time | 1–3 weeks typical |
| Your time spent | ~15 min (send us content) | Several hours minimum | An hour or more, simpler than Squarespace | A few hours of back-and-forth revisions |
| After the event | We tear it down, nothing lingers | You have to remember to cancel or park it | Same — on you, though cheap enough to just abandon | Same — on you |

## The pitch in one line

DIY is cheap but costs you hours you don't have. A freelancer costs more and takes weeks you don't have. We're the option where you send us a few photos and some dates, and a real site just shows up and then goes away — and now we're priced close enough to DIY that "cheap" isn't a reason to skip us either.

## Verification notes (2026-08-21)

**One real error found — the Carrd number is wrong.** Carrd doesn't bill monthly at all. Its paid tiers are annual: Pro Lite $9/yr, Pro Standard $19/yr (cheapest with a custom domain), Pro Plus $49/yr — that's $0.75–$4/mo amortized, not $16–40/mo. The "$16–40/mo, billed full month even for a weekend" row is accurate for **Squarespace only** (Basic $16/mo on an annual plan or $25/mo month-to-month, up to $99/mo for Advanced). Lumping Carrd in with Squarespace overstates the DIY cost and is the kind of thing a customer who's used Carrd would catch and use to discredit the whole pitch. Fix: split the row into two DIY lines, or drop Carrd from the "cheap but slow" framing since it actually undercuts us on weekend-only price (a customer could run Pro Standard for $19/yr — cheaper than our $450 flat fee, if they're willing to spend the setup time and can live with the .carrd.co-adjacent build experience). Recommend keeping the DIY comparison to Squarespace, or adding a line acknowledging Carrd as the closest low-cost competitor on price alone, with turnaround/design quality as our differentiator instead of price.

**Everything else checks out:**
- Domain cost estimate ($15–20/yr) is in the right range for a standard .com through most registrars.
- Freelance range ($300–1,500+) is realistic for a single-event site.
- Turnaround and "your time spent" rows are operational claims (things we control), not market facts — nothing to verify externally, just make sure they're commitments you can actually hit.

**Cost basis worth spelling out, not currently in the doc:** domain registrars don't sell 3-day or 7-day registrations — the minimum is a full year (~$15–20) regardless of how long the site is actually live. So every package eats that same domain cost whether it runs 1 day or 4 weeks. That means margin scales with price tier: Weekend Pop-Up ($450) carries the fixed domain cost against the least labor (single page, no forms), so it likely has the best margin-per-hour of the three. Week-Long ($650) adds a form and gallery for +$200 — reasonable if that's under an hour of extra work. Custom Build ("starts at $950") is the riskiest tier: multi-page plus ticketing/e-commerce is real scope (payment integration, inventory, testing) that can easily blow past what $950 covers if it's not tightly bounded. **Recommend:** treat Custom Build's $950 as a floor with a clear list of what's NOT included at that price, so scope creep doesn't quietly turn your highest-ticket tier into your worst-margin one.

**Bottom line on "most profitable":** Weekend Pop-Up is probably the most profitable *per hour of work* as written. Custom Build has the highest sticker price but likely the thinnest margin unless the "starts at $950" floor is defended with a firm scope boundary.

## Repricing — no domain purchase (2026-08-21)

Decision: instead of buying a real domain per event, sites deploy on a free named Vercel subdomain (`event-name.vercel.app`) with Supabase for any dynamic data (RSVPs, ticketing). This removes the ~$15–20/yr domain cost entirely — the only real hard cost in the original model — pushing cash cost close to $0 (hosting is free on Vercel/Supabase's free tiers) and leaving margin almost entirely a function of labor time.

Decision made: cut price to compete on cost, not just speed. New pricing: Weekend Pop-Up $450 → **$199**, Week-Long $650 → **$299**, Custom Build $950 → **starts at $599**.

**Trade-off to flag:** a literal dollar-for-dollar price war against Carrd ($9–49/yr) isn't winnable for a done-for-you paid service — Carrd's annual cost is still lower than even the cheapest tier here. The repositioning that actually works is "close enough to DIY cash cost that the customer's own time becomes the deciding factor" — not "cheapest option on the market." Recommend the pitch lean on zero setup time and zero domain-renewal risk as the differentiators at this price point, not price alone.

## Critical finding — the free tier isn't actually free for this business (2026-08-21)

**Vercel's Hobby (free) plan explicitly prohibits commercial use.** Its Terms of Service define commercial usage as any deployment used for the financial gain of anyone involved in producing it — that's this business exactly. Vercel reserves the right to disable or terminate Hobby deployments without notice for violating this. Running paid client sites on the free tier isn't a minor risk, it's against the terms — a client's live event site could get pulled mid-event with zero warning, which would be a disaster for a service whose whole pitch is reliability. **Vercel Pro is required for legitimate commercial use, starting at $20/mo.** That's a real fixed monthly cost, not $0 — it needs to be in the cost basis regardless of how many events run that month.

**Supabase's free tier caps you at 2 active projects at a time.** If every event gets its own dedicated Supabase project (the pattern used tonight for Icon Auto Repair and Nick's Auto Service — each got a separate project), you physically cannot run more than 2 events' dynamic backends simultaneously — a hard ceiling the moment two bookings overlap. **Fix:** use one shared Supabase project across all events, with an `event_id` column separating each client's RSVP/ticketing data instead of provisioning new infrastructure per event. This sidesteps the 2-project cap entirely and is faster to set up per booking than spinning up a new project each time.

**Revised cost basis:** ~$20/mo fixed (Vercel Pro) + $0 (Supabase, on one shared free-tier project) + labor, spread across however many events run that month.

## The math (2026-08-21, corrected)

**Correction: Jason isn't doing the build labor — Jarvis is.** The $50/hr and $75/hr labor-cost model below assumed Jason's own hourly time was the cost basis, the way it would be for a freelancer. That's wrong for this business — the actual site builds (the pattern demonstrated tonight on Icon Auto Repair and Nick's Auto Service, including full Supabase schema setup) are done by AI, not by Jason billing his own hours. That doesn't mean the labor is free — it changes what the real cost driver is.

**Break-even on the $20/mo fixed cost is trivial and not the real risk.** One single sale of any package in a given month covers it 10–30x over — this holds regardless of who builds the site.

**Actual cost basis with AI doing the builds:**
- $20/mo fixed (Vercel Pro), amortized across however many events run that month.
- $0 Supabase (one shared free-tier project, not per-event).
- Jason's actual time per event drops to review/QA and client communication, not hands-on build time — likely 10–20 minutes per event regardless of package tier, since the build itself doesn't scale his hours the way it would a freelancer's.
- The build's real constraint isn't Jason's hourly rate, it's scope complexity translating into more back-and-forth iteration or review time before a Custom Build ships correctly — still much smaller than the 6–10 hour freelancer-style estimate this section originally used.

**Revised bottom line:** at this cost structure, all three tiers hold very strong margin — Weekend Pop-Up and Week-Long are close to pure profit above the $20/mo fixed cost, and Custom Build no longer has the same loss risk the freelancer-labor model implied, since the hours that used to threaten its margin aren't Jason's hours to begin with.

**Jason confirmed (2026-08-21):** his own review/QA time per event is minimal. With that confirmed, the cost basis for all three tiers is effectively just the $20/mo Vercel Pro fee, amortized across whatever volume runs that month — margin on all three packages is close to the full sale price. **The $199/$299/$599 pricing holds up.** No further pricing changes needed; this doc's math is settled unless the business model itself changes again (e.g. moving off the shared-Supabase-project pattern, or Vercel changing its free/Pro terms).
