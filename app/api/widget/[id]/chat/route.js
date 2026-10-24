import { supabase } from "../../../../lib/supabase";
import { chat } from "../../../../lib/widgetAgent";
import { sendLeadEmail } from "../../../../lib/leadNotify";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request, { params }) {
  const widgetId = params.id;

  try {
    const { conversationId, visitorId, message } = await request.json();

    if (!message) {
      return Response.json(
        { error: "message is required" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const [{ data: widget, error: widgetError }, { data: knowledge }, { data: routing }] =
      await Promise.all([
        supabase
          .from("widgets")
          .select("*, clients(id, name, email, agency_id)")
          .eq("id", widgetId)
          .single(),
        supabase
          .from("widget_knowledge_sources")
          .select("*")
          .eq("widget_id", widgetId)
          .eq("status", "ready"),
        supabase
          .from("widget_lead_routing")
          .select("*")
          .eq("widget_id", widgetId)
          .single(),
      ]);

    if (widgetError || !widget) {
      return Response.json(
        { error: "Widget not found" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    let conversation;
    if (conversationId) {
      const { data } = await supabase
        .from("widget_conversations")
        .select("*")
        .eq("id", conversationId)
        .eq("widget_id", widgetId)
        .single();
      conversation = data;
    }

    if (!conversation) {
      const { data, error } = await supabase
        .from("widget_conversations")
        .insert([{ widget_id: widgetId, visitor_id: visitorId || null }])
        .select()
        .single();
      if (error) throw error;
      conversation = data;
    }

    const { data: history } = await supabase
      .from("widget_messages")
      .select("role, content")
      .eq("conversation_id", conversation.id)
      .order("created_at", { ascending: true });

    const result = await chat(widget, knowledge || [], history || [], message);

    await supabase.from("widget_messages").insert([
      { conversation_id: conversation.id, role: "user", content: message },
      { conversation_id: conversation.id, role: "assistant", content: result.reply },
    ]);

    if (result.leadCaptured) {
      const client = widget.clients;
      await supabase.from("leads").insert([
        {
          agency_id: client?.agency_id || null,
          source: "widget",
          widget_id: widgetId,
          name: result.leadCaptured.name,
          email: result.leadCaptured.email || null,
          message: result.leadCaptured.message,
        },
      ]);

      if (routing?.email_enabled) {
        try {
          await sendLeadEmail(widget, client, {
            ...result.leadCaptured,
            notificationEmails: routing.notification_emails,
          });
        } catch (emailErr) {
          console.error("Lead email failed:", emailErr);
        }
      }
    }

    return Response.json(
      {
        reply: result.reply,
        conversationId: conversation.id,
        leadCaptured: Boolean(result.leadCaptured),
      },
      { headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error("Error in widget chat:", err);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
