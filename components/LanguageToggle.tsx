'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/app/i18n/routing';
import { localeNames, localeFlags, getAlternateLocale, getDomainForLocale } from '@/i18n';
import { getLocalizedPath, getEnglishPath } from '@/app/i18n/pathMappings';
import { useTransition } from 'react';
import styles from './LanguageToggle.module.scss';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const locale = useLocale() as 'en' | 'zh';
  const alternateLocale = getAlternateLocale(locale);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(() => {
      // Get the alternate domain
      const alternateDomain = getDomainForLocale(alternateLocale);

      // Strip locale prefix from pathname if it exists
      let cleanPath = pathname;
      if (pathname.startsWith('/en/') || pathname.startsWith('/zh/')) {
        cleanPath = pathname.substring(3); // Remove /en or /zh
      } else if (pathname === '/en' || pathname === '/zh') {
        cleanPath = '/';
      }

      // Convert path to appropriate language
      let targetPath: string;
      if (alternateLocale === 'zh') {
        // Converting EN → ZH: pathname is in English, need to get Chinese pinyin
        // First get the base path (first segment) for dynamic routes
        const pathSegments = cleanPath.split('/').filter(Boolean);
        const basePath = pathSegments.length > 0 ? `/${pathSegments[0]}` : cleanPath;
        const localizedBase = getLocalizedPath(basePath, 'zh');

        // Rebuild path with localized base
        if (pathSegments.length > 1) {
          targetPath = localizedBase + '/' + pathSegments.slice(1).join('/');
        } else {
          targetPath = localizedBase;
        }
      } else {
        // Converting ZH → EN: pathname is in Chinese pinyin, need to get English
        const pathSegments = cleanPath.split('/').filter(Boolean);
        const basePath = pathSegments.length > 0 ? `/${pathSegments[0]}` : cleanPath;
        const englishBase = getEnglishPath(basePath);

        // Rebuild path with English base
        if (pathSegments.length > 1) {
          targetPath = englishBase + '/' + pathSegments.slice(1).join('/');
        } else {
          targetPath = englishBase;
        }
      }

      // Build URL with converted path
      const newUrl = `https://${alternateDomain}${targetPath}`;

      // Navigate to the new domain
      window.location.href = newUrl;
    });
  };

  const currentFlag = localeFlags[locale];
  const currentName = localeNames[locale].native;
  const altFlag = localeFlags[alternateLocale];
  const altName = localeNames[alternateLocale].native;

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`${styles.toggle} ${className} ${isPending ? styles.pending : ''}`}
      aria-label={`Switch to ${localeNames[alternateLocale].english}`}
      title={`Switch to ${localeNames[alternateLocale].english}`}
    >
      <span className={styles.currentFlag}>{currentFlag}</span>
      <span className={styles.divider}>/</span>
      <span className={styles.altFlag}>{altFlag}</span>
    </button>
  );
}
