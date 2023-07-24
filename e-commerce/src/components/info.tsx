import Button from './ui/button';
import Currency from './ui/currency';

import { Product } from '@/interfaces';
import { ShoppingCart } from 'lucide-react';

const Info = ({ data }: { data: Product }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <section className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size: </h3>
          <span>{data.size.name}</span>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color: </h3>
          <span
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data.color.value }}
          />
        </div>
      </section>
      <section className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">Add to cart</Button>
        <ShoppingCart />
      </section>
    </div>
  );
};

export default Info;
