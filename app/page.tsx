import Link from "next/link"
import Image from "next/image"
import ParallaxSection from "@/components/ParallaxSection"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
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
              Full-Stack Software Engineer
            </h1>
            <p className={styles.heroSubtitle}>
              Building accessible, performant applications with React, React Native, and Node.js.
              I love creating elegant solutions that make technology work for everyone.
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
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={`${styles.serviceIcon} ${styles.sage}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Mobile & Web Development</h3>
              <p className={styles.serviceDescription}>
                I specialize in React Native, Expo, and Unity integrations for cross-platform mobile apps. I also build modern web applications with React and Next.js.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={`${styles.serviceIcon} ${styles.plum}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>API & Backend Architecture</h3>
              <p className={styles.serviceDescription}>
                I design scalable backend services with Node.js, GraphQL, and REST APIs. I work with PostgreSQL, MongoDB, and Prisma for database solutions.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={`${styles.serviceIcon} ${styles.rose}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Cloud & DevOps</h3>
              <p className={styles.serviceDescription}>
                I deploy and manage applications on AWS with Docker, CI/CD pipelines, Lambda functions, and infrastructure automation.
              </p>
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
