import { prisma } from '@/lib/prisma';

export const getColors = async ({ storeId }: { storeId: string }) => {
  const colors = await prisma.color.findMany({
    where: { storeId },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return colors;
};

export const getColor = async ({ colorId }: { colorId: string }) => {
  const color = await prisma.color.findUnique({
    where: { id: colorId }
  });

  return color;
};
