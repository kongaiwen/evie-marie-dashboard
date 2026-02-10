export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeDomains: Record<Locale, string> = {
  en: 'eviemariekolb.com',
  zh: 'kongaiwen.dev',
};

export const localeNames: Record<Locale, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  zh: { native: '中文', english: 'Chinese' },
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
};

// Get the alternate locale for language toggle
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'zh' : 'en';
}

// Get the domain for a given locale
export function getDomainForLocale(locale: Locale): string {
  return localeDomains[locale];
}
