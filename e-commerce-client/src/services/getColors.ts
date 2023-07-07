import { Color } from '@/interfaces';

const url = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

export const getColors = async () => {
  const res = await fetch(url);

  return (await res.json()) as Color[];
};
