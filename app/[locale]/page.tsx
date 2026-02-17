'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/app/i18n/routing';
import Image from "next/image"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import DomainCard from "@/components/DomainCard"
import { getEstablishedDomains, getPivotDomains } from "@/app/[locale]/domains/domainsData"
import styles from "./page.module.scss"

export default function Home() {
  const t = useTranslations('home');
  const quotes = useTranslations('quotes.home');

  return (
    <div className={`${styles.page} watercolor-wash`}>
      <Nav />

      {/* Hero section */}
      <main className={styles.heroMain}>
        <div className={styles.heroTextCenter}>
          <div className={styles.profileLinkWrapper}>
            <Link href="/profile" className={styles.profileLink}>
              <div className={styles.profileGlow}></div>
              <Image
                src="/images/profile.jpg"
                alt="Evie Marie Kolb"
                width={180}
                height={180}
                className={styles.profileImage}
                priority
              />
            </Link>
          </div>

          <div className={styles.statusBadge}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>{t('status')}</span>
          </div>

          <h1 className={styles.heroTitle}>
            {t('title')}
          </h1>
          <p className={styles.heroSubtitle}>
            {t('subtitle')}
          </p>
          <div className={styles.heroButtons}>
            <Link href="/projects" className={styles.primaryButton}>
              {t('viewWork')}
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              {t('getInTouch')}
            </Link>
          </div>
        </div>
      </main>

      <div className={styles.container}>
        <div className={styles.whatIDoSection}>
          <h2 className={styles.sectionHeading}>{t('whatIDo')}</h2>

          {/* Tier 1: Pivot domains - Primary focus areas */}
          <div className={styles.primaryDomainsSection}>
            <h3 className={styles.subsectionHeading}>{t('aiFocus')}</h3>
            <p className={styles.pivotIntro}>
              {t('aiFocusIntro')}
            </p>
            <div className={styles.domainsGrid}>
              {getPivotDomains().map((domain) => (
                <DomainCard
                  key={domain.slug}
                  domain={domain}
                  variant="compact"
                  showStatus
                />
              ))}
            </div>
          </div>

          {/* Tier 2: Established domains - Proven track record */}
          <div className={styles.establishedDomainsSection}>
            <h3 className={styles.subsectionHeading}>{t('provenTrack')}</h3>
            <p className={styles.establishedIntro}>
              {t('provenIntro')}
            </p>
            <div className={styles.domainsGrid}>
              {getEstablishedDomains().map((domain) => (
                <DomainCard key={domain.slug} domain={domain} variant="compact" />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statsCard}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>5+</div>
              <div className={styles.statLabel}>{t('yearsExperience')}</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>3</div>
              <div className={styles.statLabel}>{t('companies')}</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>React</div>
              <div className={styles.statLabel}>{t('specialist')}</div>
            </div>
          </div>
        </div>

        {/* Personal Highlights Strip */}
        <div className={styles.highlightsSection}>
          <h2 className={styles.sectionHeading}>{t('moreThanCode')}</h2>
          <div className={styles.highlightsGrid}>
            <Link href="/journey" className={styles.highlightCard}>
              <Image src="/images/journey/mirror-dress.jpg" alt={t('myJourney')} fill sizes="25vw" />
              <div className={styles.highlightOverlay} />
              <div className={styles.highlightText}>
                <p className={styles.highlightTitle}>{t('myJourney')}</p>
                <p className={styles.highlightSubtitle}>{t('readStory')}</p>
              </div>
            </Link>
            <Link href="/interests#music" className={styles.highlightCard}>
              <Image src="/images/hobbies/guitar-gig.jpg" alt={t('music')} fill sizes="25vw" />
              <div className={styles.highlightOverlay} />
              <div className={styles.highlightText}>
                <p className={styles.highlightTitle}>{t('music')}</p>
                <p className={styles.highlightSubtitle}>{t('songwriterPerformer')}</p>
              </div>
            </Link>
            <Link href="/interests#climbing" className={styles.highlightCard}>
              <Image src="/images/hobbies/climbing-2.jpg" alt={t('climbing')} fill sizes="25vw" />
              <div className={styles.highlightOverlay} />
              <div className={styles.highlightText}>
                <p className={styles.highlightTitle}>{t('climbing')}</p>
                <p className={styles.highlightSubtitle}>{t('onWall')}</p>
              </div>
            </Link>
            <Link href="/interests#travel" className={styles.highlightCard}>
              <Image src="/images/travel/great-wall-archway.jpg" alt={t('travel')} fill sizes="25vw" />
              <div className={styles.highlightOverlay} />
              <div className={styles.highlightText}>
                <p className={styles.highlightTitle}>{t('travel')}</p>
                <p className={styles.highlightSubtitle}>{t('acrossAsia')}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer quote={quotes('text')} attribution={quotes('author')} />
    </div>
  )
}
