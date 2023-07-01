import { useParams, usePathname } from 'next/navigation';

export const useRoutes = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      id: 1,
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`
    }
  ];

  return { routes };
};
