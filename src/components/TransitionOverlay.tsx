'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'motion/react'
import { usePageTransition } from '../context/TransitionContext'

export function TransitionOverlay() {
  const { phase, onCoverComplete, onUncoverComplete } = usePageTransition()
  const controls = useAnimation()
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (phase === 'covering') {
      if (prefersReducedMotion.current) {
        onCoverComplete()
        return
      }
      controls.set({ y: '100%' })
      controls.start({
        y: '0%',
        transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
      }).then(onCoverComplete)
    }

    if (phase === 'uncovering') {
      if (prefersReducedMotion.current) {
        onUncoverComplete()
        return
      }
      controls.start({
        y: '-100%',
        transition: { duration: 0.85, ease: [0.65, 0, 0.35, 1] },
      }).then(() => {
        controls.set({ y: '100%' })
        onUncoverComplete()
      })
    }
  }, [phase, controls, onCoverComplete, onUncoverComplete])

  return (
    <motion.div
      aria-hidden="true"
      animate={controls}
      initial={{ y: '100%' }}
      className="fixed inset-0 z-[200] bg-black pointer-events-none"
    />
  )
}
