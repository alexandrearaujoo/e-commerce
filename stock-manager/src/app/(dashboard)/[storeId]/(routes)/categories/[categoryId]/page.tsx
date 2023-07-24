import CategoryForm from './components/category-form';

import { getCategory } from '@/services/categories';

export async function generateMetadata({
  params
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;

  const category = await getCategory({ categoryId });

  const title = category?.name ? 'Editar categoria' : 'Criar categoria';

  return {
    title
  };
}

export default async function CategoryPage({
  params
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;

  const category = await getCategory({ categoryId });

  return (
    <article className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialValues={category} />
      </div>
    </article>
  );
}
