import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'Tunja Ward | Sacrament Meeting Planner',
    template: '%s | Tunja Ward',
  },
  description:
    'Sacrament meeting programs and schedules for Tunja Ward.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${lato.className} min-h-screen flex flex-col`}>
        <Providers>
          <Header />

          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
