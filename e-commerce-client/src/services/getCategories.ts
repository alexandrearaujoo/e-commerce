import { Category } from '@/interfaces';

const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async () => {
  const res = await fetch(url);

  return (await res.json()) as Category[];
};
