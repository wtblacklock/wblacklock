'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface BrandAnimationContextType {
  showBrand: boolean
  revealBrand: () => void
}

const BrandAnimationContext = createContext<BrandAnimationContextType>({
  showBrand: true,
  revealBrand: () => {},
})

export function useBrandAnimation() {
  return useContext(BrandAnimationContext)
}

export function BrandAnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [showBrand, setShowBrand] = useState(!isHome)

  // When navigating away from home, reset brand visibility
  useEffect(() => {
    if (!isHome) {
      setShowBrand(true)
    } else {
      // On home page, start with brand hidden
      setShowBrand(false)
    }
  }, [isHome])

  const revealBrand = () => {
    setShowBrand(true)
  }

  return (
    <BrandAnimationContext.Provider value={{ showBrand, revealBrand }}>
      {children}
    </BrandAnimationContext.Provider>
  )
}
