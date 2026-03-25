'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface SectionProgressBarProps {
  sectionIds: string[]
  sectionHeadings: string[]
}

export function SectionProgressBar({ sectionIds, sectionHeadings }: SectionProgressBarProps) {
  const [progress, setProgress] = useState<number[]>(new Array(sectionIds.length).fill(0))
  const [widths, setWidths] = useState<number[]>(new Array(sectionIds.length).fill(1))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  // Measure section heights → proportional segment widths
  useEffect(() => {
    const measure = () => {
      const heights = sectionIds.map(id => document.getElementById(id)?.offsetHeight ?? 100)
      const total = heights.reduce((a, b) => a + b, 0)
      if (total > 0) setWidths(heights.map(h => h / total))
    }
    const t = setTimeout(measure, 150)
    window.addEventListener('resize', measure, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('resize', measure) }
  }, [sectionIds])

  // Track per-section scroll progress
  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY
      const viewHeight = window.innerHeight
      const positions = sectionIds.map(id => {
        const el = document.getElementById(id)
        return el ? el.getBoundingClientRect().top + scrollY : 0
      })
      const boundaries = [...positions, document.documentElement.scrollHeight]
      setProgress(sectionIds.map((_, i) => {
        const range = boundaries[i + 1] - boundaries[i]
        if (range <= 0) return 0
        return Math.min(Math.max((scrollY + viewHeight * 0.5 - boundaries[i]) / range, 0), 1)
      }))
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionIds])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' })
  }

  return (
    <>
      <div className="flex h-5 gap-[3px]">
        {sectionIds.map((id, i) => (
          <div
            key={id}
            className="relative h-full cursor-pointer"
            style={{ flex: widths[i] }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            onClick={() => scrollToSection(id)}
          >
            <div className="absolute inset-0 bg-black/10">
              <div
                className="absolute inset-y-0 left-0 bg-black"
                style={{ width: `${progress[i] * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Cursor-following tooltip */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            key={hoveredIndex}
            className="fixed pointer-events-none z-[10000]"
            style={{ left: cursor.x + 16, top: cursor.y + 18 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
          >
            <p className="text-2xl md:text-3xl font-serif font-extralight tracking-tight text-white whitespace-nowrap bg-black px-4 py-2">
              {sectionHeadings[hoveredIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
