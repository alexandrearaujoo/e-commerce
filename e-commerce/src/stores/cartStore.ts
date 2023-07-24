import { toast } from 'react-hot-toast';

import { Product } from '@/interfaces';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast.error('Item already added');
          return;
        }

        set({ items: [...currentItems, data] });
        toast.success('Item added to cart');
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success('Item removed from cart');
      },
      removeAll: () => {
        set({ items: [] });
      }
    }),
    {
      name: 'cartStorage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
