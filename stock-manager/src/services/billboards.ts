import { prisma } from '@/lib/prisma';

export const getBillboards = async ({ storeId }: { storeId: string }) => {
  const billboards = await prisma.billboard.findMany({
    where: { storeId },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return billboards;
};

export const getBillboard = async ({
  billboardId
}: {
  billboardId: string;
}) => {
  const billboard = await prisma.billboard.findUnique({
    where: { id: billboardId }
  });

  return billboard;
};
