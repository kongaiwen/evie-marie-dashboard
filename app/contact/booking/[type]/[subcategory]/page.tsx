'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.scss'

// Placeholder data structure - Agent 4 will connect real API
interface TimeSlot {
  id: string
  date: string // ISO date string
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  available: boolean
}

interface DaySlots {
  date: string
  slots: TimeSlot[]
}

// Mock available slots - Agent 4 will replace with real API calls
const generateMockSlots = (): DaySlots[] => {
  const slots: DaySlots[] = []
  const today = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    const dateStr = date.toISOString().split('T')[0]
    const daySlots: TimeSlot[] = []

    // Generate time slots from 9 AM to 5 PM
    for (let hour = 9; hour <= 17; hour++) {
      for (let min = 0; min < 60; min += 30) {
        // Skip lunch hour
        if (hour === 12) continue

        const startTime = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
        const endHour = min === 30 ? hour + 1 : hour
        const endTime = `${endHour.toString().padStart(2, '0')}:${min === 30 ? '00' : '30'}`

        daySlots.push({
          id: `${dateStr}-${startTime}`,
          date: dateStr,
          startTime,
          endTime,
          available: Math.random() > 0.3 // Random availability
        })
      }
    }

    slots.push({ date: dateStr, slots: daySlots })
  }

  return slots
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

export default function BookingCalendarPage({ params }: { params: Promise<{ type: string; subcategory: string }> }) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')
  const [duration, setDuration] = useState(30) // minutes
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [showCustomTime, setShowCustomTime] = useState(false)
  const [resolvedParams, setResolvedParams] = useState<{ type: string; subcategory: string } | null>(null)

  const [availableSlots] = useState<DaySlots[]>(generateMockSlots())

  // Resolve params on mount
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
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

  return (
    <div className={styles.calendarPage}>
      <div className={styles.container}>
        {/* Back button */}
        <Link
          href="/contact/booking"
          className={styles.backButton}
        >
          <ChevronLeftIcon />
          <span>Back to booking types</span>
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>
            {resolvedParams?.subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Loading...'}
          </h1>
          <p className={styles.subtitle}>Select a date and time that works for you</p>
        </header>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <ListIcon />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'calendar' ? styles.active : ''}`}
              onClick={() => setViewMode('calendar')}
              aria-label="Calendar view"
            >
              <CalendarIcon />
            </button>
          </div>

          <div className={styles.durationSelector}>
            <label htmlFor="duration" className={styles.durationLabel}>
              <ClockIcon />
              Duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className={styles.durationSelect}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={75}>1 hour 15 minutes</option>
              <option value={90}>1 hour 30 minutes</option>
            </select>
          </div>

          <button
            className={styles.customTimeButton}
            onClick={() => setShowCustomTime(!showCustomTime)}
          >
            Custom Time
          </button>
        </div>

        {/* Custom time picker (placeholder) */}
        {showCustomTime && (
          <div className={styles.customTimePicker}>
            <p className={styles.customTimeText}>
              Specify your preferred date and time range:
            </p>
            <div className={styles.customTimeInputs}>
              <input
                type="date"
                className={styles.dateInput}
                min={new Date().toISOString().split('T')[0]}
              />
              <input
                type="time"
                className={styles.timeInput}
              />
              <span>to</span>
              <input
                type="time"
                className={styles.timeInput}
              />
            </div>
            <p className={styles.customTimeNote}>
              We'll do our best to accommodate your request
            </p>
          </div>
        )}

        {/* Calendar view - simplified grid */}
        {viewMode === 'calendar' && (
          <div className={styles.calendarView}>
            <div className={styles.calendarGrid}>
              {availableSlots.map((day) => (
                <div key={day.date} className={styles.calendarDay}>
                  <div className={`${styles.dayHeader} ${isToday(day.date) ? styles.today : ''}`}>
                    {formatDate(day.date)}
                  </div>
                  <div className={styles.daySlots}>
                    {day.slots.filter(s => s.available).slice(0, 4).map((slot) => (
                      <button
                        key={slot.id}
                        className={`${styles.slotButton} ${selectedSlot?.id === slot.id ? styles.selected : ''}`}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        {formatTime(slot.startTime)}
                      </button>
                    ))}
                    {day.slots.filter(s => s.available).length > 4 && (
                      <button
                        className={styles.moreSlots}
                        onClick={() => setViewMode('list')}
                      >
                        +{day.slots.filter(s => s.available).length - 4} more
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List view */}
        {viewMode === 'list' && (
          <div className={styles.listView}>
            {availableSlots.map((day) => (
              <div key={day.date} className={styles.daySection}>
                <h3 className={`${styles.dayTitle} ${isToday(day.date) ? styles.today : ''}`}>
                  {formatDate(day.date)}
                  {isToday(day.date) && <span className={styles.todayBadge}>Today</span>}
                </h3>
                <div className={styles.slotsGrid}>
                  {day.slots.filter(s => s.available).map((slot) => (
                    <button
                      key={slot.id}
                      className={`${styles.slotCard} ${selectedSlot?.id === slot.id ? styles.selected : ''}`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <span className={styles.slotTime}>{formatTime(slot.startTime)}</span>
                      <span className={styles.slotDuration}>{duration} min</span>
                    </button>
                  ))}
                  {day.slots.filter(s => s.available).length === 0 && (
                    <p className={styles.noSlots}>No available times</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue button */}
        {selectedSlot && (
          <div className={styles.continueSection}>
            <div className={styles.selectionSummary}>
              <p className={styles.selectionText}>
                Selected: <strong>{formatDate(selectedSlot.date)} at {formatTime(selectedSlot.startTime)}</strong>
              </p>
            </div>
            <button
              className={styles.continueButton}
              onClick={handleContinue}
            >
              Continue to Booking Form
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
