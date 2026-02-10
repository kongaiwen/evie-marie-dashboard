'use client';

import { Link } from "@/app/i18n/routing"
import Image from "next/image"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import ParallaxSection from "@/components/ParallaxSection"
import { ImageGalleryProvider, ClickableImage } from "@/components/ClickableImage"
import { useTranslations } from 'next-intl'
import styles from "./page.module.scss"

const NarrativeSection = ({
  imageSrc,
  imageAlt,
  imagePosition = "right",
  children,
}: {
  imageSrc: string
  imageAlt: string
  imagePosition?: "left" | "right"
  children: React.ReactNode
}) => {
  const imageBlock = (
    <div className={styles.imageContainer}>
      <ClickableImage
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )

  const textBlock = (
    <div className={styles.textColumn}>{children}</div>
  )

  return (
    <div className={styles.narrativeGrid}>
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  )
}

const DualImageSection = ({
  imageSrc1,
  imageAlt1,
  imageSrc2,
  imageAlt2,
  children,
}: {
  imageSrc1: string
  imageAlt1: string
  imageSrc2: string
  imageAlt2: string
  children: React.ReactNode
}) => {
  return (
    <div className={styles.dualImageSection}>
      <div>{children}</div>
      <div className={styles.dualImageGrid}>
        <div className={styles.squareImage}>
          <ClickableImage src={imageSrc1} alt={imageAlt1} fill sizes="50vw" />
        </div>
        <div className={styles.squareImage}>
          <ClickableImage src={imageSrc2} alt={imageAlt2} fill sizes="50vw" />
        </div>
      </div>
    </div>
  )
}

