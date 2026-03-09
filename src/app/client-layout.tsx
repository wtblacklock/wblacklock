'use client'

import { useState, useEffect, ReactNode } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "../utils/cn"
import { motion, AnimatePresence } from "motion/react"
import { useBrandAnimation } from "../contexts/BrandAnimationContext"

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const { showBrand } = useBrandAnimation()

  const isDesktop = windowWidth >= 768

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 150
      setIsScrolled(scrolled)
      if (scrolled) setMenuOpen(false)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  const showDesktopNav = isDesktop && (!isScrolled || menuOpen)

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col selection:bg-black selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-6 md:pt-8">
        <div className="max-w-[1850px] mx-auto px-6 flex items-center justify-between pointer-events-auto">
          <Link href="/" className="hover:opacity-70 transition-opacity relative inline-block" style={{ minHeight: "2.835rem" }}>
            <AnimatePresence>
              {showBrand && (
                <motion.span
                  key="brand"
                  data-nav-brand
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 100,
                    fontSize: "2.835rem",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                >
                  WTB
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <div className="flex items-center">
            <div className="flex items-center h-12 md:h-14">
              <AnimatePresence mode="wait">
                {showDesktopNav ? (
                  <motion.nav
                    key="inline-nav"
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex items-center text-[1.18rem] md:text-[1.31rem] font-normal tracking-wider transition-all duration-300",
                      menuOpen
                        ? "gap-6 md:gap-8 bg-white rounded-full shadow-xl border border-black/10 px-6 md:px-8 h-12 md:h-14"
                        : "gap-6 md:gap-8 h-12 md:h-14"
                    )}
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "transition-colors hover:text-black/50",
                          pathname === link.href ? "text-black" : "text-black/70"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    {menuOpen && (
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="text-black/40 hover:text-black transition-colors ml-1"
                        aria-label="Close navigation"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    )}
                  </motion.nav>
                ) : (
                  <motion.button
                    key="hamburger"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setMenuOpen(true)}
                    className="flex flex-col justify-center items-center gap-1.5 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black focus:outline-none group shadow-lg hover:scale-105 transition-all"
                  >
                    <span className="w-4 md:w-5 h-[2px] bg-white block transition-transform group-hover:translate-y-[1px]"></span>
                    <span className="w-4 md:w-5 h-[2px] bg-white block transition-transform group-hover:-translate-y-[1px]"></span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {!isDesktop && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="max-w-[1850px] w-full mx-auto px-6 pt-6 md:pt-8 flex items-center justify-between shrink-0">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 100, fontSize: "2.835rem", letterSpacing: "0.02em", lineHeight: 1 }}
              >
                WTB
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex flex-col justify-center items-center w-12 h-12 rounded-full bg-black focus:outline-none group shadow-lg hover:scale-105 transition-all relative"
              >
                <span className="w-5 h-[2px] bg-white block absolute rotate-45"></span>
                <span className="w-5 h-[2px] bg-white block absolute -rotate-45"></span>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[3.15rem] md:text-[4.72rem] font-medium tracking-tighter hover:text-black/50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-[1850px] mx-auto px-6 pt-32 pb-16 md:pb-32">
        {children}
      </main>

      <footer className="py-16 mt-auto">
        <div className="max-w-[1850px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-[0.79rem] font-medium tracking-tight text-black/50">
          <p>&copy; {new Date().getFullYear()} William Blacklock. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-black transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
