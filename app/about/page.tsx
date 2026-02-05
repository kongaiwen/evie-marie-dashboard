import Link from "next/link"
import Image from "next/image"
import ParallaxSection from "@/components/ParallaxSection"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import DomainCard from "@/components/DomainCard"
import { ImageGalleryProvider } from "@/components/ClickableImage"
import { getEstablishedDomains, getPivotDomains } from "@/app/domains/domainsData"
import styles from "./page.module.scss"

export default function AboutPage() {
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
          <h1 className={styles.headerTitle}>About Me</h1>
        </div>
      </ParallaxSection>

      <main className={styles.mainContainer}>
        <div className={styles.mainCard}>
          <div className={styles.cardContent}>
            <div className={styles.prose}>
              <p>
                I&apos;m a Full-Stack Software Engineer with 5+ years of experience building
                web and mobile applications. I specialize in React, React Native, and Node.js,
                and I focus on creating accessible, performant solutions that solve real problems.
              </p>

              <h2 className={styles.sectionTitle}>
                <span className={styles.iconBox}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Professional Experience
              </h2>

              <div className={styles.experienceList}>
                <div className={`${styles.experienceItem} ${styles.sage}`}>
                  <h3>GoodMaps - Front End Engineer II</h3>
                  <p className={styles.jobDate}>2024 - 2025</p>
                  <p>
                    I built a custom text-to-speech library for accessible navigation and
                    led a major refactor that migrated the codebase to modern React patterns
                    with Zustand state management. I also managed complex Expo and React Native upgrades
                    that involved Unity integrations.
                  </p>
                </div>

                <div className={`${styles.experienceItem} ${styles.plum}`}>
                  <h3>Switcher Studio - Software Engineer</h3>
                  <p className={styles.jobDate}>2022 - 2024</p>
                  <p>
                    I owned the prototype for an embeddable video player with live streaming,
                    Shopify integration, and Stripe-powered gated content. I also created custom hooks
                    and standardized component libraries.
                  </p>
                </div>

                <div className={`${styles.experienceItem} ${styles.rose}`}>
                  <h3>borderless - Software Engineer</h3>
                  <p className={styles.jobDate}>2020 - 2022</p>
                  <p>
                    I led engineering teams, conducted technical interviews, and managed deployments
                    across AWS, Netlify, and CI/CD pipelines. I built user interfaces for payment
                    features and third-party API integrations.
                  </p>
                </div>
              </div>

              <h2 className={styles.sectionTitle}>
                <span className={`${styles.iconBox} ${styles.plum}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                Background
              </h2>
              <p>
                My path to software engineering wasn&apos;t traditional. I graduated from Indiana University
                with a B.A. in East Asian Languages &amp; Cultures, focusing on Mandarin Chinese. After that,
                I spent five years as a Mandarin-qualified Flight Attendant at United Airlines. I got to travel
                the world and develop strong communication and problem-solving skills along the way.
              </p>
              <p>
                In 2020, I transitioned into tech through Hack Reactor&apos;s Advanced Software Engineering
                Program. My language learning experience, multicultural background,
                and technical skills give me a unique perspective on building software that
                works for people from all backgrounds.
              </p>

              <div className={styles.linkGroup}>
                <Link href="/journey" className={`${styles.inlineLink} ${styles.sage}`}>
                  Read my full story
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/interests" className={`${styles.inlineLink} ${styles.plum}`}>
                  See my interests
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Workspace Moment */}
              <div style={{ maxWidth: '500px', margin: '3rem auto' }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <source src="/videos/creative-workspace-moment.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Expertise Section */}
        <section className={styles.domainExpertiseSection}>
          <h2 className={styles.sectionHeading}>Domain Expertise</h2>
          <p className={styles.introText}>
            AI Engineer and Data Engineer with strong full-stack foundation. Rapidly mastering
            machine learning systems, data pipelines, and scalable architecture to deliver
            intelligent, data-driven solutions.
          </p>

          <div className={styles.domainsByStatus}>
            {/* Pivot - Primary Focus */}
            <div className={styles.domainCategory}>
              <h3 className={styles.categoryHeading}>AI, Data & Architecture Focus</h3>
              <p className={styles.categoryIntro}>
                Building production-ready AI systems, designing scalable data infrastructure, and
                architecting enterprise solutions. Combining intensive learning with hands-on
                implementation across machine learning, data engineering, and systems design.
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
              <h3 className={styles.categoryHeading}>Proven Technical Foundation</h3>
              <p className={styles.categoryIntro}>
                Years of hands-on experience across core specialties, providing a strong
                foundation for tackling complex technical challenges.
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
            <p>Where the work happens</p>
          </div>
        </div>

        <div className={styles.skillsSection}>
          <h2 className={styles.skillsHeading}>Technical Skills</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={`${styles.skillIcon} ${styles.sage}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className={styles.skillTitle}>Languages</h3>
              </div>
              <p className={styles.skillContent}>TypeScript, JavaScript, C#/.NET, Python, Bash</p>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={`${styles.skillIcon} ${styles.sagePlum}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={styles.skillTitle}>Front-End</h3>
              </div>
              <p className={styles.skillContent}>React, React Native, Expo, Next.js, Redux, Zustand, GraphQL</p>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={`${styles.skillIcon} ${styles.plum}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className={styles.skillTitle}>Back-End</h3>
              </div>
              <p className={styles.skillContent}>Node.js, GraphQL, REST APIs, Prisma, PostgreSQL, MongoDB</p>
            </div>

            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={`${styles.skillIcon} ${styles.rose}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className={styles.skillTitle}>Tools & Infrastructure</h3>
              </div>
              <p className={styles.skillContent}>Git, Docker, AWS, Stripe, Shopify, CircleCI, Unity</p>
            </div>
          </div>
        </div>
      </main>

      <Footer quote="Mathematical science shows what is. It is the language of unseen relations between things. But to use and apply that language, we must be able to fully to appreciate, to feel, to seize the unseen, the unconscious." attribution="Ada Lovelace" />
      </div>
    </ImageGalleryProvider>
  )
}
