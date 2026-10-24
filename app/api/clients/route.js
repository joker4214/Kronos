import { supabase } from "../../lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select("id, name, email")
      .order("name", { ascending: true });

    if (error) throw error;
    return Response.json(data || []);
  } catch (err) {
    console.error("Error fetching clients:", err);
    return Response.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    if (!name) {
      return Response.json({ error: "name is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("clients")
      .insert([{ name, email: email || null }])
      .select()
      .single();

    if (error) throw error;
    return Response.json(data, { status: 201 });
  } catch (err) {
    console.error("Error creating client:", err);
    return Response.json({ error: "Failed to create client" }, { status: 500 });
  }
}
