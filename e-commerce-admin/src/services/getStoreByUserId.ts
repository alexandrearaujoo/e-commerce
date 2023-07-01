import { prisma } from '@/lib/prisma';

export const getStoreByUserId = async ({ userId }: { userId: string }) => {
  const store = await prisma.store.findFirst({ where: { userId } });

  return store;
};
