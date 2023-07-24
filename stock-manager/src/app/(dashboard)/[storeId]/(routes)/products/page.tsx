import ProductClient from './components/client';

import { getProducts } from '@/services/products';

export default async function ProductPage({
  params
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const products = await getProducts({ storeId });

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient products={products} />
      </article>
    </section>
  );
}
