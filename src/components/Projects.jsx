import { useRef, useState } from "react";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import projects from "../utils/projects";
import { MagneticElement, TextReveal } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const isMobile = useDevice();
  const containerRef = useRef(null);

  useGSAP(() => {
    // Title letter-by-letter animation
    if (isMobile) {
      gsap.fromTo(".project-title-char",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".project-title-char",
            start: "top 90%",
            once: true
          }
        }
      );
    } else {
      gsap.fromTo(".project-title-char",
        { y: 60, opacity: 0, rotationX: -90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".project-title-char",
            start: "top 90%",
            once: true
          }
        }
      );
    }

    // Individual card animations - Premium 3D flip entry
    gsap.utils.toArray(".project-card-container").forEach((card, i) => {
      gsap.fromTo(card,
        { y: isMobile ? 15 : 20, opacity: 0, scale: isMobile ? 1 : 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power2.out",
          delay: isMobile ? 0 : (i % 3) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            once: true
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
        <h2 className="font-chunky text-5xl sm:text-6xl lg:text-7xl mb-16 tracking-wide drop-shadow-sm text-center md:text-left uppercase flex flex-wrap justify-center md:justify-start overflow-hidden">
          {"MY WORKS".split("").map((char, index) => {
            const isPrimary = index === 4; // The letter 'O'
            return (
              <span
                key={index}
                className={`project-title-char inline-block origin-bottom will-change-transform ${isPrimary ? "text-primary" : "text-foreground"}`}
                style={{ minWidth: char === " " ? "0.3em" : "auto" }}
              >
                {char}
              </span>
            );
          })}
        </h2>

        {/* Projects Grid / Carousel layout */}
        <div className="overflow-x-auto md:overflow-x-visible pb-12 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          <div className="flex flex-nowrap md:flex-wrap gap-8 md:gap-12 md:justify-center items-stretch pt-8 w-max md:w-auto">
            {[...projects].reverse().map((project, index) => {
              const rotations = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3", "-rotate-3", "rotate-1"];
              const rotation = rotations[index % rotations.length];

              return (
                <div key={project.id} className="project-card-container shrink-0 w-[75vw] md:shrink md:w-[45%] lg:w-[30%] max-w-md relative will-change-transform">
                <div className={`project-card relative h-full flex flex-col bg-[#f4f4f5]/90 dark:bg-[#e4e4e7]/10 backdrop-blur-xl p-6 md:p-8 pb-10 md:pb-12 shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-white/20 transition-all duration-300 ${rotation} hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.02]`}>

                  {/* Tape effect on top */}
                  {(() => {
                    const tapeColors = [
                      "bg-secondary/80",
                      "bg-primary/50",
                      "bg-muted",
                      "bg-secondary/60",
                      "bg-primary/30",
                      "bg-muted/80",
                    ];
                    const tapeRotates = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3", "-rotate-3", "rotate-1"];
                    const tc = tapeColors[index % tapeColors.length];
                    const tr = tapeRotates[(index + 1) % tapeRotates.length];
                    return <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 ${tc} ${tr} shadow-sm z-20`} />;
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
                      <img
                        src={project.imageUrl || "/ashmo.webp"}
                        alt={project.title}
                        className="w-full h-full object-cover filter contrast-110 saturate-[1.1] group-hover:scale-110 transition-transform duration-700 ease-out absolute inset-0"
                        loading="lazy"
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
