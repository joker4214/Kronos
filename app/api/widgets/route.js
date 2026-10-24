import { supabase } from "../../lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("widgets")
      .select("*, clients(id, name)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return Response.json(data || []);
  } catch (err) {
    console.error("Error fetching widgets:", err);
    return Response.json({ error: "Failed to fetch widgets" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { client_id, name } = await request.json();

    if (!client_id || !name) {
      return Response.json(
        { error: "client_id and name are required" },
        { status: 400 }
      );
    }

    const { data: widget, error } = await supabase
      .from("widgets")
      .insert([{ client_id, name }])
      .select()
      .single();

    if (error) throw error;

    const [{ error: routingError }, { error: appearanceError }] =
      await Promise.all([
        supabase.from("widget_lead_routing").insert([{ widget_id: widget.id }]),
        supabase.from("widget_appearance").insert([{ widget_id: widget.id }]),
      ]);

    if (routingError) throw routingError;
    if (appearanceError) throw appearanceError;

    return Response.json(widget, { status: 201 });
  } catch (err) {
    console.error("Error creating widget:", err);
    return Response.json({ error: "Failed to create widget" }, { status: 500 });
  }
}
