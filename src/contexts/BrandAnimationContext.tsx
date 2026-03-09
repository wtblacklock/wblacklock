'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface BrandAnimationContextType {
  showBrand: boolean
  revealBrand: () => void
  hasAnimationPlayed: boolean
}

const BrandAnimationContext = createContext<BrandAnimationContextType>({
  showBrand: true,
  revealBrand: () => {},
  hasAnimationPlayed: false,
})

export function useBrandAnimation() {
  return useContext(BrandAnimationContext)
}

export function BrandAnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false)
  const [showBrand, setShowBrand] = useState(!isHome)

  // Check if animation has played before
  useEffect(() => {
    const played = localStorage.getItem('wtb-hero-animation-played') === 'true'
    setHasAnimationPlayed(played)
    
    // If animation has played, always show brand
    if (played) {
      setShowBrand(true)
    }
  }, [])

  // When navigating away from home, reset brand visibility
  useEffect(() => {
    if (!isHome) {
      setShowBrand(true)
    } else {
      // On home page, start with brand hidden only if animation hasn't played
      if (!hasAnimationPlayed) {
        setShowBrand(false)
      } else {
        setShowBrand(true)
      }
    }
  }, [isHome, hasAnimationPlayed])

  const revealBrand = () => {
    setShowBrand(true)
    localStorage.setItem('wtb-hero-animation-played', 'true')
    setHasAnimationPlayed(true)
  }

  return (
    <BrandAnimationContext.Provider value={{ showBrand, revealBrand, hasAnimationPlayed }}>
      {children}
    </BrandAnimationContext.Provider>
  )
}
