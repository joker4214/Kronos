import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return Response.json(
        { error: "Failed to fetch projects" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return Response.json([]);
    }

    return Response.json(data);
  } catch (err) {
    console.error("Error fetching projects:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("projects")
      .insert([body])
      .select();

    if (error) throw error;
    return Response.json(data[0], { status: 201 });
  } catch (err) {
    console.error("Error creating project:", err);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
