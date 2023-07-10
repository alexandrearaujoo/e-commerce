'use client';

import { useEffect, useState } from 'react';

import CartItem from './cart-item';
import Summary from './summary';

import { useCartStore } from '@/stores/cartStore';

const Cart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
      <section className="lg:col-span-7">
        {items.length === 0 && (
          <p className="text-neutral-500">No items added to cart!</p>
        )}
        <ul>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
      </section>
      <Summary isEmpty={items.length === 0} />
    </div>
  );
};

export default Cart;
