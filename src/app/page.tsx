'use client'

import { useState, useEffect } from "react"
import { TransitionLink as Link } from "../components/TransitionLink"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { projects } from "../data/projects"
import { motion } from "motion/react"
import { FeaturedCaseStudyCard } from "../components/FeaturedCaseStudyCard"

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)
  const featuredCaseStudies = projects.filter((p) => p.caseStudy).slice(0, 2)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const hoveredProject = featuredProjects.find((p) => p.id === hoveredId)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const categories = [
    {
      title: "Design",
      items: [
        "Product design",
        "UX and interface design",
        "Campaign and marketing design",
        "Art direction",
        "Design systems",
        "Print and collateral",
      ],
    },
    {
      title: "Build",
      items: [
        "AI-assisted websites",
        "Landing pages and product launches",
        "Rapid website builds",
        "Interactive experiences",
        "Digital campaigns",
        "Creative web projects",
      ],
    },
    {
      title: "Systems Management",
      items: [
        "Design thinking",
        "Creative workflows",
        "AI-supported creative pipelines",
        "Content and campaign frameworks",
        "Design operations",
        "Automation and tooling",
      ],
    },
  ]

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="space-y-24"
    >
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center pb-12">
        <div className="max-w-5xl">
          <h1 className="text-[3.33rem] md:text-[6.66rem] lg:text-[8.88rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
            Hello.
          </h1>
          <p className="text-2xl md:text-4xl text-black/60 leading-relaxed max-w-4xl font-light tracking-tight">
            Independent designer helping teams build better products, brands, and creative systems.
          </p>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="pt-12">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">What I Do</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-5xl md:text-6xl font-sans tracking-tight text-black mb-8">
                {category.title}
              </h3>
              <ul className="flex flex-col border-t border-black/10">
                {category.items.map((item, i) => (
                  <li
                    key={i}
                    className="py-5 text-xl font-sans text-black border-b border-black/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Work — list */}
      <section className="pt-12">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">Projects</h2>
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
          >
            View all
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="border-t border-black/10">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group relative block border-b border-black/10 overflow-hidden"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Black fill — animates up on hover */}
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between py-6 md:py-8 gap-6">
                <h3 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-serif font-extralight tracking-tight leading-none text-black group-hover:text-white group-hover:translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                  {project.title}
                </h3>

                {/* Mobile: always-visible thumbnail */}
                <div className="md:hidden shrink-0 w-20 h-14 overflow-hidden">
                  <img src={project.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                {/* Desktop: arrow */}
                <ArrowUpRight className="hidden md:block w-6 h-6 text-black/30 group-hover:text-white group-hover:-translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] shrink-0" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredCaseStudies.length > 0 && (
        <section className="pt-12">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">Featured Case Studies</h2>
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              View all
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {featuredCaseStudies.map((project) => (
              <FeaturedCaseStudyCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="pt-24 pb-12">
        <h2 className="text-4xl md:text-6xl font-light text-black mb-6">Have something in mind?</h2>
        <p className="text-xl md:text-2xl text-black/60 mb-8 font-light max-w-2xl">
          I'm currently open to new projects.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 text-lg md:text-xl font-medium text-black hover:text-black/60 transition-colors group"
        >
          Reach out
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </motion.div>
    {/* Cursor-following thumbnail — desktop only */}
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 w-56 h-40 overflow-hidden shadow-2xl hidden md:block"
      initial={{ opacity: 0 }}
      animate={{
        x: cursor.x + 20,
        y: cursor.y - 80,
        opacity: hoveredId ? 1 : 0,
        scale: hoveredId ? 1 : 0.85,
      }}
      transition={{
        x: { type: 'spring', stiffness: 600, damping: 45 },
        y: { type: 'spring', stiffness: 600, damping: 45 },
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 },
      }}
    >
      {hoveredProject && (
        <img
          src={hoveredProject.thumbnail}
          alt=""
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      )}
    </motion.div>
    </>
  )
}
