'use client'

import { useState, useCallback, createContext, useContext, useEffect } from 'react'
import Image from 'next/image'
import styles from './ClickableImage.module.scss'

interface ImageData {
  src: string
  alt: string
}

interface ImageContextValue {
  images: ImageData[]
  addImage: (image: ImageData) => void
  openLightbox: (index: number) => void
}

export const ImageContext = createContext<ImageContextValue | null>(null)

export function ImageGalleryProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<ImageData[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const addImage = useCallback((image: ImageData) => {
    setImages((prev) => {
      if (prev.find(img => img.src === image.src)) {
        return prev
      }
      return [...prev, image]
    })
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }, [images.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    )
  }, [images.length])

  return (
    <ImageContext.Provider value={{ images, addImage, openLightbox }}>
      {children}

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
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
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
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

          <div className={styles.counter}>
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </ImageContext.Provider>
  )
}

interface ClickableImageProps {
  src: string
  alt: string
  fill?: boolean
  sizes?: string
  className?: string
  style?: React.CSSProperties
  priority?: boolean
}

export function ClickableImage({ src, alt, fill, sizes, className, style, priority }: ClickableImageProps) {
  const context = useContext(ImageContext)
  const [imageIndex, setImageIndex] = useState<number | null>(null)

  // Register image on mount
  useEffect(() => {
    if (context) {
      const index = context.images.findIndex(img => img.src === src)
      if (index === -1) {
        context.addImage({ src, alt })
        setImageIndex(context.images.length)
      } else {
        setImageIndex(index)
      }
    }
  }, [context, src, alt])

  const handleClick = useCallback(() => {
    if (context && imageIndex !== null) {
      // Find current index (it may have changed)
      const currentIndex = context.images.findIndex(img => img.src === src)
      if (currentIndex !== -1) {
        context.openLightbox(currentIndex)
      }
    }
  }, [context, imageIndex, src])

  if (fill) {
    return (
      <div className={styles.clickableWrapper} onClick={handleClick}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={className}
          style={style}
          priority={priority}
        />
      </div>
    )
  }

  return (
    <div className={styles.clickableWrapper} onClick={handleClick}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        style={style}
        priority={priority}
        width={0}
        height={0}
      />
    </div>
  )
}
