import { supabase } from "../../../../lib/supabase";

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const update = {
      updated_at: new Date().toISOString(),
    };

    if (typeof body.email_enabled === "boolean") {
      update.email_enabled = body.email_enabled;
    }
    if (Array.isArray(body.notification_emails)) {
      update.notification_emails = body.notification_emails;
    }

    const { data, error } = await supabase
      .from("widget_lead_routing")
      .update(update)
      .eq("widget_id", params.id)
      .select()
      .single();

    if (error) throw error;
    return Response.json(data);
  } catch (err) {
    console.error("Error updating lead routing:", err);
    return Response.json(
      { error: "Failed to update lead routing" },
      { status: 500 }
    );
  }
}
