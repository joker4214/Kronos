import { claude } from "./claude";

const CAPTURE_LEAD_TOOL = {
  name: "capture_lead",
  description:
    "Call this once the visitor has given you their name and either an email or phone number, and you have a clear idea of what they need. Only call it once per conversation.",
  input_schema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Visitor's name" },
      email: { type: "string", description: "Visitor's email, if given" },
      message: {
        type: "string",
        description: "Short summary of what the visitor needs help with",
      },
    },
    required: ["name", "message"],
  },
};

export function buildSystemPrompt(widget, knowledgeSources) {
  const website = knowledgeSources.filter((k) => k.type === "website");
  const faqs = knowledgeSources.filter((k) => k.type === "faq");
  const files = knowledgeSources.filter((k) => k.type === "file");

  let sections = [];

  if (website.length) {
    sections.push(
      "Website content:\n" +
        website.map((w) => `(${w.source_url})\n${w.content || ""}`).join("\n\n")
    );
  }

  if (faqs.length) {
    sections.push(
      "FAQs:\n" +
        faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")
    );
  }

  if (files.length) {
    sections.push(
      "Reference documents:\n" +
        files.map((f) => `(${f.file_name})\n${f.content || ""}`).join("\n\n")
    );
  }

  if (widget.custom_instructions) {
    sections.push("Additional instructions:\n" + widget.custom_instructions);
  }

  return `You are a helpful assistant answering questions on behalf of this business, embedded as a chat widget on their website.

Talk like a real person helping a visitor out — plain, direct, no corporate speak, no buzzwords, no over-explaining. Keep answers short.

Only answer using the information below. If you don't know something from this context, say so honestly and offer to connect them with a real person instead of guessing.

If the visitor seems like a genuine lead (they want a quote, a call, or to work together) and you've got their name plus an email or phone number, call the capture_lead tool with what you've learned. Don't call it just because someone asked a simple question.

${sections.join("\n\n")}`;
}

export async function chat(widget, knowledgeSources, history, message) {
  const system = buildSystemPrompt(widget, knowledgeSources);

  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  const response = await claude.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    system,
    tools: [CAPTURE_LEAD_TOOL],
    tool_choice: { type: "auto" },
    messages,
  });

  let reply = "";
  let leadCaptured = null;

  for (const block of response.content) {
    if (block.type === "text") {
      reply += block.text;
    } else if (block.type === "tool_use" && block.name === "capture_lead") {
      leadCaptured = block.input;
    }
  }

  if (!reply && leadCaptured) {
    reply = "Thanks! I've passed this along — someone will be in touch shortly.";
  }

  return { reply, leadCaptured };
}
