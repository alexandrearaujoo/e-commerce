import { prisma } from '@/lib/prisma';

export const getCategory = async ({ categoryId }: { categoryId: string }) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  return category;
};
