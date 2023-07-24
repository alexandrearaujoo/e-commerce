import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { billboardId } = params;

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    const billboard = await prisma.billboard.findUnique({
      where: {
        id: billboardId
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { label, imgUrl } = await req.json();

    if (!label || !imgUrl) {
      return new NextResponse('Label and Image URL is required', {
        status: 400
      });
    }

    const { storeId, billboardId } = params;

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prisma.billboard.updateMany({
      where: {
        id: billboardId
      },
      data: { label, imgUrl }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { storeId, billboardId } = params;

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prisma.billboard.deleteMany({
      where: {
        id: billboardId
      }
    });

    return NextResponse.json('');
  } catch (error) {
    console.log('[BILLBOARDS_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
