import Link from "next/link"
import Image from "next/image"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import ParallaxSection from "@/components/ParallaxSection"
import styles from "./page.module.scss"

export const metadata = {
  title: "My Journey | Evie Marie Kolb",
  description: "The personal journey of Evie Marie Kolb, from growing up in the midwest to traveling the world, finding her passion for engineering, and becoming her authentic self.",
}

function NarrativeSection({
  imageSrc,
  imageAlt,
  imagePosition = "right",
  children,
}: {
  imageSrc: string
  imageAlt: string
  imagePosition?: "left" | "right"
  children: React.ReactNode
}) {
  const imageBlock = (
    <div className={styles.imageContainer}>
      <Image
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

function DualImageSection({
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
}) {
  return (
    <div className={styles.dualImageSection}>
      <div>{children}</div>
      <div className={styles.dualImageGrid}>
        <div className={styles.squareImage}>
          <Image src={imageSrc1} alt={imageAlt1} fill sizes="50vw" />
        </div>
        <div className={styles.squareImage}>
          <Image src={imageSrc2} alt={imageAlt2} fill sizes="50vw" />
        </div>
      </div>
    </div>
  )
}

export default function JourneyPage() {
  return (
    <div className={`${styles.page} watercolor-wash`}>
      <Nav active="/journey" />

      {/* Hero */}
      <ParallaxSection
        imageSrc="/images/backgrounds/misty-mountains-tree.jpg"
        overlayColor="rgba(74, 47, 87, 0.6)"
        minHeight="500px"
        className={styles.heroParallax}
        rotate={90}
      >
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>My Journey</h1>
            <p className={styles.heroSubtitle}>
              The path that brought me here was never straight, and that&apos;s what makes it mine.
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
            <h2 className={styles.sectionTitle}>Growing Up</h2>
            <p className={styles.narrativeText}>
              I grew up in the midwest with a curiosity that never quite fit the mold. From an early
              age I felt drawn to things that were unfamiliar: other languages, other cultures, other
              ways of seeing the world. I didn&apos;t fully understand why at the time, but
              looking back, I was already searching for something.
            </p>
          </DualImageSection>
        </section>

        {/* Parallax Divider */}
        <ParallaxSection
          imageSrc="/images/backgrounds/mountain-sunset-deck.jpg"
          overlayColor="rgba(92, 74, 54, 0.3)"
          minHeight="350px"
          className={styles.parallaxDivider}
        >
          <div className={styles.parallaxSpacer} />
        </ParallaxSection>

        {/* Section 2: Finding My Way — marathon photo on side */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Finding My Way</h2>

          {/* Side-by-side layout with marathon photo */}
          <div className={styles.narrativeGrid}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/journey/pre-marathon.jpg"
                alt="Pre-marathon in Saitama, Japan"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.textColumn}>
              <p className={styles.narrativeText}>
                I studied East Asian Languages &amp; Cultures at Indiana University with a focus on
                Mandarin Chinese. In 2012 I did an intensive language immersion course at the ICLP
                program at National Taiwan University. In 2013, as a Fulbright-Hayes Scholar, I studied
                six weeks of intensive Mandarin and pedagogy at National Minzu University of China in
                Beijing, then traveled to Pingjiang County in Hunan Province for an educational exchange.
                I lived with a multigenerational family of tea farmers and taught English, P.E. and
                theatre classes at the local elementary school, all in Mandarin.
              </p>
              <p className={styles.narrativeText}>
                From 2014 to 2015, I lived in Nanjing as a direct-enroll international student at
                Nanjing University, completing my Capstone Year in the Chinese Language Flagship program.
                I interned at Librairie Avant-Garde (Xianfeng Shudian), a famous local bookstore where I
                explored my love of Chinese literature, and did translation work for professors at
                Nanjing University.
              </p>
              <p className={styles.narrativeText}>
                After graduating, I worked as a Mandarin-qualified flight attendant at United Airlines for
                five years, traveling the world and developing the kind of adaptability you only get from
                navigating unfamiliar territory every single day. I also ran a marathon in Saitama, Japan,
                explored Mongolia by van, and walked the Great Wall.
              </p>
            </div>
          </div>

          <div className={styles.photoGrid4}>
            <div className={styles.smallSquareImage}>
              <Image src="/images/journey/pre-teaching.jpg" alt="With students in China" fill sizes="25vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <Image src="/images/journey/pre-arcade.jpg" alt="Playing Taiko no Tatsujin in Japan" fill sizes="25vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <Image src="/images/journey/calligraphy-grandmother.jpg" alt="Chinese calligraphy practice: the character for Grandmother" fill sizes="25vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <Image src="/images/journey/pre-outdoors.jpg" alt="Outdoors portrait" fill sizes="25vw" />
            </div>
          </div>
        </section>

        {/* Parallax Divider */}
        <ParallaxSection
          imageSrc="/images/backgrounds/misty-forest.jpg"
          overlayColor="rgba(74, 103, 65, 0.3)"
          minHeight="350px"
          className={styles.parallaxDivider}
        >
          <div className={styles.parallaxSpacer} />
        </ParallaxSection>

        {/* Section 3: The Turning Point */}
        <section className={styles.section}>
          <NarrativeSection
            imageSrc="/images/journey/mirror-dress.jpg"
            imageAlt="Looking in the mirror, seeing myself for the first time"
            imagePosition="left"
          >
            <h2 className={styles.sectionTitle}>The Turning Point</h2>
            <p className={`${styles.narrativeText} ${styles.marginBottom}`}>
              There wasn&apos;t one single dramatic moment. It was a slow realization that had
              been building for years. I finally understood what I had been searching for all
              along. It wasn&apos;t a place, a career, or an adventure. It was me.
            </p>
            <p className={styles.narrativeText}>
              Beginning my transition as a trans woman was the hardest and most important thing
              I&apos;ve ever done. It required the same courage I&apos;d built from climbing
              mountains, living in foreign countries, and starting over from scratch, but this
              time turned inward.
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
            <h2 className={styles.sectionTitle}>Becoming Myself</h2>
            <p className={`${styles.narrativeText} ${styles.marginBottom}`}>
              What followed was a period of real growth. I found new strength on the rock
              face, in the codebase, and in the mirror. I learned that vulnerability is not
              weakness. It&apos;s the foundation of authenticity.
            </p>
            <p className={styles.narrativeText}>
              I pivoted into software engineering through Hack Reactor, channeling the same
              determination that carried me through my transition. Building things (systems,
              applications, a life that feels right) became my craft.
            </p>
          </NarrativeSection>

          <div className={styles.photoGrid2}>
            <div className={styles.portraitImage}>
              <Image src="/images/journey/dress-boots.jpg" alt="White dress and Doc Martens" fill sizes="50vw" />
            </div>
            <div className={styles.portraitImage}>
              <Image src="/images/journey/formal-event.jpg" alt="At a formal event with a friend" fill sizes="50vw" />
            </div>
          </div>
        </section>

        {/* Parallax Divider */}
        <ParallaxSection
          imageSrc="/images/backgrounds/lake-sunset.jpg"
          overlayColor="rgba(139, 115, 85, 0.25)"
          minHeight="350px"
          className={styles.parallaxDivider}
        >
          <div className={styles.parallaxSpacer} />
        </ParallaxSection>

        {/* Section 5: Today */}
        <section className={styles.section}>
          <NarrativeSection
            imageSrc="/images/journey/teaching-climbing.jpg"
            imageAlt="Teaching a child to rock climb"
            imagePosition="left"
          >
            <h2 className={styles.sectionTitle}>Today</h2>
            <p className={`${styles.narrativeText} ${styles.marginBottom}`}>
              Today I&apos;m a full-stack software engineer who brings her whole self to work.
              My non-traditional path through linguistics, aviation, world travel, and personal
              transformation gives me a perspective that no bootcamp or CS degree alone could.
            </p>
            <p className={styles.narrativeText}>
              When I&apos;m not coding, you&apos;ll find me rock climbing, playing guitar, tending
              my garden, or fermenting something in the kitchen. I also taught Mandarin at a public
              elementary school in Louisville, Kentucky, bringing my love of the language full circle.
              I believe the best engineers are the ones who live fully and bring that richness to
              their work.
            </p>
          </NarrativeSection>

          <div className={styles.photoGrid3}>
            <div className={styles.smallSquareImage}>
              <Image src="/images/journey/headphones.jpg" alt="Casual selfie with headphones" fill sizes="33vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <Image src="/images/journey/teaching-mandarin-louisville.jpg" alt="Teaching Mandarin at a Louisville elementary school" fill sizes="33vw" />
            </div>
            <div className={styles.smallSquareImage}>
              <Image src="/images/portraits/hero-current.jpg" alt="Current photo" fill sizes="33vw" />
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className={styles.closingSection}>
          <div className={styles.closingCard}>
            <p className={styles.quote}>
              &ldquo;We can do no great things, only small things with great love.&rdquo;
            </p>
            <p className={styles.attribution}>&mdash; Mother Teresa</p>
            <div className={styles.ctaButtons}>
              <Link href="/interests" className={styles.primaryButton}>
                See My Interests
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                Get in Touch
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
  )
}
