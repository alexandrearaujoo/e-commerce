import { Inter } from 'next/font/google';
import NextJsTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

import ModalProvider from '@/providers/ModalProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stock Manager',
  description: 'Gerencie o estoque de produtos da sua loja!'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <NextJsTopLoader />
            <ModalProvider />
            <Toaster position="bottom-right" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
