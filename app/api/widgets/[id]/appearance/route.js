import { supabase } from "../../../../lib/supabase";

const ALLOWED_FIELDS = [
  "template",
  "theme_mode",
  "theme_color",
  "width",
  "height",
  "responsive",
  "auto_open",
  "greeting_message",
];

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const update = { updated_at: new Date().toISOString() };

    for (const field of ALLOWED_FIELDS) {
      if (body[field] !== undefined) update[field] = body[field];
    }

    const { data, error } = await supabase
      .from("widget_appearance")
      .update(update)
      .eq("widget_id", params.id)
      .select()
      .single();

    if (error) throw error;
    return Response.json(data);
  } catch (err) {
    console.error("Error updating appearance:", err);
    return Response.json(
      { error: "Failed to update appearance" },
      { status: 500 }
    );
  }
}
