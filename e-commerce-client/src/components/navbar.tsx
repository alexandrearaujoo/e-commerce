'use client';

import Link from 'next/link';

import { useRouter } from '@/hooks/useRoutes';
import { Category } from '@/interfaces';
import { cn } from '@/lib/utils';

interface NavbarProps {
  data: Category[];
}

const Navbar = ({ data }: NavbarProps) => {
  const { routes } = useRouter(data);

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            'text-sm font-medium transition-colors duration-200 hover:text-black',
            route.active ? 'text-black' : 'text-neutral-500'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
