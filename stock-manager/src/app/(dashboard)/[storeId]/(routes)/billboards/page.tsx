import BillboardClient from './components/client';

import { getBillboards } from '@/services/billboards';
import { format } from 'date-fns';

export default async function BillboardPage({
  params
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const billboards = await getBillboards({ storeId });

  const formattedBillboards = billboards.map((billboard) => ({
    ...billboard,
    createdAt: format(billboard.createdAt, 'MMMM do, yyyy')
  }));

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formattedBillboards} />
      </article>
    </section>
  );
}
