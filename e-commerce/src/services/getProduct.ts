import { Product } from '@/interfaces';

const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProduct = async ({ id }: { id: string }) => {
  const res = await fetch(`${url}/${id}`);

  return (await res.json()) as Product;
};
