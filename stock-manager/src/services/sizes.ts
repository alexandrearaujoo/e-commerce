import { prisma } from '@/lib/prisma';

export const getSizes = async ({ storeId }: { storeId: string }) => {
  const sizes = await prisma.size.findMany({
    where: { storeId },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return sizes;
};

export const getSize = async ({ sizeId }: { sizeId: string }) => {
  const size = await prisma.size.findUnique({
    where: { id: sizeId }
  });

  return size;
};
