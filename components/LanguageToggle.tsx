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
      // We need to replace the locale in the pathname
      const newPathname = pathname.replace(`/${locale}`, '') || '/';
      const newUrl = `https://${alternateDomain}${newPathname}`;

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
    >
      <div className={styles.toggleTrack}>
        {/* Left side - Current locale */}
        <div className={`${styles.side} ${styles.current}`}>
          <span className={styles.flag}>{currentFlag}</span>
          <span className={styles.label}>{currentName}</span>
        </div>

        {/* Animated slider */}
        <div className={styles.slider}>
          <span className={styles.sliderFlag}>{altFlag}</span>
        </div>

        {/* Right side - Alternate locale (hint) */}
        <div className={`${styles.side} ${styles.alternate}`}>
          <span className={styles.flag}>{altFlag}</span>
          <span className={styles.label}>{altName}</span>
        </div>
      </div>

      {/* Decorative elements */}
      <svg className={styles.decorations} viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="10" cy="50" r="3" className={styles.dot1} />
        <circle cx="90" cy="50" r="3" className={styles.dot2} />
      </svg>
    </button>
  );
}
