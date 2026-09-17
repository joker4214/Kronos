import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// App-only Graph auth (client credentials) -- no user ever signs in, so no
// redirect URI / refresh token to manage, just a token per request.
async function getGraphToken() {
  const { GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET } = process.env;

  const res = await fetch(`https://login.microsoftonline.com/${GRAPH_TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GRAPH_CLIENT_ID,
      client_secret: GRAPH_CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });

  if (!res.ok) {
    throw new Error(`Graph token request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Honeypot -- real visitors never see or fill this field.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 3000) : '';

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please fill out all fields with a valid email.' }, { status: 400 });
  }

  const mailbox = process.env.CONTACT_MAILBOX;

  try {
    const token = await getGraphToken();

    const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox)}/sendMail`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          subject: `New contact form message from ${name}`,
          body: {
            contentType: 'Text',
            content: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          },
          toRecipients: [{ emailAddress: { address: mailbox } }],
          replyTo: [{ emailAddress: { address: email, name } }],
        },
        saveToSentItems: false,
      }),
    });

    if (!res.ok) {
      console.error('Graph sendMail failed:', res.status, await res.text());
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
