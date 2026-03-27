'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ProjectExecutionData } from '../data/projectExecutions'
import type { Project } from '../data/projects'
import { InstagramFeed } from './InstagramFeed'
import { VideoWithSound } from './VideoWithSound'

function toYoutubeEmbedUrl(url: string): string | null {
  const short = url.match(/youtu\.be\/([^?&/]+)/)
  if (short?.[1]) return `https://www.youtube.com/embed/${short[1]}`

  const shorts = url.match(/youtube\.com\/shorts\/([^?&/]+)/)
  if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}`

  const watch = url.match(/[?&]v=([^?&/]+)/)
  if (watch?.[1]) return `https://www.youtube.com/embed/${watch[1]}`

  return null
}

interface LightboxState {
  images: string[]
  index: number
}

interface Props {
  data: ProjectExecutionData
  project: Project
  navHidden: boolean
}

export function ExecutionDetail({ data, project, navHidden }: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [navVisible, setNavVisible] = useState(false)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Show nav after scrolling past the sentinel (stays visible)
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !navVisible) {
          setNavVisible(true)
        }
      },
      { threshold: 0 }
    )
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [navVisible])

  // Track active section on scroll
  useEffect(() => {
    const update = () => {
      const offset = 180
      let current: string | null = null
      for (const section of data.sections) {
        const el = document.getElementById(`exec-${section.id}`)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = section.id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [data.sections])

  // Lightbox handlers
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImage = useCallback(() =>
    setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : null), [])
  const nextImage = useCallback(() =>
    setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null), [])

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, closeLightbox, prevImage, nextImage])

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightbox) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const scrollTo = (id: string) => {
    const el = document.getElementById(`exec-${id}`)
    if (el) window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' })
  }

  return (
    <>
      {/* Sentinel — nav appears after this */}
      <div ref={sentinelRef} />

      {/* Sticky section nav */}
      <AnimatePresence>
        {navVisible && (
          <motion.div
            className={`fixed left-0 right-0 z-40 bg-white border-b border-black/10 transition-[top] duration-300 ${navHidden ? 'top-0' : 'top-[93px] md:top-[101px]'}`}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="max-w-[1850px] mx-auto px-[49px]">
              <div className="flex items-center gap-6 md:gap-8 py-3 overflow-x-auto no-scrollbar">
                <span className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 shrink-0">
                  {data.campaignName}
                </span>
                <div className="w-px h-3.5 bg-black/15 shrink-0" />
                {data.sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollTo(s.id)}
                    className={`text-[0.65rem] font-bold tracking-widest uppercase whitespace-nowrap shrink-0 transition-colors duration-200 ${
                      activeSection === s.id ? 'text-black' : 'text-black/30 hover:text-black/60'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaign callout + outcomes — only render if there's content */}
      {(data.campaignDescription || data.outcomes.length > 0) && (
        <div className="py-12 md:py-16 border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">
            <div>
              <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 mb-3">
                Campaign
              </p>
              <h2 className="text-[2rem] md:text-[2.8rem] font-serif font-extralight tracking-tight leading-[1] text-black">
                {data.campaignName}
              </h2>
            </div>
            <div className="space-y-8">
              {data.campaignDescription && (
                <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl">
                  {data.campaignDescription}
                </p>
              )}
              {data.outcomes.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {data.outcomes.map((o) => (
                    <div key={o.label}>
                      <p className="text-[2rem] md:text-[2.6rem] font-light tracking-tight text-black leading-none mb-1">
                        {o.value}
                      </p>
                      <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 leading-snug">
                        {o.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Execution sections — dark design section styling */}
      <div className="-mx-[49px] px-[49px] bg-[#0a0a0a] pb-24 md:pb-32 mt-12 md:mt-16">
        {/* Section intro header */}
        <div className="border-t border-white/10 pt-12 md:pt-16 mb-20 md:mb-28">
          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white mb-6">
            Creative Direction
          </p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <h2 className="text-[2.5rem] md:text-[4rem] font-serif font-extralight tracking-tighter text-white leading-[0.95] mb-5">
                {data.campaignName}
              </h2>
            </div>
          </div>
        </div>

        {/* Execution sections */}
        <div className="space-y-20 md:space-y-28">
          {data.sections.map((section) => (
            <div key={section.id} id={`exec-${section.id}`} className="scroll-mt-36">
              <div className="pt-12 md:pt-20 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-4">
                    <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white mb-3">
                      {section.title}
                    </p>
                    <h3 className="text-xl md:text-2xl font-serif font-extralight tracking-tight text-white leading-snug">
                      {section.description}
                    </h3>
                  </div>
                </div>

                {section.externalLink && (
                  <div className="mb-6">
                    <a
                      href={section.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 pl-6 pr-3 h-11 rounded-full border border-white/20 text-sm font-medium text-white hover:border-white/50 transition-colors"
                    >
                      {section.externalLink.label}
                      <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                        <ArrowLeft className="w-3 h-3 rotate-[135deg]" strokeWidth={2} />
                      </span>
                    </a>
                  </div>
                )}

                {!section.videosFirst && section.imageRows && section.imageRows.length > 0 && (
                  <div className="space-y-3 md:space-y-4">
                    {section.imageRows.map((row, rowIdx) => {
                      const images = row.images || []
                      const isSingleImage = images.length === 1
                      const isFullWidth = row.fullWidth || isSingleImage
                      const gridClass = isFullWidth ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
                      const aspectRatio = isSingleImage ? '16/9' : row.aspect ?? '4/3'

                      return (
                        <div
                          key={rowIdx}
                          className={`grid ${gridClass} gap-3 md:gap-4`}
                        >
                          {images.map((src, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="overflow-hidden bg-neutral-900 cursor-pointer group"
                              style={{ aspectRatio }}
                              onClick={() => {
                                const allImages = section.imageRows?.flatMap(r => r.images || []) || []
                                const flatIndex = section.imageRows?.slice(0, rowIdx).reduce((sum, r) => sum + (r.images?.length || 0), 0) || 0
                                setLightbox({ images: allImages, index: flatIndex + imgIdx })
                              }}
                            >
                              <img
                                src={src}
                                alt={`${section.title} ${rowIdx + 1}-${imgIdx + 1}`}
                                className={`w-full h-full transition-transform duration-700 group-hover:scale-[1.02] ${(row.imageContain ? row.imageContain[imgIdx] : row.contain) ? 'object-contain' : 'object-cover'}`}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                )}

                {section.images && section.images.length > 0 && (!section.imageRows || section.imageRows.length === 0) && (
                  <div className={`grid gap-3 md:gap-4 ${section.images.length === 1 ? 'grid-cols-1' : section.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                    {section.images.map((src, i) => (
                      <div
                        key={i}
                        className={`overflow-hidden bg-neutral-900 cursor-pointer group ${section.images && section.images.length === 1 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                        onClick={() => section.images && setLightbox({ images: section.images, index: i })}
                      >
                        <img
                          src={src}
                          alt={`${section.title} ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {section.videoRows && section.videoRows.length > 0 && (
                  <div className="space-y-3 md:space-y-4 mt-4">
                    {section.videoRows.map((row, rowIdx) => (
                      <div key={rowIdx} className={`grid gap-3 md:gap-4 ${row.length === 1 ? 'grid-cols-1' : row.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {row.map((src, i) => (
                          <div key={i} className={`overflow-hidden bg-neutral-900 ${row.length === 1 ? 'aspect-[16/9]' : row.length === 2 ? 'aspect-[16/9]' : 'aspect-[16/9]'}`}>
                            <VideoWithSound src={src} videoClassName="w-full h-full object-cover" containerClassName="w-full h-full" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {!section.videoRows && section.videos && section.videos.length > 0 && (
                  <div className="grid gap-3 md:gap-4 mt-4 grid-cols-1">
                    {section.videos.map((src, i) => (
                      <div
                        key={i}
                        className={`overflow-hidden bg-neutral-900 ${section.videos?.length === 1 ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
                      >
                        <VideoWithSound src={src} videoClassName="w-full h-full object-cover" containerClassName="w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}

                {section.videosFirst && section.imageRows && section.imageRows.length > 0 && (
                  <div className="space-y-3 md:space-y-4 mt-3 md:mt-4">
                    {section.imageRows.map((row, rowIdx) => {
                      const images = row.images || []
                      const isSingleImage = images.length === 1
                      const isFullWidth = row.fullWidth || isSingleImage
                      const gridClass = isFullWidth ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
                      const aspectRatio = isSingleImage ? '16/9' : row.aspect ?? '4/3'
                      return (
                        <div key={rowIdx} className={`grid ${gridClass} gap-3 md:gap-4`}>
                          {images.map((src, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="overflow-hidden bg-neutral-900 cursor-pointer group"
                              style={{ aspectRatio }}
                              onClick={() => {
                                const allImages = section.imageRows?.flatMap(r => r.images || []) || []
                                const flatIndex = section.imageRows?.slice(0, rowIdx).reduce((sum, r) => sum + (r.images?.length || 0), 0) || 0
                                setLightbox({ images: allImages, index: flatIndex + imgIdx })
                              }}
                            >
                              <img src={src} alt={`${section.title} ${rowIdx + 1}-${imgIdx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" referrerPolicy="no-referrer" loading="lazy" />
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                )}

                {section.youtubeUrls && section.youtubeUrls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white mb-3 md:mb-4">
                      YouTube
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      {section.youtubeUrls.map((url, i) => {
                        const embed = toYoutubeEmbedUrl(url)
                        if (!embed) return null
                        return (
                          <div key={`${url}-${i}`} className="aspect-video bg-neutral-900 overflow-hidden">
                            <iframe
                              src={embed}
                              title={`YouTube video ${i + 1}`}
                              className="w-full h-full"
                              loading="lazy"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {section.instagramFeed && (
                  <div className="mt-8 md:mt-10">
                    <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white mb-3 md:mb-4">
                      Instagram
                    </p>
                    <InstagramFeed />
                  </div>
                )}

                {section.instagramPosts && section.instagramPosts.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {section.instagramPosts.map((post, i) => {
                      const isVideo = /\.(mp4|mov|webm)/i.test(post.src)
                      const media = isVideo ? (
                        <VideoWithSound src={post.src} videoClassName="w-full h-full object-cover" containerClassName="w-full h-full" />
                      ) : (
                        <img
                          src={post.src}
                          alt={`Instagram post ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )
                      return post.href ? (
                        <a
                          key={i}
                          href={post.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block overflow-hidden bg-neutral-900"
                          style={{ aspectRatio: '9/16' }}
                        >
                          {media}
                        </a>
                      ) : (
                        <div key={i} className="group overflow-hidden bg-neutral-900" style={{ aspectRatio: '9/16' }}>
                          {media}
                        </div>
                      )
                    })}
                  </div>
                )}

                {(!section.images || section.images.length === 0) && (!section.imageRows || section.imageRows.length === 0) && (!section.videos || section.videos.length === 0) && (!section.videoRows || section.videoRows.length === 0) && !section.youtubeUrls && !section.instagramFeed && (!section.instagramPosts || section.instagramPosts.length === 0) && (
                  <div className="aspect-[16/9] bg-neutral-900 flex items-center justify-center">
                    <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white/20">
                      Video content
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
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
                  onClick={e => { e.stopPropagation(); prevImage() }}
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
                </button>
                <button
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors w-12 h-12 flex items-center justify-center"
                  onClick={e => { e.stopPropagation(); nextImage() }}
                  aria-label="Next image"
                >
                  <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
