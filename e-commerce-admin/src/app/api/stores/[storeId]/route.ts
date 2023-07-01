import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const store = await prisma.store.updateMany({
      where: {
        id: storeId,
        userId
      },
      data: { name }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    await prisma.store.deleteMany({
      where: {
        id: storeId,
        userId
      }
    });

    return NextResponse.json('');
  } catch (error) {
    console.log('[STORES_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
