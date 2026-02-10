'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/app/i18n/routing';
import MobileNav from "./MobileNav";
import LanguageToggle from "./LanguageToggle";
import styles from './Nav.module.scss';

interface NavProps {
  active?: string
}

export default function Nav({ active }: NavProps) {
  const t = useTranslations('nav');

  const linkClass = (href: string) =>
    href === active
      ? `${styles.link} ${styles.linkActive}`
      : styles.link

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.innerWrapper}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>E</span>
            </div>
            <span className={styles.logoText}>{t('logo')}</span>
          </Link>

          {/* Desktop nav */}
          <div className={styles.desktopNav}>
            <Link href="/about" className={linkClass('/about')}>{t('about')}</Link>
            <Link href="/projects" className={linkClass('/projects')}>{t('projects')}</Link>
            <Link href="/journey" className={linkClass('/journey')}>{t('journey')}</Link>
            <Link href="/interests" className={linkClass('/interests')}>{t('interests')}</Link>
            <Link href="/contact" className={linkClass('/contact')}>{t('contact')}</Link>
            <Link
              href="/contact/booking"
              className={styles.bookButton}
            >
              {t('bookMe')}
            </Link>

            {/* Language toggle */}
            <LanguageToggle className={styles.langToggle} />
          </div>

          {/* Mobile nav */}
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}
