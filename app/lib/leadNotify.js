import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadEmail(widget, client, lead) {
  const to = lead.notificationEmails;
  if (!to || !to.length) return;

  await resend.emails.send({
    from: "Kronos Leads <leads@dharmasemporium.com>",
    to,
    subject: `New lead from ${client.name}'s AI widget: ${lead.name}`,
    text: `New lead captured by the "${widget.name}" widget for ${client.name}.

Name: ${lead.name}
Email: ${lead.email || "not given"}
Message: ${lead.message}
`,
  });
}
