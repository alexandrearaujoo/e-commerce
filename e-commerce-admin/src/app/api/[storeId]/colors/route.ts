import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;
    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    if (!name || !value) {
      return new NextResponse('Name and Value is required', {
        status: 400
      });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await prisma.color.create({
      data: { name, value, storeId }
    });

    return NextResponse.json(color, { status: 201 });
  } catch (error) {
    console.log('[COLOR_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const colors = await prisma.color.findMany({
      where: { storeId }
    });

    return NextResponse.json(colors, { status: 200 });
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
