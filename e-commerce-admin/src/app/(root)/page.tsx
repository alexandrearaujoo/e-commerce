'use client';

import { useEffect } from 'react';

import { useModalStore } from '@/hooks/useModalStore';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return (
    <main>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
