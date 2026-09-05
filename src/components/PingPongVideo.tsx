'use client'

import { useRef, useEffect } from 'react'

type FitMode =
  | 'cover'          // fill container, crop to fit (default)
  | 'contain-width'  // show full frame, height derived from container width
  | 'contain-height' // show full frame, width derived from container height

interface PingPongVideoProps {
  src: string
  className?: string
  fit?: FitMode
}

const MOBILE_QUERY = '(max-width: 767px)'

/**
 * Desktop plays the clip forwards then backwards by seeking a hidden video and
 * painting each frame to a canvas.
 *
 * That technique does not work on iOS Safari, which will not decode a video it
 * is not showing — `drawImage` silently paints nothing and the result is an
 * empty box. Rather than fight it, phones get a plain looping `<video>`, which
 * is the one thing mobile browsers reliably play inline.
 *
 * Which one is used is decided by CSS, not by measuring the viewport in JS, so
 * there is no hydration mismatch and nothing flashes on first paint.
 */
export function PingPongVideo({ src, className, fit = 'cover' }: PingPongVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)

  // Phones: make sure the clip is actually rolling. The `autoPlay` attribute
  // alone is not always honoured, and a muted inline video is allowed to start
  // without a gesture.
  useEffect(() => {
    const v = mobileVideoRef.current
    if (!v) return
    const tryPlay = () => { v.play().catch(() => {}) }
    tryPlay()
    v.addEventListener('loadeddata', tryPlay, { once: true })
    return () => v.removeEventListener('loadeddata', tryPlay)
  }, [])

  useEffect(() => {
    // The canvas is display:none on phones, so there is nothing to paint.
    if (typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches) return

    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const FPS = 24
    const STEP = 1 / FPS
    let direction = 1
    let active = true
    let timer: ReturnType<typeof setTimeout> | null = null

    const syncCanvasSize = () => {
      const vw = video.videoWidth
      const vh = video.videoHeight

      if (fit === 'contain-width') {
        const w = canvas.offsetWidth
        if (!w || !vw || !vh) return
        const h = Math.round(w * (vh / vw))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          canvas.style.height = `${h}px`
        }
      } else if (fit === 'contain-height') {
        const h = canvas.offsetHeight
        if (!h || !vw || !vh) return
        const w = Math.round(h * (vw / vh))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          canvas.style.width = `${w}px`
        }
      } else {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
          canvas.width = w
          canvas.height = h
        }
      }
    }

    const draw = () => {
      syncCanvasSize()
      const cw = canvas.width
      const ch = canvas.height
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!cw || !ch || !vw || !vh) return

      if (fit === 'contain-width' || fit === 'contain-height') {
        ctx.drawImage(video, 0, 0, vw, vh, 0, 0, cw, ch)
      } else {
        const canvasAspect = cw / ch
        const videoAspect = vw / vh
        let sx = 0, sy = 0, sw = vw, sh = vh
        if (videoAspect > canvasAspect) {
          sw = vh * canvasAspect
          sx = (vw - sw) / 2
        } else {
          sh = vw / canvasAspect
          sy = (vh - sh) / 2
        }
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch)
      }
    }

    const step = () => {
      if (!active) return
      let next = video.currentTime + direction * STEP
      if (next >= video.duration) { next = video.duration; direction = -1 }
      else if (next <= 0) { next = 0; direction = 1 }
      video.currentTime = next
    }

    const onSeeked = () => {
      draw()
      if (active) timer = setTimeout(step, 1000 / FPS)
    }

    const start = () => { syncCanvasSize(); draw(); step() }

    video.addEventListener('seeked', onSeeked)
    if (video.readyState >= 2) start()
    else video.addEventListener('loadeddata', start, { once: true })

    return () => {
      active = false
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadeddata', start)
      if (timer) clearTimeout(timer)
    }
  }, [fit])

  const canvasStyle: React.CSSProperties = {}
  if (fit === 'cover') { canvasStyle.width = '100%'; canvasStyle.height = '100%' }
  else if (fit === 'contain-width') { canvasStyle.width = '100%' }
  else if (fit === 'contain-height') { canvasStyle.height = '100%' }

  // The canvas path draws wider than the viewport and lets the section crop it.
  // `width: auto` here would instead letterbox inside the container, so the
  // phone video fills and crops to match the framing on larger screens.
  const visibleVideoStyle: React.CSSProperties =
    fit === 'contain-width'
      ? { width: '100%', height: 'auto' }
      : { width: '100%', height: '100%', objectFit: 'cover' }

  const wrapperStyle: React.CSSProperties =
    fit === 'contain-height'
      ? { display: 'flex', alignItems: 'center', justifyContent: 'center' }
      : {}

  return (
    <div className={className} style={wrapperStyle}>
      {/* Phones — plain looping playback */}
      <video
        ref={mobileVideoRef}
        className="block md:hidden"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={visibleVideoStyle}
      />

      {/* md and up — frame source for the canvas below */}
      <video
        ref={videoRef}
        className="hidden md:block"
        src={src}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
      />
      <canvas ref={canvasRef} className="hidden md:block" style={canvasStyle} />
    </div>
  )
}
