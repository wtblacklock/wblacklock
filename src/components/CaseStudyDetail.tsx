import type { CaseStudyData } from '../data/caseStudies'
import type { Project } from '../data/projects'

interface CaseStudyDetailProps {
  data: CaseStudyData
  project: Project
}

export function CaseStudyDetail({ data, project }: CaseStudyDetailProps) {
  return (
    <div className="mt-20 md:mt-28">

      {/* Sections */}
      <div className="space-y-20 md:space-y-28">
        {data.sections.map((section) => (
          <div key={section.id}>

            {/* Full-width section image */}
            {section.image && (
              <div className="w-full aspect-[16/9] overflow-hidden bg-neutral-100 mb-12 md:mb-16">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Section: heading + content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">

              {/* Heading */}
              <div className="md:col-span-3">
                <h2 className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40 md:sticky md:top-24">
                  {section.heading}
                </h2>
              </div>

              {/* Content */}
              <div className="md:col-span-9 space-y-6">

                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="text-base md:text-lg text-black/70 font-light leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.highlight && (
                  <blockquote className="border-l-2 border-black/20 pl-6 my-8">
                    <p className="text-xl md:text-2xl font-serif font-extralight text-black/80 leading-snug tracking-tight italic">
                      {section.highlight}
                    </p>
                  </blockquote>
                )}

                {section.list && (
                  <ul className="space-y-3 mt-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base font-light text-black/70 leading-relaxed">
                        <span className="mt-[0.6rem] w-1 h-1 rounded-full bg-black/25 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.trailingParagraph && (
                  <p className="text-base md:text-lg text-black/70 font-light leading-relaxed">
                    {section.trailingParagraph}
                  </p>
                )}

                {section.personas && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-4">
                    {section.personas.map((persona) => (
                      <div key={persona.name} className="border-t border-black/10 pt-4">
                        <p className="text-sm font-bold tracking-wide text-black mb-2">{persona.name}</p>
                        <p className="text-sm font-light text-black/55 leading-relaxed">{persona.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.metrics && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-4">
                    {section.metrics.map((metric) => (
                      <div key={metric.label} className="border-t border-black/10 pt-5">
                        <p className="text-3xl md:text-4xl font-serif font-extralight tracking-tight text-black mb-1.5">
                          {metric.value}
                        </p>
                        <p className="text-xs font-light text-black/45 leading-snug">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.quotes && (
                  <div className="space-y-10 mt-4">
                    {section.quotes.map((quote, i) => (
                      <div key={i} className="border-t border-black/10 pt-6">
                        <p className="text-xl md:text-2xl font-serif font-extralight text-black/80 leading-snug tracking-tight mb-4">
                          &ldquo;{quote.text}&rdquo;
                        </p>
                        <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/35">
                          — {quote.attribution}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.tools && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {section.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs font-light text-black/55 border border-black/12 px-3 py-1.5"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
