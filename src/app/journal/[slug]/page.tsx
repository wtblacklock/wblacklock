'use client'

import { TransitionLink as Link } from "../../../components/TransitionLink"
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { motion } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { posts } from "../../../data/posts"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function JournalPost() {
  const params = useParams()
  const slug = params.slug as string
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const paragraphs = post.content.split("\n\n").filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="pt-12 md:pt-24"
    >
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors mb-16"
      >
        <ArrowLeft className="w-3 h-3" strokeWidth={2} /> Back to Journal
      </Link>

      <article className="max-w-2xl">
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[0.68rem] font-bold tracking-widest uppercase text-black/40">
              {post.category}
            </span>
            <span className="text-black/20">·</span>
            <span className="text-[0.68rem] font-mono text-black/30">
              {formatDate(post.date)}
            </span>
          </div>

          <h1 className="text-[2.77rem] md:text-[4.16rem] font-serif font-extralight tracking-tighter text-black leading-[0.95] mb-6">
            {post.title}
          </h1>

          <p className="text-xl md:text-2xl text-black/60 font-light leading-snug tracking-tight">
            {post.excerpt}
          </p>
        </header>

        <div className="border-t border-black/10 pt-12 space-y-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-lg md:text-xl font-light text-black/80 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </article>

      <div className="mt-24 pt-12 border-t border-black/10">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={2} /> Back to Journal
        </Link>
      </div>
    </motion.div>
  )
}
