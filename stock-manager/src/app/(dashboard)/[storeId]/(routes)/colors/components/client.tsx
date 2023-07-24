'use client';

import { useParams, useRouter } from 'next/navigation';

import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { ColorColumn, columns } from './columns';

import { Plus } from 'lucide-react';

const ColorClient = ({ colors }: { colors: ColorColumn[] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <article className="flex items-center justify-between">
        <Heading
          description="Gerenciar cores para sua loja"
          title={`Cores - ${colors.length}`}
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </article>
      <Separator />
      <DataTable columns={columns} data={colors} searchKey="name" />
      <Heading title="API" description="Chamadas de API para cores" />
      <Separator />
      <ApiList entityIdName="colorId" entityName="colors" />
    </>
  );
};

export default ColorClient;
