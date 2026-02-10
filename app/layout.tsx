import { routing } from './i18n/routing';
import { notFound } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is a redirect to the localized version
  // The actual rendering happens in [locale]/layout.tsx
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
