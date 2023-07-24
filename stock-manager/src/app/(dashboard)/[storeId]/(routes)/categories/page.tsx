import CategoryClient from './components/client';

import { getCategories } from '@/services/categories';
import { format } from 'date-fns';

export default async function CategoriesPage({
  params
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const categories = await getCategories({ storeId });

  const formattedCategories = categories.map((category) => ({
    ...category,
    createdAt: format(category.createdAt, 'MMMM do, yyyy')
  }));

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient categories={formattedCategories} />
      </article>
    </section>
  );
}
