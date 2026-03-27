import type { CaseStudyData } from '../data/caseStudies'
import type { Project } from '../data/projects'
import { WorkShowcase } from './WorkShowcase'
import { InstagramFeed } from './InstagramFeed'
import { VideoWithSound } from './VideoWithSound'

interface CaseStudyDetailProps {
  data: CaseStudyData
  project: Project
}

export function CaseStudyDetail({ data, project }: CaseStudyDetailProps) {
  return (
    <div className="mt-20 md:mt-28">

      {/* Sections */}
      <div>
        {data.sections.map((section, index) => {
          const prev = index > 0 ? data.sections[index - 1] : null
          const marginClass = index === 0
            ? ''
            : (section.id === 'concept-testing' || section.id === 'execution')
              ? 'mt-40 md:mt-52'
              : prev?.image && section.image
                ? 'mt-40 md:mt-52'
                : 'mt-28 md:mt-36'
          return (
          <div key={section.id} id={section.id} className={marginClass}>

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

            {/* Full-width autoplay video above section content */}
            {section.video && (
              <div className="mb-12 md:mb-16">
                <VideoWithSound src={section.video} />
              </div>
            )}

            {/* Side-by-side image grid above section content */}
            {section.imageGrid && (
              <div className={`grid gap-3 md:gap-4 mb-12 md:mb-16 ${section.imageGrid.length === 1 ? 'grid-cols-1' : section.imageGrid.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {section.imageGrid.map((src, i) => (
                  <div key={i} className="w-full aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img src={src} alt={`${section.heading} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Multi-video grid above section content */}
            {section.videoGrid && (
              <div className={`grid gap-3 md:gap-4 mb-12 md:mb-16 ${section.videoGrid.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {section.videoGrid.map((src, i) => (
                  <VideoWithSound
                    key={i}
                    src={src}
                    containerClassName="w-full aspect-[9/16]"
                    videoClassName="w-full h-full object-cover"
                  />
                ))}
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
                  <p key={i} className={`font-light leading-relaxed ${section.id === 'impact' ? 'text-xl md:text-[1.6rem] text-black/70' : 'text-base md:text-lg text-black/70'}`}>
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
                        <p className="text-5xl md:text-6xl font-serif font-extralight tracking-tight text-black mb-1.5">
                          {metric.value}
                        </p>
                        <p className="text-xs font-light text-black/45 leading-snug">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.quotes && (
                  <div className="flex flex-col gap-3 mt-4">
                    {section.quotes.map((quote, i) => (
                      <div key={i} className="px-8 py-8" style={{ backgroundColor: '#0043CE' }}>
                        <p className="text-xl md:text-2xl font-serif font-extralight text-white leading-snug tracking-tight mb-4">
                          &ldquo;{quote.text}&rdquo;
                        </p>
                        <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white/60">
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
                        className="text-lg font-light text-black/55 border border-black/12 px-4 py-2"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {section.gallery && section.id !== 'instagram' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-2">
                    {section.gallery.map((item, i) => (
                      <div key={i} className="overflow-hidden bg-neutral-100">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.src}
                            alt={item.caption || ''}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {item.caption && (
                          <p className="text-[0.65rem] font-light text-black/40 mt-2 leading-snug tracking-wide">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.id === 'instagram' && <InstagramFeed />}

              </div>
            </div>
          </div>
          )
        })}
      </div>

      {/* Work Showcase — IBM Garage only */}
      {data.projectId === 'ibm-garage' && <WorkShowcase />}
    </div>
  )
}
