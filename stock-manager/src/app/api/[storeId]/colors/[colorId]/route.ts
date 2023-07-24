import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const { colorId } = params;

    if (!colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    const color = await prisma.color.findUnique({
      where: {
        id: colorId
      }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, value } = await req.json();

    if (!name || !value) {
      return new NextResponse('Name and Value is required', {
        status: 400
      });
    }

    const { storeId, colorId } = params;

    if (!colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await prisma.color.updateMany({
      where: {
        id: colorId
      },
      data: { name, value }
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { storeId, colorId } = params;

    if (!colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prisma.color.deleteMany({
      where: {
        id: colorId
      }
    });

    return NextResponse.json('');
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
