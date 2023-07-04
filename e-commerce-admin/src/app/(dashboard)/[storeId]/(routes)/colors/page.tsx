import ColorClient from './components/client';

import { getColors } from '@/services/colors';
import { format } from 'date-fns';

export default async function ColorsPage({
  params
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const colors = await getColors({ storeId });

  const formattedColors = colors.map((color) => ({
    ...color,
    createdAt: format(color.createdAt, 'MMMM do, yyyy')
  }));

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient colors={formattedColors} />
      </article>
    </section>
  );
}
