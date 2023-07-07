import './globals.css';
import { Urbanist } from 'next/font/google';
import NextjsTopLoader from 'nextjs-toploader';

import Footer from '@/components/footer';
import Header from '@/components/header';

import ModalProvider from '@/providers/modal-provider';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata = {
  title: 'Store',
  description: 'Store'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <NextjsTopLoader />
        <ModalProvider />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
