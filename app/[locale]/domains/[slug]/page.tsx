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
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const domain = getDomainBySlug(slug);

  if (!domain) {
    return {
      title: 'Domain Not Found | Evie Marie Kolb',
    };
  }

  const tDomain = await getTranslations({ locale, namespace: `domains.${slug}` });

  return {
    title: `${tDomain('title')} | Evie Marie Kolb`,
    description: tDomain('metaDescription'),
  };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const tQuotes = await getTranslations({ locale, namespace: 'quotes.domains' });
  const tDomain = await getTranslations({ locale, namespace: `domains.${slug}` });
  const tUI = await getTranslations({ locale, namespace: 'domainPage' });
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
                <h1 className={styles.heroTitle}>{tDomain('title')}</h1>
                {domain.status === 'pivoting' && (
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} />
                    <span className={styles.statusText}>{tUI('buildingExpertise')}</span>
                  </span>
                )}
              </div>
              <p className={styles.heroTagline}>{tDomain('heroTagline')}</p>
              <p className={styles.heroMission}>{tDomain('missionStatement')}</p>
            </div>
          </div>
        </ParallaxSection>

        {/* Expertise Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>{tUI('whatIBring')}</h2>
            <div className={styles.expertiseGrid}>
              {tDomain.raw('expertiseAreas').map((area: string, index: number) => (
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
                ? tUI('whereApplied')
                : tUI('howBuilding')}
            </h2>
            <div className={styles.experienceTimeline}>
              {tDomain.raw('experience').map((exp: any, index: number) => (
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
              <h2 className={styles.journeyTitle}>{tDomain('journey.title')}</h2>
              {tDomain.raw('journey.paragraphs').map((paragraph: string, index: number) => (
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
              <h2 className={styles.sectionHeading}>{tUI('relatedProjects')}</h2>
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
              <h2 className={styles.sectionHeading}>{tUI('learningCredentials')}</h2>
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
                        {cert.status === 'completed' && tUI('completed')}
                        {cert.status === 'in-progress' && tUI('inProgress')}
                        {cert.status === 'planned' && tUI('planned')}
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
                  ? tUI('buildingInPublic')
                  : tUI('resourcesProjects')}
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
              {tDomain('ctaText')}
            </h2>
            <p className={styles.ctaDescription}>
              {tUI('interestedWorking', { domain: tDomain('title').toLowerCase() })}
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              {tUI('getInTouch')}
            </Link>
          </div>
        </section>
      </main>

      <Footer
        quote={tQuotes('text')}
        attribution={tQuotes('author')}
      />
    </div>
  );
}
