'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/app/i18n/routing'
import { useTranslations } from 'next-intl'
import styles from './page.module.scss'

interface BookingSlot {
  date: string
  startTime: string
  endTime: string
  duration: number
  type: string
  subcategory: string
}

interface FormData {
  name: string
  email: string
  phone: string
  notes: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  notes?: string
}

const CalendarIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

export default function BookingFormPage({ params }: { params: { type: string; subcategory: string } }) {
  const router = useRouter()
  const t = useTranslations('booking')
  const [bookingSlot, setBookingSlot] = useState<BookingSlot | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showCalendarOptions, setShowCalendarOptions] = useState(false)

  useEffect(() => {
    // Load booking slot from sessionStorage
    const stored = sessionStorage.getItem('bookingSlot')
    if (stored) {
      setBookingSlot(JSON.parse(stored))
    } else {
      // No slot selected, redirect back to calendar
      router.push(`/contact/booking/${params.type}/${params.subcategory}`)
    }
  }, [router, params])

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
      day: 'numeric',
      year: 'numeric'
    })
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('nameTooShort')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired')
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('emailInvalid')
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = t('phoneInvalid')
      }
    }

    // Notes validation (optional but max length)
    if (formData.notes.length > 500) {
      newErrors.notes = t('notesTooLong')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Agent 4 will connect this to the real API
      // For now, simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate success
      setSubmitSuccess(true)
      setShowCalendarOptions(true)

      // Store booking data for calendar export
      const bookingData = {
        ...formData,
        slot: bookingSlot
      }
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
    } catch (error) {
      setSubmitError('Failed to submit booking. Please try again.')
      console.error('Booking submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const downloadICS = () => {
    if (!bookingSlot) return

    const startDate = new Date(`${bookingSlot.date}T${bookingSlot.startTime}:00`)
    const endDate = new Date(`${bookingSlot.date}T${bookingSlot.endTime}:00`)

    const formatDateICS = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Evie Marie Kolb Booking//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDateICS(startDate)}`,
      `DTEND:${formatDateICS(endDate)}`,
      `SUMMARY:Meeting - ${bookingSlot.subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
      `DESCRIPTION:Booking with ${formData.name}${formData.notes ? '\\n\\nNotes: ' + formData.notes : ''}`,
      `LOCATION:Online`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `booking-${bookingSlot.date}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const addToGoogleCalendar = () => {
    if (!bookingSlot) return

    const startDate = new Date(`${bookingSlot.date}T${bookingSlot.startTime}:00`)
    const endDate = new Date(`${bookingSlot.date}T${bookingSlot.endTime}:00`)

    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const title = encodeURIComponent(`Meeting - ${bookingSlot.subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`)
    const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`
    const details = encodeURIComponent(`Booking with ${formData.name}${formData.notes ? '\\n\\nNotes: ' + formData.notes : ''}`)

    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=Online`, '_blank')
  }

  const addToOutlookCalendar = () => {
    if (!bookingSlot) return

    const startDate = new Date(`${bookingSlot.date}T${bookingSlot.startTime}:00`)
    const endDate = new Date(`${bookingSlot.date}T${bookingSlot.endTime}:00`)

    const formatOutlookDate = (date: Date) => {
      return date.toISOString().split('.')[0] + 'Z'
    }

    const title = encodeURIComponent(`Meeting - ${bookingSlot.subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`)
    const start = formatOutlookDate(startDate)
    const end = formatOutlookDate(endDate)
    const body = encodeURIComponent(`Booking with ${formData.name}${formData.notes ? '\\n\\nNotes: ' + formData.notes : ''}`)

    window.open(`https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${title}&startdt=${start}&enddt=${end}&body=${body}&location=Online`, '_blank')
  }

  if (!bookingSlot) {
    return (
      <div className={styles.formPage}>
        <div className={styles.container}>
          <p className={styles.loadingText}>{t('loading')}</p>
        </div>
      </div>
    )
  }

  if (submitSuccess) {
    return (
      <div className={styles.formPage}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <CheckIcon />
            </div>
            <h1 className={styles.successTitle}>{t('bookingConfirmed')}</h1>
            <p className={styles.successMessage}>
              {t('yourMeetingScheduled')}
            </p>
            <div className={styles.bookingDetails}>
              <p className={styles.bookingDetail}>
                <strong>{t('date')}:</strong> {formatDate(bookingSlot.date)}
              </p>
              <p className={styles.bookingDetail}>
                <strong>{t('time')}:</strong> {formatTime(bookingSlot.startTime)} - {formatTime(bookingSlot.endTime)}
              </p>
              <p className={styles.bookingDetail}>
                <strong>{t('duration')}:</strong> {bookingSlot.duration} {t('minutes')}
              </p>
            </div>

            {showCalendarOptions && (
              <div className={styles.calendarOptions}>
                <h2 className={styles.calendarOptionsTitle}>{t('addToCalendar')}</h2>
                <div className={styles.calendarButtons}>
                  <button
                    className={styles.calendarButton}
                    onClick={addToGoogleCalendar}
                  >
                    <GoogleIcon />
                    <span>{t('addToGoogle')}</span>
                  </button>
                  <button
                    className={styles.calendarButton}
                    onClick={downloadICS}
                  >
                    <CalendarIcon />
                    <span>{t('downloadICS')}</span>
                  </button>
                  <button
                    className={styles.calendarButton}
                    onClick={addToOutlookCalendar}
                  >
                    <span>Outlook</span>
                  </button>
                </div>
                <p className={styles.appleHint}>
                  {t('appleHint')}
                </p>
              </div>
            )}

            <div className={styles.successActions}>
              <Link
                href="/contact/booking"
                className={styles.backButton}
              >
                {t('bookAnotherMeeting')}
              </Link>
              <Link
                href="/"
                className={styles.homeButton}
              >
                {t('returnHome')}
              </Link>
            </div>

            <p className={styles.confirmationEmail}>
              {t('confirmationEmailSent', { email: formData.email })}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.formPage}>
      <div className={styles.container}>
        {/* Back button */}
        <Link
          href={`/contact/booking/${params.type}/${params.subcategory}`}
          className={styles.backLink}
        >
          <ChevronLeftIcon />
          <span>{t('backToTimeSelection')}</span>
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{t('completeYourBooking')}</h1>
          <p className={styles.subtitle}>
            {t('provideDetails')}
          </p>
        </header>

        {/* Booking summary */}
        <div className={styles.bookingSummary}>
          <h2 className={styles.summaryTitle}>{t('meetingDetails')}</h2>
          <div className={styles.summaryDetails}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('type')}:</span>
              <span className={styles.summaryValue}>
                {bookingSlot.subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('date')}:</span>
              <span className={styles.summaryValue}>{formatDate(bookingSlot.date)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('time')}:</span>
              <span className={styles.summaryValue}>
                {formatTime(bookingSlot.startTime)} - {formatTime(bookingSlot.endTime)}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('duration')}:</span>
              <span className={styles.summaryValue}>{bookingSlot.duration} {t('minutes')}</span>
            </div>
          </div>
        </div>

        {/* Booking form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              {t('name')} <span className={styles.required}>{t('required')}</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder={t('yourFullName')}
              disabled={isSubmitting}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              {t('email')} <span className={styles.required}>{t('required')}</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder={t('yourEmail')}
              disabled={isSubmitting}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              {t('phone')} <span className={styles.optional}>{t('optional')}</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              placeholder={t('yourPhone')}
              disabled={isSubmitting}
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>
              {t('notes')} <span className={styles.optional}>{t('optional')}</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className={`${styles.textarea} ${errors.notes ? styles.inputError : ''}`}
              placeholder={t('anyTopics')}
              rows={4}
              maxLength={500}
              disabled={isSubmitting}
            />
            <div className={styles.characterCount}>
              {t('characterCount', { count: formData.notes.length })}
            </div>
            {errors.notes && <span className={styles.error}>{errors.notes}</span>}
          </div>

          {submitError && (
            <div className={styles.submitError}>
              {submitError}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('submitting') : t('confirmBooking')}
          </button>
        </form>

        <p className={styles.privacyNote}>
          {t('privacyNote')}
        </p>
      </div>
    </div>
  )
}
