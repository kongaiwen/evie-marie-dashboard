'use client';

import { Link } from "@/app/i18n/routing"
import Image from "next/image"
import ParallaxSection from "@/components/ParallaxSection"
import ImageGallery from "@/components/ImageGallery"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { ImageGalleryProvider } from "@/components/ClickableImage"
import { useTranslations } from 'next-intl'
import styles from "./page.module.scss"

export default function InterestsPage() {
  const t = useTranslations('interests')
  const quotes = useTranslations('quotes.interests')
  return (
    <ImageGalleryProvider>
      <div className={`${styles.page} watercolor-wash`}>
        <Nav active="/interests" />

      {/* Hero */}
      <ParallaxSection
        imageSrc="/images/backgrounds/mountain-panorama.jpg"
        overlayColor="rgba(74, 47, 87, 0.55)"
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

      <main className={styles.main}>

        {/* Music Section */}
        <section className={styles.section}>
          <div className={styles.sectionGrid}>
            <div>
              <div className={`${styles.badge} ${styles.sage}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span>{t('music')}</span>
              </div>
              <h2 className={styles.sectionTitle}>{t('music')}</h2>
              <p className={styles.narrativeText}>
                {t('musicText')}
              </p>
            </div>
            <div className={styles.dualImageGrid}>
              <div className={styles.portraitImage}>
                <Image src="/images/hobbies/guitar-gig.jpg" alt="Performing live at an outdoor gig" fill sizes="25vw" />
              </div>
              <div className={styles.portraitImage}>
                <Image src="/images/hobbies/guitar-porch.jpg" alt="Playing guitar on the porch" fill sizes="25vw" />
              </div>
            </div>
          </div>

          {/* Music Images and Video */}
          <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <Image
              src="/images/hobbies/music-guitar-cat.jpg"
              alt="Playing guitar with cat nearby"
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
            />
            <p style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.95rem', opacity: 0.85, fontStyle: 'italic' }}>
              Practice sessions at home
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/videos/acoustic-guitar-performance-poster.jpg"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
              }}
            >
              <source src="/videos/acoustic-guitar-performance-10s.mp4" type="video/mp4" />
            </video>
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
              <source src="/videos/music-performance.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Parallax Divider */}
        <ParallaxSection
          imageSrc="/images/backgrounds/desert-badlands.jpg"
          overlayColor="rgba(139, 115, 85, 0.25)"
          minHeight="300px"
          className={styles.parallaxDivider}
        >
          <div className={styles.parallaxSpacer} />
        </ParallaxSection>

        {/* Rock Climbing Section */}
        <section className={styles.section}>
          <div>
            <div className={`${styles.badge} ${styles.sage}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{t('rockClimbing')}</span>
            </div>
            <h2 className={styles.sectionTitle}>{t('onTheWall')}</h2>
            <p className={styles.narrativeText}>
              {t('climbingText')}
            </p>
          </div>
          <ImageGallery
            images={[
              { src: "/images/hobbies/climbing-1.jpg", alt: "Climbing a rock face", caption: "Working a route" },
              { src: "/images/hobbies/climbing-2.jpg", alt: "Climbing higher on the wall", caption: "Finding the next hold" },
              { src: "/images/hobbies/climbing-3.jpg", alt: "Reaching for a hold", caption: "Full send" },
              { src: "/images/hobbies/climbing-mentor.jpg", alt: "Teaching a child to climb", caption: "Sharing the joy" },
              { src: "/images/hobbies/rock-climbing-exploration.jpg", alt: "Rock climbing exploration", caption: "Adventure climbing" },
            ]}
            columns={4}
            aspectRatio="portrait"
          />

          {/* Climbing Videos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem', maxWidth: '1200px', margin: '3rem auto 0' }}>
            <div>
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/videos/bouldering-climb-highlight-poster.jpg"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <source src="/videos/rock-climbing-overhang-traverse.mp4" type="video/mp4" />
              </video>
              <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                Overhang traverse
              </p>
            </div>
            <div>
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/videos/bouldering-climb-highlight-poster.jpg"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <source src="/videos/bouldering-climb-highlight.mp4" type="video/mp4" />
              </video>
              <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                Bouldering
              </p>
            </div>
            <div>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <source src="/videos/rock-climbing-ascent.mp4" type="video/mp4" />
              </video>
              <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                Taiwan ascent
              </p>
            </div>
          </div>
        </section>

        {/* Parallax Divider */}
        <ParallaxSection
          imageSrc="/images/backgrounds/rooftops.jpg"
          overlayColor="rgba(74, 47, 87, 0.25)"
          minHeight="300px"
          className={styles.parallaxDivider}
        >
          <div className={styles.parallaxSpacer} />
        </ParallaxSection>

        {/* Travel Section */}
        <section className={styles.section}>
          <div>
            <div className={`${styles.badge} ${styles.plum}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Travel</span>
            </div>
            <h2 className={styles.sectionTitle}>{t('travel')}</h2>
            <p className={styles.narrativeText}>
              {t('travelText')}
            </p>
          </div>

          {/* Travel Sub-Regions */}
          <div>
            <div className={styles.travelSubsection}>
              <h3 className={styles.subsectionTitle}>Taiwan</h3>
              <ImageGallery
                images={[
                  { src: "/images/travel/taipei-101.jpg", alt: "Taipei 101 skyscraper", caption: "Taipei 101" },
                  { src: "/images/travel/taiwan-forest.jpg", alt: "Misty forest in Taiwan mountains", caption: "Mountain trails" },
                  { src: "/images/travel/taiwan-sunset.jpg", alt: "Sunset over Taiwan mountains", caption: "Alishan sunset" },
                  { src: "/images/travel/taiwan-banyan.jpg", alt: "Banyan tree growing over a building", caption: "Anping Tree House" },
                ]}
                columns={4}
              />
            </div>

            <div className={styles.travelSubsection}>
              <h3 className={styles.subsectionTitle}>Mongolia</h3>
              <ImageGallery
                images={[
                  { src: "/images/travel/mongolia-sand-dune.jpg", alt: "Standing atop a sand dune in Mongolia", caption: "Khongoryn Els dunes" },
                  { src: "/images/travel/mongolia-flaming-cliffs.jpg", alt: "The Flaming Cliffs of Mongolia", caption: "Bayanzag (Flaming Cliffs)" },
                  { src: "/images/travel/mongolia-sunset-camels.jpg", alt: "Sunset with camels in the Gobi", caption: "Gobi Desert sunset" },
                  { src: "/images/travel/mongolia-ger.jpg", alt: "Ger (yurt) in the snow", caption: "Nomadic ger" },
                  { src: "/images/travel/van-desert-adventure.jpg", alt: "Van adventure across the Mongolian desert", caption: "Desert crossing" },
                  { src: "/images/travel/desert-sunset-livestock.jpg", alt: "Livestock at desert sunset", caption: "Nomadic life" },
                ]}
                columns={4}
              />

              {/* Mongolia Desert Journey Video */}
              <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
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
                  <source src="/videos/desert-sunset-van-journey.mp4" type="video/mp4" />
                </video>
                <p style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.95rem', opacity: 0.85, fontStyle: 'italic' }}>
                  Following our van through the Gobi Desert at sunset
                </p>
              </div>
            </div>

            <div className={styles.travelSubsection}>
              <h3 className={styles.subsectionTitle}>China, Japan & Hong Kong</h3>
              <ImageGallery
                images={[
                  { src: "/images/travel/great-wall-archway.jpg", alt: "The Great Wall of China through an archway", caption: "Great Wall of China" },
                  { src: "/images/travel/nara-deer.jpg", alt: "Feeding deer in Nara, Japan", caption: "Nara deer park" },
                  { src: "/images/travel/hong-kong.jpg", alt: "Hong Kong skyline from Victoria Peak", caption: "Victoria Peak, Hong Kong" },
                  { src: "/images/travel/japan-arcade.jpg", alt: "Playing Taiko no Tatsujin in a Japanese arcade", caption: "Arcade life in Japan" },
                  { src: "/images/travel/city-panorama-waterfront.jpg", alt: "City waterfront panorama", caption: "Coastal cityscape" },
                  { src: "/images/travel/city-lights-dusk.jpg", alt: "City lights at dusk", caption: "Urban evening" },
                ]}
                columns={4}
              />
            </div>
          </div>
        </section>

        {/* Parallax Divider - Sunset Landscape */}
        <ParallaxSection
          imageSrc="/images/sunset-landscape.jpg"
          overlayColor="rgba(255, 140, 66, 0.2)"
          minHeight="350px"
          className={styles.parallaxDivider}
        >
          <div className={styles.parallaxSpacer} />
        </ParallaxSection>

        {/* Arts, Culture & Sports Section */}
        <section className={styles.section}>
          <div>
            <div className={`${styles.badge} ${styles.plum}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span>Arts & Culture</span>
            </div>
            <h2 className={styles.sectionTitle}>Creative Pursuits</h2>
            <p className={styles.narrativeText}>
              My creative interests span from traditional Chinese calligraphy to woodworking and art.
              I also stay active with soccer and other sports, believing that physical activity and
              creative expression are both essential to a balanced life.
            </p>
          </div>

          {/* Gallery with arts and sports */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <Image
                src="/images/hobbies/snake-art-carving.jpg"
                alt="Snake art wood carving"
                width={300}
                height={300}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
              />
              <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                Wood carving
              </p>
            </div>
            <div>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <source src="/videos/calligraphy.mp4" type="video/mp4" />
              </video>
              <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                Chinese calligraphy
              </p>
            </div>
            <div>
              <Image
                src="/images/soccer-match-stadium.jpg"
                alt="Playing soccer at a stadium"
                width={300}
                height={300}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
              />
              <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
                Soccer
              </p>
            </div>
          </div>
        </section>

        {/* Parallax Divider */}
        <ParallaxSection
          imageSrc="/images/backgrounds/misty-forest.jpg"
          overlayColor="rgba(74, 103, 65, 0.3)"
          minHeight="300px"
          className={styles.parallaxDivider}
        >
          <div className={styles.parallaxSpacer} />
        </ParallaxSection>

        {/* Cooking, Gardening & Foraging Section */}
        <section className={styles.section}>
          <div className={styles.sectionGrid}>
            <div>
              <div className={`${styles.badge} ${styles.rose}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Food & Earth</span>
              </div>
              <h2 className={styles.sectionTitle}>From Soil to Table</h2>
              <p className={styles.narrativeText}>
                I grow food, forage wild plants, ferment vegetables, and cook from scratch, often
                inspired by the flavors I fell in love with in East Asia. There&apos;s something
                deeply satisfying about the full cycle: planting seeds, pulling weeds, harvesting
                dandelions, making kimchi, and cooking a meal that connects me to the earth and to
                the cultures that shaped my palate.
              </p>
            </div>
            <div>
              <ImageGallery
                images={[
                  { src: "/images/hobbies/garden-raised-beds.jpg", alt: "Raised bed vegetable garden", caption: "The garden" },
                  { src: "/images/hobbies/garden-roses.jpg", alt: "Rose garden", caption: "Roses in bloom" },
                  { src: "/images/hobbies/fermentation.jpg", alt: "Red cabbage fermentation", caption: "Red cabbage kraut" },
                  { src: "/images/hobbies/chinese-food.jpg", alt: "Chinese dishes", caption: "Homestyle Chinese cooking" },
                ]}
                columns={2}
                aspectRatio="square"
              />
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className={styles.closingSection}>
          <div className={styles.closingCard}>
            <h2 className={styles.closingTitle}>{t('wantKnowMore')}</h2>
            <p className={styles.closingText}>
              {t('wantKnowMoreText')}
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/projects" className={styles.primaryButton}>
                {t('viewProjects')}
              </Link>
              <Link href="/journey" className={styles.secondaryButton}>
                {t('readStory')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer quote={quotes('text')} attribution={quotes('author')} />
      </div>
    </ImageGalleryProvider>
  )
}
