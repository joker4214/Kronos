import { supabase } from "../../../lib/supabase";

export async function GET(request, { params }) {
  try {
    const { data, error } = await supabase
      .from("widgets")
      .select(
        "*, clients(id, name, email), widget_appearance(*), widget_lead_routing(*)"
      )
      .eq("id", params.id)
      .single();

    if (error) throw error;
    return Response.json(data);
  } catch (err) {
    console.error("Error fetching widget:", err);
    return Response.json({ error: "Widget not found" }, { status: 404 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("widgets")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;
    return Response.json(data);
  } catch (err) {
    console.error("Error updating widget:", err);
    return Response.json({ error: "Failed to update widget" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await supabase.from("widgets").delete().eq("id", params.id);
    if (error) throw error;
    return Response.json({ success: true });
  } catch (err) {
    console.error("Error deleting widget:", err);
    return Response.json({ error: "Failed to delete widget" }, { status: 500 });
  }
}
