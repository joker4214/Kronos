import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const PLATFORMS = {
  instagram: {
    maxLength: 2200,
    tone: 'engaging, visual storytelling, hashtag-friendly',
    format: 'Compelling caption with emojis and 5-10 relevant hashtags',
  },
  tiktok: {
    maxLength: 150,
    tone: 'trending, catchy, hook-focused, casual',
    format: 'Hook + punchline format. Optimized for TikTok algorithm',
  },
  linkedin: {
    maxLength: 3000,
    tone: 'professional, insightful, thought leadership',
    format: 'Professional post with actionable insights and CTA',
  },
  twitter: {
    maxLength: 280,
    tone: 'witty, concise, conversational',
    format: 'Sharp, punchy tweet with optional thread setup',
  },
};

export async function POST(request) {
  try {
    const { ideaId } = await request.json();

    // Fetch the idea from database
    const idea = await prisma.calendarIdea.findUnique({
      where: { id: ideaId },
    });

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    // Generate content for each platform
    const drafts = [];

    for (const [platform, config] of Object.entries(PLATFORMS)) {
      const prompt = `You are a social media content expert. Create a ${platform} post based on this idea:

Title: ${idea.title}
Description: ${idea.description}

Platform Requirements:
- Tone: ${config.tone}
- Max length: ${config.maxLength} characters
- Format: ${config.format}

Generate ONLY the content itself, no explanations or metadata.`;

      const message = await anthropic.messages.create({
        model: 'claude-opus-4-1',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = message.content[0].text;

      // Save draft to database
      const draft = await prisma.contentDraft.create({
        data: {
          ideaId,
          platform,
          content,
          status: 'draft',
        },
      });

      drafts.push(draft);
    }

    // Update idea status
    await prisma.calendarIdea.update({
      where: { id: ideaId },
      data: { status: 'drafted' },
    });

    return NextResponse.json(
      {
        message: 'Content generated successfully',
        drafts,
        count: drafts.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Content generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate content: ' + error.message },
      { status: 500 }
    );
  }
}
