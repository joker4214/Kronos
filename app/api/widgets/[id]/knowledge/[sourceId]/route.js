import { supabase } from "../../../../../lib/supabase";

export async function DELETE(request, { params }) {
  try {
    const { error } = await supabase
      .from("widget_knowledge_sources")
      .delete()
      .eq("id", params.sourceId)
      .eq("widget_id", params.id);

    if (error) throw error;
    return Response.json({ success: true });
  } catch (err) {
    console.error("Error deleting knowledge source:", err);
    return Response.json(
      { error: "Failed to delete knowledge source" },
      { status: 500 }
    );
  }
}
