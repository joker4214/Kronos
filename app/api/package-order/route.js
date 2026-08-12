import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Same append-only JSONL pattern as quiz-lead, gumroad-ping, and
// alacarte-order. Trusts client-reported capture details (no server-side
// re-verification against PayPal's Orders API, which would need the Secret
// key) -- a best-effort record for follow-up, not a financial ledger.
// Read via SSH: cat /home/jason/Kronos/data/package-orders.jsonl
const ORDERS_FILE = path.join(process.cwd(), 'data', 'package-orders.jsonl');

export async function POST(request) {
  try {
    const body = await request.json();
    const orderId = typeof body.orderId === 'string' ? body.orderId.slice(0, 64) : null;
    const packageId = typeof body.packageId === 'string' ? body.packageId.slice(0, 50) : null;
    const packageName = typeof body.packageName === 'string' ? body.packageName.slice(0, 100) : null;
    const total = typeof body.total === 'number' ? body.total : null;
    const payerEmail = typeof body.payerEmail === 'string' ? body.payerEmail.slice(0, 200) : null;
    const payerName = typeof body.payerName === 'string' ? body.payerName.slice(0, 200) : null;

    if (!orderId || !packageId || total === null) {
      return NextResponse.json({ error: 'Invalid order payload' }, { status: 400 });
    }

    const entry = { orderId, packageId, packageName, total, payerEmail, payerName, ts: new Date().toISOString() };
    await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
    await fs.appendFile(ORDERS_FILE, JSON.stringify(entry) + '\n', 'utf8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to log package order:', error);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}
