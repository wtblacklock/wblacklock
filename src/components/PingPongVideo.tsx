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

export function PingPongVideo({ src, className, fit = 'cover' }: PingPongVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
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
        // cover
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
        // Draw full frame — no cropping
        ctx.drawImage(video, 0, 0, vw, vh, 0, 0, cw, ch)
      } else {
        // Cover — crop to fill canvas
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
      if (timer) clearTimeout(timer)
    }
  }, [fit])

  const canvasStyle: React.CSSProperties = { display: 'block' }
  if (fit === 'cover') { canvasStyle.width = '100%'; canvasStyle.height = '100%' }
  else if (fit === 'contain-width') { canvasStyle.width = '100%' }
  else if (fit === 'contain-height') { canvasStyle.height = '100%' }

  return (
    <div className={className} style={fit === 'contain-height' ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : undefined}>
      <video ref={videoRef} src={src} muted playsInline preload="auto" style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  )
}
