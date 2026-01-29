'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './MobileNav.module.scss'

interface NavLink {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/journey', label: 'Journey' },
  { href: '/interests', label: 'Interests' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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
        aria-label={open ? 'Close menu' : 'Open menu'}
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
          <span>Menu</span>
          <button
            onClick={close}
            className={styles.closeButton}
            aria-label="Close menu"
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
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className={styles.bookButtonContainer}>
          <Link
            href="/contact/booking"
            className={styles.bookButton}
            onClick={close}
          >
            Book Me
          </Link>
        </div>
      </div>
    </>
  )
}
