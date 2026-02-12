'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './page.module.scss'

interface CalendarStatus {
  isConnected: boolean
  hasServiceAccount: boolean
  calendars: Array<{
    name: string
    id: string
    found: boolean
  }>
  events: Array<{
    id: string
    summary: string
    start: string
    end: string
    busy: boolean
  }>
  upcomingBookings: number
  totalEvents: number
  error?: string
}

const RefreshIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const CalendarIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const EventIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function AdminCalendarPage() {
  const [status, setStatus] = useState<CalendarStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchStatus = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true)
    try {
      const response = await fetch('/api/admin/calendar/status')
      if (!response.ok) {
        throw new Error('Failed to fetch calendar status')
      }
      const data = await response.json()
      setStatus(data)
    } catch (err) {
      setStatus({
        isConnected: false,
        hasServiceAccount: false,
        calendars: [],
        events: [],
        upcomingBookings: 0,
        totalEvents: 0,
        error: err instanceof Error ? err.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const isToday = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  if (isLoading) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}>
              <RefreshIcon />
            </div>
            <p>Loading calendar status...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Calendar Integration Status</h1>
            <button
              onClick={() => fetchStatus(true)}
              className={`${styles.refreshButton} ${isRefreshing ? styles.spinning : ''}`}
              disabled={isRefreshing}
              aria-label="Refresh status"
            >
              <RefreshIcon />
            </button>
          </div>
        </header>

        {status?.error && (
          <div className={styles.errorBanner}>
            <XIcon />
            <span>{status.error}</span>
          </div>
        )}

        {/* Connection Status */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Connection Status</h2>
          <div className={styles.statusGrid}>
            <div className={`${styles.statusCard} ${status?.isConnected ? styles.success : styles.error}`}>
              <div className={styles.statusIcon}>
                {status?.isConnected ? <CheckIcon /> : <XIcon />}
              </div>
              <div className={styles.statusInfo}>
                <h3>Google Calendar</h3>
                <p>{status?.isConnected ? 'Connected' : 'Not Connected'}</p>
              </div>
            </div>
            <div className={`${styles.statusCard} ${status?.hasServiceAccount ? styles.success : styles.error}`}>
              <div className={styles.statusIcon}>
                {status?.hasServiceAccount ? <CheckIcon /> : <XIcon />}
              </div>
              <div className={styles.statusInfo}>
                <h3>Service Account</h3>
                <p>{status?.hasServiceAccount ? 'Configured' : 'Not Configured'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calendars */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <CalendarIcon />
            Configured Calendars
          </h2>
          <div className={styles.calendarsList}>
            {status?.calendars && status.calendars.length > 0 ? (
              status.calendars.map((cal) => (
                <div key={cal.name} className={`${styles.calendarItem} ${cal.found ? styles.found : styles.notFound}`}>
                  <div className={styles.calendarIcon}>
                    {cal.found ? <CheckIcon /> : <XIcon />}
                  </div>
                  <div className={styles.calendarInfo}>
                    <span className={styles.calendarName}>{cal.name}</span>
                    <span className={styles.calendarId}>{cal.found ? cal.id : 'Not found in your Google Calendar'}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyState}>No calendars configured</p>
            )}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <EventIcon />
            Upcoming Events (Next 7 Days)
            {status && (
              <span className={styles.eventCount}>{status.totalEvents} events</span>
            )}
          </h2>
          <div className={styles.eventsList}>
            {status?.events && status.events.length > 0 ? (
              status.events.map((event) => (
                <div key={event.id} className={`${styles.eventItem} ${event.busy ? styles.busy : styles.transparent}`}>
                  <div className={styles.eventTime}>
                    {formatDateTime(event.start)}
                    {isToday(event.start) && <span className={styles.todayBadge}>Today</span>}
                  </div>
                  <div className={styles.eventDetails}>
                    <span className={styles.eventSummary}>{event.summary}</span>
                    <span className={styles.eventDuration}>
                      {formatDateTime(event.end)}
                    </span>
                  </div>
                  <div className={styles.eventStatus}>
                    {event.busy ? (
                      <span className={styles.busyBadge}>Busy</span>
                    ) : (
                      <span className={styles.freeBadge}>Free</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyState}>No upcoming events found</p>
            )}
          </div>
        </section>

        {/* Actions */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <a
              href="/contact/booking"
              className={styles.actionButton}
            >
              View Booking Page
            </a>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionButton}
            >
              Open Google Calendar
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
