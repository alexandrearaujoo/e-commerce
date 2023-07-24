'use client';

import { useParams, useRouter } from 'next/navigation';

import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { CategoryColumn, columns } from './columns';

import { Plus } from 'lucide-react';

const CategoryClient = ({ categories }: { categories: CategoryColumn[] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <article className="flex items-center justify-between">
        <Heading
          title={`Categorias - ${categories.length}`}
          description="Gerenciar categorias para sua loja"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </article>
      <Separator />
      <DataTable columns={columns} data={categories} searchKey="name" />
      <Heading title="API" description="Chamadas de API para categorias" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
