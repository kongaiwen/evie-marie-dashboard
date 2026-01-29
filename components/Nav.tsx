import Link from "next/link"
import MobileNav from "./MobileNav"
import styles from './Nav.module.scss'

interface NavProps {
  active?: string
}

export default function Nav({ active }: NavProps) {
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
            <span className={styles.logoText}>Evie Marie Kolb</span>
          </Link>

          {/* Desktop nav */}
          <div className={styles.desktopNav}>
            <Link href="/about" className={linkClass('/about')}>About</Link>
            <Link href="/projects" className={linkClass('/projects')}>Projects</Link>
            <Link href="/journey" className={linkClass('/journey')}>Journey</Link>
            <Link href="/interests" className={linkClass('/interests')}>Interests</Link>
            <Link href="/contact" className={linkClass('/contact')}>Contact</Link>
            <Link
              href="/contact/booking"
              className={styles.bookButton}
            >
              Book Me
            </Link>
          </div>

          {/* Mobile nav */}
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}
