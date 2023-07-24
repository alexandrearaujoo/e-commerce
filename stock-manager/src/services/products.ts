import { prisma } from '@/lib/prisma';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';

export const getProducts = async ({ storeId }: { storeId: string }) => {
  const products = await prisma.product.findMany({
    where: { storeId },
    include: {
      category: true,
      size: true,
      color: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    price: formatter.format(Number(product.price)),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, 'MMMM do, yyyy')
  }));

  return formattedProducts;
};

export const getProduct = async ({ productId }: { productId: string }) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: true
    }
  });

  return product;
};
