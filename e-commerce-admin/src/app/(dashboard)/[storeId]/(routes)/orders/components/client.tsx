import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { OrderColumn, columns } from './columns';

const OrderClient = ({ orders }: { orders: OrderColumn[] }) => {
  return (
    <>
      <Heading
        description="Manage orders for your store"
        title={`Orders ${orders.length}`}
      />
      <Separator />
      <DataTable columns={columns} data={orders} searchKey="products" />
    </>
  );
};

export default OrderClient;