export default function JourneyPage() {
  const t = useTranslations('journey')

  return (
    <ImageGalleryProvider>
      <div className={`${styles.page} watercolor-wash`}>
        <Nav active="/journey" />

      {/* Hero */}
      <ParallaxSection
        imageSrc="/images/backgrounds/misty-mountains-tree.jpg"
        overlayColor="rgba(74, 47, 87, 0.6)"
        minHeight="500px"
        className={styles.heroParallax}
      >
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{t('title')}</h1>
            <p className={styles.heroSubtitle}>
              {t('subtitle')}
            </p>
          </div>
        </div>
      </ParallaxSection>

      {/* Narrative Sections */}
      <main className={styles.main}>

        {/* Section 1: Growing Up */}
        <section className={styles.section}>
          <DualImageSection
            imageSrc1="/images/journey/childhood-1994.jpg"
            imageAlt1="Childhood photo, 1994"
            imageSrc2="/images/journey/childhood-sunglasses.jpg"
            imageAlt2="Childhood photo with sunglasses"
          >
            <h2 className={styles.sectionTitle}>{t('growingUp')}</h2>
            <p className={styles.narrativeText}>
              {t('growingUpText')}
            </p>
          </DualImageSection>
        </section>
      </main>

      {/* Parallax Divider */}
      <ParallaxSection
        imageSrc="/images/backgrounds/mountain-sunset-deck.jpg"
        overlayColor="rgba(92, 74, 54, 0.3)"
        minHeight="350px"
        className={styles.parallaxDivider}
      >
        <div className={styles.parallaxSpacer} />
      </ParallaxSection>

      <main className={styles.main}>

        {/* Section 2: Finding My Way — marathon photo on side */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('findingMyWay')}</h2>

          {/* Side-by-side layout with marathon photo */}
          <div className={styles.narrativeGrid}>
            <div className={styles.imageContainer}>
              <ClickableImage
                src="/images/journey/pre-marathon.jpg"
                alt="Pre-marathon in Saitama, Japan"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.textColumn}>
              <p className={styles.narrativeText}>
                {t('findingMyWay1')}
              </p>
              <p className={styles.narrativeText}>
                {t('findingMyWay2')}
              </p>
              <p className={styles.narrativeText}>
                {t('findingMyWay3')}
              </p>
            </div>
          </div>

          <div className={styles.photoGrid4}>
            <div className={styles.smallSquareImage}>
              <ClickableImage src="/images/journey/pre-teaching.jpg" alt="With students in China" fill sizes="25vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <ClickableImage src="/images/journey/pre-arcade.jpg" alt="Playing Taiko no Tatsujin in Japan" fill sizes="25vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <ClickableImage src="/images/journey/calligraphy-grandmother.jpg" alt="Chinese calligraphy practice: the character for Grandmother" fill sizes="25vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <ClickableImage src="/images/journey/pre-outdoors.jpg" alt="Outdoors portrait" fill sizes="25vw" />
            </div>
          </div>
        </section>
      </main>

      {/* Parallax Divider - Alpine Mountains */}
      <ParallaxSection
        imageSrc="/images/alpine-mountain-snow-landscape.jpg"
        overlayColor="rgba(74, 103, 130, 0.25)"
        minHeight="350px"
        className={styles.parallaxDivider}
      >
        <div className={styles.parallaxSpacer} />
      </ParallaxSection>

      <main className={styles.main}>

        {/* Section 3: The Turning Point */}
        <section className={styles.section}>
          <NarrativeSection
            imageSrc="/images/journey/mirror-dress.jpg"
            imageAlt="Looking in the mirror, seeing myself for the first time"
            imagePosition="left"
          >
            <h2 className={styles.sectionTitle}>{t('turningPoint')}</h2>
            <p className={`${styles.narrativeText} ${styles.marginBottom}`}>
              {t('turningPoint1')}
            </p>
            <p className={styles.narrativeText}>
              {t('turningPoint2')}
            </p>
          </NarrativeSection>
        </section>

        {/* Section 4: Becoming Myself */}
        <section className={styles.section}>
          <NarrativeSection
            imageSrc="/images/journey/rock-face.jpg"
            imageAlt="Rock climbing"
            imagePosition="right"
          >
            <h2 className={styles.sectionTitle}>{t('becomingMyself')}</h2>
            <p className={`${styles.narrativeText} ${styles.marginBottom}`}>
              {t('becomingMyself1')}
            </p>
            <p className={styles.narrativeText}>
              {t('becomingMyself2')}
            </p>
          </NarrativeSection>

          <div className={styles.photoGrid2}>
            <div className={styles.portraitImage}>
              <ClickableImage src="/images/journey/dress-boots.jpg" alt="White dress and Doc Martens" fill sizes="50vw" />
            </div>
            <div className={styles.portraitImage}>
              <ClickableImage src="/images/journey/formal-event.jpg" alt="At a formal event with a friend" fill sizes="50vw" />
            </div>
          </div>
        </section>
      </main>

      {/* Parallax Divider */}
      <ParallaxSection
        imageSrc="/images/backgrounds/lake-sunset.jpg"
        overlayColor="rgba(139, 115, 85, 0.25)"
        minHeight="350px"
        className={styles.parallaxDivider}
      >
        <div className={styles.parallaxSpacer} />
      </ParallaxSection>

      <main className={styles.main}>

        {/* Section 5: Today */}
        <section className={styles.section}>
          <NarrativeSection
            imageSrc="/images/journey/teaching-climbing.jpg"
            imageAlt="Teaching a child to rock climb"
            imagePosition="left"
          >
            <h2 className={styles.sectionTitle}>{t('today')}</h2>
            <p className={`${styles.narrativeText} ${styles.marginBottom}`}>
              {t('today1')}
            </p>
            <p className={styles.narrativeText}>
              {t('today2')}
            </p>
          </NarrativeSection>

          <div className={styles.photoGrid3}>
            <div className={styles.smallSquareImage}>
              <ClickableImage src="/images/journey/headphones.jpg" alt="Casual selfie with headphones" fill sizes="33vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <ClickableImage
                src="/images/journey/teaching-mandarin-louisville.jpg"
                alt="Teaching Mandarin at a Louisville elementary school"
                fill
                sizes="33vw"
              />
            </div>
            <div className={styles.smallSquareImage}>
              <ClickableImage src="/images/portraits/hero-current.jpg" alt="Current photo" fill sizes="33vw" />
            </div>
          </div>

          {/* Additional Lifestyle Images */}
          <div className={styles.lifestyleImagesGrid}>
            <div className={styles.lifestyleImageWrapper}>
              <ClickableImage
                src="/images/portraits/summer-hat-portrait.jpg"
                alt="Summer portrait with hat"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className={styles.lifestyleImageWrapper}>
              <ClickableImage
                src="/images/portraits/urban-street-selfie.jpg"
                alt="Urban street selfie"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className={styles.closingSection}>
          <div className={styles.closingCard}>
            <p className={styles.quote}>
              &ldquo;We have to be visible. We should not be ashamed of who we are.&rdquo;
            </p>
            <p className={styles.attribution}>&mdash; Sylvia Rivera</p>
            <div className={styles.ctaButtons}>
              <Link href="/interests" className={styles.primaryButton}>
                {t('seeInterests')}
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                {t('getInTouch')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer
        quote="Every person has a responsibility to be a participant in this society and make it a better place for everybody, in whatever capacity they can."
        attribution="Megan Rapinoe"
      />
      </div>
    </ImageGalleryProvider>
  )
}
