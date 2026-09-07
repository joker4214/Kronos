import type { NextRequest } from "next/server";

export const runtime = "nodejs";

interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

const SYSTEM_INSTRUCTION = `You are NEXUS, a spatial computing assistant embedded in a
gesture-controlled 3D interface. Speak the way a sharp, unflappable co-pilot would:
concise, direct, a little dry — never corporate, never bubbly. Default to 1-3 sentences
unless the user clearly wants detail. You have no hands and cannot literally perform UI
actions yourself (the interface's command engine already handles direct commands like
"open X" or "rotate left" before anything reaches you) — you're here for explanation,
lookup-style questions, and conversation. If told which module is currently open, use
that as context the way a colleague glancing at the same screen would.`;

function buildContents(history: ChatTurn[], message: string) {
  const contents = history.map((turn) => ({
    role: turn.role === "assistant" ? "model" : "user",
    parts: [{ text: turn.text }],
  }));
  contents.push({ role: "user", parts: [{ text: message }] });
  return contents;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("Gemini API key is not configured on the server.", {
      status: 500,
    });
  }

  let body: { message?: string; history?: ChatTurn[]; currentModule?: string | null };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return new Response("Message is required.", { status: 400 });
  }
  const history = Array.isArray(body.history) ? body.history.slice(-12) : [];

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

  const systemText = body.currentModule
    ? `${SYSTEM_INSTRUCTION}\n\nThe user currently has the "${body.currentModule}" module open.`
    : SYSTEM_INSTRUCTION;

  const geminiResponse = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { role: "system", parts: [{ text: systemText }] },
      contents: buildContents(history, message),
      generationConfig: { temperature: 0.6, maxOutputTokens: 512 },
    }),
  });

  if (!geminiResponse.ok || !geminiResponse.body) {
    const errText = await geminiResponse.text().catch(() => "");
    return new Response(`Gemini request failed: ${geminiResponse.status} ${errText}`, {
      status: 502,
    });
  }

  const upstream = geminiResponse.body;
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload);
              const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (typeof text === "string" && text.length > 0) {
                controller.enqueue(encoder.encode(text));
              }
            } catch {
              // partial/non-JSON SSE line — skip it
            }
          }
        }
      } catch (err) {
        controller.error(err);
        return;
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
