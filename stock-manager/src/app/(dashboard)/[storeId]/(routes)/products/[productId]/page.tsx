import ProductForm from './components/product-form';

import { getCategories } from '@/services/categories';
import { getColors } from '@/services/colors';
import { getProduct } from '@/services/products';
import { getSizes } from '@/services/sizes';

export async function generateMetadata({
  params
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const product = await getProduct({ productId });

  const title = product?.name ? 'Editar produto' : 'Criar produto';

  return {
    title
  };
}

export default async function ProductPage({
  params
}: {
  params: { productId: string; storeId: string };
}) {
  const { productId, storeId } = params;

  const [product, categories, sizes, colors] = await Promise.all([
    getProduct({ productId }),
    getCategories({ storeId }),
    getSizes({ storeId }),
    getColors({ storeId })
  ]);

  return (
    <article className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialValues={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </article>
  );
}
