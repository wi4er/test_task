import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import '../fonts/Poppins/stylesheet.css';
import { HeaderBar } from '@/components/HeaderBar';
import { FooterBar } from '@/components/FooterBar';
import { BasketProvider } from '@/context/BasketProvider';
import { UserProvider } from '@/context/UserProvider';
import { ApiContext } from '@/context/ApiContext';
import { PopupProvider } from '@/context/PopupProvider';

export const metadata: Metadata = {
  title: 'Maxik test app',
  description: 'Created by Maxim Loboda',
};

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>,
) {
  return (
    <html lang="en">
    <body>

    <ApiContext>
      <UserProvider>
        <BasketProvider>
          <PopupProvider>
            <HeaderBar/>

            <main>
              {children}
            </main>

            <FooterBar/>
          </PopupProvider>
        </BasketProvider>
      </UserProvider>
    </ApiContext>

    </body>
    </html>
  );
}
