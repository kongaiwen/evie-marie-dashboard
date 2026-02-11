'use client'

import { useState } from 'react'
import { Link } from '@/app/i18n/routing'
import { useTranslations } from 'next-intl'
import styles from './page.module.scss'

// Booking type data structure with subcategories
interface BookingType {
  id: string
  titleKey: string
  descKey: string
  icon: React.ReactNode
  color: string
  subcategories: {
    id: string
    titleKey: string
    descKey: string
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

// Get booking types data with translation keys
const getBookingTypes = (): BookingType[] => [
  {
    id: 'professional',
    titleKey: 'professional',
    descKey: 'professionalDesc',
    icon: <BriefcaseIcon />,
    color: 'sage',
    subcategories: [
      {
        id: 'consultation',
        titleKey: 'consultation',
        descKey: 'consultationDesc'
      },
      {
        id: 'interview',
        titleKey: 'interview',
        descKey: 'interviewDesc'
      },
      {
        id: 'collaboration',
        titleKey: 'collaboration',
        descKey: 'collaborationDesc'
      },
      {
        id: 'technical-discussion',
        titleKey: 'technicalDiscussion',
        descKey: 'technicalDiscussionDesc'
      }
    ]
  },
  {
    id: 'friends',
    titleKey: 'friends',
    descKey: 'friendsDesc',
    icon: <UsersIcon />,
    color: 'plum',
    subcategories: [
      {
        id: 'coffee-chat',
        titleKey: 'coffeeChat',
        descKey: 'coffeeChatDesc'
      },
      {
        id: 'catch-up',
        titleKey: 'catchUp',
        descKey: 'catchUpDesc'
      },
      {
        id: 'activity',
        titleKey: 'activity',
        descKey: 'activityDesc'
      }
    ]
  },
  {
    id: 'kid-activities',
    titleKey: 'kidActivities',
    descKey: 'kidActivitiesDesc',
    icon: <ChildIcon />,
    color: 'rose',
    subcategories: [
      {
        id: 'playdate',
        titleKey: 'playdate',
        descKey: 'playdateDesc'
      },
      {
        id: 'educational',
        titleKey: 'educational',
        descKey: 'educationalDesc'
      },
      {
        id: 'family-event',
        titleKey: 'familyEvent',
        descKey: 'familyEventDesc'
      }
    ]
  }
]

export default function BookingPage() {
  const t = useTranslations('booking')
  const [expandedType, setExpandedType] = useState<string | null>(null)
  const bookingTypes = getBookingTypes()

  const toggleType = (typeId: string) => {
    setExpandedType(expandedType === typeId ? null : typeId)
  }

  return (
    <div className={styles.bookingPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('scheduleMeeting')}</h1>
          <p className={styles.subtitle}>
            {t('chooseBookingType')}
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
                  <h2 className={styles.bookingTypeTitle}>{t(type.titleKey)}</h2>
                  <p className={styles.bookingTypeDescription}>{t(type.descKey)}</p>
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
                      <h3 className={styles.subcategoryTitle}>{t(subcategory.titleKey)}</h3>
                      <p className={styles.subcategoryDescription}>{t(subcategory.descKey)}</p>
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
          <p>{t('needHelp')} <a href="mailto:eviemariekolb@gmail.com">{t('sendEmail')}</a></p>
        </div>
      </div>
    </div>
  )
}
