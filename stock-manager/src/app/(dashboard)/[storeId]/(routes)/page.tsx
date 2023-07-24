import Overview from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { formatter } from '@/lib/utils';
import { getGraphRevenue } from '@/services/getGraphRevenue';
import { getSalesCount } from '@/services/getSalesCount';
import { getStockCount } from '@/services/getStockCount';
import { getTotalRevenue } from '@/services/getTotalRevenue';
import { CreditCard, DollarSign, Package } from 'lucide-react';

export default async function DashboardPage({
  params
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;

  const [totalRevenue, salesCount, stockCount, graphRevenue] =
    await Promise.all([
      getTotalRevenue(storeId),
      getSalesCount(storeId),
      getStockCount(storeId),
      getGraphRevenue(storeId)
    ]);

  return (
    <main className="flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <section className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rendimento total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">+{salesCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produtos em estoque
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stockCount}</p>
            </CardContent>
          </Card>
        </section>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
