import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Same append-only JSONL pattern as quiz-lead and gumroad-ping. This trusts
// client-reported capture details (no server-side re-verification against
// PayPal's Orders API, which would need the Secret key) -- a best-effort
// record for follow-up, not a financial ledger. Read via SSH:
//   cat /home/jason/Kronos/data/alacarte-orders.jsonl
const ORDERS_FILE = path.join(process.cwd(), 'data', 'alacarte-orders.jsonl');

export async function POST(request) {
  try {
    const body = await request.json();
    const orderId = typeof body.orderId === 'string' ? body.orderId.slice(0, 64) : null;
    const items = Array.isArray(body.items) ? body.items.slice(0, 20).map((i) => String(i).slice(0, 100)) : [];
    const total = typeof body.total === 'number' ? body.total : null;
    const payerEmail = typeof body.payerEmail === 'string' ? body.payerEmail.slice(0, 200) : null;
    const payerName = typeof body.payerName === 'string' ? body.payerName.slice(0, 200) : null;

    if (!orderId || items.length === 0 || total === null) {
      return NextResponse.json({ error: 'Invalid order payload' }, { status: 400 });
    }

    const entry = { orderId, items, total, payerEmail, payerName, ts: new Date().toISOString() };
    await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
    await fs.appendFile(ORDERS_FILE, JSON.stringify(entry) + '\n', 'utf8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to log a la carte order:', error);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}
