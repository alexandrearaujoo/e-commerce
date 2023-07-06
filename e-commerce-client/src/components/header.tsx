import Link from 'next/link';

import Navbar from './navbar';
import Container from './ui/container';

import { getCategories } from '@/services/getCategories';
import NavBarActions from './navbar-actions';

export const revalidate = 0;

const Header = async () => {
  const categories = await getCategories();

  return (
    <header>
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="ml-4 flex gap-x-2 lg:ml-0">
            <p className="text-xl font-bold">Store</p>
          </Link>
          <Navbar data={categories} />
          <NavBarActions />
        </div>
      </Container>
    </header>
  );
};

export default Header;
