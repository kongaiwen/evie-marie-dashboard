'use client'

import styles from './ProjectDemo.module.scss'

interface ProjectDemoProps {
  projectId: string;
  demoPath: string;
  title: string;
}

export default function ProjectDemo({ projectId, demoPath, title }: ProjectDemoProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <div className={`${styles.dot} ${styles.red}`}></div>
          <div className={`${styles.dot} ${styles.yellow}`}></div>
          <div className={`${styles.dot} ${styles.green}`}></div>
        </div>
        <span className={styles.title}>{title}</span>
      </div>
      <iframe
        src={demoPath}
        className={styles.iframe}
        title={`${title} Demo`}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
