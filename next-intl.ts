import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales } from './i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  // First try to get locale from middleware header
  const headersList = await headers();
  const localeFromHeader = headersList.get('x-next-intl-locale');

  // Then try from URL segment
  let locale = localeFromHeader || (await requestLocale);

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
