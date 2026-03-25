'use client'

import { useState, useEffect } from "react"
import { TransitionLink as Link } from "../components/TransitionLink"
import { ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react"
import { projects } from "../data/projects"
import { motion } from "motion/react"

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)
  const featuredCaseStudies = projects.filter((p) => p.caseStudy).slice(0, 2)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeExperience, setActiveExperience] = useState("twinb")
  const [activeClientGroup, setActiveClientGroup] = useState("technology-enterprise-saas")
  const hoveredProject = projects.find((p) => p.id === hoveredId)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const whatIDoSections = [
    {
      id: "design",
      title: "Design",
      heading: "Designing products, campaigns, and visual systems",
      description:
        "I help teams shape clear product experiences and brand systems that translate strategy into work people can understand, use, and remember.",
      capabilities: [
        "Product design",
        "UX and interface design",
        "Campaign and marketing design",
        "Art direction",
        "Design systems",
        "Print and collateral",
      ],
    },
    {
      id: "build",
      title: "Build",
      heading: "Building fast, useful, launch-ready experiences",
      description:
        "From AI-assisted prototypes to production-ready websites, I work quickly to test ideas, tighten direction, and ship with confidence.",
      capabilities: [
        "AI-assisted websites",
        "Landing pages and product launches",
        "Rapid website builds",
        "Interactive experiences",
        "Digital campaigns",
        "Creative web projects",
      ],
    },
    {
      id: "systems",
      title: "Systems",
      heading: "Creating systems that scale creative work",
      description:
        "I design repeatable workflows, operating structures, and creative frameworks that help teams move faster without losing quality.",
      capabilities: [
        "Design thinking",
        "Creative workflows",
        "AI-supported creative pipelines",
        "Content and campaign frameworks",
        "Design operations",
        "Automation and tooling",
      ],
    },
  ]

  const experiences = [
    {
      id: "twinb",
      company: "TwinB",
      role: "Co-Founder, Creative Director",
      companyType: "AI Consultancy",
      period: "Austin, TX | 2024 - Present",
      summary:
        "Built an AI-first consultancy helping SMBs adopt automation, improve speed to delivery, and align creative with business outcomes.",
      details: [
        "Designed and deployed custom AI workflows, agents, and toolchains across marketing, operations, and product teams.",
        "Led end-to-end execution across brand, UX/UI, and systems design for client engagements.",
        "Developed scalable frameworks for content creation, campaign execution, and internal team efficiency.",
      ],
    },
    {
      id: "ibm",
      company: "IBM",
      role: "Program Manager, Design Lead (UX/UI, Visual)",
      companyType: "Enterprise / Consulting",
      period: "Austin, TX | 2019 - 2024",
      summary:
        "Led design and program delivery across IBM Consulting, launching 7 enterprise tools and platforms.",
      details: [
        "Built and scaled design systems, content frameworks, and campaign assets used by global teams.",
        "Drove over $100M in business impact through UX, content strategy, and AI-enabled workflows.",
        "Managed cross-functional teams, established PMO practices, and improved alignment across 70+ contributors.",
      ],
    },
    {
      id: "lodestone-social",
      company: "Lodestone Social",
      role: "Co-Founder, Executive Creative Director",
      companyType: "Startup / Product",
      period: "Austin, TX | 2009 - 2016",
      summary:
        "Built a social activation platform powering campaigns for major sports leagues and global brands.",
      details: [
        "Led product design, UX/UI, and creative direction across web, mobile, and in-stadium experiences.",
        "Drove millions of user engagements through gamified campaigns, data capture, and branded content systems.",
        "Scaled the company to a successful six-figure acquisition by Umbel.",
      ],
    },
  ]

  const clientGroups = [
    {
      id: "technology-enterprise-saas",
      title: "Technology / Enterprise / SaaS",
      clients: [
        "IBM Garage / IBM Consulting",
        "Umbel (MVP Index merger)",
        "Lodestone Social Media (platform and app work)",
      ],
    },
    {
      id: "sports-entertainment",
      title: "Sports & Entertainment",
      clients: [
        "MLBAM (Major League Baseball Advanced Media)",
        "NFL",
        "NCAA",
        "Premier Soccer League",
        "Professional Bull Riders (PBR)",
        "Jacksonville Jaguars (social activation)",
        "Miss Universe (IMG)",
      ],
    },
    {
      id: "consumer-products-cpg",
      title: "Consumer Products / CPG",
      clients: ["Beast Putty"],
    },
    {
      id: "nonprofit-education",
      title: "Nonprofit / Education",
      clients: ["Mainspring Schools", "Hill Country Ride for AIDS"],
    },
    {
      id: "healthcare-clinic",
      title: "Healthcare / Clinic",
      clients: ["Allergy & Asthma Care of Waco"],
    },
    {
      id: "events-associations",
      title: "Events / Associations",
      clients: [
        "Austin Advertising Federation (Austin ADDYs)",
        "University of Texas (McCombs School of Business gala invitations)",
        "Turn2Live (entertainment discovery platform)",
      ],
    },
  ]

  const awards = [
    {
      organization: "IBM",
      source: "IBM",
      recognition: "Design Team MVP Award",
      year: "2020",
    },
    {
      organization: "W3 Awards",
      source: "W3 Awards",
      recognition: "2-time Award Winner",
      year: "2006, 2009",
    },
    {
      organization: "ADDY Awards",
      source: "AAF",
      recognition: "2-time Award Recipient",
      year: "2006, 2007",
    },
    {
      organization: "PRINT Magazine",
      source: "Regional Design Showcase",
      recognition: "Regional Design Showcase",
      year: "2006",
    },
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="space-y-32 md:space-y-40"
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
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between py-6 md:py-8 gap-6">
                  <h3 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-serif font-extralight tracking-tight leading-none text-black group-hover:text-white group-hover:translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                    {project.title}
                  </h3>

                  <div className="md:hidden shrink-0 w-20 h-14 overflow-hidden">
                    <img src={project.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <ArrowUpRight className="hidden md:block w-6 h-6 text-black/30 group-hover:text-white group-hover:-translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] shrink-0" strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Case Studies */}
        {featuredCaseStudies.length > 0 && (
          <section className="pt-12">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">Featured Case Studies</h2>
              <Link
                href="/projects"
                className="group flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
              >
                View all
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="border-t border-black/10">
              {featuredCaseStudies.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group relative block border-b border-black/10 overflow-hidden"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />

                  <div className="relative z-10 flex md:grid md:grid-cols-[1.35fr_1.5fr_auto] items-center justify-between py-6 md:py-8 gap-6 md:gap-8">
                    <h3 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-serif font-extralight tracking-tight leading-none text-black group-hover:text-white group-hover:translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                      {project.title}
                    </h3>

                    <p className="hidden md:block text-base lg:text-xl font-light text-black/60 truncate group-hover:text-white group-hover:translate-x-[12px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                      {project.tagline}
                    </p>

                    <div className="md:hidden shrink-0 w-20 h-14 overflow-hidden">
                      <img src={project.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>

                    <ArrowUpRight className="hidden md:block w-6 h-6 text-black/30 group-hover:text-white group-hover:-translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] shrink-0" strokeWidth={1.5} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* What I Do Section */}
        <section className="pt-12">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">What I Do</h2>
          </div>

          <div className="space-y-20 md:space-y-24">
            {whatIDoSections.map((section) => (
              <div key={section.id}>
                <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[34vh] min-h-[220px] max-h-[420px] bg-neutral-100 border-y border-black/10 mb-10 md:mb-14">
                  <div className="h-full w-full px-[49px] flex items-end pb-8 md:pb-10">
                    <h3 className="text-[2.2rem] md:text-[4.4rem] lg:text-[5.5rem] font-serif font-extralight tracking-tighter leading-[0.9] text-black">
                      {section.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 md:gap-16 lg:gap-20 items-start">
                  <div className="hidden lg:block" aria-hidden="true" />

                  <div className="flex flex-col">
                    <h3 className="w-full md:w-[75%] text-[2.1rem] md:text-[3rem] lg:text-[3.75rem] font-sans font-bold tracking-tight leading-[1.08] text-black mb-6 md:mb-8">
                      {section.heading}
                    </h3>
                    <p className="text-lg md:text-2xl text-black/60 leading-relaxed max-w-4xl font-light mb-10 md:mb-12">
                      {section.description}
                    </p>

                    <ul className="flex flex-col border-t border-black/10">
                      {section.capabilities.map((item) => (
                        <li
                          key={item}
                          className="group relative overflow-hidden border-b border-black/10"
                        >
                          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />
                          <span className="relative z-10 block py-5 md:py-6 text-lg md:text-2xl font-light text-black group-hover:text-white group-hover:translate-x-[25px] transition-[color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Experience */}
        <section className="pt-16 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-10 md:mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-black/50 mb-4">My experience</p>
              <p className="text-[2rem] md:text-[2.5rem] font-serif font-extralight tracking-tight text-black leading-none">Experience</p>
            </div>
            <h2 className="text-[2.2rem] md:text-[3.6rem] lg:text-[4.2rem] font-sans font-bold tracking-tight leading-[1.08] text-black">
              Work experience spanning 15+ years of creativity, imagination, and passion.
            </h2>
          </div>

          <div className="border-t border-black/10">
            {experiences.map((experience) => {
              const isOpen = activeExperience === experience.id

              return (
                <div key={experience.id} className="border-b border-black/10">
                  <button
                    type="button"
                    className="w-full py-6 md:py-7 flex items-center justify-between gap-6 text-left"
                    onClick={() => setActiveExperience(isOpen ? "" : experience.id)}
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-[2rem] md:text-[3rem] font-light tracking-tight text-black leading-none">
                      {experience.company}
                    </h3>
                    <span className="w-8 h-8 rounded-full border border-black/30 flex items-center justify-center shrink-0">
                      {isOpen ? <Minus className="w-4 h-4 text-black/70" /> : <Plus className="w-4 h-4 text-black/70" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-10 md:pb-12">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 mb-8">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center px-4 h-8 rounded-full border border-black/20 text-xs md:text-sm text-black/60 font-medium w-fit">
                            {experience.role}
                          </span>
                          {experience.companyType && (
                            <span className="inline-flex items-center px-4 h-8 rounded-full border border-black/20 text-xs md:text-sm text-black/60 font-medium w-fit">
                              {experience.companyType}
                            </span>
                          )}
                        </div>
                        <p className="text-sm md:text-base text-black/60 font-light">{experience.period}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                        <p className="text-xl md:text-[2rem] font-light tracking-tight text-black/85 leading-[1.2]">
                          {experience.summary}
                        </p>

                        <ul className="space-y-4 md:space-y-5">
                          {experience.details.map((item) => (
                            <li key={item} className="text-base md:text-[1.35rem] text-black/80 font-light leading-[1.35] flex gap-3">
                              <span className="text-black/40">-</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Clients I've worked with */}
        <section className="pt-16 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-16 lg:gap-20 items-start">
            <div className="space-y-8 md:space-y-10 lg:sticky lg:top-28">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-black/50 mb-4">Clients I&apos;ve worked with</p>
                <p className="text-[2rem] md:text-[2.5rem] font-serif font-extralight tracking-tight text-black leading-none mb-8">Clients</p>
                <h2 className="w-full md:w-[85%] text-[2.2rem] md:text-[3.4rem] lg:text-[3.9rem] font-sans font-bold tracking-tight leading-[1.08] text-black">
                  A decade building brand identities for global tech leaders and influential local businesses.
                </h2>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 pl-6 pr-3 h-12 rounded-full border border-black/30 text-base font-medium text-black hover:border-black/60 transition-colors"
              >
                Connect with me
                <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                </span>
              </Link>
            </div>

            <div className="border-t border-black/10">
              {clientGroups.map((group) => {
                const isOpen = activeClientGroup === group.id

                return (
                  <div key={group.id} className="border-b border-black/10">
                    <button
                      type="button"
                      className="w-full py-5 md:py-6 flex items-center justify-between gap-6 text-left"
                      onClick={() => setActiveClientGroup(isOpen ? "" : group.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4 md:gap-5">
                        <span className="w-7 h-7 rounded-full border border-black/30 flex items-center justify-center shrink-0">
                          {isOpen ? <Minus className="w-4 h-4 text-black/70" /> : <Plus className="w-4 h-4 text-black/70" />}
                        </span>
                        <h3 className="text-[2rem] md:text-[2.6rem] font-light tracking-tight text-black leading-none">
                          {group.title}
                        </h3>
                      </div>
                    </button>

                    {isOpen && (
                      <ul className="pb-8 md:pb-10 pl-11 md:pl-12 space-y-2.5 md:space-y-3">
                        {group.clients.map((client) => (
                          <li key={client} className="text-lg md:text-xl text-black/65 font-light leading-[1.35]">
                            {client}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="pt-16 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-14 lg:gap-20 items-start mb-12 md:mb-14">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-black/50 mb-4">Awards &amp; recognition</p>
              <p className="text-[2rem] md:text-[2.5rem] font-serif font-extralight tracking-tight text-black leading-none">Recognition</p>
            </div>
            <h2 className="w-full md:w-[85%] text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] font-sans font-bold tracking-tight leading-[1.08] text-black">
              Creative leadership that directly drove agency-wide recognition and growth.
            </h2>
          </div>

          <div className="border-t border-black/10">
            {awards.map((award) => (
              <div key={`${award.source}-${award.recognition}`} className="grid grid-cols-1 md:grid-cols-[1.6fr_2.6fr_0.9fr] gap-4 md:gap-6 items-start py-6 md:py-8 border-b border-black/10">
                <p className="text-lg md:text-2xl font-light text-black/85 leading-[1.2]">{award.organization}</p>
                <p className="text-lg md:text-2xl font-light text-black/85 leading-[1.2]">{award.recognition}</p>
                <p className="text-lg md:text-2xl font-light text-black/70 leading-[1.2] md:text-left">{award.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="pt-16 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-14 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-black/50 mb-4">About</p>
              <p className="text-[2rem] md:text-[2.5rem] font-serif font-extralight tracking-tight text-black leading-none">Story</p>
            </div>

            <div className="space-y-8 md:space-y-10">
              <h2 className="w-full md:w-[85%] text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] font-sans font-bold tracking-tight leading-[1.08] text-black">
                Since the beginning, creating has been the constant thread across product, brand, and digital work.
              </h2>

              <div className="max-w-4xl space-y-6 text-lg md:text-2xl text-black/70 leading-relaxed font-light">
                <p>
                  I work at the intersection of strategy and execution, helping teams turn ideas into clear experiences, stronger identities, and systems that scale.
                </p>
                <p>
                  Over the years, that has meant leading design direction, building campaigns, shaping digital products, and creating workflows that keep momentum high without sacrificing quality.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 pl-6 pr-3 h-12 rounded-full border border-black/30 text-base font-medium text-black hover:border-black/60 transition-colors"
              >
                Read full story
                <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                </span>
              </Link>
            </div>
          </div>
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
