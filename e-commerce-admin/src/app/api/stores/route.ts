import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await prisma.store.create({ data: { name, userId } });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
