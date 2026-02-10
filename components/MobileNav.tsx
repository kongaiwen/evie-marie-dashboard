'use client'

import { useState, useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/app/i18n/routing'
import { usePathname } from 'next/navigation'
import LanguageToggle from './LanguageToggle'
import styles from './MobileNav.module.scss'

interface NavLink {
  href: string
  key: string
}

const links: NavLink[] = [
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/journey', key: 'journey' },
  { href: '/interests', key: 'interests' },
  { href: '/contact', key: 'contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('nav')

  const toggle = useCallback(() => setOpen((o) => !o), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        onClick={toggle}
        className={styles.toggleButton}
        aria-label={open ? t('closeMenu') : t('openMenu')}
        aria-expanded={open}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          className={styles.backdrop}
          onClick={close}
        />
      )}

      <div
        className={`${styles.drawer} ${open ? styles.open : styles.closed}`}
      >
        <div className={styles.header}>
          <span>{t('menu')}</span>
          <button
            onClick={close}
            className={styles.closeButton}
            aria-label={t('closeMenu')}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className={styles.navLinks}>
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={close}
              >
                {t(link.key as any)}
              </Link>
            )
          })}
        </nav>

        {/* Language toggle in mobile menu */}
        <div className={styles.langToggleContainer}>
          <LanguageToggle className={styles.langToggle} />
        </div>

        <div className={styles.bookButtonContainer}>
          <Link
            href="/contact/booking"
            className={styles.bookButton}
            onClick={close}
          >
            {t('bookMe')}
          </Link>
        </div>
      </div>
    </>
  )
}
