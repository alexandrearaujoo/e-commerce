import { Billboard } from '@/interfaces';

const url = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export const getBillboard = async ({ id }: { id: string }) => {
  const res = await fetch(`${url}/${id}`);

  return (await res.json()) as Billboard;
};
