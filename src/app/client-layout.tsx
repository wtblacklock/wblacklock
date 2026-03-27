'use client'

import { useState, useEffect, useRef, ReactNode } from "react"
import { Menu, X, ArrowUp, ArrowDown } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import { cn } from "../utils/cn"
import { motion, AnimatePresence } from "motion/react"
import { TransitionProvider } from "../context/TransitionContext"
import { TransitionOverlay } from "../components/TransitionOverlay"
import { TransitionLink } from "../components/TransitionLink"

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [brandPhase, setBrandPhase] = useState<'full' | 'initials-fade' | 'condensed'>(isHome ? 'full' : 'condensed')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [navWidth, setNavWidth] = useState(420)
  const [scaleOrigin, setScaleOrigin] = useState('center top')
  const lastScrollY = useRef(0)

  const showHeaderBg = isScrolled && !navHidden

  useEffect(() => {
    const update = () => setNavWidth(window.innerWidth < 768 ? Math.round(window.innerWidth * 0.82) : 420)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrolled = scrollY > 150
      setIsScrolled(scrolled)
      setShowBackToTop(scrollY > 300)
      if (scrollY > lastScrollY.current && scrollY > 80) setNavHidden(true)
      else if (scrollY < lastScrollY.current) setNavHidden(false)
      lastScrollY.current = scrollY
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isHome || prefersReducedMotion) { setBrandPhase('condensed'); return }
    setBrandPhase('full')
    const timer1 = setTimeout(() => setBrandPhase('initials-fade'), 800)
    const timer2 = setTimeout(() => setBrandPhase('condensed'), 1400)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [isHome, prefersReducedMotion, pathname])

  useEffect(() => {
    setMenuOpen(false)
    const hash = window.location.hash
    if (hash) {
      const id = hash.slice(1)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
        else window.scrollTo(0, 0)
      }, 150)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])


  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const openMenu = () => {
    setScaleOrigin(`center ${window.scrollY + window.innerHeight / 2}px`)
    setMenuOpen(true)
  }

  const scrollToContact = () => {
    const el = document.getElementById('footer')
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    else window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const scrollToSection = (id: string) => {
    setMenuOpen(false)
    if (isHome) {
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
      }, 400)
    } else {
      router.push(`/#${id}`)
    }
  }

  const navLinks: { label: string; type: 'page' | 'section'; href: string }[] = [
    { label: "Projects",     type: 'section', href: "work" },
    { label: "Case Studies", type: 'section', href: "case-studies" },
    { label: "Services",     type: 'section', href: "services" },
    { label: "Experience", type: 'section', href: "experience" },
    { label: "Clients",    type: 'section', href: "clients" },
    { label: "Recognition",type: 'section', href: "recognition" },
    { label: "About",      type: 'section', href: "about" },
    { label: "Contact",    type: 'section', href: "footer" },
  ]

  const ease = [0.65, 0, 0.35, 1] as const
  const duration = 0.55

  return (
    <TransitionProvider>
      {/* Outer — black background always present, shows behind scaled page */}
      <div className="relative overflow-x-hidden bg-black min-h-screen">

        {/* Page content — scales down to float over black when nav opens */}
        <motion.div
          className="min-h-screen bg-white text-black font-sans flex flex-col selection:bg-black/15 selection:text-black"
          animate={{
            scale: menuOpen ? 0.84 : 1,
            borderRadius: menuOpen ? '12px' : '0px',
          }}
          transition={{ duration, ease }}
          style={{ transformOrigin: scaleOrigin }}
        >
          <TransitionOverlay />

          {/* Header — plain element inside page wrapper; CSS transform handles hide/show without FM conflict */}
          <header className={cn(
            "fixed top-0 left-0 right-0 z-50 pointer-events-none pt-6 md:pt-8 border-b-[25px] border-transparent transition-[transform,background-color] duration-300",
            navHidden && "-translate-y-full",
            showHeaderBg && "bg-white"
          )}>
            <div className="max-w-[1850px] mx-auto px-[49px] flex items-center justify-between pointer-events-auto">
              <TransitionLink href="/" className="hover:opacity-70 transition-opacity relative inline-flex items-start w-[88px]" style={{ minHeight: "2.835rem" }}>
                <motion.span
                  initial={false}
                  animate={{ opacity: brandPhase === 'condensed' ? 0 : 1, y: brandPhase === 'condensed' ? -6 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 100, fontSize: "2.835rem", letterSpacing: "0.02em", lineHeight: 1, pointerEvents: 'none' }}
                  className="absolute left-0 top-0 whitespace-nowrap"
                  aria-hidden={brandPhase === 'condensed'}
                >
                  <motion.span initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>W</motion.span>
                  <motion.span initial={false} animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }} transition={{ duration: 0.35, delay: 0.05 }}>illiam</motion.span>
                  <motion.span initial={false} animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }} transition={{ duration: 0.35, delay: 0.08 }}>{" "}</motion.span>
                  <motion.span initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>T</motion.span>
                  <motion.span initial={false} animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }} transition={{ duration: 0.35, delay: 0.15 }}>hames</motion.span>
                  <motion.span initial={false} animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }} transition={{ duration: 0.35, delay: 0.18 }}>{" "}</motion.span>
                  <motion.span initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>B</motion.span>
                  <motion.span initial={false} animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }} transition={{ duration: 0.35, delay: 0.25 }}>lacklock</motion.span>
                </motion.span>
                <motion.span
                  initial={false}
                  animate={{ opacity: brandPhase === 'condensed' ? 1 : 0, y: brandPhase === 'condensed' ? 0 : 6, scale: brandPhase === 'condensed' ? 1 : 0.985 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 100, fontSize: "2.835rem", letterSpacing: "0.02em", lineHeight: 1 }}
                  aria-hidden={brandPhase !== 'condensed'}
                >
                  WTB
                </motion.span>
              </TransitionLink>

              <div className="flex items-center gap-4">
                {isHome && (
                  <button
                    onClick={scrollToContact}
                    className="hidden md:inline-flex items-center gap-3 pl-6 pr-3 h-11 rounded-full border border-black/30 text-sm font-medium text-black hover:border-black/60 transition-colors focus:outline-none"
                  >
                    Connect with me
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                      <ArrowDown className="w-3 h-3" strokeWidth={2} />
                    </span>
                  </button>
                )}
                <button
                  onClick={openMenu}
                  className="flex items-center justify-center w-10 h-10 focus:outline-none hover:opacity-60 transition-opacity"
                  aria-label="Open navigation"
                >
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 w-full max-w-[1850px] mx-auto px-[49px] pt-32 pb-16 md:pb-32">
            {children}
          </main>

          <footer id="footer" className="mt-auto bg-white text-black">
            <div className="max-w-[1850px] mx-auto px-[49px] py-12 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 border-y border-black/20">
                <p className="text-[1.75rem] md:text-[2.1rem] font-semibold tracking-tight py-8 md:py-10">Connect</p>
                <div className="md:col-span-2 py-8 md:py-10 md:pl-10 space-y-6">
                  <p className="text-lg md:text-[2rem] font-light leading-[1.3] max-w-5xl">
                    William Blacklock is a designer helping ambitious teams turn strategy into clear, high-impact work across product, brand, and intelligent creative systems.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/william-blacklock/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 pl-6 pr-3 h-11 rounded-full border border-black/30 text-sm font-medium text-black hover:border-black/60 transition-colors"
                  >
                    LinkedIn
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                      <ArrowUp className="w-3 h-3 rotate-45" strokeWidth={2} />
                    </span>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black/20">
                <p className="text-[1.75rem] md:text-[2.1rem] font-semibold tracking-tight py-8 md:py-10">New Business Inquiries</p>
                <div className="md:col-span-2 py-8 md:py-10 md:pl-10 flex items-center">
                  <a
                    href="mailto:wtblacklock@gmail.com"
                    className="inline-flex items-center gap-3 pl-6 pr-3 h-11 rounded-full border border-black/30 text-sm font-medium text-black hover:border-black/60 transition-colors"
                  >
                    wtblacklock@gmail.com
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                      <ArrowUp className="w-3 h-3 rotate-45" strokeWidth={2} />
                    </span>
                  </a>
                </div>
              </div>
              <div className="py-8 md:py-10 overflow-hidden">
                <motion.div
                  className="flex w-max whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 22, ease: "linear", repeat: Infinity }}
                >
                  <span className="text-[4.8rem] md:text-[11rem] lg:text-[16rem] font-bold tracking-[-0.04em] leading-[0.85] pr-20 md:pr-28">WILLIAM THAMES BLACKLOCK</span>
                  <span className="text-[4.8rem] md:text-[11rem] lg:text-[16rem] font-bold tracking-[-0.04em] leading-[0.85] pr-20 md:pr-28" aria-hidden="true">WILLIAM THAMES BLACKLOCK</span>
                </motion.div>
              </div>
            </div>
          </footer>
        </motion.div>

        {/* Dim overlay — click to close */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55]"
              onClick={() => setMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Nav panel — slides in from right */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: navWidth }}
              animate={{ x: 0 }}
              exit={{ x: navWidth }}
              transition={{ duration, ease }}
              className="fixed top-0 right-0 h-screen bg-black z-[60] flex flex-col pb-12"
              style={{ width: navWidth }}
            >
              {/* Nav links */}
              <div className="relative flex-1 flex flex-col justify-center px-10 md:px-14 gap-3 md:gap-5">
                {/* X button centered with nav text block */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-black border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors focus:outline-none"
                  aria-label="Close navigation"
                >
                  <X className="w-4 h-4 text-white" strokeWidth={1.5} />
                </button>
                {navLinks.map((link) =>
                  link.type === 'section' ? (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-[2.5rem] md:text-[3.15rem] font-medium tracking-tighter text-white hover:text-white/40 transition-colors leading-none focus:outline-none"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <TransitionLink
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[2.5rem] md:text-[3.15rem] font-medium tracking-tighter text-white hover:text-white/40 transition-colors leading-none"
                    >
                      {link.label}
                    </TransitionLink>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white border border-black hover:bg-white hover:text-black hover:border-black transition-colors focus:outline-none"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2} />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </TransitionProvider>
  )
}
