import { Size } from '@/interfaces';

const url = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

export const getSizes = async () => {
  const res = await fetch(url);

  return (await res.json()) as Size[];
};
