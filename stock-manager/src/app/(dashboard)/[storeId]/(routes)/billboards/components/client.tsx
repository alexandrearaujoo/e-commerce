'use client';

import { useParams, useRouter } from 'next/navigation';

import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { BillboardColumn, columns } from './columns';

import { Plus } from 'lucide-react';

const BillboardClient = ({ billboards }: { billboards: BillboardColumn[] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <article className="flex items-center justify-between">
        <Heading
          description="Gerenciar painéis para sua loja"
          title={`Painéis - ${billboards.length}`}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </article>
      <Separator />
      <DataTable columns={columns} data={billboards} searchKey="label" />
      <Heading title="API" description="Chamadas de API para painéis" />
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
};

export default BillboardClient;
