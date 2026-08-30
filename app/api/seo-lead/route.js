import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Same append-only JSONL pattern as alacarte-order/quiz-lead. This is the
// SEO Analyzer's lead capture: gates the full fix-it list behind an email,
// same as the funnel draft's Invisibility Checklist, but backed by a real
// on-demand scan instead of a static PDF. Read via SSH:
//   cat /home/jason/Kronos/data/seo-audit-leads.jsonl
const LEADS_FILE = path.join(process.cwd(), 'data', 'seo-audit-leads.jsonl');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
    const scannedUrl = typeof body.scannedUrl === 'string' ? body.scannedUrl.slice(0, 500) : '';
    const score = typeof body.score === 'number' ? body.score : null;

    if (!EMAIL_RE.test(email) || !scannedUrl) {
      return NextResponse.json({ error: 'A valid email and scanned URL are required.' }, { status: 400 });
    }

    const entry = { email, scannedUrl, score, ts: new Date().toISOString(), source: 'seo-analyzer' };
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await fs.appendFile(LEADS_FILE, JSON.stringify(entry) + '\n', 'utf8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to log SEO analyzer lead:', error);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
