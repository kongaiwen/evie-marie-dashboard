import Link from "next/link"
import Image from "next/image"
import ParallaxSection from "@/components/ParallaxSection"
import ImageGallery from "@/components/ImageGallery"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import styles from "./page.module.scss"

export const metadata = {
  title: "Interests & Hobbies | Evie Marie Kolb",
  description: "Music, rock climbing, travel, cooking, gardening, and more. The passions that shape who I am beyond the code.",
}

export default function InterestsPage() {
  return (
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
            <h1 className={styles.heroTitle}>Beyond the Code</h1>
            <p className={styles.heroSubtitle}>
              The passions and curiosities that make me who I am, and a better engineer.
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
                <span>Music</span>
              </div>
              <h2 className={styles.sectionTitle}>Music</h2>
              <p className={styles.narrativeText}>
                Music has always been part of my life. Right now I&apos;m an aspiring songwriter
                who performs covers of my favorite songs at live gigs and open mics. I play acoustic
                guitar, and you&apos;ll catch me at local venues or just playing on the porch.
                Eventually I want to start writing my own songs to express myself and my experience
                as a trans woman navigating the world and motherhood. Music is where I process things
                and find clarity.
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
              <span>Rock Climbing</span>
            </div>
            <h2 className={styles.sectionTitle}>On the Wall</h2>
            <p className={styles.narrativeText}>
              Rock climbing teaches you to trust yourself, read problems methodically, and commit
              to moves even when they scare you. It&apos;s the most honest sport I know. The wall
              doesn&apos;t care about anything except whether you can solve the puzzle in front of
              you. I also love sharing it with others, especially introducing new climbers to the sport.
            </p>
          </div>
          <ImageGallery
            images={[
              { src: "/images/hobbies/climbing-1.jpg", alt: "Climbing a rock face", caption: "Working a route" },
              { src: "/images/hobbies/climbing-2.jpg", alt: "Climbing higher on the wall", caption: "Finding the next hold" },
              { src: "/images/hobbies/climbing-3.jpg", alt: "Reaching for a hold", caption: "Full send" },
              { src: "/images/hobbies/climbing-mentor.jpg", alt: "Teaching a child to climb", caption: "Sharing the joy" },
            ]}
            columns={4}
            aspectRatio="portrait"
          />
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
            <h2 className={styles.sectionTitle}>Across Asia & Beyond</h2>
            <p className={styles.narrativeText}>
              Living and traveling across East Asia (Taiwan, Japan, China, Mongolia, Hong Kong)
              shaped who I am. These weren&apos;t tourist trips. They were years of immersion. Learning
              to teach in Mandarin, crossing the Gobi Desert in a Soviet-era van, running a marathon in
              Saitama, walking the Great Wall. Each experience expanded my sense of what&apos;s possible.
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
                ]}
                columns={4}
              />
            </div>

            <div className={styles.travelSubsection}>
              <h3 className={styles.subsectionTitle}>China, Japan & Hong Kong</h3>
              <ImageGallery
                images={[
                  { src: "/images/travel/great-wall-archway.jpg", alt: "The Great Wall of China through an archway", caption: "Great Wall of China" },
                  { src: "/images/travel/nara-deer.jpg", alt: "Feeding deer in Nara, Japan", caption: "Nara deer park" },
                  { src: "/images/travel/hong-kong.jpg", alt: "Hong Kong skyline from Victoria Peak", caption: "Victoria Peak, Hong Kong" },
                  { src: "/images/travel/japan-arcade.jpg", alt: "Playing Taiko no Tatsujin in a Japanese arcade", caption: "Arcade life in Japan" },
                ]}
                columns={4}
              />
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
            <h2 className={styles.closingTitle}>Want to know more?</h2>
            <p className={styles.closingText}>
              Check out my professional work, read about my journey, or just reach out.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/projects" className={styles.primaryButton}>
                View My Projects
              </Link>
              <Link href="/journey" className={styles.secondaryButton}>
                Read My Story
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer quote="The glass is neither half empty nor half full. It's simply larger than it needs to be." attribution="Grace Hopper" />
    </div>
  )
}
