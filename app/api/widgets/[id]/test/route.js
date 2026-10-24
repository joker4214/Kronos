import { supabase } from "../../../../lib/supabase";
import { chat } from "../../../../lib/widgetAgent";

export async function POST(request, { params }) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return Response.json({ error: "message is required" }, { status: 400 });
    }

    const [{ data: widget, error: widgetError }, { data: knowledge, error: knowledgeError }] =
      await Promise.all([
        supabase.from("widgets").select("*").eq("id", params.id).single(),
        supabase
          .from("widget_knowledge_sources")
          .select("*")
          .eq("widget_id", params.id)
          .eq("status", "ready"),
      ]);

    if (widgetError) throw widgetError;
    if (knowledgeError) throw knowledgeError;

    const result = await chat(widget, knowledge || [], history || [], message);
    return Response.json(result);
  } catch (err) {
    console.error("Error in test chat:", err);
    return Response.json({ error: "Failed to get a response" }, { status: 500 });
  }
}
