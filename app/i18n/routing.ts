import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Domain-based routing: locale prefix hidden for each domain's default locale
  localePrefix: 'as-needed',

  // Domain configuration for locale detection
  domains: [
    {
      domain: 'eviemariekolb.com',
      defaultLocale: 'en',
      locales: ['en']
    },
    {
      domain: 'kongaiwen.dev',
      defaultLocale: 'zh',
      locales: ['zh']
    },
    // Localhost support for development
    {
      domain: 'localhost:3000',
      defaultLocale: 'en',
      locales: ['en']
    },
    {
      domain: 'localhost:3002',
      defaultLocale: 'zh',
      locales: ['zh']
    }
  ]
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
