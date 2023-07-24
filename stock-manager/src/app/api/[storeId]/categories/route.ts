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
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    if (!name) {
      return new NextResponse('Name is required', {
        status: 400
      });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const category = await prisma.category.create({
      data: { name, storeId }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.log('[CATEGORY_POST]', error);
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

    const categories = await prisma.category.findMany({
      where: { storeId }
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
