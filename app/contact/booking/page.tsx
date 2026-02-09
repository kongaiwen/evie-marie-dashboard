'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.scss'

// Booking type data structure with subcategories
interface BookingType {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  subcategories: {
    id: string
    title: string
    description: string
  }[]
}

// SVG icons
const BriefcaseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const UsersIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const ChildIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronUpIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
)

// Booking types data
const bookingTypes: BookingType[] = [
  {
    id: 'professional',
    title: 'Professional',
    description: 'Schedule meetings for work, collaborations, or professional consultations',
    icon: <BriefcaseIcon />,
    color: 'sage',
    subcategories: [
      {
        id: 'consultation',
        title: 'Consultation Call',
        description: '30-minute consultation to discuss your project needs'
      },
      {
        id: 'interview',
        title: 'Job Interview',
        description: 'Schedule an interview for a potential opportunity'
      },
      {
        id: 'collaboration',
        title: 'Collaboration Meeting',
        description: 'Discuss potential collaborations or partnerships'
      },
      {
        id: 'technical-discussion',
        title: 'Technical Discussion',
        description: 'Deep dive into technical topics or code reviews'
      }
    ]
  },
  {
    id: 'friends',
    title: 'Friends',
    description: 'Catch up with friends, schedule social activities, or just chat',
    icon: <UsersIcon />,
    color: 'plum',
    subcategories: [
      {
        id: 'coffee-chat',
        title: 'Coffee Chat',
        description: 'Casual conversation over coffee (in-person or virtual)'
      },
      {
        id: 'catch-up',
        title: 'Catch Up Call',
        description: 'Life updates and catching up on what\'s new'
      },
      {
        id: 'activity',
        title: 'Social Activity',
        description: 'Plan an activity together (hiking, gaming, etc.)'
      }
    ]
  },
  {
    id: 'kid-activities',
    title: 'Kid Activities',
    description: 'Schedule playdates, educational activities, or family-friendly events',
    icon: <ChildIcon />,
    color: 'rose',
    subcategories: [
      {
        id: 'playdate',
        title: 'Playdate',
        description: 'Schedule a fun playdate for the kids'
      },
      {
        id: 'educational',
        title: 'Educational Activity',
        description: 'Learning activities, tutoring, or educational games'
      },
      {
        id: 'family-event',
        title: 'Family Event',
        description: 'Plan a family-friendly activity or gathering'
      }
    ]
  }
]

export default function BookingPage() {
  const [expandedType, setExpandedType] = useState<string | null>(null)

  const toggleType = (typeId: string) => {
    setExpandedType(expandedType === typeId ? null : typeId)
  }

  return (
    <div className={styles.bookingPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Schedule a Meeting</h1>
          <p className={styles.subtitle}>
            Choose a booking type below to see available times and schedule your meeting
          </p>
        </header>

        <div className={styles.bookingTypes}>
          {bookingTypes.map((type) => (
            <div
              key={type.id}
              className={`${styles.bookingType} ${styles[type.color]} ${expandedType === type.id ? styles.expanded : ''}`}
            >
              <button
                className={styles.bookingTypeHeader}
                onClick={() => toggleType(type.id)}
                aria-expanded={expandedType === type.id}
              >
                <div className={styles.iconWrapper}>{type.icon}</div>
                <div className={styles.headerContent}>
                  <h2 className={styles.bookingTypeTitle}>{type.title}</h2>
                  <p className={styles.bookingTypeDescription}>{type.description}</p>
                </div>
                <div className={styles.chevron}>
                  {expandedType === type.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </div>
              </button>

              {expandedType === type.id && (
                <div className={styles.subcategories}>
                  {type.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/contact/booking/${type.id}/${subcategory.id}`}
                      className={styles.subcategoryCard}
                    >
                      <h3 className={styles.subcategoryTitle}>{subcategory.title}</h3>
                      <p className={styles.subcategoryDescription}>{subcategory.description}</p>
                      <div className={styles.subcategoryArrow}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.helpText}>
          <p>Need help or have questions? <a href="mailto:eviemariekolb@gmail.com">Send me an email</a></p>
        </div>
      </div>
    </div>
  )
}
