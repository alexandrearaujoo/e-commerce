'use client';

import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';

import { useSummary } from '@/hooks/useSummary';

const Summary = () => {
  const { onCheckout, totalPrice } = useSummary();

  return (
    <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Oder Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-base font-medium text-gray-900">Order Total</p>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button className="mt-6 w-full" onClick={onCheckout}>
        Checkout
      </Button>
    </section>
  );
};

export default Summary;
