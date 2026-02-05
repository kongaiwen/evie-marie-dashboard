'use client'

import { CSSProperties, useContext, useState, useCallback, useEffect } from 'react'
import { ImageContext } from './ClickableImage'
import styles from './ParallaxSection.module.scss'

interface ParallaxSectionProps {
  imageSrc: string
  children: React.ReactNode
  overlayColor?: string
  overlayOpacity?: number
  blur?: number
  minHeight?: string
  className?: string
  rotate?: number
  clickable?: boolean
}

export default function ParallaxSection({
  imageSrc,
  children,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  overlayOpacity = 1,
  blur = 0,
  minHeight = '400px',
  className = '',
  clickable = true,
}: ParallaxSectionProps) {
  const context = useContext(ImageContext)
  const [registered, setRegistered] = useState(false)

  const bgStyle: CSSProperties = {
    backgroundImage: `url(${imageSrc})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight,
    width: '100%',
    cursor: clickable ? 'pointer' : 'default',
  }

  const overlayStyle: CSSProperties = {
    backgroundColor: overlayColor,
    opacity: overlayOpacity,
    backdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
    WebkitBackdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
    pointerEvents: clickable ? 'none' : 'auto',
  }

  // Register the background image with the gallery context
  useEffect(() => {
    if (clickable && context?.addImage && !registered) {
      const filename = imageSrc.split('/').pop() || imageSrc
      context.addImage({ src: imageSrc, alt: `Background: ${filename}` })
      setRegistered(true)
    }
  }, [clickable, context, imageSrc, registered])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (clickable && context?.openLightbox && context?.images) {
      // Don't trigger if clicking on interactive content
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button')) {
        return
      }

      const index = context.images.findIndex(img => img.src === imageSrc)
      if (index !== -1) {
        context.openLightbox(index)
      }
    }
  }, [clickable, context, imageSrc])

  return (
    <section
      className={`${styles.section} ${className}`}
      style={bgStyle}
      onClick={handleClick}
    >
      <div className={styles.overlay} style={overlayStyle} />
      <div className={styles.content}>{children}</div>
    </section>
  )
}
