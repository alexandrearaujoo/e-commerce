import Billboard from '@/components/billboard';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';

import { getBillboard } from '@/services/getBillboard';
import { getProducts } from '@/services/getProducts';

export const revalidate = 0;

export default async function Home() {
  const [products, billboard] = await Promise.all([
    getProducts({ isFeatured: true }),
    getBillboard({
      id: '42438dd4-ef37-4f85-bf49-cc79221af7a3'
    })
  ]);

  return (
    <main>
      <Container>
        <section className="space-y-10 pb-10">
          <Billboard data={billboard} />
          <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </section>
        </section>
      </Container>
    </main>
  );
}
