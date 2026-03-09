'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useBrandAnimation } from '../contexts/BrandAnimationContext'

interface HomeHeroAnimationProps {
  onBrandReveal: () => void
}

export function HomeHeroAnimation({ onBrandReveal }: HomeHeroAnimationProps) {
  const { hasAnimationPlayed } = useBrandAnimation()
  const [phase, setPhase] = useState<'name' | 'initials' | 'transition' | 'complete'>('name')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [transformValues, setTransformValues] = useState({ x: 0, y: 0, scale: 1 })
  const wtbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // If animation has already played, skip it
    if (hasAnimationPlayed) {
      setPhase('complete')
      return
    }

    if (prefersReducedMotion) {
      // Skip animation, go straight to complete
      setPhase('complete')
      onBrandReveal()
      return
    }

    // Animation timeline
    const timer1 = setTimeout(() => setPhase('initials'), 1200) // Show full name for 1.2s
    const timer2 = setTimeout(() => {
      // Calculate transform before transition phase
      if (wtbRef.current) {
        const heroWTB = wtbRef.current.getBoundingClientRect()
        const navBrand = document.querySelector('[data-nav-brand]')?.getBoundingClientRect()
        
        if (navBrand) {
          const deltaX = navBrand.left - heroWTB.left
          const deltaY = navBrand.top - heroWTB.top
          const scaleRatio = navBrand.width / heroWTB.width
          
          setTransformValues({
            x: deltaX,
            y: deltaY,
            scale: scaleRatio
          })
        }
      }
      setPhase('transition')
    }, 2400) // Emphasize initials for 1.2s
    const timer3 = setTimeout(() => {
      setPhase('complete')
      onBrandReveal()
    }, 3300) // Transition for 0.9s

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [prefersReducedMotion, onBrandReveal, hasAnimationPlayed])

  if (prefersReducedMotion || phase === 'complete') {
    return (
      <motion.section 
        className="min-h-[70vh] flex flex-col justify-center pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl">
          <h1 className="text-[3.33rem] md:text-[6.66rem] lg:text-[8.88rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
            Hello.
          </h1>
          <p className="text-2xl md:text-4xl text-black/60 leading-snug max-w-4xl font-light tracking-tight">
            Independent designer helping teams build better products, brands, and creative systems.
          </p>
        </div>
      </motion.section>
    )
  }

  return (
    <section className="min-h-[70vh] flex flex-col justify-center pb-12 relative">
      <div className="max-w-5xl">
        <AnimatePresence mode="wait">
          {phase === 'name' && (
            <motion.div
              key="full-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 100,
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                }}
                className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-black"
              >
                William Thames Blacklock
              </h1>
            </motion.div>
          )}

          {phase === 'initials' && (
            <motion.div
              key="initials-emphasis"
              ref={wtbRef}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              className="relative"
            >
              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 100,
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                }}
                className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-black"
              >
                <motion.span
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  W
                </motion.span>
                <motion.span
                  animate={{ opacity: 0.15, scaleX: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="inline-block origin-left"
                >
                  illiam{" "}
                </motion.span>
                <motion.span
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  T
                </motion.span>
                <motion.span
                  animate={{ opacity: 0.15, scaleX: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="inline-block origin-left"
                >
                  hames{" "}
                </motion.span>
                <motion.span
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  B
                </motion.span>
                <motion.span
                  animate={{ opacity: 0.15, scaleX: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="inline-block origin-left"
                >
                  lacklock
                </motion.span>
              </h1>
            </motion.div>
          )}

          {phase === 'transition' && (
            <motion.div
              key="wtb-transition"
              ref={wtbRef}
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: 0,
                x: transformValues.x,
                y: transformValues.y,
                scale: transformValues.scale
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 100,
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                }}
                className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-black"
              >
                WTB
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
