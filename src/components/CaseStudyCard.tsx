import Link from "next/link";
import type { Project } from "../data/projects";

interface CaseStudyCardProps {
  project: Project;
  index: number;
}

export function CaseStudyCard({ project, index }: CaseStudyCardProps) {
  return (
    <div className="group mb-12">
      <p className="text-[0.6rem] font-mono text-black/30 mb-2">
        [{String(index + 1).padStart(2, "0")}]
      </p>
      <Link
        href={`/projects/${project.id}`}
        className="block focus:outline-none"
      >
        <article className="flex flex-col">
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden bg-neutral-100 mb-5">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 scale-[1.02] group-hover:scale-100"
            referrerPolicy="no-referrer"
          />
        </div>

          {/* Content */}
          <div className="flex flex-col">

            {/* Title */}
            <h3 className="text-xl font-serif font-extralight tracking-tight text-black leading-tight mb-3 group-hover:text-black/50 transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-base text-black/60 font-light leading-relaxed">
              {project.description}
            </p>
          </div>
        </article>
      </Link>
    </div>
  );
}
