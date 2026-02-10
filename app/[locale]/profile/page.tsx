'use client';

import Image from "next/image"
import { Link } from "@/app/i18n/routing"
import { useTranslations } from 'next-intl'
import styles from './page.module.scss'

export default function ProfilePage() {
  const t = useTranslations('nav')
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className={styles.logoText}>E</span>
            </div>
            <span className={styles.logoName}>Evie Marie Kolb</span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/about" className={styles.navLink}>
              {t('about')}
            </Link>
            <Link href="/projects" className={styles.navLink}>
              {t('projects')}
            </Link>
            <Link href="/contact" className={styles.navLink}>
              {t('contact')}
            </Link>
            <Link
              href="/contact/booking"
              className={styles.navButton}
            >
              {t('bookMe')}
            </Link>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <div className={styles.imageGlow}></div>
            <Image
              src="/images/profile.jpg"
              alt="Evie Marie Kolb"
              width={400}
              height={400}
              className={styles.image}
              priority
            />
          </div>
          <h1 className={styles.name}>Evie Marie Kolb</h1>
          <p className={styles.role}>Full-Stack Software Engineer</p>
          <div className={styles.linkContainer}>
            <Link
              href="/about"
              className={styles.link}
            >
              Learn more about me
              <svg className={styles.linkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
