'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ImageRow {
  images: string[]
  fullWidth?: boolean
  aspect?: string  // CSS aspect-ratio, e.g. '2/3', '4/3', '16/9'
}

interface ToolSection {
  id: string
  title: string
  subtitle: string
  rows: ImageRow[]
  videoFile?: string
}

function allImages(rows: ImageRow[]): string[] {
  return rows.flatMap(r => r.images)
}

const BASE = '/images/projects/ibm-garage'

const tools: ToolSection[] = [
  {
    id: 'toolbox',
    title: 'IBM Garage Toolbox',
    subtitle: 'Garage Hub',
    rows: [
      {
        images: [
          `${BASE}/IBM%20Garage%20Toolbox/toolbox_garage1a-674x1024.png`,
          `${BASE}/IBM%20Garage%20Toolbox/toolbox_garage2-687x1024.png`,
          `${BASE}/IBM%20Garage%20Toolbox/toolbox_garage3-757x1024.png`,
        ],
        aspect: '2/3',
      },
    ],
  },
  {
    id: 'playbook',
    title: 'IBM Garage Playbook',
    subtitle: 'Partner/AP Enablement',
    rows: [
      {
        images: [
          `${BASE}/IBM%20Garage%20Playbook/pb_blur-545x1024.png`,
          `${BASE}/IBM%20Garage%20Playbook/playbook_blur2-546x1024.png`,
          `${BASE}/IBM%20Garage%20Playbook/playbook_home_blur3-641x1024.png`,
        ],
        aspect: '2/3',
      },
    ],
  },
  {
    id: 'outcomes',
    title: 'IBM Garage Outcomes',
    subtitle: 'Enablement & ROI Calculator',
    rows: [
      {
        images: [
          `${BASE}/IBM%20Garage%20Outcomes/garage_outcomes1-553x1024.png`,
          `${BASE}/IBM%20Garage%20Outcomes/garage_outcomes2-e1727888213428-556x1024.png`,
          `${BASE}/IBM%20Garage%20Outcomes/garage_outcomes3-e1727888149742-555x1024.png`,
        ],
        aspect: '2/3',
      },
      {
        images: [
          `${BASE}/IBM%20Garage%20Outcomes/garage_outcomes4-e1727888178672-482x1024.png`,
          `${BASE}/IBM%20Garage%20Outcomes/garage_outcomes5-456x1024.png`,
          `${BASE}/IBM%20Garage%20Outcomes/garage_outcomes6-520x1024.png`,
        ],
        aspect: '2/3',
      },
      {
        images: [`${BASE}/IBM%20Garage%20Outcomes/garage_outcomes7-e1727888265831-1024x633.png`],
        fullWidth: true,
      },
      {
        images: [`${BASE}/IBM%20Garage%20Outcomes/garage_outcomes8-e1727888243466-1024x737.png`],
        fullWidth: true,
      },
    ],
  },
  {
    id: 'command-center',
    title: 'IBM Garage Command Center',
    subtitle: 'Metrics & Deployment Engine',
    rows: [
      {
        images: [
          `${BASE}/IBM%20Garage%20Command%20Center/garage_center1-882x1024.png`,
          `${BASE}/IBM%20Garage%20Command%20Center/garage_center2-781x1024.png`,
        ],
        aspect: '2/3',
      },
    ],
  },
  {
    id: 'answers',
    title: 'IBM Garage Answers',
    subtitle: 'Tribe, Online Community Platforms',
    videoFile: `${BASE}/IBM%20Garage%20Answers/IBM%20Garage%20Resources%20-%20Demo.mp4`,
    rows: [
      {
        images: [
          `${BASE}/IBM%20Garage%20Answers/garage_answers_blur1.png`,
          `${BASE}/IBM%20Garage%20Answers/garage_answers_blur2.png`,
          `${BASE}/IBM%20Garage%20Answers/garage_answers_blur3.png`,
        ],
        aspect: '4/3',
      },
    ],
  },
  {
    id: 'insights',
    title: 'IBM Garage Insights',
    subtitle: 'Agile Squad Health Monitor',
    rows: [
      {
        images: [`${BASE}/IBM%20Garage%20Insights/garage_insights1-1024x676.png`],
        fullWidth: true,
      },
      {
        images: [
          `${BASE}/IBM%20Garage%20Insights/garage_insightsblur1.png`,
          `${BASE}/IBM%20Garage%20Insights/garage_insightsblur2.png`,
          `${BASE}/IBM%20Garage%20Insights/garage_insightsblur3.png`,
        ],
        aspect: '4/3',
      },
    ],
  },
  {
    id: 'resources',
    title: 'IBM Garage Resources',
    subtitle: 'Artifact Repository and Search Engine',
    rows: [
      {
        images: [
          `${BASE}/IBM%20Garage%20Resources/garage_resources2-1024x710.png`,
          `${BASE}/IBM%20Garage%20Resources/garage_resources_blur.png`,
        ],
        aspect: '4/3',
      },
    ],
  },
]

