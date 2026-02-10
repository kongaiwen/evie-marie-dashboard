import { Link } from "@/app/i18n/routing"
import { notFound } from "next/navigation"
import { projects } from "../projectsData"
import { readFile } from "fs/promises"
import path from "path"
import TicTacToe from "@/components/TicTacToe"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import styles from "./page.module.scss"

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  let codeContent = '';
  if (project.id === 'tic-tac-toe') {
    try {
      const filePath = path.join(process.cwd(), 'repos', 'tic-tac-toe', 'tic_tac_toe.py');
      codeContent = await readFile(filePath, 'utf-8');
    } catch (error) {
      codeContent = '# Error loading code file';
    }
  }

  return (
    <div className={`${styles.page} watercolor-wash`}>
      <Nav active="/projects" />

      <main className={styles.main}>
        <Link href="/projects" className={styles.backLink}>
          ← Back to Projects
        </Link>

        <div className={styles.projectCard}>
          <div className={styles.projectHeader}>
            <div className={styles.headerTop}>
              <h1 className={styles.projectTitle}>{project.name}</h1>
              <div className={styles.badgeGroup}>
                {project.needsApiKeys && (
                  <span className={styles.apiKeyBadge}>
                    API Key Required
                  </span>
                )}
              </div>
            </div>
            <p className={styles.projectSubtitle}>{project.description}</p>
          </div>

          <div className={styles.projectContent}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Tech Stack</h2>
              <div className={styles.techStackList}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubButton}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </div>

            {project.hasDemo && (
              <div className={styles.demoSection}>
                <h2 className={styles.sectionTitle}>
                  {project.demoType === 'code' ? 'Source Code' :
                   project.demoType === 'instructions' ? 'Setup Instructions' :
                   project.demoType === 'game' ? 'Play the Game' : 'Live Demo'}
                </h2>

                {project.demoType === 'iframe' && project.demoPath && (
                  <div className={styles.iframeWrapper}>
                    <div className={styles.terminalHeader}>
                      <div className={styles.terminalDots}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className={styles.terminalTitle}>{project.name}</span>
                    </div>
                    <iframe
                      src={project.demoPath}
                      className={styles.iframe}
                      style={{ height: '600px' }}
                      title={`${project.name} Demo`}
                    />
                  </div>
                )}

                {project.demoType === 'game' && project.id === 'tic-tac-toe' && (
                  <div className={styles.gameGrid}>
                    {/* JavaScript Game */}
                    <div className={styles.gameSection}>
                      <h4>
                        <span className={`${styles.languageBadge} ${styles.javascript}`}>JavaScript</span>
                        <span className={styles.badgeLabel}>Interactive Recreation</span>
                      </h4>
                      <TicTacToe />
                    </div>

                    {/* Python Code */}
                    <div className={styles.gameSection}>
                      <h4>
                        <span className={`${styles.languageBadge} ${styles.python}`}>Python</span>
                        <span className={styles.badgeLabel}>Original Source Code</span>
                      </h4>
                      <div className={styles.codeWrapper}>
                        <div className={styles.codeHeader}>
                          <div className={styles.codeHeaderLeft}>
                            <div className={styles.terminalDots}>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                            <span className={styles.codeFileName}>tic_tac_toe.py</span>
                          </div>
                        </div>
                        <pre className={styles.codeBody}>
                          <code>{codeContent}</code>
                        </pre>
                        <div className={styles.codeFooter}>
                          <p>
                            Run locally: <code>python tic_tac_toe.py</code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {project.demoType === 'code' && (
                  <div className={styles.codeWrapper}>
                    <div className={styles.codeHeader}>
                      <div className={styles.codeHeaderLeft}>
                        <div className={styles.terminalDots}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className={styles.codeFileName}>tic_tac_toe.py</span>
                      </div>
                      <span className={`${styles.languageBadge} ${styles.javascript}`}>Python</span>
                    </div>
                    <pre className={styles.codeBody}>
                      <code>{codeContent}</code>
                    </pre>
                    <div className={styles.codeFooter}>
                      <p>
                        Run this game locally: <code>python tic_tac_toe.py</code>
                      </p>
                    </div>
                  </div>
                )}

                {project.demoType === 'instructions' && project.id === 'board-race-ting-xie' && (
                  <div className={styles.instructionsBox}>
                    <h3 className={styles.instructionsTitle}>
                      <span>🚀</span> Running This Project Locally
                    </h3>

                    <div className={styles.instructionsGrid}>
                      <div className={styles.instructionCard}>
                        <h4 className={styles.instructionCardTitle}>
                          <span className={styles.stepNumber}>1</span>
                          Prerequisites
                        </h4>
                        <ul className={styles.prerequisitesList}>
                          <li>
                            <span className={styles.checkmark}>✓</span> Node.js installed
                          </li>
                          <li>
                            <span className={styles.checkmark}>✓</span> Google Cloud Vision API key
                          </li>
                        </ul>
                      </div>

                      <div className={styles.instructionCard}>
                        <h4 className={styles.instructionCardTitle}>
                          <span className={styles.stepNumber}>2</span>
                          Quick Start
                        </h4>
                        <div className={styles.commandList}>
                          <div className={styles.command}>git clone {project.repoUrl}</div>
                          <div className={styles.command}>npm install</div>
                          <div className={styles.command}>npm run build && npm start</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.warningBox}>
                      <p>
                        <span className={styles.warningIcon}>⚠️</span>
                        <span>
                          <strong>Note:</strong> This project requires a Google Cloud Vision API key for the handwriting recognition feature.
                          See the GitHub README for detailed setup instructions.
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer quote="First, solve the problem. Then, write the code." attribution="John Johnson" />
    </div>
  )
}
