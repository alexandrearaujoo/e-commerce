import SizeClient from './components/client';

import { getSizes } from '@/services/getSizes';
import { format } from 'date-fns';

export default async function SizePage({
  params
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const sizes = await getSizes({ storeId });

  const formattedSizes = sizes.map((size) => ({
    ...size,
    createdAt: format(size.createdAt, 'MMMM do, yyyy')
  }));

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formattedSizes} />
      </article>
    </section>
  );
}
