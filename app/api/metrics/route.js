import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const metrics = await prisma.metric.findMany({
      orderBy: { collectedAt: 'desc' },
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Failed to fetch metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { ideaId, platform, conversions, clicks, timeOnPage, engagement } = await request.json();

    const metric = await prisma.metric.create({
      data: {
        ideaId,
        platform,
        conversions: conversions || 0,
        clicks: clicks || 0,
        timeOnPage,
        engagement: engagement || 0,
      },
    });

    return NextResponse.json(metric, { status: 201 });
  } catch (error) {
    console.error('Failed to create metric:', error);
    return NextResponse.json(
      { error: 'Failed to create metric' },
      { status: 500 }
    );
  }
}
