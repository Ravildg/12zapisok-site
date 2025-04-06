import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Квест-спектакли с ведущим и актёрами',
  description: 'квест-кафе 12записок',
  generator: 'Next.js', // Обновляем, так как v0.dev больше не актуален
  icons: {
    icon: '/favicon.ico', // Указываем favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru"> {/* Меняем язык на русский */}
      <body>{children}</body>
    </html>
  );
}
