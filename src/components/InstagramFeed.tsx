'use client'

import { useEffect, useState } from 'react'

interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

const HANDLE = 'beaststressputty'
const PROFILE_URL = `https://www.instagram.com/${HANDLE}/`

function Skeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-square bg-neutral-100 animate-pulse" />
      ))}
    </div>
  )
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json()
      })
      .then((data) => {
        if (data?.data) setPosts(data.data)
        else throw new Error('bad shape')
      })
      .catch(() => setError(true))
  }, [])

  return (
    <div className="space-y-6">
      {!posts && !error && <Skeleton />}

      {error && (
        <div className="border border-black/10 px-6 py-8 text-center space-y-3">
          <p className="text-sm font-light text-black/50">
            Live feed unavailable — configure{' '}
            <code className="text-xs bg-black/5 px-1 py-0.5">INSTAGRAM_ACCESS_TOKEN</code> to enable it.
          </p>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[0.65rem] font-bold tracking-widest uppercase text-black/50 hover:text-black transition-colors duration-200"
          >
            @{HANDLE} ↗
          </a>
        </div>
      )}

      {posts && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {posts.map((post) => {
            const imgSrc =
              post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url
            const caption = post.caption
              ? post.caption.split('\n')[0].slice(0, 80) +
                (post.caption.length > 80 ? '…' : '')
              : undefined

            return (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden bg-neutral-100"
                aria-label={caption ?? 'View on Instagram'}
              >
                <div className="aspect-square overflow-hidden">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={caption ?? ''}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-[0.65rem] font-light text-black/30 uppercase tracking-widest">
                        {post.media_type}
                      </span>
                    </div>
                  )}
                </div>
                {caption && (
                  <p className="text-[0.65rem] font-light text-black/40 mt-2 leading-snug tracking-wide truncate">
                    {caption}
                  </p>
                )}
              </a>
            )
          })}
        </div>
      )}

      <div className="pt-2">
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.65rem] font-bold tracking-widest uppercase text-black/35 hover:text-black transition-colors duration-200"
        >
          Follow @{HANDLE} on Instagram ↗
        </a>
      </div>
    </div>
  )
}
