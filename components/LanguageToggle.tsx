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
      // Since we use domain-based routing, pathname has no locale prefix
      const newUrl = `https://${alternateDomain}${pathname}`;

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
