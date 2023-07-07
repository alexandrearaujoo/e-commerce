import { Category } from '@/interfaces';

const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategory = async ({ id }: { id: string }) => {
  const res = await fetch(`${url}/${id}`);

  return (await res.json()) as Category;
};
