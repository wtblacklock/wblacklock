#!/usr/bin/env node
/**
 * Regenerates src/data/imageRatios.json — a map of every asset in public/images
 * to its true width/height ratio.
 *
 * The project detail pages use this to frame images and video at their real
 * proportions. Anything missing from the map falls back to a 4:3 frame and gets
 * cropped, so run this after adding media:
 *
 *   npm run ratios
 *
 * Dimensions are read straight from file headers; no image libraries involved.
 */
import { readdirSync, statSync, readFileSync, writeFileSync, openSync, readSync, closeSync } from 'node:fs'
import { join, relative, extname } from 'node:path'

const PUBLIC_DIR = 'public'
const MEDIA_DIR = join(PUBLIC_DIR, 'images')
const OUT = join('src', 'data', 'imageRatios.json')

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif'])
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm'])

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function head(file, bytes) {
  const fd = openSync(file, 'r')
  const buf = Buffer.alloc(bytes)
  const read = readSync(fd, buf, 0, bytes, 0)
  closeSync(fd)
  return buf.subarray(0, read)
}

function pngSize(b) {
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }
}

function gifSize(b) {
  if (b.length < 10 || b.subarray(0, 3).toString('latin1') !== 'GIF') return null
  return { w: b.readUInt16LE(6), h: b.readUInt16LE(8) }
}

function jpegSize(b) {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null
  let i = 2
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) { i++; continue }
    const marker = b[i + 1]
    // SOF0..SOF15, excluding the non-frame markers DHT/JPG/DAC
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) }
    }
    i += 2 + b.readUInt16BE(i + 2)
  }
  return null
}

function webpSize(b) {
  if (b.length < 30 || b.subarray(0, 4).toString('latin1') !== 'RIFF') return null
  const fmt = b.subarray(12, 16).toString('latin1')
  if (fmt === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff }
  if (fmt === 'VP8L') {
    const n = b.readUInt32LE(21)
    return { w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 }
  }
  if (fmt === 'VP8X') return { w: (b.readUIntLE(24, 3) & 0xffffff) + 1, h: (b.readUIntLE(27, 3) & 0xffffff) + 1 }
  return null
}

/** Width/height live in the visual sample entry of an MP4/MOV. */
function videoSize(b) {
  for (const tag of ['avc1', 'hvc1', 'hev1', 'mp4v', 'av01']) {
    let i = b.indexOf(tag, 0, 'latin1')
    while (i !== -1) {
      const w = b.readUInt16BE(i + 28)
      const h = b.readUInt16BE(i + 30)
      if (w >= 16 && w <= 8192 && h >= 16 && h <= 8192) return { w, h }
      i = b.indexOf(tag, i + 1, 'latin1')
    }
  }
  return null
}

const ratios = {}
const skipped = []

for (const file of walk(MEDIA_DIR)) {
  const ext = extname(file).toLowerCase()
  const isImage = IMAGE_EXT.has(ext)
  const isVideo = VIDEO_EXT.has(ext)
  if (!isImage && !isVideo) continue

  let size = null
  if (isImage) {
    const b = head(file, 65536)
    size = pngSize(b) || gifSize(b) || webpSize(b) || jpegSize(b)
  } else {
    size = videoSize(head(file, 6_000_000))
  }

  const key = '/' + relative(PUBLIC_DIR, file).split(/[\\/]/).join('/')
  if (size && size.w && size.h) ratios[key] = Math.round((size.w / size.h) * 10000) / 10000
  else skipped.push(key)
}

const sorted = Object.fromEntries(Object.keys(ratios).sort().map((k) => [k, ratios[k]]))
const previous = (() => {
  try { return JSON.parse(readFileSync(OUT, 'utf8')) } catch { return {} }
})()

writeFileSync(OUT, JSON.stringify(sorted, null, 0) + '\n')

const added = Object.keys(sorted).filter((k) => !(k in previous))
console.log(`Wrote ${OUT} — ${Object.keys(sorted).length} assets (${added.length} new).`)
if (skipped.length) {
  console.warn(`\nCould not read dimensions (these will fall back to a 4:3 frame):`)
  for (const s of skipped) console.warn('  ' + s)
  process.exitCode = 1
}
