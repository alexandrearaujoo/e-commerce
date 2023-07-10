import Cart from './components/cart';
import Container from '@/components/ui/container';

export default function CartPage() {
  return (
    <main className="bg-white">
      <Container>
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <Cart />
        </section>
      </Container>
    </main>
  );
}
