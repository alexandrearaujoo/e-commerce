import { prisma } from '@/lib/prisma';

export const getStore = async ({
  id,
  userId
}: {
  id?: string;
  userId?: string;
}) => {
  let store;

  if (id && !userId) {
    store = await prisma.store.findFirst({
      where: {
        id
      }
    });
  }

  if (userId && !id) {
    store = await prisma.store.findFirst({
      where: {
        userId
      }
    });
  }

  if (id && userId) {
    store = await prisma.store.findFirst({
      where: {
        id,
        userId
      }
    });
  }

  return store;
};
