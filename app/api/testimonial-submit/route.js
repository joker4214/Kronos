import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Client-submitted testimonials go into a moderation queue, not straight onto
// the live page -- Jason reviews and picks real ones to feature by hand.
// Read via SSH: cat /home/jason/Kronos/data/testimonial-submissions.jsonl
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'testimonial-submissions.jsonl');

export async function POST(request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
    const store = typeof body.store === 'string' ? body.store.trim().slice(0, 100) : '';
    const quote = typeof body.quote === 'string' ? body.quote.trim().slice(0, 1000) : '';

    if (!name || !quote) {
      return NextResponse.json({ error: 'Name and testimonial text are required.' }, { status: 400 });
    }

    const entry = { name, store, quote, ts: new Date().toISOString(), status: 'pending' };
    await fs.mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
    await fs.appendFile(SUBMISSIONS_FILE, JSON.stringify(entry) + '\n', 'utf8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to log testimonial submission:', error);
    return NextResponse.json({ error: 'Failed to save testimonial' }, { status: 500 });
  }
}
