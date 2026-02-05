'use client'

import { CSSProperties } from 'react'
import styles from './ParallaxSection.module.scss'

interface ParallaxSectionProps {
  imageSrc: string
  children: React.ReactNode
  overlayColor?: string
  overlayOpacity?: number
  blur?: number
  minHeight?: string
  className?: string
  rotate?: number;
}

export default function ParallaxSection({
  imageSrc,
  children,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  overlayOpacity = 1,
  blur = 0,
  minHeight = '400px',
  className = '',
}: ParallaxSectionProps) {
  const bgStyle: CSSProperties = {
    backgroundImage: `url(${imageSrc})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight,
    width: '100%',
  }

  const overlayStyle: CSSProperties = {
    backgroundColor: overlayColor,
    opacity: overlayOpacity,
    backdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
    WebkitBackdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
  }

  return (
    <section className={`${styles.section} ${className}`} style={bgStyle}>
      <div className={styles.overlay} style={overlayStyle} />
      <div className={styles.content}>{children}</div>
    </section>
  )
}
