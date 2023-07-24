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

    const size = await prisma.size.create({
      data: { name, value, storeId }
    });

    return NextResponse.json(size, { status: 201 });
  } catch (error) {
    console.log('[SIZE_POST]', error);
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

    const sizes = await prisma.size.findMany({
      where: { storeId }
    });

    return NextResponse.json(sizes, { status: 200 });
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
