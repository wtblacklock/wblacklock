'use client'

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { projects } from "../../data/projects"
import { ProjectCard } from "../../components/ProjectCard"
import { CaseStudyCard } from "../../components/CaseStudyCard"

export default function Projects() {
  const [serviceFilter, setServiceFilter] = useState("All")
  const [mobileView, setMobileView] = useState<"projects" | "caseStudies">("projects")
  const [showFilters, setShowFilters] = useState(false)

  const regularProjects = projects.filter((p) => !p.caseStudy)
  const caseStudies = projects.filter((p) => p.caseStudy)

  const uniqueServices = Array.from(
    new Set(regularProjects.flatMap((p) => p.services))
  ).sort()

  const filteredProjects = regularProjects.filter((project) => {
    return serviceFilter === "All" || project.services.includes(serviceFilter)
  })

  // Client directory: all projects (including case studies), stacked in columns
  const clientDirectory = [...regularProjects, ...caseStudies]

  const clientDirectoryBlock = (
    <div>
      <h4 className="text-xs font-bold tracking-widest uppercase text-black/30 mb-6">Client Name</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5">
        {clientDirectory.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="group block focus:outline-none"
          >
            <p className="font-sans text-sm font-light text-black group-hover:text-black/40 transition-colors duration-200 leading-snug">
              {p.clientName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )

  const serviceFilterBlock = (
    <div>
      <h4 className="text-xs font-bold tracking-widest uppercase text-black/30 mb-6">Project Type</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
        {["All", ...uniqueServices].map((service) => (
          <button
            key={service}
            onClick={() => setServiceFilter(service)}
            className={`relative pb-1 font-sans text-sm font-light transition-colors duration-200 focus:outline-none text-left ${
              serviceFilter === service ? "text-black" : "text-black/30 hover:text-black/60"
            }`}
          >
            {service}
            {serviceFilter === service && (
              <motion.span
                layoutId="serviceFilterLine"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-black"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )

  const projectsGridBlock = (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-16 mt-8">
      <AnimatePresence mode="popLayout">
        {filteredProjects.map((project, index) => (
          <div key={project.id}>
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )

  const caseStudiesBlock = (
    <div>
      {caseStudies.map((project, index) => (
        <CaseStudyCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:pt-[90px]"
    >
      <div className="lg:hidden mb-8">
        <h1 className="text-[3.33rem] md:text-[4.72rem] font-serif font-extralight tracking-tighter text-black leading-[0.9]">
          Projects
        </h1>
      </div>

      <div className="lg:hidden sticky top-20 z-20 bg-white/95 backdrop-blur-sm mb-8">
        <div role="tablist" aria-label="Projects content toggle" className="flex items-center border-b border-black/10">
          <button
            role="tab"
            aria-selected={mobileView === "projects"}
            onClick={() => setMobileView("projects")}
            className={`py-3 pr-6 text-sm font-medium transition-colors ${
              mobileView === "projects"
                ? "text-black border-b border-black"
                : "text-black/40 hover:text-black/70"
            }`}
          >
            Projects
          </button>
          <button
            role="tab"
            aria-selected={mobileView === "caseStudies"}
            onClick={() => setMobileView("caseStudies")}
            className={`py-3 pl-6 text-sm font-medium transition-colors ${
              mobileView === "caseStudies"
                ? "text-black border-b border-black"
                : "text-black/40 hover:text-black/70"
            }`}
          >
            Case Studies
          </button>
        </div>
      </div>

      <div className="lg:hidden mb-12">
        {mobileView === "projects" ? (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/40 hover:text-black transition-colors focus:outline-none"
              >
                {showFilters ? "Hide filters" : "Show filters"}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {showFilters && (
              <div className="mb-8 pb-[80px] border-b border-black/10">
                <div className="grid grid-cols-2 gap-12 md:gap-16">
                  {clientDirectoryBlock}
                  {serviceFilterBlock}
                </div>
              </div>
            )}
            {projectsGridBlock}
          </>
        ) : (
          caseStudiesBlock
        )}
      </div>

      <div className="hidden lg:flex lg:gap-8 mb-[90px]">
        <h2 className="flex-1 text-[3.33rem] md:text-[4.72rem] font-serif font-extralight tracking-tighter text-black leading-[0.9]">
          Projects
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left Column: Projects */}
        <div className="hidden lg:block flex-1 lg:pr-4">
          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/40 hover:text-black transition-colors focus:outline-none"
            >
              {showFilters ? "Hide filters" : "Show filters"}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {showFilters && (
            <div className="mb-8 pb-[80px] border-b border-black/10">
              <div className="grid grid-cols-2 gap-12 md:gap-16">
                {clientDirectoryBlock}
                {serviceFilterBlock}
              </div>
            </div>
          )}
          {projectsGridBlock}
        </div>

        {/* Right Column: Case Studies */}
        {caseStudies.length > 0 && (
          <div className="hidden lg:flex lg:w-1/4 lg:pl-4 lg:flex-col">
            <h3 className="text-2xl md:text-[2.22rem] font-serif font-extralight tracking-tighter text-black leading-tight mb-3 shrink-0">
              Case Studies
            </h3>
            <div>
              <div className="pt-[44px]">
                {caseStudiesBlock}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
