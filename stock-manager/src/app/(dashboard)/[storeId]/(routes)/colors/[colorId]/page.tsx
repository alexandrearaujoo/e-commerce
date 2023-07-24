import ColorForm from './components/color-form';

import { getColor } from '@/services/colors';

export async function generateMetadata({
  params
}: {
  params: { colorId: string };
}) {
  const { colorId } = params;

  const color = await getColor({ colorId });

  const title = color?.name ? 'Editar cor' : 'Criar cor';

  return {
    title
  };
}

export default async function SizePage({
  params
}: {
  params: { colorId: string };
}) {
  const { colorId } = params;

  const color = await getColor({ colorId });

  return (
    <article className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialValues={color} />
      </div>
    </article>
  );
}
