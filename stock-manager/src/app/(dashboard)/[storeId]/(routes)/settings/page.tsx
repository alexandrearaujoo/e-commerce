import { redirect } from 'next/navigation';

import SettingsForm from './components/settings-form';

import { getStore } from '@/services/getStore';
import { auth } from '@clerk/nextjs';

export default async function SettingsPage({
  params
}: {
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const { storeId } = params;

  const store = await getStore({ id: storeId, userId });

  if (!store) redirect('/');

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialValues={store} />
      </article>
    </section>
  );
}
