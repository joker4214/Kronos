import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const drafts = await prisma.contentDraft.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        idea: true,
      },
    });

    return NextResponse.json(drafts);
  } catch (error) {
    console.error('Failed to fetch drafts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch drafts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { ideaId, platform, content, imageUrl } = await request.json();

    const draft = await prisma.contentDraft.create({
      data: {
        ideaId,
        platform,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(draft, { status: 201 });
  } catch (error) {
    console.error('Failed to create draft:', error);
    return NextResponse.json(
      { error: 'Failed to create draft' },
      { status: 500 }
    );
  }
}
