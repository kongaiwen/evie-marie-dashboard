import { Metadata } from 'next';
import { Link } from '@/app/i18n/routing';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { domains, getDomainBySlug } from '@/app/[locale]/domains/domainsData';
import { projects } from '@/app/[locale]/projects/projectsData';
import { getTranslations } from 'next-intl/server';
import styles from './page.module.scss';

export async function generateStaticParams() {
  return domains.map((domain) => ({ slug: domain.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const domain = getDomainBySlug(slug);

  if (!domain) {
    return {
      title: 'Domain Not Found | Evie Marie Kolb',
    };
  }

  return {
    title: `${domain.title} | Evie Marie Kolb`,
    description: domain.metaDescription,
  };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quotes.domains' });
  const domain = getDomainBySlug(slug);

  if (!domain) {
    notFound();
  }

  // Filter projects related to this domain
  const relatedProjects = projects.filter((project) =>
    domain.relatedProjectIds.includes(project.id)
  );

  return (
    <div className={`${styles.page} watercolor-wash`}>
      <Nav active="" />

      <main className={styles.main}>
        {/* Hero Section */}
        <ParallaxSection
          imageSrc={domain.heroImage}
          className={styles.heroSection}
        >
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              <div className={styles.heroHeader}>
                <h1 className={styles.heroTitle}>{domain.title}</h1>
                {domain.status === 'pivoting' && (
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} />
                    <span className={styles.statusText}>Building Expertise</span>
                  </span>
                )}
              </div>
              <p className={styles.heroTagline}>{domain.heroTagline}</p>
              <p className={styles.heroMission}>{domain.missionStatement}</p>
            </div>
          </div>
        </ParallaxSection>

        {/* Expertise Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>What I Bring</h2>
            <div className={styles.expertiseGrid}>
              {domain.expertiseAreas.map((area, index) => (
                <div key={index} className={styles.expertiseCard}>
                  <div className={styles.expertiseIcon}>
                    <div className={styles.expertiseIconCircle} />
                  </div>
                  <p className={styles.expertiseText}>{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>
              {domain.status === 'established'
                ? "Where I've Applied This"
                : "How I'm Building This"}
            </h2>
            <div className={styles.experienceTimeline}>
              {domain.experience.map((exp, index) => (
                <div key={index} className={styles.experienceCard}>
                  {exp.company && (
                    <div className={styles.experienceHeader}>
                      <h3 className={styles.experienceCompany}>{exp.company}</h3>
                      {exp.role && (
                        <span className={styles.experienceRole}>{exp.role}</span>
                      )}
                      {exp.year && (
                        <span className={styles.experienceYear}>{exp.year}</span>
                      )}
                    </div>
                  )}
                  <p className={styles.experienceDescription}>{exp.description}</p>
                  {exp.highlight && (
                    <div className={styles.experienceHighlight}>
                      <span className={styles.highlightIcon}>✨</span>
                      {exp.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <ParallaxSection
          imageSrc={domain.heroImage}
          className={styles.journeySection}
        >
          <div className={styles.journeyOverlay}>
            <div className={styles.journeyContent}>
              <h2 className={styles.journeyTitle}>{domain.journey.title}</h2>
              {domain.journey.paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.journeyParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeading}>Related Projects</h2>
              <div className={styles.projectsGrid}>
                {relatedProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className={styles.projectCard}
                  >
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>
                    {project.domainHighlights &&
                      project.domainHighlights[domain.slug] && (
                        <p className={styles.projectHighlight}>
                          {project.domainHighlights[domain.slug]}
                        </p>
                      )}
                    <div className={styles.projectTech}>
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {domain.certifications && domain.certifications.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeading}>Learning & Credentials</h2>
              <div className={styles.certificationsGrid}>
                {domain.certifications.map((cert, index) => (
                  <div key={index} className={styles.certificationCard}>
                    <h3 className={styles.certificationName}>{cert.name}</h3>
                    <p className={styles.certificationIssuer}>{cert.issuer}</p>
                    {cert.status && (
                      <span
                        className={`${styles.certificationStatus} ${
                          styles[cert.status]
                        }`}
                      >
                        {cert.status === 'completed' && 'Completed'}
                        {cert.status === 'in-progress' && 'In Progress'}
                        {cert.status === 'planned' && 'Planned'}
                      </span>
                    )}
                    {cert.year && (
                      <span className={styles.certificationYear}>{cert.year}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Resources Section */}
        {domain.resources && domain.resources.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeading}>
                {domain.status === 'pivoting'
                  ? 'Building in Public'
                  : 'Resources & Projects'}
              </h2>
              <div className={styles.resourcesList}>
                {domain.resources.map((resource, index) => (
                  <div key={index} className={styles.resourceCard}>
                    <div className={styles.resourceHeader}>
                      <span
                        className={`${styles.resourceType} ${
                          styles[resource.type]
                        }`}
                      >
                        {resource.type}
                      </span>
                      {resource.date && (
                        <span className={styles.resourceDate}>
                          {resource.date}
                        </span>
                      )}
                    </div>
                    <h3 className={styles.resourceTitle}>{resource.title}</h3>
                    <p className={styles.resourceDescription}>
                      {resource.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaHeading}>
              {domain.ctaText || "Let's Build Together"}
            </h2>
            <p className={styles.ctaDescription}>
              Interested in working together on {domain.title.toLowerCase()}{' '}
              projects? I'd love to hear from you.
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer
        quote={t('text')}
        attribution={t('author')}
      />
    </div>
  );
}
