'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/stores/cartStore';
import { ShoppingBag } from 'lucide-react';

const NavBarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { addItem, items, removeAll, removeItem } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="ml-auto flex items-center gap-x-4">
      <Link
        className="flex items-center rounded-full bg-black px-4 py-2"
        href="/cart"
      >
        <ShoppingBag className="h-4 w-4" size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {items.length}
        </span>
      </Link>
    </section>
  );
};

export default NavBarActions;
