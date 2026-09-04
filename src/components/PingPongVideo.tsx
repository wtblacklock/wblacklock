'use client'

import { useRef, useEffect, useState } from 'react'

type FitMode =
  | 'cover'          // fill container, crop to fit (default)
  | 'contain-width'  // show full frame, height derived from container width
  | 'contain-height' // show full frame, width derived from container height

interface PingPongVideoProps {
  src: string
  className?: string
  fit?: FitMode
}

/**
 * Plays a clip forwards then backwards by seeking a hidden video and painting
 * each frame to a canvas.
 *
 * Two things this has to work around on iOS Safari:
 *
 *  1. A `display: none` video is never decoded, so `drawImage` silently paints
 *     nothing. The source video is therefore kept in the layout and hidden with
 *     opacity/clip instead.
 *  2. A video that has never played may have no frame to hand to the canvas, so
 *     playback is nudged once on load to prime the decoder.
 *
 * If the canvas is still blank shortly after load, the component gives up on the
 * effect and plays the video natively — a plain looping clip is far better than
 * an empty rectangle.
 */
export function PingPongVideo({ src, className, fit = 'cover' }: PingPongVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [fellBack, setFellBack] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const FPS = 24
    const STEP = 1 / FPS
    let direction = 1
    let active = true
    let timer: ReturnType<typeof setTimeout> | null = null
    let painted = false

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
      painted = true
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

    const start = () => {
      // Nudge playback so the decoder produces a frame; iOS will not hand a
      // never-played video to drawImage. Both outcomes are fine.
      video.play().then(() => video.pause()).catch(() => {})
      syncCanvasSize()
      draw()
      step()
    }

    // If nothing has reached the canvas by now, the effect is not going to work
    // on this device — play the clip natively instead of showing an empty box.
    const fallbackTimer = setTimeout(() => {
      if (!active) return
      let blank = !painted
      if (!blank && canvas.width && canvas.height) {
        try {
          const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data
          blank = true
          for (let i = 3; i < d.length; i += 4 * 211) {
            if (d[i] > 0) { blank = false; break }
          }
        } catch {
          blank = false // tainted canvas: assume it drew
        }
      }
      if (blank) {
        active = false
        if (timer) clearTimeout(timer)
        setFellBack(true)
      }
    }, 1800)

    video.addEventListener('seeked', onSeeked)
    if (video.readyState >= 2) start()
    else video.addEventListener('loadeddata', start, { once: true })

    return () => {
      active = false
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadeddata', start)
      if (timer) clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [fit])

  const canvasStyle: React.CSSProperties = { display: 'block' }
  if (fit === 'cover') { canvasStyle.width = '100%'; canvasStyle.height = '100%' }
  else if (fit === 'contain-width') { canvasStyle.width = '100%' }
  else if (fit === 'contain-height') { canvasStyle.height = '100%' }

  // Hidden, but still laid out and painted — `display: none` would stop iOS
  // decoding the video altogether.
  const sourceVideoStyle: React.CSSProperties = fellBack
    ? fit === 'contain-height'
      ? { display: 'block', height: '100%', width: 'auto' }
      : fit === 'contain-width'
        ? { display: 'block', width: '100%', height: 'auto' }
        : { display: 'block', width: '100%', height: '100%', objectFit: 'cover' }
    : {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
      }

  return (
    <div
      className={className}
      style={
        fit === 'contain-height'
          ? { display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }
          : { position: 'relative' }
      }
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop={fellBack}
        autoPlay={fellBack}
        playsInline
        preload="auto"
        aria-hidden="true"
        style={sourceVideoStyle}
      />
      {!fellBack && <canvas ref={canvasRef} style={canvasStyle} />}
    </div>
  )
}
