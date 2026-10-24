import { supabase } from "../../../../lib/supabase";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request, { params }) {
  try {
    const { data, error } = await supabase
      .from("widgets")
      .select("id, name, status, widget_appearance(*)")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return Response.json(
        { error: "Widget not found" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    const appearance = data.widget_appearance?.[0] || {};

    return Response.json(
      {
        id: data.id,
        name: data.name,
        template: appearance.template || "professional",
        themeMode: appearance.theme_mode || "dark",
        themeColor: appearance.theme_color || "#4A7C59",
        width: appearance.width || 400,
        height: appearance.height || 700,
        responsive: appearance.responsive ?? true,
        autoOpen: appearance.auto_open ?? false,
        greeting: appearance.greeting_message || "Hello! How can I help you today?",
      },
      { headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error("Error fetching widget config:", err);
    return Response.json(
      { error: "Failed to load widget config" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
