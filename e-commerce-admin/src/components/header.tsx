import { redirect } from 'next/navigation';

import NavBar from './navbar';
import StoreSwithcer from './store-switcher';

import { getStores } from '@/services/getStores';
import { UserButton, auth } from '@clerk/nextjs';

const Header = async () => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const stores = await getStores({ userId });

  return (
    <header className="border-b">
      <article className="flex h-16 items-center px-4">
        <StoreSwithcer items={stores} />
        <NavBar className="mx-6" />
        <article className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </article>
      </article>
    </header>
  );
};

export default Header;
