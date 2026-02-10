import { getRequestConfig } from 'next-intl/server';
import { locales } from './i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from the [locale] segment (middleware rewrites paths to include it)
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
