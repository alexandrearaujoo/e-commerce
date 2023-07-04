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
          description="Manage colors for your store"
          title={`Colors ${colors.length}`}
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </article>
      <Separator />
      <DataTable columns={columns} data={colors} searchKey="name" />
      <Heading title="API" description="API calls for colors" />
      <Separator />
      <ApiList entityIdName="colorId" entityName="colors" />
    </>
  );
};

export default ColorClient;
