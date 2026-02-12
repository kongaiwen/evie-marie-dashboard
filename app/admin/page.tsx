'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './admin.module.scss'

interface CalendarStatus {
  isConnected: boolean
  hasServiceAccount: boolean
  error?: string
}

interface YnabStatus {
  isConnected: boolean
  error?: string
}

export default function AdminDashboardPage() {
  const [calendarStatus, setCalendarStatus] = useState<CalendarStatus | null>(null)
  const [ynabStatus, setYnabStatus] = useState<YnabStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStatuses() {
      try {
        // Fetch calendar status
        const calendarRes = await fetch('/api/admin/calendar/status')
        if (calendarRes.ok) {
          const data = await calendarRes.json()
          setCalendarStatus({
            isConnected: data.isConnected,
            hasServiceAccount: data.hasServiceAccount,
          })
        } else {
          setCalendarStatus({
            isConnected: false,
            hasServiceAccount: false,
            error: 'Failed to fetch status',
          })
        }
      } catch (error) {
        setCalendarStatus({
          isConnected: false,
          hasServiceAccount: false,
          error: 'Network error',
        })
      }

      try {
        // Fetch YNAB status by checking if we can get budgets
        const ynabRes = await fetch('/api/ynab/budgets')
        if (ynabRes.ok) {
          setYnabStatus({ isConnected: true })
        } else {
          setYnabStatus({ isConnected: false, error: 'Failed to connect' })
        }
      } catch (error) {
        setYnabStatus({ isConnected: false, error: 'Network error' })
      }

      setIsLoading(false)
    }

    fetchStatuses()
  }, [])

  const getCalendarStatusClass = () => {
    if (isLoading) return styles.loading
    if (calendarStatus?.isConnected && calendarStatus?.hasServiceAccount) return styles.success
    if (calendarStatus?.hasServiceAccount) return styles.warning
    return styles.error
  }

  const getYnabStatusClass = () => {
    if (isLoading) return styles.loading
    if (ynabStatus?.isConnected) return styles.success
    return styles.error
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Manage your portfolio, calendar, and finances</p>
        </header>

        {/* Quick Links */}
        <section className={styles.quickLinksGrid}>
          <Link href="/admin/dashboard" className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>💰</span>
            <span className={styles.quickLinkTitle}>YNAB Dashboard</span>
            <span className={styles.quickLinkDescription}>
              View budgets, spending analysis, and transaction history
            </span>
          </Link>

          <Link href="/admin/calendar" className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>📅</span>
            <span className={styles.quickLinkTitle}>Calendar</span>
            <span className={styles.quickLinkDescription}>
              Check calendar integration status and upcoming events
            </span>
          </Link>

          <Link href="/contact/booking" className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>🗓️</span>
            <span className={styles.quickLinkTitle}>Booking Page</span>
            <span className={styles.quickLinkDescription}>
              View your public booking page as visitors see it
            </span>
          </Link>
        </section>

        {/* Status Section */}
        <section className={styles.statusSection}>
          <h2 className={styles.sectionTitle}>System Status</h2>
          <div className={styles.statusGrid}>
            <div className={`${styles.statusCard} ${getCalendarStatusClass()}`}>
              <div className={styles.statusIndicator} />
              <div className={styles.statusInfo}>
                <h3>Google Calendar</h3>
                <p>
                  {isLoading
                    ? 'Checking connection...'
                    : calendarStatus?.isConnected
                    ? 'Connected via service account'
                    : calendarStatus?.hasServiceAccount
                    ? 'Service account configured but no calendars found'
                    : 'Service account not configured'}
                </p>
              </div>
            </div>

            <div className={`${styles.statusCard} ${getYnabStatusClass()}`}>
              <div className={styles.statusIndicator} />
              <div className={styles.statusInfo}>
                <h3>YNAB</h3>
                <p>
                  {isLoading
                    ? 'Checking connection...'
                    : ynabStatus?.isConnected
                    ? 'Connected'
                    : 'Not connected'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Public Site Links */}
        <section className={styles.publicSiteSection}>
          <h3 className={styles.publicSiteTitle}>View Public Site</h3>
          <div className={styles.publicSiteLinks}>
            <a
              href="https://eviemariekolb.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.publicLink}
            >
              🇺🇸 English Site
            </a>
            <a
              href="https://kongaiwen.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.publicLink}
            >
              🇨🇳 Chinese Site
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
