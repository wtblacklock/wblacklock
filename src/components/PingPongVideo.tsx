'use client'

import { useRef, useEffect } from 'react'

interface PingPongVideoProps {
  src: string
  className?: string
}

export function PingPongVideo({ src, className }: PingPongVideoProps) {
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
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w
        canvas.height = h
      }
    }

    const draw = () => {
      syncCanvasSize()
      const cw = canvas.width
      const ch = canvas.height
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!cw || !ch || !vw || !vh) return

      // Object-fit: cover — crop video to fill canvas
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

    const step = () => {
      if (!active) return

      let next = video.currentTime + direction * STEP

      if (next >= video.duration) {
        next = video.duration
        direction = -1
      } else if (next <= 0) {
        next = 0
        direction = 1
      }

      video.currentTime = next
    }

    // After each seek completes, draw the decoded frame then schedule the next step
    const onSeeked = () => {
      draw()
      if (active) {
        timer = setTimeout(step, 1000 / FPS)
      }
    }

    const start = () => {
      syncCanvasSize()
      draw()
      step()
    }

    video.addEventListener('seeked', onSeeked)

    if (video.readyState >= 2) {
      start()
    } else {
      video.addEventListener('loadeddata', start, { once: true })
    }

    return () => {
      active = false
      video.removeEventListener('seeked', onSeeked)
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
