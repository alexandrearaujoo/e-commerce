import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getStore } from '@/services/stores';
import { auth } from '@clerk/nextjs';

export default async function HomeLayout({
  children
}: {
  children: ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const store = await getStore({ userId });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
