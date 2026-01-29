'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import styles from './ImageGallery.module.scss'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto'
}

export default function ImageGallery({
  images,
  columns = 3,
  aspectRatio = 'auto',
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }, [images.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    )
  }, [images.length])

  const gridClass = {
    2: styles.grid2,
    3: styles.grid3,
    4: styles.grid4,
  }

  const aspectClass = {
    square: styles.aspectSquare,
    landscape: styles.aspectLandscape,
    portrait: styles.aspectPortrait,
    auto: styles.aspectAuto,
  }

  return (
    <>
      <div className={`${styles.grid} ${gridClass[columns]}`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setLightboxIndex(index)}
            className={styles.imageButton}
          >
            <div className={`${styles.imageWrapper} ${aspectClass[aspectRatio]}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={styles.image}
                sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${Math.floor(100 / columns)}vw`}
              />
            </div>
            {image.caption && (
              <div className={styles.caption}>
                <p>{image.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className={styles.prevButton}
            aria-label="Previous image"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className={styles.imageContainer} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              className={styles.lightboxImage}
              sizes="90vw"
              priority
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className={styles.nextButton}
            aria-label="Next image"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={closeLightbox}
            className={styles.closeButton}
            aria-label="Close lightbox"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images[lightboxIndex].caption && (
            <div className={styles.lightboxCaption}>
              <p>{images[lightboxIndex].caption}</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
