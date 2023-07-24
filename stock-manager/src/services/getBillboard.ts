import { prisma } from '@/lib/prisma';

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
