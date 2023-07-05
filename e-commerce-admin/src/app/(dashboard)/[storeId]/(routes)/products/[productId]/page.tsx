import ProductForm from './components/product-form';

import { getColors } from '@/services/colors';
import { getCategories } from '@/services/getCategories';
import { getSizes } from '@/services/getSizes';
import { getProduct } from '@/services/products';

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
