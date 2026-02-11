'use client';

import { Link } from "@/app/i18n/routing"
import Image from "next/image"
import ParallaxSection from "@/components/ParallaxSection"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import DomainCard from "@/components/DomainCard"
import { ImageGalleryProvider } from "@/components/ClickableImage"
import { getEstablishedDomains, getPivotDomains } from "@/app/[locale]/domains/domainsData"
import { useTranslations } from 'next-intl'
import styles from "./page.module.scss"

export default function AboutPage() {
  const t = useTranslations('about')
  const quotes = useTranslations('quotes.about')
  return (
    <ImageGalleryProvider>
      <div className={`${styles.page} watercolor-wash`}>
        <Nav active="/about" />

      {/* Atmospheric header with parallax */}
      <ParallaxSection
        imageSrc="/images/autumn-woods-portrait.jpg"
        overlayColor="rgba(74, 47, 87, 0.65)"
        minHeight="0px"
      >
        <div className={styles.headerContainer}>
          <Link href="/profile" className={styles.profileLinkWrapper}>
            <div className={styles.profileImageWrapper}>
              <div className={styles.profileGlow}></div>
              <Image
                src="/images/portraits/hero-current.jpg"
                alt="Evie Marie Kolb"
                width={160}
                height={160}
                className={styles.profileImage}
              />
            </div>
          </Link>
          <h1 className={styles.headerTitle}>{t('title')}</h1>
        </div>
      </ParallaxSection>

      <main className={styles.mainContainer}>
        <div className={styles.mainCard}>
          <div className={styles.cardContent}>
            <div className={styles.prose}>
              <p>
                {t('intro')}
              </p>

              <h2 className={styles.sectionTitle}>
                <span className={styles.iconBox}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                {t('professionalExperience')}
              </h2>

              <div className={styles.experienceList}>
                <div className={`${styles.experienceItem} ${styles.sage}`}>
                  <h3>{t('goodmaps.title')}</h3>
                  <p className={styles.jobDate}>{t('goodmaps.date')}</p>
                  <p>
                    {t('goodmaps.description')}
                  </p>
                </div>

                <div className={`${styles.experienceItem} ${styles.plum}`}>
                  <h3>{t('switcher.title')}</h3>
                  <p className={styles.jobDate}>{t('switcher.date')}</p>
                  <p>
                    {t('switcher.description')}
                  </p>
                </div>

                <div className={`${styles.experienceItem} ${styles.rose}`}>
                  <h3>{t('borderless.title')}</h3>
                  <p className={styles.jobDate}>{t('borderless.date')}</p>
                  <p>
                    {t('borderless.description')}
                  </p>
                </div>
              </div>

              <h2 className={styles.sectionTitle}>
                <span className={`${styles.iconBox} ${styles.plum}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                {t('background')}
              </h2>
              <p>
                {t('backgroundText1')}
              </p>
              <p>
                {t('backgroundText2')}
              </p>

              <div className={styles.linkGroup}>
                <Link href="/journey" className={`${styles.inlineLink} ${styles.sage}`}>
                  {t('readFullStory')}
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/interests" className={`${styles.inlineLink} ${styles.plum}`}>
                  {t('seeInterests')}
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Workspace Moment */}
              <div className={styles.videoWrapper}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.video}
                >
                  <source src="/videos/creative-workspace-moment.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Expertise Section */}
        <section className={styles.domainExpertiseSection}>
          <h2 className={styles.sectionHeading}>{t('domainExpertise')}</h2>
          <p className={styles.introText}>
            {t('domainIntro')}
          </p>

          <div className={styles.domainsByStatus}>
            {/* Pivot - Primary Focus */}
            <div className={styles.domainCategory}>
              <h3 className={styles.categoryHeading}>{t('aiDataFocus')}</h3>
              <p className={styles.categoryIntro}>
                {t('aiDataIntro')}
              </p>
              <div className={styles.domainsGrid}>
                {getPivotDomains().map((domain) => (
                  <DomainCard
                    key={domain.slug}
                    domain={domain}
                    variant="expanded"
                    showStatus
                  />
                ))}
              </div>
            </div>

            {/* Established - Track Record */}
            <div className={styles.domainCategory}>
              <h3 className={styles.categoryHeading}>{t('provenFoundation')}</h3>
              <p className={styles.categoryIntro}>
                {t('provenFoundationIntro')}
              </p>
              <div className={styles.domainsGrid}>
                {getEstablishedDomains().map((domain) => (
                  <DomainCard
                    key={domain.slug}
                    domain={domain}
                    variant="expanded"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Workspace photo */}
        <div className={styles.workspaceSection}>
          <Image
            src="/images/travel/desk-setup.jpg"
            alt="My workspace"
            fill
            sizes="100vw"
          />
          <div className={styles.imageOverlay} />
          <div className={styles.imageCaption}>
            <p>{t('whereWorkHappens')}</p>
          </div>
        </div>

        <div className={styles.skillsSection}>
          <h2 className={styles.skillsHeading}>{t('technicalSkills')}</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={`${styles.skillIcon} ${styles.sage}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className={styles.skillTitle}>{t('languages')}</h3>
              </div>
              <p className={styles.skillContent}>{t('languagesList')}</p>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={`${styles.skillIcon} ${styles.sagePlum}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={styles.skillTitle}>{t('frontEnd')}</h3>
              </div>
              <p className={styles.skillContent}>{t('frontEndList')}</p>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={`${styles.skillIcon} ${styles.plum}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className={styles.skillTitle}>{t('backEnd')}</h3>
              </div>
              <p className={styles.skillContent}>{t('backEndList')}</p>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={`${styles.skillIcon} ${styles.rose}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className={styles.skillTitle}>{t('toolsInfrastructure')}</h3>
              </div>
              <p className={styles.skillContent}>{t('toolsInfrastructureList')}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer quote={quotes('text')} attribution={quotes('author')} />
      </div>
    </ImageGalleryProvider>
  )
}
