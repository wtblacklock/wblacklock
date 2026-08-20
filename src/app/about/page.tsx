'use client'

import { motion } from "motion/react"

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="space-y-24 pt-12 md:pt-24"
    >

      <section className="max-w-[700px] mx-auto">
        <h1 className="text-[4.16rem] md:text-[8.88rem] font-serif font-extralight tracking-tighter text-black leading-[0.9] mb-8">
          About
        </h1>
        <div className="space-y-6 text-lg md:text-2xl text-black/70 leading-relaxed font-light text-left">
          <p>
            I&rsquo;m a designer, creative operator, and absolute systems nerd based in the heart of Austin, Texas. For over 15 years, I&rsquo;ve been building at the intersection of high-level strategy and deep-focus execution. If you&rsquo;re looking for a designer who just wants to make &ldquo;pretty brand guidelines&rdquo; to sit on a shelf, I&rsquo;m probably not your guy.
          </p>
          <p>
            I&rsquo;m a user-first designer who believes that empathy is the only real shortcut to quality. I don&rsquo;t just design for screens; I design for the person on the other side of them.
          </p>

          <h2 className="pt-6 text-[1.6rem] md:text-[2.2rem] font-sans font-bold tracking-tight leading-[1.15] text-black">
            Design is Only as Good as the Sales it Drives
          </h2>
          <p>
            Out here in Texas, we don&rsquo;t much care for fluff. I&rsquo;ve built my career on a simple, stubborn conviction: If design doesn&rsquo;t drive sales, it isn&rsquo;t doing its job. But driving sales isn&rsquo;t about tricking people; it&rsquo;s about a deep, empathetic understanding of what a user actually needs. Whether I&rsquo;m lead-managing a global innovation framework for IBM Garage or crafting an annual report for Mainspring Schools, I start by getting into the head of the human using the product.
          </p>
          <p>
            I&rsquo;ve spent a decade and a half dual-wielding my skillsets. On one hand, I&rsquo;m a Right-Brained creator&mdash;passionate about UI/UX, visual storytelling, and high-end art direction. On the other, I&rsquo;m a Left-Brained analytical operator. I&rsquo;m a Certified Scrum Master who lives for Agile roadmaps, KPI tracking, and conversion metrics. I want the work to look incredible, but I want the NPS score and the business value to look even better.
          </p>

          <h2 className="pt-6 text-[1.6rem] md:text-[2.2rem] font-sans font-bold tracking-tight leading-[1.15] text-black">
            Pushing the Limits with AI
          </h2>
          <p>
            I&rsquo;ve always been an explorer, and right now, the frontier is AI. I don&rsquo;t just use AI; I experiment with it to see where it breaks. I&rsquo;m obsessed with pushing the limits of prompt engineering and content automation to shorten the distance between a wild idea and a live, high-performing product. For a project like Beast Putty, I used generative AI to catapult a campaign from zero to 34,000 views in 21 days. I&rsquo;m constantly looking for ways to blend old-school craft with new-school tech to help teams move at startup speed without losing the human touch.
          </p>

          <h2 className="pt-6 text-[1.6rem] md:text-[2.2rem] font-sans font-bold tracking-tight leading-[1.15] text-black">
            The Soul of a Maker (and a Huge Otaku)
          </h2>
          <p>
            When I&rsquo;m not in a Figma file or a JIRA backlog, I am likely deep in a rabbit hole of anime. I&rsquo;m a massive fan&mdash;so much so that I&rsquo;ve got a podcast dedicated to it. That same passion I have for world-building, character arcs, and the why behind a story is exactly what I bring to my design work. I think the best products are like the best anime: they have heart, they have purpose, and they make you feel something.
          </p>
          <blockquote className="pt-4 md:pt-6 md:w-[560px] md:self-end md:translate-x-1/2 text-left">
            <p className="font-serif font-extralight text-[2rem] md:text-[3.1rem] leading-[1.02] tracking-tight text-black/90 italic">
              &ldquo;Good design is as little design as possible.&rdquo;
            </p>
            <p className="mt-3 text-[0.72rem] tracking-[0.14em] uppercase text-black/60">
              Dieter Rams
            </p>
          </blockquote>
          <p>
            I live by that. I want to strip away the noise and get to the core of the problem. No ego, no agency fluff&mdash;just quality work that solves real problems for real people.
          </p>

          <h2 className="pt-6 text-[1.6rem] md:text-[2.2rem] font-sans font-bold tracking-tight leading-[1.15] text-black">
            Life in the Hill Country
          </h2>
          <p>
            When the screens finally go dark, you&rsquo;ll find me soaking up the Texas sun. I love hiking the Hill Country, slow-cooking a meal for the family, or heading out for some saltwater fishing (because freshwater fish just don&rsquo;t have that same grit). If I&rsquo;m not near the coast, I&rsquo;m probably on a tennis court or recording the next episode of the pod.
          </p>
        </div>
      </section>

    </motion.div>
  )
}
