import Anthropic from "@anthropic-ai/sdk";

export const claude = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function generateContentIdeas(agencyId, brandVoice) {
  const response = await claude.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a content strategist for an e-commerce design agency called Dharma's Esthetic Design Center.

Brand Voice: ${brandVoice}

Generate 5-7 content ideas for this week. Mix of:
- 2-3 portfolio/case study posts
- 1-2 relatable/humor posts  
- 1 educational/tips post
- 1 testimonial/result post

Format as JSON array with objects containing: { idea: string, type: string, description: string }`,
      },
    ],
  });

  const content = response.content[0].text;
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  return JSON.parse(jsonMatch[0]);
}

export async function generateCaption(idea, brandVoice) {
  const response = await claude.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `Write a social media caption for this content idea, matching this brand voice:

Brand Voice: ${brandVoice}

Content Idea: ${idea}

Make it engaging, on-brand, and include a CTA. Keep it under 280 characters.`,
      },
    ],
  });

  return response.content[0].text;
}
