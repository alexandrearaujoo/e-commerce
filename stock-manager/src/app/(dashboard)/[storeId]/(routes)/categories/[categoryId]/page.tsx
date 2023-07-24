import CategoryForm from './components/category-form';

import { getBillboards } from '@/services/billboards';
import { getCategory } from '@/services/categories';

export default async function CategoryPage({
  params
}: {
  params: { categoryId: string; storeId: string };
}) {
  const { categoryId, storeId } = params;

  const [category, billboards] = await Promise.all([
    getCategory({ categoryId }),
    getBillboards({ storeId })
  ]);

  return (
    <article className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialValues={category} billboards={billboards} />
      </div>
    </article>
  );
}
