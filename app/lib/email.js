// Order notification emails via Resend (https://resend.com) -- deliberately
// not Microsoft Graph, to avoid a third dependency on the same system behind
// the broken Outlook connector and the unconfigured contact-form credentials.
const NOTIFY_TO = 'gregory.jasonpaul@gmail.com'; // Resend test mode restriction -- can only send to the account's own signup email until a domain is verified
const FROM = 'Dharma Orders <onboarding@resend.dev>';
// SEO Analyzer lead emails go to the actual lead, not Jason -- needs a verified
// sending domain in Resend before this can deliver to anyone but the account
// owner. Domain registered 2026-09-22, DNS records not yet added (DNS is on
// GoDaddy, login-gated, needs Jason). Safe to leave wired up now: Resend just
// rejects the send with a clear error until verification completes, caught by
// the non-blocking try/catch at the call site in seo-lead/route.js.
const SEO_REPORT_FROM = 'Dharma\'s Esthetic Design <reports@dharmasestheticdesign.com>';

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

// Delivers the full SEO Analyzer report to the lead who just unlocked it --
// the actual "here's the thing you signed up for" email that was missing
// entirely (found 2026-09-22: the unlock was purely a client-side reveal,
// nothing was ever sent). Called from app/api/seo-lead/route.js right after
// the JSONL log + CRM sync, wrapped in the same non-blocking try/catch style.
export async function sendSeoReportEmail({ email, scannedUrl, score, issues }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set -- skipping SEO report email');
    return;
  }

  const severityLabel = { critical: 'Fix now', warning: 'Worth fixing', info: 'Nice to have' };
  const issueRows = (issues || [])
    .map(
      (issue) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eee;">
            <div style="font-size:12px;font-weight:600;text-transform:uppercase;color:#888;">${severityLabel[issue.severity] || issue.severity}</div>
            <div style="font-size:16px;font-weight:600;margin:4px 0;">${issue.title}</div>
            <div style="font-size:14px;color:#555;margin-bottom:4px;">${issue.why}</div>
            <div style="font-size:14px;"><strong>Quick fix:</strong> ${issue.fix}</div>
          </td>
        </tr>`
    )
    .join('');

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2>Your Shopify SEO scan results</h2>
      <p><strong>${scannedUrl}</strong> scored <strong>${score}/100</strong>.</p>
      <p>Here's the full list, saved so you don't have to keep the tab open:</p>
      <table style="width:100%;border-collapse:collapse;">${issueRows}</table>
      <p style="margin-top:24px;">Want us to just fix these for you? <a href="https://dharmasestheticdesign.com/shopify-audit">See Shopify Store Audits</a> -- starting at $200.</p>
      <p style="color:#888;font-size:12px;">Dharma's Esthetic Design -- dharmasestheticdesign.com</p>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: SEO_REPORT_FROM,
      to: [email],
      subject: `Your SEO scan results for ${scannedUrl} (score: ${score}/100)`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API error ${res.status}: ${text}`);
  }
}
