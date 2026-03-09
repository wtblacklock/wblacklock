'use client'

import Link from "next/link"
import { motion } from "motion/react"

const capabilities = [
  "Product design and UX",
  "Marketing campaigns and creative direction",
  "AI-assisted websites and digital experiences",
  "Design systems and creative workflows",
  "Print and collateral",
  "Creative problem solving",
]

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-24 pt-12 md:pt-24"
    >

      {/* Hero */}
      <section className="max-w-5xl">
        <h1 className="text-[4.16rem] md:text-[8.88rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
          About
        </h1>
        <p className="text-2xl md:text-4xl text-black/60 leading-snug max-w-3xl font-light tracking-tight">
          I'm William Blacklock, a designer and creative operator based in Austin. I work across product design, campaigns, websites, and creative systems, helping teams move from ideas to something real.
        </p>
      </section>

      {/* Bio */}
      <section className="max-w-3xl space-y-8">
        <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">Background</h2>
        <div className="space-y-6 text-xl md:text-2xl text-black/80 leading-relaxed font-light">
          <p>
            I've spent the last 15+ years working across digital products, marketing campaigns, brand experiences, and creative operations. Some of that work has happened inside agencies and internal teams, and some of it has been independent. The common thread has always been the same: making useful, thoughtful work and helping teams get moving.
          </p>
          <p>
            I'm most interested in the space between thinking and making. That can mean shaping a product experience, building a website, developing campaign creative, or setting up systems that make good work easier to produce. I like projects that need both perspective and follow-through.
          </p>
          <p>
            Lately I've also been exploring how AI can support the creative process in practical ways. Not as a gimmick, and not as a replacement for good judgment, but as a tool for speeding up workflows, prototyping ideas faster, and helping teams get to clarity sooner.
          </p>
        </div>
      </section>

      {/* What I help with */}
      <section className="max-w-3xl space-y-8">
        <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">What I typically help with</h2>
        <ul className="flex flex-col border-t border-black/10">
          {capabilities.map((item) => (
            <li key={item} className="py-5 text-xl font-light text-black border-b border-black/10">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* How I work */}
      <section className="max-w-3xl space-y-8">
        <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">How I like to work</h2>
        <div className="space-y-6 text-xl md:text-2xl text-black/80 leading-relaxed font-light">
          <p>
            I tend to work best with small teams, founders, and organizations that want to move quickly without losing thoughtfulness along the way. Sometimes that means stepping into a project for a focused stretch. Sometimes it means helping shape the direction from the beginning. Often it means wearing a few hats and helping things get unstuck.
          </p>
          <p>
            I care about clarity, momentum, and making things that feel considered. I like collaboration, but I also like getting my hands dirty and making the work real.
          </p>
        </div>
      </section>

      {/* Personal note */}
      <section className="max-w-3xl space-y-8">
        <h2 className="text-xs font-bold tracking-widest uppercase text-black/50">A little outside of work</h2>
        <p className="text-xl md:text-2xl text-black/80 leading-relaxed font-light">
          I live in Austin with my family. Outside of work, I'm usually on a tennis court, experimenting with new tools, or working on side projects and ideas that let me keep learning.
        </p>
      </section>

      {/* Closing */}
      <section className="max-w-3xl pb-12">
        <p className="text-xl md:text-2xl text-black/60 leading-relaxed font-light mb-8">
          If you'd like to work together or talk through a project, feel free to reach out.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-14 px-10 bg-black text-white text-[0.79rem] font-medium tracking-widest uppercase hover:bg-black/80 transition-colors"
        >
          Contact
        </Link>
      </section>

    </motion.div>
  )
}
