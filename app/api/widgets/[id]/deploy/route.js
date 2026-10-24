import { supabase } from "../../../../lib/supabase";

export async function PATCH(request, { params }) {
  try {
    const { data, error } = await supabase
      .from("widgets")
      .update({ status: "deployed", updated_at: new Date().toISOString() })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;

    const origin = process.env.KRONOS_BASE_URL || new URL(request.url).origin;
    const embedSnippet = `<script src="${origin}/api/widget/${params.id}/embed.js" async></script>`;

    return Response.json({ widget: data, embedSnippet });
  } catch (err) {
    console.error("Error deploying widget:", err);
    return Response.json({ error: "Failed to deploy widget" }, { status: 500 });
  }
}
