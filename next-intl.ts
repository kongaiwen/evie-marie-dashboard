import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales } from './i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from the [locale] segment
  let locale = await requestLocale;

  // If not found, try to detect from headers as fallback
  if (!locale || !locales.includes(locale as any)) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';

    // Extract locale from pathname
    if (pathname.startsWith('/zh')) {
      locale = 'zh';
    } else if (pathname.startsWith('/en')) {
      locale = 'en';
    } else {
      locale = 'en';
    }
  }

  // Final validation
  if (!locales.includes(locale as any)) {
    locale = 'en';
  }

  console.log('[next-intl] Loading messages for locale:', locale);

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
