'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSolarpunkBackgroundWithMeta } from '@/lib/solarpunk/useSolarpunk'
import styles from './SolarpunkBanner.module.scss'

interface SolarpunkBannerProps {
  seed?: string
  height?: 'small' | 'medium' | 'large'
  className?: string
}

/**
 * A decorative banner component featuring solarpunk artwork with artist attribution.
 * Use this to add visual interest to sections or page breaks.
 *
 * @example
 * <SolarpunkBanner seed="about-section" height="medium" />
 */
export default function SolarpunkBanner({
  seed,
  height = 'medium',
  className = '',
}: SolarpunkBannerProps) {
  const { url, artwork } = useSolarpunkBackgroundWithMeta(seed)

  if (!artwork) return null

  return (
    <div className={`${styles.banner} ${styles[height]} ${className}`}>
      <div className={styles.imageContainer}>
        <Image
          src={url}
          alt={artwork.title}
          fill
          sizes="100vw"
          className={styles.image}
          priority
        />
        <div className={styles.overlay} />
      </div>

      {/* Attribution card - always visible but subtle */}
      <Link
        href={artwork.artistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.attribution}
      >
        <div className={styles.attributionContent}>
          <span className={styles.artworkTitle}>{artwork.title}</span>
          <span className={styles.artistInfo}>
            by <span className={styles.artistName}>{artwork.artist}</span>
          </span>
          <span className={styles.license}>{artwork.license}</span>
        </div>
        <svg className={styles.externalIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
      </Link>

      {/* Storyseed Library badge */}
      <Link
        href="https://storyseedlibrary.org"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.libraryBadge}
      >
        <svg className={styles.leafIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
        </svg>
        <span>Storyseed Library</span>
      </Link>
    </div>
  )
}

/**
 * A smaller inline version for use as section dividers
 */
interface SolarpunkDividerProps {
  seed?: string
  className?: string
}

export function SolarpunkDivider({ seed, className = '' }: SolarpunkDividerProps) {
  const { url, artwork } = useSolarpunkBackgroundWithMeta(seed)

  if (!artwork) return null

  return (
    <div className={`${styles.divider} ${className}`}>
      <div className={styles.dividerImage}>
        <Image
          src={url}
          alt={artwork.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className={styles.image}
        />
        <div className={styles.dividerOverlay} />
      </div>
      <Link
        href={artwork.artistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.dividerAttribution}
      >
        {artwork.artist}
      </Link>
    </div>
  )
}
