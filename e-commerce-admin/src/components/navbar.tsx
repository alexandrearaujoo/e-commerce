'use client';

import Link from 'next/link';
import { HTMLAttributes } from 'react';

import { useRoutes } from '@/hooks/useRoutes';
import { cn } from '@/lib/utils';

const NavBar = ({ className }: HTMLAttributes<HTMLElement>) => {
  const { routes } = useRoutes();

  return (
    <nav>
      <ul className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
        {routes.map(({ active, href, id, label }) => (
          <li key={id}>
            <Link
              href={href}
              className={cn(
                'text-sm font-medium transition-colors duration-200 hover:text-primary',
                active ? 'text-black dark:text-white' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
