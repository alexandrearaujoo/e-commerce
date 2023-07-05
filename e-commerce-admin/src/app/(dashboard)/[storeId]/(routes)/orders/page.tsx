import OrderClient from './components/client';

import { getOrders } from '@/services/orders';

export default async function OrderPage({
  params
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const orders = await getOrders({ storeId });

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient orders={orders} />
      </article>
    </section>
  );
}
