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
