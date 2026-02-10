'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/app/i18n/routing';
import { localeNames, localeFlags, getAlternateLocale, getDomainForLocale } from '@/i18n';
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

      // Build URL without locale prefix (middleware will add it internally)
      const newUrl = `https://${alternateDomain}${cleanPath}`;

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
