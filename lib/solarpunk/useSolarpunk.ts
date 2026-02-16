import { useMemo } from 'react'
import { getRandomArtwork, getArtworksByTag, getArtworksByOrientation, solarpunkArtworks, type SolarpunkArtwork } from './artworkData'

/**
 * Hook to get a random solarpunk artwork
 * @param seed Optional seed for consistent random selection (same seed = same artwork)
 */
export function useRandomSolarpunkArtwork(seed?: string): SolarpunkArtwork | null {
  return useMemo(() => {
    if (seed) {
      // Use seed for consistent selection
      const index = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % solarpunkArtworks.length
      return solarpunkArtworks[index]
    }
    return getRandomArtwork()
  }, [seed])
}

/**
 * Hook to get multiple random solarpunk artworks
 * @param count Number of artworks to return
 * @param seed Optional seed for consistent selection
 */
export function useRandomSolarpunkArtworks(count: number, seed?: string): SolarpunkArtwork[] {
  return useMemo(() => {
    const seedValue = seed ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : Date.now()
    const shuffled = [...solarpunkArtworks].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, Math.min(count, solarpunkArtworks.length))
  }, [count, seed])
}

/**
 * Hook to get solarpunk artwork by tag
 */
export function useSolarpunkByTag(tag: string): SolarpunkArtwork[] {
  return useMemo(() => getArtworksByTag(tag), [tag])
}

/**
 * Hook to get solarpunk artwork by orientation
 */
export function useSolarpunkByOrientation(orientation: 'horizontal' | 'vertical' | 'square'): SolarpunkArtwork[] {
  return useMemo(() => getArtworksByOrientation(orientation), [orientation])
}

/**
 * Get a random solarpunk background URL
 */
export function useSolarpunkBackground(seed?: string): string {
  const artwork = useRandomSolarpunkArtwork(seed)
  return artwork ? `/images/solarpunk/${artwork.filename}` : '/images/backgrounds/mountain-panorama.jpg'
}

/**
 * Get solarpunk background with full metadata (for attribution)
 */
export function useSolarpunkBackgroundWithMeta(seed?: string): { url: string; artwork: SolarpunkArtwork | null } {
  const artwork = useRandomSolarpunkArtwork(seed)
  return {
    url: artwork ? `/images/solarpunk/${artwork.filename}` : '/images/backgrounds/mountain-panorama.jpg',
    artwork
  }
}
