'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Star {
  id: number
  top: string
  left: string
  size: number
  delay: string
  duration?: string
  animation: 'twinkle' | 'twinkle-slow' | 'float'
  isPurple: boolean
}

interface ShootingStar {
  id: number
  top: string
  right: string
  delay: string
}

interface StarFieldProps {
  className?: string
}

export function StarField({ className }: StarFieldProps) {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Determine star count based on screen size
    const isMobile = window.innerWidth < 640
    const starCount = isMobile ? 80 : 150
    const shootingStarCount = isMobile ? 2 : 3

    // Generate random stars
    const newStars: Star[] = Array.from({ length: starCount }, (_, i) => {
      // Distribute stars across entire screen
      const top = `${Math.random() * 100}%`
      const left = `${Math.random() * 100}%`

      const animations: Array<'twinkle' | 'twinkle-slow' | 'float'> = ['twinkle', 'twinkle-slow', 'float']
      const animation = animations[Math.floor(Math.random() * animations.length)]

      // Larger star sizes with weighted distribution
      const sizeRoll = Math.random()
      let size: number
      if (sizeRoll < 0.5) {
        size = 2 // 50% are medium (2px)
      } else if (sizeRoll < 0.8) {
        size = 3 // 30% are larger (3px)
      } else if (sizeRoll < 0.95) {
        size = 4 // 15% are even larger (4px)
      } else {
        size = 5 // 5% are largest (5px)
      }

      return {
        id: i,
        top,
        left,
        size,
        delay: `${(Math.random() * 5).toFixed(2)}s`,
        duration: animation === 'float' ? `${15 + Math.random() * 10}s` : undefined,
        animation,
        isPurple: Math.random() < 0.2, // 20% purple accent stars
      }
    })

    // Generate shooting stars
    const newShootingStars: ShootingStar[] = Array.from({ length: shootingStarCount }, (_, i) => ({
      id: i,
      top: `${Math.random() * 50}%`,
      right: '-10%',
      delay: `${8 + Math.random() * 4 + i * 6}s`, // Stagger between 8-12 seconds
    }))

    setStars(newStars)
    setShootingStars(newShootingStars)
  }, [mounted])

  if (!mounted) return null

  // Static version for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
        {stars.map((star) => (
          <div
            key={star.id}
            className={cn(
              'absolute rounded-full',
              star.isPurple
                ? 'bg-purple-400/60 dark:bg-purple-300/70'
                : 'bg-black/50 dark:bg-white/60'
            )}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {/* Twinkling and floating stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={cn(
            'absolute rounded-full',
            star.animation === 'float' ? 'animate-float' : '',
            star.animation === 'twinkle' ? 'animate-twinkle' : '',
            star.animation === 'twinkle-slow' ? 'animate-twinkle-slow' : '',
            star.isPurple
              ? 'bg-purple-400/70 dark:bg-purple-300/80'
              : 'bg-black/60 dark:bg-white/70'
          )}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            ...(star.duration && { animationDuration: star.duration }),
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((shootingStar) => (
        <div
          key={`shooting-${shootingStar.id}`}
          className="absolute animate-shooting-star"
          style={{
            top: shootingStar.top,
            right: shootingStar.right,
            animationDelay: shootingStar.delay,
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        >
          {/* Shooting star trail */}
          <div className="relative w-16 h-0.5 bg-gradient-to-l from-black/60 to-transparent dark:from-white/80" />
        </div>
      ))}
    </div>
  )
}
