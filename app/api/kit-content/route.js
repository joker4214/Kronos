import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// The $7 Starter Kit's actual gate. Content used to ship embedded in
// starter-kit.html's client JS regardless of purchase -- moving it here
// means an unverified request gets nothing back, not just a hidden UI.
// Verification checks logged Gumroad Ping events (see the
// gumroad-ping-<token> route) for a non-refunded sale of this product
// under the given email. Read logged sales via SSH:
//   cat /home/jason/Kronos/data/gumroad-sales.jsonl
const SALES_FILE = path.join(process.cwd(), 'data', 'gumroad-sales.jsonl');
const PRODUCT_PERMALINK = 'yoshgq';

const KITS = {
  teacher: {
    name: "The Teacher's Offer-Building Kit",
    recap: "You turn what you know into something others can follow. Here's how to package it into an offer someone will actually pay for.",
    offer: {
      kicker: "Your Primary Offer",
      body: "Don't sell \"everything I know.\" Pick the ONE question people ask you most and build the offer around just that. Best starter formats: a focused mini-course (3–5 short modules), a written step-by-step guide, or a template/swipe-file pack. All three can be built in a weekend with AI doing the heavy lifting on drafts and structure — your job is the judgment and the voice.",
    },
    pricing: [
      { amt: "$17–47", lbl: "Template or swipe-file pack" },
      { amt: "$27–97", lbl: "Focused mini-course (3–5 modules)" },
      { amt: "$197–497", lbl: "Comprehensive course" },
      { amt: "$9–19", lbl: "Downsell: single cheat sheet" },
    ],
    delivery: "Gumroad, Notion, or even a Google Doc + unlisted video links for version one. Don't let the platform be the reason you don't ship.",
    transformation: "Name the specific before-and-after. Not \"learn marketing\" — \"go from a blank page to a headline that actually converts, in one sitting.\"",
    upsell: "Downsell: a single template or cheat sheet ($9–19) for people not ready for the full thing. Upsell: a 1:1 feedback call or access to a small cohort/community working through it together.",
    action: "Write the outline for module 1 right now. Record it on your phone today. That's your MVP — not perfect, shipped.",
  },
  guide: {
    name: "The Guide's Coaching Kit",
    recap: "You help one person at a time get unstuck. Here's how to turn that into a defined, sellable engagement.",
    offer: {
      kicker: "Your Primary Offer",
      body: "\"Ongoing coaching\" is too vague to sell. Define a specific, bounded engagement instead — a 4-week sprint toward one named outcome, or a single deep-dive session that solves one specific problem. A defined scope is what makes someone say yes; open-ended is what makes them hesitate.",
    },
    pricing: [
      { amt: "$75–250", lbl: "Single deep-dive session" },
      { amt: "$500–1,500", lbl: "4–6 week engagement" },
      { amt: "$300–800/mo", lbl: "Ongoing monthly retainer" },
      { amt: "Free x3", lbl: "Downsell: founding-client sessions" },
    ],
    delivery: "Zoom or phone, with AI handling your prep notes and follow-up summaries between calls — this is exactly where AI buys back your time so you can take on more people without more hours.",
    transformation: "Name the specific outcome by the end of the engagement. Not \"get unstuck\" — the actual thing that's different in their life or business.",
    upsell: "Downsell: a single \"quick win\" session for people not ready to commit longer. Upsell: an extended engagement, or async text/Voxer support between calls.",
    action: "Offer 3 free \"founding client\" sessions to people you already know, in exchange for a real testimonial and honest feedback. That's your case study and your proof, both at once.",
  },
  builder: {
    name: "The Builder's Product Kit",
    recap: "You'd rather build the fix than explain it. Here's how to turn that instinct into a sellable tool.",
    offer: {
      kicker: "Your Primary Offer",
      body: "One tool. One narrow, painful, repeated problem. Not a platform, not \"everything for X.\" The instinct to build broad is the same instinct that kills specificity everywhere else in marketing — resist it here too. Pick the lightest format that solves the problem: a simple web app, a Zapier/Make template, a Notion/Airtable template, a Chrome extension.",
    },
    pricing: [
      { amt: "$9–29/mo", lbl: "Micro-SaaS subscription" },
      { amt: "$49–199", lbl: "One-time tool, template, or script" },
      { amt: "Free tier", lbl: "+ paid upgrade, if building an audience first" },
      { amt: "+$", lbl: "Upsell: white-glove setup" },
    ],
    delivery: "Whatever's lightest to actually ship this week — don't let \"I should build a real app\" stop you from shipping a Zapier template that solves the exact same problem today.",
    transformation: "Quantify it if you can. Not \"saves time\" — \"saves 3 hours a week\" or \"turns a 2-hour task into 5 minutes.\"",
    upsell: "Downsell: a free or cheap version with a usage cap. Upsell: white-glove setup for them, or a \"pro\" tier with more usage or features.",
    action: "Find the task you've already half-automated for yourself with a spreadsheet, a Zapier flow, or a saved prompt. That's your prototype. Ship it to 5 people this week, even ugly.",
  },
  operator: {
    name: "The Operator's Service Kit",
    recap: "You'd rather just handle it than teach someone how. Here's how to turn reliable execution into a sellable service.",
    offer: {
      kicker: "Your Primary Offer",
      body: "Sell the SAME service people already pay for — don't invent a new category. The AI-era edge is doing it dramatically faster or better because AI handles the grunt work behind the scenes. The client doesn't need to know or care how; they're paying for the outcome and the turnaround.",
    },
    pricing: [
      { amt: "Match market", lbl: "Price at or near typical rate — compete on speed, not price" },
      { amt: "48hr", lbl: "A fast, defined turnaround is itself a sellable differentiator" },
      { amt: "$-", lbl: "Downsell: a smaller single-task version" },
      { amt: "$$/mo", lbl: "Upsell: an ongoing retainer" },
    ],
    delivery: "A clearly scoped deliverable with a stated turnaround time. Ambiguous scope is where service businesses lose money — write down exactly what's included before you pitch anyone.",
    transformation: "What gets done, without them doing it themselves, and how fast — that's the entire pitch.",
    upsell: "Downsell: a smaller, single-task version of the service. Upsell: a retainer for ongoing delivery — this one doubles as your future profit maximizer.",
    action: "Pick one service you already do well. Time yourself doing it once. Find the single step AI can cut in half. That's your pitch, word for word.",
  },
  connector: {
    name: "The Connector's Community Kit",
    recap: "You like it best when people show up together. Here's how to turn that into a recurring, sellable community.",
    offer: {
      kicker: "Your Primary Offer",
      body: "\"Join my community\" is too vague to sell. Offer a specific recurring value instead: weekly co-working, a monthly challenge, an accountability pod, or curated resources with AI-assisted matchmaking between members. Specific and recurring beats vague and open-ended, every time.",
    },
    pricing: [
      { amt: "$9–29/mo", lbl: "Casual community" },
      { amt: "$49–99/mo", lbl: "Higher-touch, accountability-focused" },
      { amt: "Free", lbl: "Public tier + paid \"inner circle\"" },
      { amt: "+1:1", lbl: "Upsell: your time, directly" },
    ],
    delivery: "Discord, Circle, or Skool, with AI handling onboarding, reminders, and content curation so the community doesn't quietly become a second full-time job.",
    transformation: "What's different for a member after 30, 60, or 90 days inside the group? Name it specifically.",
    upsell: "Downsell: a free public community with limited access. Upsell: 1:1 time with you, or a higher-tier inner circle.",
    action: "Name the 10 people who'd join on day one, by name. Message each one individually — not a broadcast post — and ask if they want into a founding cohort.",
  },
};

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const type = typeof body.type === 'string' ? body.type : '';

    if (!isValidEmail(email) || !KITS[type]) {
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
    }

    let raw = '';
    try {
      raw = await fs.readFile(SALES_FILE, 'utf8');
    } catch {
      raw = '';
    }

    // Replay events, keeping the latest state per sale_id -- a refund ping
    // for the same sale_id arrives as a second line, not an edit in place.
    const bySaleId = new Map();
    for (const line of raw.split('\n')) {
      if (!line.trim()) continue;
      try {
        const evt = JSON.parse(line);
        if (evt.sale_id) bySaleId.set(evt.sale_id, evt);
      } catch {
        // skip malformed lines
      }
    }

    const purchased = Array.from(bySaleId.values()).some(
      (evt) => evt.email === email && evt.permalink === PRODUCT_PERMALINK && !evt.refunded
    );

    if (!purchased) {
      return NextResponse.json({ ok: false, error: 'No matching purchase found' }, { status: 403 });
    }

    return NextResponse.json({ ok: true, kit: KITS[type] });
  } catch (error) {
    console.error('Failed to verify kit purchase:', error);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
