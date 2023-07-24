import { useParams, usePathname } from 'next/navigation';

export const useRoutes = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      id: 1,
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname.includes('/')
    },
    {
      id: 2,
      href: `/${params.storeId}/billboards`,
      label: 'Billboard',
      active: pathname.includes('billboards')
    },
    {
      id: 3,
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname.includes('categories')
    },
    {
      id: 4,
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname.includes('sizes')
    },
    {
      id: 5,
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname.includes('colors')
    },
    {
      id: 6,
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathname.includes('products')
    },
    {
      id: 7,
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname.includes('orders')
    },
    {
      id: 8,
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname.includes('settings')
    }
  ];

  return { routes };
};
