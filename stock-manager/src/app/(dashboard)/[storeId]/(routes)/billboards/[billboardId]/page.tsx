import BillboardForm from './components/billboard-form';

import { getBillboard } from '@/services/getBillboard';

export default async function BillboardPage({
  params
}: {
  params: { billboardId: string };
}) {
  const { billboardId } = params;

  const billboard = await getBillboard({ billboardId });

  return (
    <article className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialValues={billboard} />
      </div>
    </article>
  );
}
