'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { SolarpunkArtwork } from '@/lib/solarpunk/artworkData'
import styles from './SolarpunkArtwork.module.scss'

interface SolarpunkArtworkProps {
  artwork: SolarpunkArtwork
  className?: string
  priority?: boolean
  showAttribution?: 'always' | 'hover' | 'hidden'
  variant?: 'full' | 'card' | 'banner'
}

export default function SolarpunkArtwork({
  artwork,
  className = '',
  priority = false,
  showAttribution = 'hover',
  variant = 'full',
}: SolarpunkArtworkProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const imageSrc = `/images/solarpunk/${artwork.filename}`

  return (
    <div className={`${styles.artworkContainer} ${styles[variant]} ${className}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={artwork.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          priority={priority}
          onLoad={() => setImageLoaded(true)}
        />
        <div className={`${styles.loadingOverlay} ${imageLoaded ? styles.loaded : ''}`} />

        {showAttribution !== 'hidden' && (
          <div className={`${styles.attribution} ${styles[showAttribution]}`}>
            <Link
              href={artwork.artistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.attributionLink}
            >
              <div className={styles.attributionContent}>
                <div className={styles.artworkInfo}>
                  <span className={styles.artworkTitle}>{artwork.title}</span>
                  <span className={styles.artistName}>by {artwork.artist}</span>
                </div>
                <div className={styles.licenseBadge}>
                  <svg className={styles.ccIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <span>{artwork.license}</span>
                </div>
              </div>
              <div className={styles.sourceIndicator}>
                <span>Art from Storyseed Library</span>
                <svg className={styles.externalIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// Gallery component for displaying multiple artworks
interface SolarpunkGalleryProps {
  artworks?: SolarpunkArtwork[]
  limit?: number
  className?: string
}

export function SolarpunkGallery({
  artworks,
  limit = 6,
  className = '',
}: SolarpunkGalleryProps) {
  // Import artworks if not provided
  const { solarpunkArtworks } = require('@/lib/solarpunk/artworkData')
  const displayArtworks = (artworks || solarpunkArtworks).slice(0, limit)

  return (
    <div className={`${styles.gallery} ${className}`}>
      {displayArtworks.map((artwork: SolarpunkArtwork) => (
        <SolarpunkArtwork
          key={artwork.id}
          artwork={artwork}
          variant="card"
          showAttribution="hover"
        />
      ))}
    </div>
  )
}

// Background component with overlay
interface SolarpunkBackgroundProps {
  artwork?: SolarpunkArtwork
  className?: string
  overlayOpacity?: number
  children?: React.ReactNode
}

export function SolarpunkBackground({
  artwork,
  className = '',
  overlayOpacity = 0.5,
  children,
}: SolarpunkBackgroundProps) {
  // Import artwork data if not provided
  const { getRandomArtwork } = require('@/lib/solarpunk/artworkData')
  const selectedArtwork = artwork || getRandomArtwork()
  const imageSrc = `/images/solarpunk/${selectedArtwork.filename}`

  return (
    <div className={`${styles.background} ${className}`}>
      <Image
        src={imageSrc}
        alt={selectedArtwork.title}
        fill
        sizes="100vw"
        className={styles.backgroundImage}
        priority
      />
      <div
        className={styles.overlay}
        style={{ opacity: overlayOpacity }}
      />
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}

      {/* Always-visible attribution in corner */}
      <Link
        href={selectedArtwork.artistUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cornerAttribution}
      >
        <span className={styles.minAttribution}>
          {selectedArtwork.artist} · {selectedArtwork.license}
        </span>
      </Link>
    </div>
  )
}
