import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const { sizeId } = params;

    if (!sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    const size = await prisma.size.findUnique({
      where: {
        id: sizeId
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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

    const { storeId, sizeId } = params;

    if (!sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await prisma.size.updateMany({
      where: {
        id: sizeId
      },
      data: { name, value }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { storeId, sizeId } = params;

    if (!sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prisma.size.deleteMany({
      where: {
        id: sizeId
      }
    });

    return NextResponse.json('');
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
