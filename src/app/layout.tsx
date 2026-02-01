import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Canpolat Kaya | Kişisel Portfolio',
  description: 'Yazılım geliştirici, yaratıcı düşünür. Kozmik bir deneyime hoş geldiniz.',
  keywords: ['Canpolat Kaya', 'Yazılım', 'Developer', 'Portfolio'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-cosmic-black text-cosmic-light min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
