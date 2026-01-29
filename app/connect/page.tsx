import Image from "next/image"
import styles from './page.module.scss'

export const metadata = {
  title: "Connect with Evie Marie Kolb",
  description: "Full-Stack Software Engineer. Get my resume, connect on LinkedIn, or save my contact info.",
}

export default function ConnectPage() {
  return (
    <div className={`${styles.page} watercolor-wash`}>
      <div className={styles.container}>
        {/* Card */}
        <div className={styles.card}>
          {/* Header with gradient */}
          <div className={styles.header}>
            <div className={styles.headerOverlay}>
              <div className={styles.headerBg} />
            </div>
          </div>

          {/* Avatar overlapping header */}
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatarBorder} />
              <Image
                src="/images/portraits/hero-current.jpg"
                alt="Evie Marie Kolb"
                width={96}
                height={96}
                className={styles.avatar}
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <h1 className={styles.name}>Evie Marie Kolb</h1>
            <p className={styles.title}>Full-Stack Software Engineer</p>
            <p className={styles.location}>Chicago, IL</p>
          </div>

          {/* Action buttons */}
          <div className={styles.actions}>
            {/* Resume - View & Download */}
            <a
              href="/Evie_Marie_Kolb_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLinkPrimary}
            >
              <div className={styles.iconContainerPrimary}>
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className={styles.actionText}>
                <div className={styles.actionTitle}>View Resume</div>
                <div className={styles.actionSubtitle}>PDF</div>
              </div>
              <svg className={styles.actionArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/evie-marie-kolb"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLinkSecondary}
            >
              <div className={styles.iconContainerLinkedin}>
                <svg className={styles.iconLinkedin} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className={styles.actionText}>
                <div className={styles.actionTitle}>Connect on LinkedIn</div>
                <div className={styles.actionSubtitleSecondary}>evie-marie-kolb</div>
              </div>
              <svg className={styles.actionArrowLight} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/kongaiwen"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionLinkSecondary} ${styles.actionLinkGithub}`}
            >
              <div className={styles.iconContainerGithub}>
                <svg className={styles.iconGithub} fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={styles.actionText}>
                <div className={styles.actionTitle}>GitHub</div>
                <div className={styles.actionSubtitleSecondary}>@kongaiwen</div>
              </div>
              <svg className={styles.actionArrowLight} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:eviemariekolb@gmail.com"
              className={`${styles.actionLinkSecondary} ${styles.actionLinkEmail}`}
            >
              <div className={styles.iconContainerEmail}>
                <svg className={styles.iconEmail} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className={styles.actionText}>
                <div className={styles.actionTitle}>Email Me</div>
                <div className={styles.actionSubtitleSecondary}>eviemariekolb@gmail.com</div>
              </div>
              <svg className={styles.actionArrowLight} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Save Contact (vCard) */}
            <a
              href="/evie-marie-kolb.vcf"
              download
              className={`${styles.actionLinkSecondary} ${styles.actionLinkVcard}`}
            >
              <div className={styles.iconContainerVcard}>
                <svg className={styles.iconVcard} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className={styles.actionText}>
                <div className={styles.actionTitle}>Save Contact</div>
                <div className={styles.actionSubtitleSecondary}>Add to your phone</div>
              </div>
              <svg className={styles.actionArrowLight} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>

            {/* Portfolio */}
            <a
              href="/"
              className={`${styles.actionLinkSecondary} ${styles.actionLinkPortfolio}`}
            >
              <div className={styles.iconContainerGradient}>
                <span className={styles.iconPortfolio}>E</span>
              </div>
              <div className={styles.actionText}>
                <div className={styles.actionTitle}>View Portfolio</div>
                <div className={styles.actionSubtitleSecondary}>eviemariekolb.dev</div>
              </div>
              <svg className={styles.actionArrowLight} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>Tap any link above to connect</p>
          </div>
        </div>
      </div>
    </div>
  )
}
