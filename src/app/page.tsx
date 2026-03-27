'use client'

import { useState, useEffect } from "react"
import { TransitionLink as Link } from "../components/TransitionLink"
import { ArrowUpRight, Plus, Minus } from "lucide-react"
import { projects } from "../data/projects"
import { motion, AnimatePresence } from "motion/react"
import { PingPongVideo } from "../components/PingPongVideo"

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)
  const featuredCaseStudies = projects.filter((p) => p.caseStudy).slice(0, 2)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [hoveredClient, setHoveredClient] = useState<{ name: string; description: string } | null>(null)
  const [activeExperience, setActiveExperience] = useState("twinb")
  const [activeClientGroup, setActiveClientGroup] = useState("technology-saas")
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
      id: "technology-saas",
      title: "Technology, SaaS & Business Services",
      clients: [
        { name: "IBM (Consulting, Garage, Z & LinuxONE)", description: "Design Lead & Program Manager. Scaled global frameworks; 73 NPS." },
        { name: "Rackspace", description: "High-volume app design, blog management, and major conference branding/collateral." },
        { name: "Clover Educational Consulting Group", description: "Full Agency of Record execution — Branding, Messaging, Site, Collateral." },
        { name: "Frank.ai", description: "Strategic Lead Magnets and conversion-optimized assets." },
        { name: "Umbel", description: "Creative & Acquisition Services Director." },
        { name: "MVP Index", description: "Creative Director; full brand repositioning and design system overhaul." },
        { name: "SolarWinds / Eloqua / Toshiba / Sony", description: "Creative strategy, digital/print marketing, and app design." },
        { name: "Azora", description: "STR compliance software development and address identification systems." },
      ],
    },
    {
      id: "sports-entertainment",
      title: "Sports, Media & Entertainment",
      clients: [
        { name: "Orlando Magic (NBA)", description: "Fan engagement and in-arena digital activations." },
        { name: "Miami Heat (NBA)", description: "Social activation platforms and digital fan engagement." },
        { name: "Tampa Bay Lightning (NHL)", description: "In-arena fan engagement and omnichannel brand impressions." },
        { name: "Denver Nuggets (NBA)", description: "Multi-channel digital activation and arena engagement." },
        { name: "Jacksonville Jaguars (NFL)", description: "Social fan activation, jumbotron integration, and points-based gamification." },
        { name: "NFL, MLB, & MLBAM", description: "Omnichannel engagement platforms and stadium-wide brand activations." },
        { name: "NCAA", description: "In-stadium engagement and arena activations for National Championships." },
        { name: "NHL", description: "League-wide fan data visualization and engagement tools." },
        { name: "Houston Texans (NFL)", description: "Fan monetization and digital engagement strategies." },
        { name: "OKC Thunder (NBA)", description: "Arena activations and digital fan engagement." },
        { name: "Fox Sports / BTN", description: "Broadcast-integrated social engagement and creative strategy." },
        { name: "Professional Bull Riders (PBR)", description: "Social engagement and activation tools." },
        { name: "Premier Soccer League", description: "Managed brand impressions and global engagement." },
        { name: "Miss Universe (IMG)", description: "Global omnichannel engagement products." },
      ],
    },
    {
      id: "consumer-brands",
      title: "Consumer Brands, Retail & Real Estate",
      clients: [
        { name: "Chili's Grill & Bar", description: "Designed the Chili's Pepper x St. Jude Children's Research Hospital partnership identity." },
        { name: "Heelys", description: "National advertising campaigns and full website execution." },
        { name: "Wilshire Homes", description: "Executive Art Direction; photography shoots, interactive sites, and online advertising." },
        { name: "Bacardi / Zaxby's Chicken / C Spire Wireless", description: "Integrated marketing and social activation." },
      ],
    },
    {
      id: "nonprofit-healthcare-education",
      title: "Nonprofit, Healthcare & Higher Education",
      clients: [
        { name: "University of Texas (McCombs School)", description: "Gala branding and HOF induction suites." },
        { name: "Mainspring Schools", description: "3 years of Annual Reports, concept to print." },
        { name: "Hill Country Ride for AIDS (HCRA)", description: "Award-winning promotional design — ADDYs Special Judges Award." },
        { name: "Allergy & Asthma Care of Waco", description: "AI-driven multi-channel patient engagement." },
        { name: "The Paralympics-PBS / Austin Neuropsychology", description: "Platform integration and site IA." },
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
        {/* Hero Section — full-bleed, breaks out of main padding, sits behind nav */}
        <section className="relative h-screen -mt-32 -mx-[49px] flex flex-col overflow-hidden">
          {/* Centered ping-pong video — height-contained, 120% size, shifted left 80px */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div style={{ height: '110%', transform: 'translateX(-40px) translateY(-20px)' }}>
              <PingPongVideo src="/images/wtb_spin.mp4" className="h-full" fit="contain-height" />
            </div>
          </div>

          {/* Name — absolutely centered in the full section */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-[49px]" style={{ marginTop: '-60px' }}>
            <h1 className="w-full max-w-full text-center text-[clamp(1.2rem,4.6vw,5.3rem)] font-extralight leading-[0.92] text-black uppercase whitespace-nowrap" style={{ letterSpacing: '0.04em' }}>
              William Thames Blacklock
            </h1>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-between items-end px-[49px] pb-8 md:pb-10">
            <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.25em] uppercase text-black/50 font-medium">Based in Austin, TX</span>
            <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.25em] uppercase text-black/50 font-medium">Design • AI • Systems</span>
            <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.25em] uppercase text-black/50 font-medium">15+ Years Experience</span>
          </div>
        </section>

        {/* Work — list */}
        <section id="work" className="pt-20 md:pt-28">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">Projects</h2>
          </div>

          <div className="border-t border-black/10">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={project.caseStudy ? `/projects/${project.id}#work-showcase` : `/projects/${project.id}`}
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
          <section id="case-studies" className="pt-20 md:pt-28">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">Featured Case Studies</h2>
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
        <section id="services" className="pt-20 md:pt-28">
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
        <section id="experience" className="pt-24 md:pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-10 md:mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-black/50 mb-4">My experience</p>
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

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* Clients I've worked with */}
        <section id="clients" className="pt-24 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-16 lg:gap-20 items-start">
            <div className="space-y-8 md:space-y-10 lg:sticky lg:top-28">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-black/50 mb-4">Clients I&apos;ve worked with</p>
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

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <ul className="pb-4 md:pb-6 pl-11 md:pl-12">
                            {group.clients.map((client) => (
                              <li
                                key={client.name}
                                className="py-2 cursor-default"
                                onMouseEnter={() => setHoveredClient(client)}
                                onMouseLeave={() => setHoveredClient(null)}
                              >
                                <span className="text-lg md:text-xl font-light text-black/65 leading-snug">
                                  {client.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section id="recognition" className="pt-24 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 md:gap-14 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-black/50 mb-4">Awards &amp; recognition</p>
            </div>
            <div>
              <h2 className="w-full md:w-[85%] text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] font-sans font-bold tracking-tight leading-[1.08] text-black mb-12 md:mb-14">
                Creative leadership that directly drove agency-wide recognition and growth.
              </h2>
              <div className="border-t border-black/10">
                {awards.map((award) => (
                  <div key={`${award.source}-${award.recognition}`} className="grid grid-cols-1 md:grid-cols-[1.6fr_2.6fr_0.9fr] gap-4 md:gap-6 items-start py-6 md:py-8 border-b border-black/10">
                    <p className="text-lg md:text-2xl font-light text-black/85 leading-[1.2]">{award.organization}</p>
                    <p className="text-lg md:text-2xl font-light text-black/85 leading-[1.2]">{award.recognition}</p>
                    <p className="text-lg md:text-2xl font-light text-black/70 leading-[1.2] md:text-left">{award.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="pt-24 md:pt-32">
          <div className="max-w-[700px] mx-auto text-left space-y-10 md:space-y-12">
            <div className="relative w-[150%] -ml-[25%] overflow-hidden border-b border-black/10">
              <PingPongVideo src="/images/wtb_figure.mp4" className="w-full" />
            </div>
            <h2 className="text-[2.2rem] md:text-[3.4rem] lg:text-[4rem] font-sans font-bold tracking-tight leading-[1.08] text-black">
              I&rsquo;m a designer, creative operator, and absolute systems nerd based in the heart of Austin, Texas.
            </h2>

            <div className="space-y-6 text-lg md:text-2xl text-black/70 leading-relaxed font-light text-left">
              <p>
                For over 15 years, I&rsquo;ve been building at the intersection of high-level strategy and deep-focus execution. If you&rsquo;re looking for a designer who just wants to make &ldquo;pretty brand guidelines&rdquo; to sit on a shelf, I&rsquo;m probably not your guy.
              </p>
              <p>
                I&rsquo;m a user-first designer who believes that empathy is the only real shortcut to quality. I don&rsquo;t just design for screens; I design for the person on the other side of them.
              </p>

              <h3 className="pt-6 text-[1.6rem] md:text-[2.2rem] font-sans font-bold tracking-tight leading-[1.15] text-black">
                Design is Only as Good as the Sales it Drives
              </h3>
              <p>
                Out here in Texas, we don&rsquo;t much care for fluff. I&rsquo;ve built my career on a simple, stubborn conviction: If design doesn&rsquo;t drive sales, it isn&rsquo;t doing its job. But &ldquo;driving sales&rdquo; isn&rsquo;t about tricking people; it&rsquo;s about a deep, empathetic understanding of what a user actually needs.
              </p>
              <p>
                Whether I&rsquo;m lead-managing a global innovation framework for IBM Garage or crafting an annual report for Mainspring Schools, I start by getting into the head of the human using the product.
              </p>
              <p>
                I&rsquo;ve spent a decade and a half dual-wielding my skillsets. On one hand, I&rsquo;m a Right-Brained creator&mdash;passionate about UI/UX, visual storytelling, and high-end art direction. On the other, I&rsquo;m a Left-Brained analytical operator. I&rsquo;m a Certified Scrum Master who lives for Agile roadmaps, KPI tracking, and conversion metrics. I want the work to look incredible, but I want the NPS score and the business value to look even better.
              </p>

              <h3 className="pt-6 text-[1.6rem] md:text-[2.2rem] font-sans font-bold tracking-tight leading-[1.15] text-black">
                Pushing the Limits with AI
              </h3>
              <p>
                I&rsquo;ve always been an explorer, and right now, the frontier is AI. I don&rsquo;t just use AI; I experiment with it to see where it breaks. I&rsquo;m obsessed with pushing the limits of prompt engineering and content automation to shorten the distance between a wild idea and a live, high-performing product.
              </p>
              <p>
                For a project like Beast Putty, I used generative AI to catapult a campaign from zero to 34,000 views in 21 days. I&rsquo;m constantly looking for ways to blend old-school craft with new-school tech to help teams move at &ldquo;startup speed&rdquo; without losing the human touch.
              </p>

              <h3 className="pt-6 text-[1.6rem] md:text-[2.2rem] font-sans font-bold tracking-tight leading-[1.15] text-black">
                The Soul of a Maker (and a Huge Otaku)
              </h3>
              <p>
                When I&rsquo;m not in a Figma file or a JIRA backlog, I am likely deep in a rabbit hole of anime. I&rsquo;m a massive fan&mdash;so much so that I&rsquo;ve got a podcast dedicated to it. That same passion I have for world-building, character arcs, and the &ldquo;why&rdquo; behind a story is exactly what I bring to my design work.
              </p>
              <p>
                I think the best products are like the best anime: they have heart, they have purpose, and they make you feel something.
              </p>
              <p>
                As the great Dieter Rams said:
              </p>
              <blockquote className="pt-4 md:pt-6 md:w-[560px] md:self-end md:translate-x-1/2 text-left">
                <p className="font-serif font-extralight text-[2rem] md:text-[3.1rem] leading-[1.02] tracking-tight text-black/90 italic">
                  &ldquo;Good design is as little design as possible.&rdquo;
                </p>
                <p className="mt-3 text-[0.72rem] tracking-[0.14em] uppercase text-black/60">
                  Dieter Rams
                </p>
              </blockquote>
              <p>
                I live by that. I want to strip away the noise and get to the core of the problem. No ego, no agency fluff&mdash;just quality work that solves real problems for real people.
              </p>

              <h3 className="pt-6 text-[1.6rem] md:text-[2.2rem] font-sans font-bold tracking-tight leading-[1.15] text-black">
                Life in the Hill Country
              </h3>
              <p>
                When the screens finally go dark, you&rsquo;ll find me soaking up the Texas sun. I love hiking the Hill Country, slow-cooking a meal for the family, or heading out for some saltwater fishing (because freshwater fish just don&rsquo;t have that same grit). If I&rsquo;m not near the coast, I&rsquo;m probably on a tennis court or recording the next episode of the pod.
              </p>
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
          hoveredProject.thumbnailVideo ? (
            <video
              key={hoveredProject.id}
              src={hoveredProject.thumbnailVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={hoveredProject.thumbnail}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )
        )}
      </motion.div>

      {/* Client description tooltip — desktop only */}
      <AnimatePresence>
        {hoveredClient && (
          <motion.div
            key={hoveredClient.name}
            className="fixed pointer-events-none z-50 hidden md:block"
            style={{ left: cursor.x + 16, top: cursor.y + 18 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
          >
            <p className="text-xl md:text-2xl font-extralight tracking-tight text-white bg-black px-4 py-2 max-w-xs leading-snug">
              {hoveredClient.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
