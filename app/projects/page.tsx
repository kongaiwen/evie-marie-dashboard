'use client';

import { useState } from 'react';
import Link from "next/link"
import { projects } from "./projectsData"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import ProjectFilter from "@/components/ProjectFilter"
import { domains, getDomainBySlug, DomainSlug } from "@/app/domains/domainsData"
import styles from "./page.module.scss"

export default function ProjectsPage() {
  const [selectedDomains, setSelectedDomains] = useState<DomainSlug[]>([]);

  const activeProjects = projects.filter(p => p.status !== 'setup-only');

  const filteredProjects = selectedDomains.length === 0
    ? activeProjects
    : activeProjects.filter(p =>
        p.domains.some(d => selectedDomains.includes(d))
      );

  return (
    <div className={`${styles.page} watercolor-wash`}>
      <Nav active="/projects" />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Personal Projects</h1>
          <p className={styles.description}>
            Showcasing work across multiple domains of expertise.
          </p>
        </div>

        <ProjectFilter
          selectedDomains={selectedDomains}
          onFilterChange={setSelectedDomains}
          availableDomains={domains}
        />

        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.cardAccent}></div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  {project.needsApiKeys && (
                    <span className={styles.apiBadge}>API Key</span>
                  )}
                </div>

                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.techStackList}>
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className={styles.moreBadge}>
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Domain tags */}
                {project.domains && project.domains.length > 0 && (
                  <div className={styles.domainTags}>
                    {project.domains.map((domainSlug) => {
                      const domain = getDomainBySlug(domainSlug);
                      return domain ? (
                        <span
                          key={domainSlug}
                          className={`${styles.domainTag} ${styles[`tag${domain.iconColor.charAt(0).toUpperCase() + domain.iconColor.slice(1)}`]}`}
                        >
                          {domain.title}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                <div className={styles.cardFooter}>
                  {project.hasDemo && (
                    <Link href={`/projects/${project.id}`} className={styles.viewProjectLink}>
                      View Project
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer quote="First, solve the problem. Then, write the code." attribution="John Johnson" />
    </div>
  )
}
