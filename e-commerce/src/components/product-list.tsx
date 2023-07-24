import NoResults from './ui/no-results';
import ProductCard from './ui/product-card';

import { Product } from '@/interfaces';

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList = ({ title, items }: ProductListProps) => {
  return (
    <section className="space-y-4">
      <h3 className="text-3xl font-bold">{title}</h3>
      {items.length === 0 && <NoResults />}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
