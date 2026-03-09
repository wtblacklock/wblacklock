'use client'

import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import Link from "next/link"
import { motion } from "motion/react"
import { projects } from "../../../data/projects"

export default function ProjectDetail() {
  const params = useParams()
  const id = params.id as string
  
  const currentIndex = projects.findIndex((p) => p.id === id)
  const project = projects[currentIndex]

  if (!project) {
    notFound()
  }

  const nextProject = projects[(currentIndex + 1) % projects.length]
  const moreProjects = projects.filter((p) => p.id !== project.id).slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-12 md:pt-20"
    >
      {/* Back link */}
      <Link
        href="/projects"
        className="text-[0.72rem] font-bold tracking-widest uppercase text-black/40 hover:text-black transition-colors"
      >
        ← Projects
      </Link>

      {/* Title + tagline */}
      <div className="pt-10 md:pt-16 pb-12 md:pb-16 max-w-5xl">
        <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 mb-5">
          {project.category}
        </p>
        <h1 className="text-[3.33rem] md:text-[6.66rem] lg:text-[8.33rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl text-black/60 font-light leading-snug tracking-tight max-w-2xl">
          {project.tagline}
        </p>
      </div>

      {/* 3-column content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 border-t border-black/10 pt-12 md:pt-16">

        {/* Col 1: Description */}
        <div className="md:col-span-5 space-y-6">
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
        <div className="md:col-span-3 space-y-8">
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

        {/* Col 3: Additional images */}
        {project.images.length > 1 && (
          <div className="md:col-span-4 space-y-2">
            {project.images.slice(1).map((img, i) => (
              <div key={i} className="overflow-hidden aspect-[4/3] bg-neutral-100">
                <img
                  src={img}
                  alt={`${project.title} ${i + 2}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project images gallery */}
      <div className="mt-20 md:mt-28 space-y-6 md:space-y-8">
        {/* Full width image */}
        <div className="w-full aspect-[16/9] bg-neutral-100"></div>
        
        {/* Two column images */}
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div className="aspect-[4/5] bg-neutral-100"></div>
          <div className="aspect-[4/5] bg-neutral-100"></div>
        </div>
        
        {/* Full width image */}
        <div className="w-full aspect-[21/9] bg-neutral-100"></div>
        
        {/* Single image */}
        <div className="w-full aspect-[16/9] bg-neutral-100"></div>
        
        {/* Two column images */}
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div className="aspect-square bg-neutral-100"></div>
          <div className="aspect-square bg-neutral-100"></div>
        </div>
      </div>

      {/* More work */}
      <div className="mt-24 md:mt-32 pt-12 border-t border-black/10">
        <h3 className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 mb-10">
          More work
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {moreProjects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="group block focus:outline-none"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100 mb-3 rounded-none group-hover:rounded-xl transition-[border-radius] duration-500">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 scale-[1.03] group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[0.62rem] font-bold tracking-widest uppercase text-black/40 mb-1">{p.category}</p>
              <h4 className="text-base md:text-lg font-serif font-extralight tracking-tight text-black leading-snug group-hover:text-black/50 transition-colors duration-300">
                {p.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Next project */}
      <div className="mt-20 md:mt-28 pt-10 border-t border-black/10 pb-16">
        <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 mb-6">Next</p>
        <Link
          href={`/projects/${nextProject.id}`}
          className="block text-[2.5rem] md:text-[5rem] lg:text-[7.5rem] font-serif font-extralight tracking-tighter text-black hover:text-black/40 transition-colors leading-[0.9]"
        >
          {nextProject.title} →
        </Link>
      </div>
    </motion.div>
  )
}
