import { useRef, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import projects from "../utils/projects";
import ProgressiveImage from "./ProgressiveImage";
import { MagneticElement, TextReveal } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const isMobile = useDevice();
  const containerRef = useRef(null);

  useGSAP(() => {
    // Title animation is now handled by TextReveal

    // Individual card animations - Premium 3D flip entry
    gsap.utils.toArray(".project-card-container").forEach((card, i) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0, rotationY: 30, z: -100 },
        {
          y: 0, opacity: 1, rotationY: 0, z: 0,
          duration: 1,
          ease: "power3.out",
          delay: (i % 3) * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="projects" className="relative bg-background pt-16 pb-20 md:py-32 px-0 md:px-12 lg:px-24 overflow-hidden min-h-screen">

      {/* Background layered box */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-secondary z-0 opacity-40 pointer-events-none rounded-l-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-0">
        <TextReveal delay={0.1}>
          <h2 className="font-chunky text-6xl sm:text-7xl lg:text-[5rem] mb-16 tracking-wide drop-shadow-sm text-center md:text-left uppercase">
            <span className="text-foreground">MY W</span>
            <span className="text-primary">O</span>
            <span className="text-foreground">RKS</span>
          </h2>
        </TextReveal>

        {/* Projects Grid / Carousel layout */}
        <div className="overflow-x-auto md:overflow-x-visible pb-12 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          <div className="flex flex-nowrap md:flex-wrap gap-8 md:gap-12 md:justify-center items-stretch pt-8 w-max md:w-auto">
            {[...projects].reverse().map((project, index) => {
              const rotations = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3", "-rotate-3", "rotate-1"];
              const rotation = rotations[index % rotations.length];

              return (
                <div key={project.id} className="project-card-container shrink-0 w-[85vw] md:shrink md:w-[45%] lg:w-[30%] max-w-md relative">
                <div className={`project-card relative h-full flex flex-col bg-[#f4f4f5]/90 dark:bg-[#e4e4e7]/10 backdrop-blur-xl p-6 md:p-8 pb-10 md:pb-12 shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-white/20 transition-all duration-300 ${rotation} hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.02]`}>

                  {/* Tape effect on top */}
                  {(() => {
                    const tapeColors = [
                      "bg-secondary/60 border-secondary",
                      "bg-primary/30 border-primary/40",
                      "bg-muted/70 border-muted",
                      "bg-border/60 border-border",
                      "bg-secondary/40 border-primary/20",
                      "bg-primary/20 border-muted",
                    ];
                    const tapeRotates = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3", "-rotate-3", "rotate-1"];
                    const tc = tapeColors[index % tapeColors.length];
                    const tr = tapeRotates[(index + 1) % tapeRotates.length];
                    return <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 ${tc} backdrop-blur-xl ${tr} shadow-sm z-20 border`} />;
                  })()}

                  {/* Image Container */}
                  <div className="w-full aspect-video md:aspect-[4/3] bg-muted mb-4 md:mb-5 overflow-hidden border border-black/5 relative group cursor-pointer">
                    {project.embedUrl ? (
                      <iframe
                        src={project.embedUrl}
                        title={project.title}
                        className="w-[150%] h-[150%] border-none origin-top-left scale-[0.666] pointer-events-none"
                        loading="lazy"
                      />
                    ) : (
                      <ProgressiveImage
                        src={project.imageUrl || "/ashmo.webp"}
                        alt={project.title}
                        className="w-full h-full object-cover filter contrast-110 saturate-[1.1] group-hover:scale-110 transition-transform duration-700 ease-out"
                        wrapperClassName="w-full h-full absolute inset-0"
                      />
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-4 backdrop-blur-sm">
                      {project.demoLink && (
                        <MagneticElement strength={25}>
                          <a href={project.demoLink} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-background text-foreground font-chunky text-lg hover:scale-105 transition-transform shadow-[2px_2px_0px_var(--color-primary)] inline-block">
                            View Live
                          </a>
                        </MagneticElement>
                      )}
                      {project.codeLink && (
                        <MagneticElement strength={25}>
                          <a href={project.codeLink} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-background text-foreground font-chunky text-lg hover:scale-105 transition-transform shadow-[2px_2px_0px_var(--color-primary)] inline-block">
                            Source Code
                          </a>
                        </MagneticElement>
                      )}
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="flex flex-col flex-grow">
                    <span className="text-primary font-sans text-[9px] font-bold uppercase tracking-[0.25em] mb-2 opacity-80">
                      {project.date}
                    </span>
                    <h3 className="font-display text-xl text-foreground mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="font-sans text-[0.9rem] md:text-sm text-subtle/90 leading-[1.6] mb-6 md:mb-6 line-clamp-2 md:line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5 mt-auto">
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
                            className="flex-1 text-center px-4 py-2 bg-foreground text-background font-chunky text-[10px] shadow-[3px_3px_0px_var(--color-primary)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--color-primary)] transition-all"
                          >
                            View Live
                          </a>
                        )}
                        {project.codeLink && (
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 text-center px-4 py-2 bg-card-bg text-foreground font-chunky text-[10px] border-2 border-border shadow-[3px_3px_0px_var(--color-foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--color-foreground)] transition-all"
                          >
                            Source
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              </div>
          );
        })}
        </div>
      </div>
    </div>
  </div>
);
};

export default Projects;
