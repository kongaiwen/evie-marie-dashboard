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

      // Build the new URL with the alternate domain
      // Strip any locale prefix from pathname (e.g., /zh/about -> /about)
      let cleanPathname = pathname;
      if (pathname.startsWith('/zh/')) {
        cleanPathname = pathname.replace('/zh', '');
      } else if (pathname.startsWith('/en/')) {
        cleanPathname = pathname.replace('/en', '');
      }
      // Ensure we have at least a '/'
      cleanPathname = cleanPathname || '/';

      const newUrl = `https://${alternateDomain}${cleanPathname}`;

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
