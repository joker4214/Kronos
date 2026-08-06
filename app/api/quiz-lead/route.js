import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Deliberately not using Prisma/Postgres here -- DATABASE_URL isn't
// configured in this environment (see build logs), so this appends
// plain JSON lines to a file instead. Read leads via SSH:
//   cat /home/jason/Kronos/data/quiz-leads.jsonl
const LEADS_FILE = path.join(process.cwd(), 'data', 'quiz-leads.jsonl');

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const result = typeof body.result === 'string' ? body.result.slice(0, 100) : null;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const entry = { email, result, ts: new Date().toISOString() };
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await fs.appendFile(LEADS_FILE, JSON.stringify(entry) + '\n', 'utf8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to save quiz lead:', error);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
