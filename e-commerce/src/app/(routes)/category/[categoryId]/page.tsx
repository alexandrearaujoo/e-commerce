import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';
import Billboard from '@/components/billboard';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';

import { getCategory } from '@/services/getCategory';
import { getColors } from '@/services/getColors';
import { getProducts } from '@/services/getProducts';
import { getSizes } from '@/services/getSizes';

export const revalidate = 0;

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { categoryId: string };
  searchParams: { colorId: string; sizeId: string };
}) {
  const { categoryId } = params;
  const { colorId, sizeId } = searchParams;

  const products = await getProducts({ categoryId, colorId, sizeId });

  const [sizes, colors, category] = await Promise.all([
    getSizes(),
    getColors(),
    getCategory({ id: categoryId })
  ]);

  return (
    <main className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}

              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
