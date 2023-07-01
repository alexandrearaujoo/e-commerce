import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useModalStore } from './useModalStore';

import { Store } from '@prisma/client';

export const useStoreSwitcher = (items: Store[]) => {
  const onOpen = useModalStore((state) => state.onOpen);
  const params = useParams();
  const routes = useRouter();
  const [open, setOpen] = useState(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    routes.push(`/${store.value}`);
  };

  return { currentStore, onStoreSelect, open, onOpen, setOpen, formattedItems };
};
