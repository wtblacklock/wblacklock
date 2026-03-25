'use client'

import { useState, useEffect, useRef, ReactNode } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from 'next/navigation'
import { cn } from "../utils/cn"
import { motion, AnimatePresence } from "motion/react"
import { TransitionProvider } from "../context/TransitionContext"
import { TransitionOverlay } from "../components/TransitionOverlay"
import { TransitionLink } from "../components/TransitionLink"

const NAV_WIDTH = 420

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [brandPhase, setBrandPhase] = useState<'full' | 'initials-fade' | 'condensed'>(isHome ? 'full' : 'condensed')
  const lastScrollY = useRef(0)

  const showHeaderBg = isScrolled && !navHidden

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrolled = scrollY > 150
      setIsScrolled(scrolled)
      if (scrolled) setMenuOpen(false)

      if (scrollY > lastScrollY.current && scrollY > 80) {
        setNavHidden(true)
      } else if (scrollY < lastScrollY.current) {
        setNavHidden(false)
      }
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
    if (!isHome || prefersReducedMotion) {
      setBrandPhase('condensed')
      return
    }
    setBrandPhase('full')
    const timer1 = setTimeout(() => setBrandPhase('initials-fade'), 800)
    const timer2 = setTimeout(() => setBrandPhase('condensed'), 1400)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [isHome, prefersReducedMotion, pathname])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const ease = [0.65, 0, 0.35, 1] as const
  const duration = 0.55

  return (
    <TransitionProvider>
      {/* Outer clip container — prevents horizontal scrollbar during animation */}
      <div className="relative overflow-x-hidden">

        {/* Page content — slides left when nav opens */}
        <motion.div
          className="min-h-screen bg-white text-black font-sans flex flex-col selection:bg-black/15 selection:text-black"
          animate={{ x: menuOpen ? -NAV_WIDTH : 0 }}
          transition={{ duration, ease }}
        >
          <TransitionOverlay />

          <header className={cn(
            "fixed top-0 left-0 right-0 z-50 pointer-events-none pt-6 md:pt-8 border-b-[25px] border-white transition-[transform,background-color] duration-300",
            navHidden && "-translate-y-full",
            showHeaderBg && "bg-white"
          )}>
            <div className="max-w-[1850px] mx-auto px-[49px] flex items-center justify-between pointer-events-auto">
              <TransitionLink href="/" className="hover:opacity-70 transition-opacity relative inline-flex items-start w-[88px]" style={{ minHeight: "2.835rem" }}>
                <motion.span
                  initial={false}
                  animate={{ opacity: brandPhase === 'condensed' ? 0 : 1, y: brandPhase === 'condensed' ? -6 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 100,
                    fontSize: "2.835rem",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
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
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 100,
                    fontSize: "2.835rem",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                  aria-hidden={brandPhase !== 'condensed'}
                >
                  WTB
                </motion.span>
              </TransitionLink>

              <div className="flex items-center">
                <button
                  onClick={() => setMenuOpen(true)}
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

          <footer className="mt-auto bg-white text-black">
            <div className="max-w-[1850px] mx-auto px-[49px] py-12 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 py-8 border-y border-black/20">
                <p className="text-[1.75rem] md:text-[2.1rem] font-semibold tracking-tight">New Business Inquiries</p>
                <p className="text-base md:text-xl font-medium">Email</p>
                <a href="mailto:hello@williamblacklock.com" className="text-base md:text-xl font-medium hover:opacity-70 transition-opacity break-all">
                  hello@williamblacklock.com
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 py-10 border-b border-black/20">
                <p className="text-[1.75rem] md:text-[2.1rem] font-semibold tracking-tight">About</p>
                <p className="md:col-span-2 text-lg md:text-[2rem] font-light leading-[1.3] max-w-5xl">
                  William Blacklock is a designer helping ambitious teams turn strategy into clear, high-impact work across product, brand, and intelligent creative systems.
                </p>
              </div>

              <div className="py-8 md:py-10 overflow-hidden">
                <motion.div
                  className="flex w-max whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 22, ease: "linear", repeat: Infinity }}
                >
                  <span className="text-[4.8rem] md:text-[11rem] lg:text-[16rem] font-bold tracking-[-0.04em] leading-[0.85] pr-20 md:pr-28">
                    WILLIAM THAMES BLACKLOCK
                  </span>
                  <span className="text-[4.8rem] md:text-[11rem] lg:text-[16rem] font-bold tracking-[-0.04em] leading-[0.85] pr-20 md:pr-28" aria-hidden="true">
                    WILLIAM THAMES BLACKLOCK
                  </span>
                </motion.div>
              </div>
            </div>
          </footer>
        </motion.div>

        {/* Nav panel — slides in from right, outside the page wrapper */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: NAV_WIDTH }}
              animate={{ x: 0 }}
              exit={{ x: NAV_WIDTH }}
              transition={{ duration, ease }}
              className="fixed top-0 right-0 h-screen bg-white z-[60] flex flex-col pt-6 md:pt-8 pb-12"
              style={{ width: NAV_WIDTH }}
            >
              {/* Top bar: logo + close */}
              <div className="px-12 flex items-center justify-between shrink-0 mb-4">
                <TransitionLink
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 100, fontSize: "2.835rem", letterSpacing: "0.02em", lineHeight: 1 }}
                >
                  WTB
                </TransitionLink>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 focus:outline-none hover:opacity-60 transition-opacity"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center px-12 gap-6">
                {navLinks.map((link) => (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[3.15rem] font-medium tracking-tighter hover:text-black/50 transition-colors leading-none"
                  >
                    {link.label}
                  </TransitionLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop — clicking outside closes nav */}
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

      </div>
    </TransitionProvider>
  )
}
