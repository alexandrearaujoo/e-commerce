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
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived
    } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    if (
      !name ||
      !price ||
      !categoryId ||
      !colorId ||
      !sizeId ||
      !images ||
      !images.length
    ) {
      return new NextResponse('All fields are required', {
        status: 400
      });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)]
          }
        },
        isFeatured,
        isArchived,
        storeId
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log('[PRODUCT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured') ? true : undefined;

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived: false
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
