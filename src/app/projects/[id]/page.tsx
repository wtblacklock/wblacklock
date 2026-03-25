'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { TransitionLink as Link } from "../../../components/TransitionLink"
import { motion, AnimatePresence } from "motion/react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { projects } from "../../../data/projects"
import { getCaseStudy } from "../../../data/caseStudies"
import { CaseStudyDetail } from "../../../components/CaseStudyDetail"
import { PingPongVideo } from "../../../components/PingPongVideo"
import { SectionProgressBar } from "../../../components/SectionProgressBar"

export default function ProjectDetail() {
  const params = useParams()
  const id = params.id as string
  const [moreHoveredId, setMoreHoveredId] = useState<string | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [pastDesigns, setPastDesigns] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY
      const el = document.getElementById('work-showcase')
      if (el) setPastDesigns(scrollY + 80 >= el.offsetTop)
      if (scrollY > lastScrollYRef.current && scrollY > 80) setNavHidden(true)
      else if (scrollY < lastScrollYRef.current) setNavHidden(false)
      lastScrollYRef.current = scrollY
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])
  
  const currentIndex = projects.findIndex((p) => p.id === id)
  const project = projects[currentIndex]

  if (!project) {
    notFound()
  }

  const nextProject = projects[(currentIndex + 1) % projects.length]
  const moreProjects = projects.filter((p) => p.id !== project.id).slice(0, 3)
  const caseStudyData = project.caseStudy ? getCaseStudy(project.id) : undefined

  const moreHoveredProject = moreProjects.find(p => p.id === moreHoveredId)

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="pt-12 md:pt-20"
    >
      {/* Title + tagline */}
      <div id="overview" className="pt-10 md:pt-16 pb-12 md:pb-16 md:grid md:grid-cols-4 md:gap-8 md:items-end">
        <div className="md:col-span-3">
          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 mb-5">
            {project.caseStudy ? 'Case Study' : project.category}
          </p>
          <h1 className="text-[3.33rem] md:text-[6.66rem] lg:text-[8.33rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-black/60 font-light leading-snug tracking-tight max-w-2xl">
            {project.tagline}
          </p>
        </div>

        {/* Jump to work — case study only, desktop */}
        {project.caseStudy && caseStudyData && (
          <div className="hidden md:flex md:col-span-1 md:items-end">
            <a
              href="#work-showcase"
              className="group relative block w-full border-b border-black/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between py-6 gap-4">
                <span className="text-xl md:text-2xl font-serif font-extralight tracking-tight leading-none text-black group-hover:text-white group-hover:translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                  Jump to designs
                </span>
                <ArrowDown className="w-5 h-5 text-black/40 group-hover:text-white group-hover:-translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] shrink-0" strokeWidth={1.5} />
              </div>
            </a>
          </div>
        )}
      </div>

      {/* Section progress bar — sticky on scroll, animates out when past designs */}
      <AnimatePresence>
        {project.caseStudy && caseStudyData && !pastDesigns && (
          <motion.div
            className={`sticky z-40 bg-white pt-3 pb-3 -mx-[49px] px-[49px] transition-[top] duration-300 ${navHidden ? 'top-0' : 'top-[68px] md:top-[76px]'}`}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/35 mb-3">Sections</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <SectionProgressBar
                  sectionIds={['overview', ...caseStudyData.sections.map((s) => s.id)]}
                  sectionHeadings={['Overview', ...caseStudyData.sections.map((s) => s.heading)]}
                />
              </div>
              <a
                href="#work-showcase"
                className="shrink-0 h-5 flex items-center text-[0.65rem] font-bold tracking-widest uppercase text-black/30 hover:text-black transition-colors duration-300"
              >
                DESIGNS
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero image */}
      {(caseStudyData?.hero || project.images[0]) && (
        <div className="w-full aspect-[16/9] overflow-hidden bg-neutral-100 mb-12 md:mb-16">
          <img
            src={caseStudyData?.hero || project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* 2-column content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-12 md:pt-16 pb-12 md:pb-16">

        {/* Col 1: Description */}
        <div className="md:col-span-7 space-y-6">
          <p className="text-xl md:text-2xl text-black/80 font-light leading-relaxed">
            {project.description}
          </p>
          {project.content && (
            <p className="text-base md:text-lg text-black/55 font-light leading-relaxed">
              {project.content}
            </p>
          )}
        </div>

        {/* Col 2: Meta */}
        <div className="md:col-span-3 md:col-start-10 space-y-8">
          <div>
            <h3 className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 mb-3">
              Category
            </h3>
            <p className="text-base font-light text-black">{project.category}</p>
          </div>
          <div>
            <h3 className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 mb-3">
              Services
            </h3>
            <ul className="space-y-1.5">
              {project.services.map((s) => (
                <li key={s} className="text-base font-light text-black/70">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Full-width side-by-side images */}
      {project.images.length > 1 && (
        <div className="grid grid-cols-2 gap-4 md:gap-6 mt-12 md:mt-16">
          {project.images.slice(1).map((src, i) => (
            <div key={i} className="overflow-hidden aspect-[4/3] bg-neutral-100">
              {src.endsWith('.mp4') ? (
                <PingPongVideo src={src} className="w-full h-full object-cover" />
              ) : (
                <img
                  src={src}
                  alt={`${project.title} ${i + 2}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Gallery / case study content */}
      {project.caseStudy && caseStudyData && (
        <CaseStudyDetail data={caseStudyData} project={project} />
      )}

      {/* More work */}
      <div className="mt-24 md:mt-32">
        <div className="flex items-baseline justify-between mb-0">
          <h3 className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 mb-0">More work</h3>
        </div>
        <div className="border-t border-black/10">
          {moreProjects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="group relative block border-b border-black/10 overflow-hidden"
              onMouseEnter={() => setMoreHoveredId(p.id)}
              onMouseLeave={() => setMoreHoveredId(null)}
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between py-6 md:py-8 gap-6">
                <h4 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-serif font-extralight tracking-tight leading-none text-black group-hover:text-white group-hover:translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                  {p.title}
                </h4>
                <div className="md:hidden shrink-0 w-20 h-14 overflow-hidden">
                  <img src={p.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <ArrowUpRight className="hidden md:block w-6 h-6 text-black/30 group-hover:text-white group-hover:-translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] shrink-0" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </motion.div>

    {/* Cursor-following thumbnail for More work — desktop only */}
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 w-56 h-40 overflow-hidden shadow-2xl hidden md:block"
      initial={{ opacity: 0 }}
      animate={{
        x: cursor.x + 20,
        y: cursor.y - 80,
        opacity: moreHoveredId ? 1 : 0,
        scale: moreHoveredId ? 1 : 0.85,
      }}
      transition={{
        x: { type: 'spring', stiffness: 600, damping: 45 },
        y: { type: 'spring', stiffness: 600, damping: 45 },
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 },
      }}
    >
      {moreHoveredProject && (
        <img
          src={moreHoveredProject.thumbnail}
          alt=""
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      )}
    </motion.div>
    </>
  )
}
