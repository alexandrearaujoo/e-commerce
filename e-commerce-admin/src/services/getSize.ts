import { prisma } from '@/lib/prisma';

export const getSize = async ({ sizeId }: { sizeId: string }) => {
  const size = await prisma.size.findUnique({
    where: { id: sizeId }
  });

  return size;
};
