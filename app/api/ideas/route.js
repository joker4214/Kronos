import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ideas = await prisma.calendarIdea.findMany({
      orderBy: { scheduledDate: 'desc' },
      include: {
        contentDrafts: true,
        metrics: true,
      },
    });

    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Failed to fetch ideas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description, googleEventId, scheduledDate } = await request.json();

    const idea = await prisma.calendarIdea.create({
      data: {
        title,
        description,
        googleEventId,
        scheduledDate: new Date(scheduledDate),
      },
    });

    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('Failed to create idea:', error);
    return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}
