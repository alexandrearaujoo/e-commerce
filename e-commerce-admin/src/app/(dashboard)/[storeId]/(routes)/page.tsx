import { getStore } from '@/services/getStore';

export default async function DashboardPage({
  params
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const store = await getStore({ id: storeId });

  return <section>Active Store: {store?.name}</section>;
}
