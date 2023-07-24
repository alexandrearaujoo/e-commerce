'use client';

import { useEffect } from 'react';

import { useModalStore } from '@/hooks/useModalStore';

export default function Home() {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
