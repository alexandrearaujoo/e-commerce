import { useParams, usePathname } from 'next/navigation';

export const useRoutes = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      id: 1,
      href: `/${params.storeId}`,
      label: 'Visão Geral',
      active: pathname.includes('/')
    },
    {
      id: 2,
      href: `/${params.storeId}/categories`,
      label: 'Categorias',
      active: pathname.includes('categories')
    },
    {
      id: 3,
      href: `/${params.storeId}/sizes`,
      label: 'Tamanhos',
      active: pathname.includes('sizes')
    },
    {
      id: 4,
      href: `/${params.storeId}/colors`,
      label: 'Cores',
      active: pathname.includes('colors')
    },
    {
      id: 5,
      href: `/${params.storeId}/products`,
      label: 'Produtos',
      active: pathname.includes('products')
    },
    {
      id: 6,
      href: `/${params.storeId}/orders`,
      label: 'Pedidos',
      active: pathname.includes('orders')
    },
    {
      id: 7,
      href: `/${params.storeId}/settings`,
      label: 'Configurações',
      active: pathname.includes('settings')
    }
  ];

  return { routes };
};
