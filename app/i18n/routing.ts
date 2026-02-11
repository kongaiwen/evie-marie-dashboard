import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Never show locale prefix in URLs - middleware rewrites internally
  localePrefix: 'never'
});

// Export custom Link that handles pinyin path mapping
export { Link } from './Link';

// Other navigation utilities from next-intl
const { redirect, usePathname, useRouter } = createNavigation(routing);
export { redirect, usePathname, useRouter };
