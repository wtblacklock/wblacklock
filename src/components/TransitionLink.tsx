'use client'

import { MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePageTransition } from '../context/TransitionContext'

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onMouseMove?: (e: React.MouseEvent) => void
  style?: React.CSSProperties
  [key: string]: unknown
}

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  style,
  ...rest
}: TransitionLinkProps) {
  const { navigate, phase } = usePageTransition()
  const pathname = usePathname()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let native Link handle: external, mailto, anchors, modifier keys, same page, busy
    if (
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('#') ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      href === pathname ||
      phase !== 'idle'
    ) {
      onClick?.()
      return
    }

    e.preventDefault()
    onClick?.()
    navigate(href)
  }

  return (
    <Link
      href={href}
      className={className}
      style={style}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      {...rest}
    >
      {children}
    </Link>
  )
}
