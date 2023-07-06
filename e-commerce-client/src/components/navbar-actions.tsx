'use client';

import { useEffect, useState } from 'react';

import Button from './ui/button';

import { ShoppingBag } from 'lucide-react';

const NavBarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag className="h-4 w-4" size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">0</span>
      </Button>
    </section>
  );
};

export default NavBarActions;
