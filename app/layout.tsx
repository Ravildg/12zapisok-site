import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '12 записок',
  description: 'Квест-спектакли с живыми актёрами',
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
