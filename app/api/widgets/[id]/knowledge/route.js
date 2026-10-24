import { supabase } from "../../../../lib/supabase";
import { scrapeWebsite } from "../../../../lib/scraper";

export async function GET(request, { params }) {
  try {
    const { data, error } = await supabase
      .from("widget_knowledge_sources")
      .select("*")
      .eq("widget_id", params.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return Response.json(data || []);
  } catch (err) {
    console.error("Error fetching knowledge sources:", err);
    return Response.json(
      { error: "Failed to fetch knowledge sources" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const widgetId = params.id;

    if (body.type === "website") {
      if (!body.source_url) {
        return Response.json({ error: "source_url is required" }, { status: 400 });
      }

      const { data: row, error: insertError } = await supabase
        .from("widget_knowledge_sources")
        .insert([
          {
            widget_id: widgetId,
            type: "website",
            source_url: body.source_url,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      try {
        const content = await scrapeWebsite(body.source_url);
        const { data: updated, error: updateError } = await supabase
          .from("widget_knowledge_sources")
          .update({ content, status: "ready" })
          .eq("id", row.id)
          .select()
          .single();

        if (updateError) throw updateError;
        return Response.json(updated, { status: 201 });
      } catch (scrapeErr) {
        console.error("Scrape failed:", scrapeErr);
        await supabase
          .from("widget_knowledge_sources")
          .update({ status: "failed" })
          .eq("id", row.id);
        return Response.json(
          { error: "Failed to scrape website", id: row.id },
          { status: 502 }
        );
      }
    }

    if (body.type === "faq") {
      if (!body.question || !body.answer) {
        return Response.json(
          { error: "question and answer are required" },
          { status: 400 }
        );
      }

      const { data, error } = await supabase
        .from("widget_knowledge_sources")
        .insert([
          {
            widget_id: widgetId,
            type: "faq",
            question: body.question,
            answer: body.answer,
            status: "ready",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return Response.json(data, { status: 201 });
    }

    return Response.json(
      { error: "type must be 'website' or 'faq' (use the files endpoint for file uploads)" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Error adding knowledge source:", err);
    return Response.json(
      { error: "Failed to add knowledge source" },
      { status: 500 }
    );
  }
}
