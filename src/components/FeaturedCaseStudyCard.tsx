import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Project } from "../data/projects";

interface FeaturedCaseStudyCardProps {
  project: Project;
}

export function FeaturedCaseStudyCard({ project }: FeaturedCaseStudyCardProps) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block focus:outline-none"
    >
      <article className="flex flex-col h-full">
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 scale-[1.02] group-hover:scale-100"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Label and Category */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.65rem] font-bold tracking-widest uppercase text-black/30">
              Case Study
            </span>
            <span className="text-[0.65rem] font-bold tracking-widest uppercase text-black/30">
              /
            </span>
            <span className="text-[0.65rem] font-bold tracking-widest uppercase text-black/40">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-serif font-extralight tracking-tight text-black leading-tight mb-4 group-hover:text-black/50 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-base md:text-lg text-black/60 font-light leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {/* Read more link */}
          <div className="flex items-center gap-2 text-sm font-medium text-black/50 group-hover:text-black transition-colors">
            <span>View case study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
