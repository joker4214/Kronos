// Order notification emails via Resend (https://resend.com) -- deliberately
// not Microsoft Graph, to avoid a third dependency on the same system behind
// the broken Outlook connector and the unconfigured contact-form credentials.
const NOTIFY_TO = 'gregory.jasonpaul@gmail.com'; // Resend test mode restriction -- can only send to the account's own signup email until a domain is verified
const FROM = 'Dharma Orders <onboarding@resend.dev>';

export async function sendOrderEmail({ kind, orderId, itemLabel, total, payerName, payerEmail }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set -- skipping order email');
    return;
  }

  const subject = `New ${kind} order: ${itemLabel} ($${total})`;
  const html = `
    <h2>New ${kind} order</h2>
    <p><strong>Item:</strong> ${itemLabel}</p>
    <p><strong>Total:</strong> $${total}</p>
    <p><strong>Buyer:</strong> ${payerName || '(no name given)'} &lt;${payerEmail || 'no email'}&gt;</p>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to: [NOTIFY_TO], subject, html }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API error ${res.status}: ${text}`);
  }
}
