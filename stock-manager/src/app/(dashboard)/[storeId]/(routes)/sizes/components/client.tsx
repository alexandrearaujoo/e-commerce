'use client';

import { useParams, useRouter } from 'next/navigation';

import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { SizeColumn, columns } from './columns';

import { Plus } from 'lucide-react';

const SizeClient = ({ sizes }: { sizes: SizeColumn[] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <article className="flex items-center justify-between">
        <Heading
          description="Gerenciar os tamanhos para sua loja"
          title={`Tamanhos - ${sizes.length}`}
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </article>
      <Separator />
      <DataTable columns={columns} data={sizes} searchKey="name" />
      <Heading title="API" description="Chamadas de API para tamanhos" />
      <Separator />
      <ApiList entityIdName="sizeId" entityName="sizes" />
    </>
  );
};

export default SizeClient;
