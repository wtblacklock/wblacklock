'use client'

import { motion } from "motion/react"
import React, { useState } from "react"

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setTimeout(() => {
      setStatus("success")
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-16 md:space-y-24 pt-12 md:pt-24"
    >
      {/* Hero */}
      <section className="max-w-5xl">
        <h1 className="text-[4.16rem] md:text-[8.88rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
          Contact
        </h1>
        <p className="text-2xl md:text-4xl text-black/60 leading-relaxed max-w-3xl font-light tracking-tight">
          If you'd like to work together, talk through a project, or just say hello, feel free to reach out.
        </p>
      </section>

      <div className="max-w-2xl space-y-16 md:space-y-20">
        {/* Short message */}
        <p className="text-xl md:text-2xl text-black/70 font-light leading-relaxed">
          I work across product design, campaigns, websites, and creative systems. If you're building something, I'd be glad to hear about it.
        </p>

        {/* Email */}
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-black/50 mb-4">Email</h2>
          <a
            href="mailto:hello@williamblacklock.com"
            className="text-2xl md:text-3xl font-light text-black hover:text-black/50 transition-colors tracking-tight"
          >
            hello@williamblacklock.com
          </a>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-black/50 mb-10">Or send a message</h2>

          {status === "success" ? (
            <div className="py-16 border-t border-black/10">
              <p className="text-[2.22rem] md:text-[3.33rem] font-serif font-extralight tracking-tighter text-black leading-tight mb-4">
                Message sent.
              </p>
              <p className="text-xl text-black/50 font-light">
                Thanks for reaching out. I'll be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-black/50">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full h-14 px-5 bg-neutral-100 border border-transparent focus:bg-white focus:border-black transition-all outline-none text-base font-light"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-black/50">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full h-14 px-5 bg-neutral-100 border border-transparent focus:bg-white focus:border-black transition-all outline-none text-base font-light"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-black/50">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full p-5 bg-neutral-100 border border-transparent focus:bg-white focus:border-black transition-all outline-none resize-none text-base font-light"
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center h-14 px-10 bg-black text-white text-[0.79rem] font-medium tracking-widest uppercase hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>

        {/* Closing */}
        <p className="text-sm font-light text-black/40 tracking-wide border-t border-black/10 pt-10">
          Based in Austin, working with teams anywhere.
        </p>
      </div>
    </motion.div>
  )
}
