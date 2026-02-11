'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleSignOut } from '@/app/admin/actions';
import styles from './AdminNav.module.scss';

const adminLinks = [
  { href: '/admin', label: 'Home', icon: '🏠' },
  { href: '/admin/dashboard', label: 'YNAB', icon: '💰' },
  { href: '/admin/calendar', label: 'Calendar', icon: '📅' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>🔐</span>
          <span className={styles.brandText}>Admin</span>
        </div>

        <div className={styles.links}>
          {adminLinks.map((link) => {
            const isActive = pathname === link.href || pathname.endsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
              >
                <span className={styles.linkIcon}>{link.icon}</span>
                <span className={styles.linkText}>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <form action={handleSignOut} className={styles.signOutForm}>
          <button type="submit" className={styles.signOutButton}>
            Sign Out
          </button>
        </form>
      </div>
    </nav>
  );
}
