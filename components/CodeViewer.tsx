'use client'

import styles from './CodeViewer.module.scss'

interface CodeViewerProps {
  code: string;
  language: string;
  filename: string;
}

export default function CodeViewer({ code, language, filename }: CodeViewerProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.red}`}></div>
            <div className={`${styles.dot} ${styles.yellow}`}></div>
            <div className={`${styles.dot} ${styles.green}`}></div>
          </div>
          <span className={styles.filename}>{filename}</span>
        </div>
        <span className={styles.language}>{language}</span>
      </div>
      <div className={styles.body}>
        <pre className={styles.pre}>
          <code className={styles.code}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
