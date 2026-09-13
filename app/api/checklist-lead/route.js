import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { recordLead } from '@/app/lib/crm';

// Squeeze-page lead capture for "The Shopify Invisibility Checklist" --
// same append-only JSONL pattern as seo-lead/alacarte-order/package-order.
// Read via SSH: cat /home/jason/Kronos/data/checklist-leads.jsonl
const LEADS_FILE = path.join(process.cwd(), 'data', 'checklist-leads.jsonl');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const entry = { email, ts: new Date().toISOString(), source: 'invisibility-checklist' };
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await fs.appendFile(LEADS_FILE, JSON.stringify(entry) + '\n', 'utf8');

    // CRM sync (System 2) -- best-effort, never blocks the JSONL-backed response above.
    try {
      await recordLead({ email, source: 'invisibility-checklist' });
    } catch (crmError) {
      console.error('CRM sync failed for checklist lead (JSONL log still succeeded):', crmError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to log checklist lead:', error);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
