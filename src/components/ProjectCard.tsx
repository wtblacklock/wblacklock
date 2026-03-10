import Link from "next/link";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="group">
      <p className="text-[0.6rem] font-mono text-black/30 mb-2">
        [{String(index + 1).padStart(2, "0")}]
      </p>
      <Link href={`/projects/${project.id}`} className="block focus:outline-none">
        <div className="mb-3">
          <div className="aspect-[4/5] overflow-hidden bg-neutral-100 rounded-none group-hover:rounded-xl transition-[border-radius] duration-500">
            {project.thumbnailVideo ? (
              <video
                src={project.thumbnailVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 scale-[1.03] group-hover:scale-100"
              />
            ) : (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 scale-[1.03] group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
        <div className="pt-1">
          <p className="text-[0.725rem] font-bold tracking-widest uppercase text-black/40 mb-2">
            {project.clientType}
          </p>
          <p className="text-base font-light text-black/60 leading-relaxed mb-4">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.services.map((service, i) => (
              <span key={i} className="text-[0.65rem] font-light text-black/40 leading-tight">
                {service}
                {i < project.services.length - 1 && <span className="text-black/20"> • </span>}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
