import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { projects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { CaseStudyCard } from "../components/CaseStudyCard";

export function Work() {
  const [clientFilter, setClientFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [mobileView, setMobileView] = useState<"projects" | "caseStudies">("projects");

  // Separate projects from case studies
  const regularProjects = projects.filter((p) => !p.caseStudy);
  const caseStudies = projects.filter((p) => p.caseStudy);

  const uniqueClients = Array.from(
    new Map(
      regularProjects.map((p) => [
        p.clientName,
        { clientName: p.clientName, clientType: p.clientType },
      ])
    ).values()
  ).sort((a, b) => a.clientName.localeCompare(b.clientName));

  const uniqueServices = Array.from(
    new Set(regularProjects.flatMap((p) => p.services))
  ).sort();

  const filteredProjects = regularProjects.filter((project) => {
    const clientMatch = clientFilter === "All" || project.clientName === clientFilter;
    const serviceMatch = serviceFilter === "All" || project.services.includes(serviceFilter);
    return clientMatch && serviceMatch;
  });

  const filtersBlock = (
    <>
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/40 hover:text-black transition-colors focus:outline-none"
        >
          {showFilters ? "Hide filters" : "Show filters"}
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      {showFilters && (
        <div className="mb-8 pb-8 border-b border-black/10">
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div>
              <div className="grid grid-cols-1 gap-y-3">
                <button
                  onClick={() => setClientFilter("All")}
                  className={`text-left transition-colors duration-200 focus:outline-none ${
                    clientFilter === "All" ? "text-black" : "text-black/30 hover:text-black/60"
                  }`}
                >
                  <p className="font-sans text-sm font-light leading-snug">All</p>
                </button>
                {uniqueClients.map((client) => {
                  const isActive = clientFilter === client.clientName;
                  return (
                    <button
                      key={client.clientName}
                      onClick={() => setClientFilter(client.clientName)}
                      className={`text-left transition-colors duration-200 focus:outline-none ${
                        isActive ? "text-black" : "text-black/30 hover:text-black/60"
                      }`}
                    >
                      <p className="font-sans text-sm font-light leading-snug">
                        {client.clientName}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 gap-y-3">
                <button
                  onClick={() => setServiceFilter("All")}
                  className={`text-left transition-colors duration-200 focus:outline-none ${
                    serviceFilter === "All" ? "text-black" : "text-black/30 hover:text-black/60"
                  }`}
                >
                  <p className="font-sans text-sm font-light leading-snug">All</p>
                </button>
                {uniqueServices.map((service) => {
                  const isActive = serviceFilter === service;
                  return (
                    <button
                      key={service}
                      onClick={() => setServiceFilter(service)}
                      className={`text-left transition-colors duration-200 focus:outline-none ${
                        isActive ? "text-black" : "text-black/30 hover:text-black/60"
                      }`}
                    >
                      <p className="font-sans text-sm font-light leading-snug">
                        {service}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const projectsGridBlock = (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-16 mt-8">
      <AnimatePresence mode="popLayout">
        {filteredProjects.map((project, index) => (
          <div key={project.id}>
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );

  const caseStudiesBlock = (
    <div>
      {caseStudies.map((project, index) => (
        <CaseStudyCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:pt-[90px]"
    >
      <div className="lg:hidden mb-8">
        <h1 className="text-[3.33rem] md:text-[4.72rem] font-serif font-extralight tracking-tighter text-black leading-[0.9]">
          Projects
        </h1>
      </div>

      <div className="lg:hidden sticky top-20 z-20 bg-white/95 backdrop-blur-sm mb-8">
        <div role="tablist" aria-label="Projects content toggle" className="flex items-center border-b border-black/10">
          <button
            role="tab"
            aria-selected={mobileView === "projects"}
            onClick={() => setMobileView("projects")}
            className={`py-3 pr-6 text-sm font-medium transition-colors ${
              mobileView === "projects"
                ? "text-black border-b border-black"
                : "text-black/40 hover:text-black/70"
            }`}
          >
            Projects
          </button>
          <button
            role="tab"
            aria-selected={mobileView === "caseStudies"}
            onClick={() => setMobileView("caseStudies")}
            className={`py-3 pl-6 text-sm font-medium transition-colors ${
              mobileView === "caseStudies"
                ? "text-black border-b border-black"
                : "text-black/40 hover:text-black/70"
            }`}
          >
            Case Studies
          </button>
        </div>
      </div>

      <div className="lg:hidden mb-12">
        {mobileView === "projects" ? (
          <>
            {filtersBlock}
            {projectsGridBlock}
          </>
        ) : (
          caseStudiesBlock
        )}
      </div>

      <div className="hidden lg:flex lg:gap-8 mb-[90px]">
        <h2 className="flex-1 text-[3.33rem] md:text-[4.72rem] font-serif font-extralight tracking-tighter text-black leading-[0.9]">
          Projects
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8">
      {/* Left Column: Projects (75% on desktop) */}
      <div className="hidden lg:block flex-1 lg:pr-4">
        {filtersBlock}
        {projectsGridBlock}
      </div>

      {/* Right Column: Case Studies (25% on desktop) */}
      {caseStudies.length > 0 && (
        <div className="hidden lg:flex lg:w-1/4 lg:pl-4 lg:flex-col">
          <h3 className="text-2xl md:text-[2.22rem] font-serif font-extralight tracking-tighter text-black leading-tight mb-3 shrink-0">
            Case Studies
          </h3>
          <div>
            <div className="pt-[44px]">
              {caseStudiesBlock}
            </div>
          </div>
        </div>
      )}
      </div>
    </motion.div>
  );
}
