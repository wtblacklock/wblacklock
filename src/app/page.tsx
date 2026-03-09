'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { projects } from "../data/projects"
import { motion } from "motion/react"
import { FeaturedCaseStudyCard } from "../components/FeaturedCaseStudyCard"

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)
  const featuredCaseStudies = projects.filter((p) => p.caseStudy).slice(0, 2)

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
      title: "Systems",
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-24"
    >
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center pb-12">
        <div className="max-w-5xl">
          <h1 className="text-[3.33rem] md:text-[6.66rem] lg:text-[8.88rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
            Hello.
          </h1>
          <p className="text-2xl md:text-4xl text-black/60 leading-snug max-w-4xl font-light tracking-tight">
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
              <ul className="flex flex-col border-t border-black">
                {category.items.map((item, i) => (
                  <li 
                    key={i} 
                    className="py-5 text-xl font-sans text-black border-b border-black"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Work — editorial rows */}
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
          {featuredProjects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group flex items-stretch border-b border-black/10 min-h-[38vh] md:min-h-[44vh]"
            >
              {/* Left meta */}
              <div className="w-[100px] md:w-[160px] shrink-0 py-8 flex flex-col justify-between">
                <span className="text-[0.6rem] font-mono text-black/30">[0{i + 1}]</span>
              </div>

              {/* Tagline */}
              <div className="flex-1 py-8 px-6 md:px-10 flex flex-col items-start justify-center">
                <p className="text-[0.7rem] font-light tracking-wide text-black/50 leading-snug mb-3">{project.title}</p>
                <p className="text-[1.7rem] md:text-[2.5rem] lg:text-[3.2rem] font-serif font-extralight text-black leading-[1.1] tracking-tight">
                  {project.tagline}
                </p>
              </div>

              {/* Image flush right — wider */}
              <div className="w-[32vw] max-w-[520px] shrink-0 overflow-hidden bg-neutral-100">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 scale-[1.03] group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredCaseStudies.length > 0 && (
        <section className="pt-12">
          <div className="mb-12">
            <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">Featured Case Studies</h2>
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
  )
}
