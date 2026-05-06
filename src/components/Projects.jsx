import { useRef, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import projects from "../utils/projects";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const isMobile = useDevice();
  const containerRef = useRef(null);

  useGSAP(() => {
    // Title animation
    gsap.fromTo(".projects-title",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 85%",
        }
      }
    );

    // Individual card animations - Simplified for performance
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="projects" className="relative bg-background py-24 px-6 md:px-12 lg:px-24 overflow-hidden min-h-screen">

      {/* Background layered box */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-secondary z-0 opacity-40 pointer-events-none rounded-l-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="projects-title font-chunky text-6xl sm:text-7xl lg:text-[5rem] mb-16 tracking-wide drop-shadow-sm text-center md:text-left uppercase">
            <span className="text-foreground">MY W</span>
            <span className="text-primary">O</span>
            <span className="text-foreground">RKS</span>
        </h2>

        {/* Projects Grid / Carousel layout */}
        <div className="flex flex-col md:flex-row flex-wrap gap-10 md:gap-12 justify-center md:justify-start items-center md:items-stretch">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card relative w-full md:w-[45%] lg:w-[30%] max-w-md flex flex-col bg-card-bg p-5 pb-8 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] border border-border/50">

              {/* Tape effect on top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-border/80 backdrop-blur-sm -rotate-2 mix-blend-multiply shadow-sm z-20" />

              {/* Image Container */}
              <div className="w-full aspect-[4/3] bg-muted mb-5 overflow-hidden border border-black/5 relative group cursor-pointer">
                {project.embedUrl ? (
                  <iframe
                    src={project.embedUrl}
                    title={project.title}
                    className="w-[150%] h-[150%] border-none origin-top-left scale-[0.666] pointer-events-none"
                    loading="lazy"
                  />
                ) : (
                  <img src={project.imageUrl || "/ashmo.webp"} alt={project.title} className="w-full h-full object-cover filter contrast-110 saturate-[1.1] group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-4 backdrop-blur-sm">
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-background text-foreground font-chunky text-lg hover:scale-105 transition-transform shadow-[2px_2px_0px_var(--color-primary)]">
                      View Live
                    </a>
                  )}
                  {project.codeLink && (
                    <a href={project.codeLink} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-background text-foreground font-chunky text-lg hover:scale-105 transition-transform shadow-[2px_2px_0px_var(--color-primary)]">
                      Source Code
                    </a>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col flex-grow">
                <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  {project.date}
                </span>
                <h3 className="font-display text-2xl text-foreground mb-3 leading-tight">
                  {project.title}
                </h3>
                <p className="font-sans text-sm text-subtle leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10px] uppercase font-sans font-semibold px-2.5 py-1 bg-secondary text-foreground rounded-sm">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="text-[10px] uppercase font-sans font-semibold px-2.5 py-1 bg-secondary text-foreground rounded-sm">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                {/* Mobile-only action buttons — always visible at the end of the card */}
                {isMobile && (project.demoLink || project.codeLink) && (
                  <div className="flex gap-3 mt-6 pt-4 border-t border-border/40">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center px-4 py-2.5 bg-foreground text-background font-chunky text-xs shadow-[3px_3px_0px_var(--color-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--color-primary)] transition-all"
                      >
                        View Live
                      </a>
                    )}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center px-4 py-2.5 bg-card-bg text-foreground font-chunky text-xs border-2 border-border shadow-[3px_3px_0px_var(--color-foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--color-foreground)] transition-all"
                      >
                        Source
                      </a>
                    )}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;