interface LightboxState {
  images: string[]
  index: number
}

interface WorkShowcaseSectionProps {
  section: ToolSection
  onImageClick: (images: string[], index: number) => void
  first?: boolean
}

function WorkShowcaseSection({ section, onImageClick, first }: WorkShowcaseSectionProps) {
  const images = allImages(section.rows)

  const rowStarts = section.rows.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + section.rows[i - 1].images.length)
    return acc
  }, [])

  return (
    <div id={`showcase-${section.id}`} className={`pt-24 md:pt-32 ${first ? '' : 'border-t border-white/10'}`}>
      {/* Header — eyebrow + title stacked in left col */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10 md:mb-14">
        <div className="md:col-span-4">
          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white mb-3">
            {section.subtitle}
          </p>
          <h3 className="text-xl md:text-2xl font-serif font-extralight tracking-tight text-white leading-snug">
            {section.title}
          </h3>
        </div>
      </div>

      {/* Image rows */}
      <div className="space-y-4 md:space-y-5">
        {section.rows.map((row, rowIdx) => {
          const startIdx = rowStarts[rowIdx]

          if (row.fullWidth) {
            return (
              <div
                key={rowIdx}
                className="w-full overflow-hidden bg-neutral-900 cursor-pointer group"
                style={{ aspectRatio: row.aspect ?? '16/9' }}
                onClick={() => onImageClick(images, startIdx)}
              >
                <img
                  src={row.images[0]}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            )
          }

          const gridClass = row.images.length === 2
            ? 'grid-cols-2'
            : 'grid-cols-2 md:grid-cols-3'

          return (
            <div key={rowIdx} className={`grid ${gridClass} gap-4 md:gap-5`}>
              {row.images.map((src, imgIdx) => (
                <div
                  key={imgIdx}
                  className="overflow-hidden bg-neutral-900 cursor-pointer group"
                  style={{ aspectRatio: row.aspect ?? '2/3' }}
                  onClick={() => onImageClick(images, startIdx + imgIdx)}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Optional local video — autoplay, cropped in */}
      {section.videoFile && (
        <div className="mt-4 md:mt-5 w-full overflow-hidden bg-neutral-900" style={{ aspectRatio: '16/9' }}>
          <video
            src={section.videoFile}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.03]"
          />
        </div>
      )}
    </div>
  )
}

export function WorkShowcase() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() =>
    setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : null), [])
  const next = useCallback(() =>
    setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null), [])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, closeLightbox, prev, next])

  useEffect(() => {
    if (lightbox) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <>
      {/* DESIGNS masthead — full viewport width, bottom 25% clipped */}
      <div
        id="work-showcase"
        className="mt-32 md:mt-48 overflow-hidden"
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          height: '17.25vw',
          scrollMarginTop: '100px',
        }}
      >
        <p
          className="font-black uppercase text-black leading-none whitespace-nowrap select-none"
          style={{ fontSize: '23vw', letterSpacing: '-0.02em' }}
          aria-hidden="true"
        >
          DESIGNS
        </p>
      </div>

      {/* Dark showcase section — mt-[-2px] closes the 1px seam from the clip above */}
      <div className="-mx-[49px] px-[49px] bg-[#0a0a0a] pb-24 md:pb-32 mt-[-2px]">
        {/* Intro */}
        <div className="border-t border-white/10 pt-12 md:pt-16">
          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white mb-6">
            Work Showcase
          </p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-0">
            <div className="md:col-span-8">
              <h2 className="text-[2.5rem] md:text-[4rem] font-serif font-extralight tracking-tighter text-white leading-[0.95] mb-5">
                Garage Ecosystem
              </h2>
              <p className="text-base md:text-lg font-light text-white leading-relaxed">
                A system of tools designed to support planning, selling, and delivering IBM Garage engagements at scale.
              </p>
            </div>
          </div>
        </div>

        {/* Tool sections */}
        <div>
          {tools.map((section, i) => (
            <WorkShowcaseSection
              key={section.id}
              section={section}
              first={i === 0}
              onImageClick={(images, index) => setLightbox({ images, index })}
            />
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox.index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  src={lightbox.images[lightbox.index]}
                  alt=""
                  className="max-w-[88vw] max-h-[82vh] object-contain"
                  onClick={e => e.stopPropagation()}
                />
              </AnimatePresence>

              <button
                className="absolute top-6 right-6 text-white/50 hover:text-white text-[0.65rem] font-bold tracking-widest uppercase transition-colors"
                onClick={closeLightbox}
              >
                Close
              </button>

              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[0.65rem] font-bold tracking-widest uppercase">
                {lightbox.index + 1} / {lightbox.images.length}
              </p>

              {lightbox.images.length > 1 && (
                <>
                  <button
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors w-12 h-12 flex items-center justify-center"
                    onClick={e => { e.stopPropagation(); prev() }}
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                  <button
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors w-12 h-12 flex items-center justify-center"
                    onClick={e => { e.stopPropagation(); next() }}
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
