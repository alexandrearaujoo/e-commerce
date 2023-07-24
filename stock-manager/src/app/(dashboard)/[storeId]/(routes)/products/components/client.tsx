'use client';

import { useParams, useRouter } from 'next/navigation';

import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { ProductColumn, columns } from './columns';

import { Plus } from 'lucide-react';

const ProductClient = ({ products }: { products: ProductColumn[] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <article className="flex items-center justify-between">
        <Heading
          description="Gerencie os produtos da sua loja"
          title={`Produtos - ${products.length}`}
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </article>
      <Separator />
      <DataTable columns={columns} data={products} searchKey="name" />
      <Heading title="API" description="Chamadas de API para produtos" />
      <Separator />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
};

export default ProductClient;
