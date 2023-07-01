import { prisma } from '@/lib/prisma';

export const getStores = async ({ userId }: { userId: string }) => {
  const stores = await prisma.store.findMany({ where: { userId } });

  return stores;
};
