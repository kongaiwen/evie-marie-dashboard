import Link from "next/link"
import Image from "next/image"
import ParallaxSection from "@/components/ParallaxSection"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import DomainCard from "@/components/DomainCard"
import { getEstablishedDomains, getPivotDomains } from "@/app/domains/domainsData"
import styles from "./page.module.scss"

export default function Home() {
  return (
    <div className={`${styles.page} watercolor-wash`}>
      <Nav />

      {/* Hero with parallax background */}
      <ParallaxSection
        imageSrc="/images/backgrounds/mountain-panorama.jpg"
        overlayColor="rgba(255, 255, 255, 0.82)"
        blur={2}
        minHeight="0px"
      >
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
              <span className={styles.statusText}>Available for opportunities</span>
            </div>

            <h1 className={styles.heroTitle}>
              AI Engineer | Data Engineer | Solutions Architect
            </h1>
            <p className={styles.heroSubtitle}>
              Building intelligent AI systems, scalable data pipelines, and production-ready solutions.
              Leveraging full-stack expertise to architect end-to-end machine learning workflows,
              optimize data infrastructure, and deliver high-impact technical solutions.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/projects" className={styles.primaryButton}>
                View My Work
                <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                Get in touch
              </Link>
            </div>
          </div>
        </main>
      </ParallaxSection>

      <div className={styles.container}>
        <div className={styles.whatIDoSection}>
          <h2 className={styles.sectionHeading}>What I Do</h2>

          {/* Tier 1: Pivot domains - Primary focus areas */}
          <div className={styles.primaryDomainsSection}>
            <h3 className={styles.subsectionHeading}>AI & Data Engineering Focus</h3>
            <p className={styles.pivotIntro}>
              Rapidly mastering AI engineering, data pipelines, and solution architecture through
              intensive hands-on projects, certifications, and real-world application. Building the
              future of intelligent, data-driven systems.
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
            <h3 className={styles.subsectionHeading}>Proven Track Record</h3>
            <p className={styles.establishedIntro}>
              Strong foundation across core technical specialties with years of hands-on experience.
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
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>3</div>
              <div className={styles.statLabel}>Companies</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>React</div>
              <div className={styles.statLabel}>Specialist</div>
            </div>
          </div>
        </div>

        {/* Personal Highlights Strip */}
        <div className={styles.highlightsSection}>
          <h2 className={styles.sectionHeading}>More Than Code</h2>
          <div className={styles.highlightsGrid}>
            <Link href="/journey" className={styles.highlightCard}>
              <Image src="/images/journey/mirror-dress.jpg" alt="My journey" fill sizes="25vw" />
              <div className={styles.highlightOverlay} />
              <div className={styles.highlightText}>
                <p className={styles.highlightTitle}>My Journey</p>
                <p className={styles.highlightSubtitle}>Read my story</p>
              </div>
            </Link>
            <Link href="/interests#music" className={styles.highlightCard}>
              <Image src="/images/hobbies/guitar-gig.jpg" alt="Playing guitar" fill sizes="25vw" />
              <div className={styles.highlightOverlay} />
              <div className={styles.highlightText}>
                <p className={styles.highlightTitle}>Music</p>
                <p className={styles.highlightSubtitle}>Songwriter & performer</p>
              </div>
            </Link>
            <Link href="/interests#climbing" className={styles.highlightCard}>
              <Image src="/images/hobbies/climbing-2.jpg" alt="Rock climbing" fill sizes="25vw" />
              <div className={styles.highlightOverlay} />
              <div className={styles.highlightText}>
                <p className={styles.highlightTitle}>Climbing</p>
                <p className={styles.highlightSubtitle}>On the wall</p>
              </div>
            </Link>
            <Link href="/interests#travel" className={styles.highlightCard}>
              <Image src="/images/travel/great-wall-archway.jpg" alt="Travel" fill sizes="25vw" />
              <div className={styles.highlightOverlay} />
              <div className={styles.highlightText}>
                <p className={styles.highlightTitle}>Travel</p>
                <p className={styles.highlightSubtitle}>Across Asia & beyond</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer quote="The only way to do great work is to love what you do." attribution="Steve Jobs" />
    </div>
  )
}
