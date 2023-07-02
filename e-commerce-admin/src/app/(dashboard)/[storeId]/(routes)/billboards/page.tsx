import BillboardClient from './components/client';

export default async function BillboardPage() {
  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </article>
    </section>
  );
}
