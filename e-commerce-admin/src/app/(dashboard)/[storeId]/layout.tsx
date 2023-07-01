import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getStore } from '@/services/getStore';
import { auth } from '@clerk/nextjs';

export default async function DashboardLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) redirect('/sign-in');

  const store = await getStore({ id: storeId, userId });

  if (!store) redirect('/');

  return (
    <main>
      This will be nav bar
      {children}
    </main>
  );
}
