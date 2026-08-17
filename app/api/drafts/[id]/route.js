import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status, postUrl } = await request.json();

    const draft = await prisma.contentDraft.update({
      where: { id },
      data: {
        status,
        postUrl,
      },
    });

    return NextResponse.json(draft);
  } catch (error) {
    console.error('Failed to update draft:', error);
    return NextResponse.json(
      { error: 'Failed to update draft' },
      { status: 500 }
    );
  }
}
