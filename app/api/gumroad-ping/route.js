import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Gumroad's account-level Ping webhook (Settings > Advanced > Ping), POSTed
// on every sale/refund event across all products. Configured in Gumroad as
// this route's URL with ?secret=<GUMROAD_PING_SECRET> appended -- Gumroad
// Ping has no request signature, so that query-param secret (kept in the
// gitignored .env, never committed) is what stops someone from just POSTing
// a fake "I paid" event here. Originally the secret lived in the route's
// path instead of an env var -- moved once this repo went public, since a
// path segment ends up in git history forever.
// Read logged sales via SSH: cat /home/jason/Kronos/data/gumroad-sales.jsonl
const SALES_FILE = path.join(process.cwd(), 'data', 'gumroad-sales.jsonl');

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (!process.env.GUMROAD_PING_SECRET || secret !== process.env.GUMROAD_PING_SECRET) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  try {
    const form = await request.formData();
    const entry = {
      email: (form.get('email') || '').toString().trim().toLowerCase(),
      permalink: (form.get('product_permalink') || form.get('permalink') || form.get('short_product_id') || '').toString(),
      sale_id: (form.get('sale_id') || '').toString(),
      refunded: (form.get('refunded') || 'false').toString() === 'true',
      test: (form.get('test') || 'false').toString() === 'true',
      ts: new Date().toISOString(),
    };

    await fs.mkdir(path.dirname(SALES_FILE), { recursive: true });
    await fs.appendFile(SALES_FILE, JSON.stringify(entry) + '\n', 'utf8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to log Gumroad ping:', error);
    // Still 200 -- Gumroad retries on non-2xx, and a malformed ping isn't
    // worth a retry storm. The error's already logged above.
    return NextResponse.json({ ok: false });
  }
}
