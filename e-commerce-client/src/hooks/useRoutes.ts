import { usePathname } from 'next/navigation';

import { Category } from '@/interfaces';

export const useRouter = (data: Category[]) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/catergory/${route.id}`,
    label: route.name,
    active: pathname.includes(route.id)
  }));

  return { routes };
};
