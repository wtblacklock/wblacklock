'use client'

import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

interface Props {
  src: string
  videoClassName?: string
  containerClassName?: string
}

export function VideoWithSound({ src, videoClassName = 'w-full h-auto', containerClassName = 'w-full' }: Props) {
  const [muted, setMuted] = useState(true)

  return (
    <div className={`relative overflow-hidden bg-black ${containerClassName}`}>
      <video
        src={src}
        autoPlay
        loop
        muted={muted}
        playsInline
        className={videoClassName}
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-5 right-5 flex items-center gap-3 h-11 px-6 bg-black text-white text-[0.65rem] font-bold tracking-widest uppercase hover:bg-black/75 transition-colors duration-200"
      >
        {muted ? <VolumeX className="w-4 h-4" strokeWidth={1.5} /> : <Volume2 className="w-4 h-4" strokeWidth={1.5} />}
        {muted ? 'Sound off' : 'Sound on'}
      </button>
    </div>
  )
}
