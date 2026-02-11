'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/app/i18n/routing'
import { useTranslations } from 'next-intl'
import styles from './page.module.scss'

// Time slot interface
interface TimeSlot {
  id: string
  date: string // ISO date string
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  available: boolean
  startDateTime?: Date
  endDateTime?: Date
}

interface DaySlots {
  date: string
  slots: TimeSlot[]
}

// Raw slots from API (all 30-minute slots)
interface RawTimeSlot {
  start: string
  end: string
  available: boolean
}

// Map subcategory from URL to API format
const SUBCATEGORY_MAP: Record<string, string> = {
  'consultation': 'job_interview',
  'interview': 'job_interview',
  'collaboration': 'collaboration_exploration',
  'technical-discussion': 'pair_programming',
  'coffee-chat': 'coffee',
  'catch-up': 'lunch',
  'activity': 'outings',
  'playdate': 'coffee',
  'educational': 'lunch',
  'family-event': 'outings',
}

const CalendarIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const ListIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const ClockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const LoadingSpinner = () => (
  <div className={styles.spinner}>
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  </div>
)

export default function BookingCalendarPage({ params }: { params: Promise<{ type: string; subcategory: string }> }) {
  const router = useRouter()
  const t = useTranslations('booking')
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')
  const [duration, setDuration] = useState(30) // minutes
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [showCustomTime, setShowCustomTime] = useState(false)
  const [resolvedParams, setResolvedParams] = useState<{ type: string; subcategory: string } | null>(null)

  // Store raw 30-minute slots from API (without duration filtering)
  const [rawSlotsByDay, setRawSlotsByDay] = useState<Map<string, RawTimeSlot[]>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Resolve params on mount
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  // Fetch ALL availability (30-minute slots) once on mount
  useEffect(() => {
    if (!resolvedParams) return

    const fetchAvailability = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const today = new Date()
        const endDate = new Date(today)
        endDate.setDate(today.getDate() + 30) // Next 30 days

        const apiSubcategory = SUBCATEGORY_MAP[resolvedParams.subcategory] || resolvedParams.subcategory

        const params = new URLSearchParams({
          category: resolvedParams.type === 'kid-activities' ? 'kid_activities' : resolvedParams.type,
          subcategory: apiSubcategory,
          start: today.toISOString(),
          end: endDate.toISOString(),
          // Don't pass minDuration - get all 30-minute slots
          groupByDay: 'true',
        })

        const response = await fetch(`/api/booking/availability?${params}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch availability')
        }

        const data = await response.json()

        // Store raw slots by day for client-side filtering
        const slotsMap = new Map<string, RawTimeSlot[]>()
        Object.entries(data.availability).forEach(([date, slots]) => {
          slotsMap.set(date, slots as RawTimeSlot[])
        })
        setRawSlotsByDay(slotsMap)
      } catch (err) {
        console.error('Error fetching availability:', err)
        setError(err instanceof Error ? err.message : 'Failed to load availability')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailability()
  }, [resolvedParams])

  // Filter slots by duration client-side (instant, no loading)
  const availableSlots = useMemo(() => {
    const now = new Date()
    const result: DaySlots[] = []
    const slotDurationMinutes = 30

    for (const [date, slots] of rawSlotsByDay.entries()) {
      const filteredSlots: TimeSlot[] = []

      // Filter out past slots and find consecutive blocks for the duration
      let i = 0
      while (i < slots.length) {
        const slot = slots[i]

        // Create Date objects from the local datetime strings
        const startDate = new Date(slot.start)
        const endDate = new Date(slot.end)

        // Skip if slot is in the past
        if (endDate <= now) {
          i++
          continue
        }

        // Skip if not available
        if (!slot.available) {
          i++
          continue
        }

        // Find consecutive available slots for the required duration
        let totalDuration = 0
        let endIndex = i

        while (endIndex < slots.length && slots[endIndex].available) {
          const slotStart = new Date(slots[endIndex].start)
          const slotEnd = new Date(slots[endIndex].end)

          // Check if this slot is in the past
          if (slotEnd <= now) {
            endIndex++
            continue
          }

          // Check if slots are consecutive (no gaps)
          if (endIndex > i) {
            const prevSlotEnd = new Date(slots[endIndex - 1].end)
            const gap = slotStart.getTime() - prevSlotEnd.getTime()
            if (gap > slotDurationMinutes * 60 * 1000) {
              // Gap detected, stop here
              break
            }
          }

          totalDuration += (slotEnd.getTime() - slotStart.getTime()) / (1000 * 60)
          endIndex++

          if (totalDuration >= duration) {
            break
          }
        }

        // Only add if we found enough consecutive time
        if (totalDuration >= duration) {
          const firstSlot = slots[i]
          const lastSlot = slots[endIndex - 1]

          filteredSlots.push({
            id: `${date}-${firstSlot.start}`,
            date,
            startTime: firstSlot.start.split('T')[1]?.slice(0, 5) || '00:00',
            endTime: lastSlot.end.split('T')[1]?.slice(0, 5) || '00:00',
            available: true,
            startDateTime: new Date(firstSlot.start),
            endDateTime: new Date(lastSlot.end),
          })
        }

        // Skip to the end of this block
        i = endIndex
      }

      if (filteredSlots.length > 0) {
        result.push({ date, slots: filteredSlots })
      }
    }

    return result
  }, [rawSlotsByDay, duration])

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00') // Ensure local time interpretation
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0]
    return dateStr === today
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedDate(slot.date)
    setSelectedSlot(slot)
  }

  const handleContinue = () => {
    if (selectedSlot && resolvedParams) {
      // Store selection in sessionStorage for the form page
      sessionStorage.setItem('bookingSlot', JSON.stringify({
        ...selectedSlot,
        duration,
        type: resolvedParams.type,
        subcategory: resolvedParams.subcategory
      }))
      router.push(`/contact/booking/${resolvedParams.type}/${resolvedParams.subcategory}/form`)
    }
  }

  if (isLoading) {
    return (
      <div className={styles.calendarPage}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <LoadingSpinner />
            <p>{t('loadingAvailability')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.calendarPage}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p>{t('unableToLoad')}</p>
            <Link
              href="/contact/booking"
              className={styles.signInButton}
            >
              {t('backToBooking')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.calendarPage}>
      <div className={styles.container}>
        {/* Back button */}
        <Link
          href="/contact/booking"
          className={styles.backButton}
        >
          <ChevronLeftIcon />
          <span>{t('backToBookingTypes')}</span>
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>
            {resolvedParams?.subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Loading...'}
          </h1>
          <p className={styles.subtitle}>{t('selectDateTime')}</p>
        </header>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              aria-label={t('listView')}
            >
              <ListIcon />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'calendar' ? styles.active : ''}`}
              onClick={() => setViewMode('calendar')}
              aria-label={t('calendarView')}
            >
              <CalendarIcon />
            </button>
          </div>

          <div className={styles.durationSelector}>
            <label htmlFor="duration" className={styles.durationLabel}>
              <ClockIcon />
              {t('duration')}
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className={styles.durationSelect}
            >
              <option value={15}>15 {t('minutes')}</option>
              <option value={30}>30 {t('minutes')}</option>
              <option value={45}>45 {t('minutes')}</option>
              <option value={60}>1 {t('hour')}</option>
              <option value={75}>1 {t('hour')} 15 {t('minutes')}</option>
              <option value={90}>1 {t('hour')} 30 {t('minutes')}</option>
            </select>
          </div>

          <button
            className={styles.customTimeButton}
            onClick={() => setShowCustomTime(!showCustomTime)}
          >
            {t('customTime')}
          </button>
        </div>

        {showCustomTime && (
          <div className={styles.customTimePicker}>
            <p className={styles.customTimeText}>{t('selectCustomDateTime')}</p>
            <div className={styles.customTimeInputs}>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className={styles.dateInput}
            />
            <input
              type="time"
              className={styles.timeInput}
            />
            <span>{t('to')}</span>
            <input
              type="time"
              className={styles.timeInput}
            />
            </div>
            <p className={styles.customTimeNote}>{t('customTimeNote')}</p>
          </div>
        )}

        {/* Available Slots */}
        {availableSlots.length === 0 ? (
          <div className={styles.noSlots}>
            <p>{t('noSlotsFound')}</p>
            <p>{t('tryAdjusting')}</p>
          </div>
        ) : (
          <div className={styles.slotsContainer}>
            {availableSlots.map((day) => (
              <div key={day.date} className={styles.daySection}>
                <h3 className={styles.dayTitle}>
                  {formatDate(day.date)}
                  {isToday(day.date) && <span className={styles.todayBadge}>{t('today')}</span>}
                </h3>
                <div className={styles.slotsGrid}>
                  {day.slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot)}
                      className={`${styles.slotButton} ${selectedSlot?.id === slot.id ? styles.selected : ''}`}
                    >
                      {formatTime(slot.startTime)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Button */}
        {selectedSlot && (
          <div className={styles.continueBar}>
            <div className={styles.selectionInfo}>
              <span className={styles.selectionDate}>{formatDate(selectedSlot.date)}</span>
              <span className={styles.selectionTime}>{formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}</span>
            </div>
            <button onClick={handleContinue} className={styles.continueButton}>
              {t('continue')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
