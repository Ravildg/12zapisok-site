import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Квест-спектакли с ведущим и актёрами',
  description: 'Квест-кафе "12 записок" на Белинского 45',
  generator: 'Next.js',
  icons: {
    icon: '/uploads/favicon.ico', // Обновляем путь к favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
