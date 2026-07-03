import { supabase } from "../../../../lib/supabase.js";
import { generateContentIdeas, generateCaption } from "../../../../lib/claude.js";

export async function GET(req) {
  try {
    const agencyId = process.env.AGENCY_ID;

    const { data: agency } = await supabase
      .from("agencies")
      .select("brand_voice")
      .eq("id", agencyId)
      .single();

    if (!agency) {
      return Response.json({ error: "Agency not found" }, { status: 404 });
    }

    const ideas = await generateContentIdeas(agencyId, agency.brand_voice);

    for (const idea of ideas) {
      const caption = await generateCaption(idea.idea, agency.brand_voice);

      await supabase.from("content_ideas").insert([
        {
          agency_id: agencyId,
          idea: idea.idea,
          type: idea.type,
          status: "draft",
        },
      ]);

      await supabase.from("posts").insert([
        {
          agency_id: agencyId,
          platform: "instagram",
          caption: caption,
          copy: idea.description,
          status: "draft",
        },
      ]);
    }

    return Response.json({
      success: true,
      ideas_generated: ideas.length,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
