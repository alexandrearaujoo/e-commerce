import { prisma } from '@/lib/prisma';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';

export const getOrders = async ({ storeId }: { storeId: string }) => {
  const orders = await prisma.order.findMany({
    where: { storeId },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });

  const formattedOrders = orders.map((order) => ({
    ...order,
    products: order.orderItems.map((item) => item.product.name).join(', '),
    totalPrice: formatter.format(
      order.orderItems.reduce(
        (acc, item) => acc + Number(item.product.price),
        0
      )
    ),
    createdAt: format(order.createdAt, 'MMMM do, yyyy')
  }));

  return formattedOrders;
};
