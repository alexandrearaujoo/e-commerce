import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useCartStore } from '@/stores/cartStore';
import axios from 'axios';

export const useSummary = () => {
  const searchParams = useSearchParams();
  const items = useCartStore((state) => state.items);
  const removeAll = useCartStore((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed');
      removeAll();
      return;
    }

    if (searchParams.get('canceled')) {
      toast.error('Payment canceled');
      return;
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((acc, item) => acc + +item.price, 0);

  const onCheckout = async () => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      { productIds: items.map((item) => item.id) }
    );

    window.location = data.url;
  };

  return {
    totalPrice,
    onCheckout
  };
};
