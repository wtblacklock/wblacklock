'use client'

import { useState, useEffect, useRef, ReactNode } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from 'next/navigation'
import { cn } from "../utils/cn"
import { motion, AnimatePresence } from "motion/react"
import { TransitionProvider } from "../context/TransitionContext"
import { TransitionOverlay } from "../components/TransitionOverlay"
import { TransitionLink } from "../components/TransitionLink"

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [brandPhase, setBrandPhase] = useState<'full' | 'initials-fade' | 'condensed'>(isHome ? 'full' : 'condensed')
  const lastScrollY = useRef(0)

  // Show white bg on nav when it's visible and user has scrolled past the top
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

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <TransitionProvider>
    <div className="min-h-screen bg-white text-black font-sans flex flex-col selection:bg-black/15 selection:text-black">
      <TransitionOverlay />
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 pointer-events-none pt-6 md:pt-8 transition-[transform,background-color] duration-300",
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
              <motion.span
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                W
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                illiam
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                {" "}
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                T
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                hames
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }}
                transition={{ duration: 0.35, delay: 0.18 }}
              >
                {" "}
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                B
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: brandPhase === 'initials-fade' ? 0.08 : 1 }}
                transition={{ duration: 0.35, delay: 0.25 }}
              >
                lacklock
              </motion.span>
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="max-w-[1850px] w-full mx-auto px-6 pt-6 md:pt-8 flex items-center justify-between shrink-0">
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
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[3.15rem] md:text-[4.72rem] font-medium tracking-tighter hover:text-black/50 transition-colors"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-[1850px] mx-auto px-[49px] pt-32 pb-16 md:pb-32">
        {children}
      </main>

      <footer className="py-16 mt-auto">
        <div className="max-w-[1850px] mx-auto px-[49px] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-[0.79rem] font-medium tracking-tight text-black/50">
          <p>&copy; {new Date().getFullYear()} William Blacklock. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-black transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
    </TransitionProvider>
  )
}
