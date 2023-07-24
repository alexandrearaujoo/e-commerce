import { prisma } from '@/lib/prisma';

export const getCategories = async ({ storeId }: { storeId: string }) => {
  const categories = await prisma.category.findMany({
    where: { storeId },
    include: { billboard: true },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return categories;
};

export const getCategory = async ({ categoryId }: { categoryId: string }) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  return category;
};
