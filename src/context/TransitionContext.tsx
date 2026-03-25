'use client'

import { createContext, useContext, useRef, useState, useCallback, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type TransitionPhase = 'idle' | 'covering' | 'covered' | 'uncovering'

interface TransitionContextValue {
  phase: TransitionPhase
  navigate: (href: string) => void
  onCoverComplete: () => void
  onUncoverComplete: () => void
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<TransitionPhase>('idle')
  const pendingHref = useRef<string | null>(null)
  const prevPathname = useRef(pathname)

  const navigate = useCallback((href: string) => {
    if (phase !== 'idle') return
    pendingHref.current = href
    setPhase('covering')
  }, [phase])

  const onCoverComplete = useCallback(() => {
    if (pendingHref.current) {
      router.push(pendingHref.current)
      pendingHref.current = null
    }
    // Give React two frames to mount the new page at opacity:0 before lifting the curtain
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('uncovering')
      })
    })
  }, [router])

  const onUncoverComplete = useCallback(() => {
    setPhase('idle')
  }, [])

  // Handle browser back/forward navigation (pathname changes while phase is idle)
  useEffect(() => {
    if (prevPathname.current !== pathname && phase === 'idle') {
      prevPathname.current = pathname
      setPhase('covering')
      // No pendingHref — page already swapped — just flash the curtain
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('uncovering')
        })
      })
    } else {
      prevPathname.current = pathname
    }
  }, [pathname, phase])

  return (
    <TransitionContext.Provider value={{ phase, navigate, onCoverComplete, onUncoverComplete }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function usePageTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('usePageTransition must be used within TransitionProvider')
  return ctx
}
