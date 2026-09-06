import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import projects from "../utils/projects";
import { UnderlineDoodle, SwirlDoodle } from "./Doodles";
import CardCarousel from "./CardCarousel";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const isMobile = useDevice();
  const containerRef = useRef(null);

  useGSAP(() => {
    // Title letter-by-letter 3D flip animation
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
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );

    // Background accent parallax
    gsap.to(".project-bg-accent", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="projects" className="relative bg-background pt-16 pb-20 md:py-32 px-0 overflow-hidden min-h-screen">

      {/* Background layered box */}
      <div className="project-bg-accent absolute top-10 right-0 w-[40%] h-full bg-secondary z-0 opacity-20 pointer-events-none rounded-l-[100px]" />
      <SwirlDoodle className="absolute top-[20%] left-[10%] text-primary z-0" size={35} />

      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12 lg:px-20">
        <h2 className="font-chunky text-5xl sm:text-6xl lg:text-7xl mb-6 tracking-wide drop-shadow-sm text-center md:text-left uppercase flex flex-wrap justify-center md:justify-start overflow-visible relative" aria-label="My Works">
          <UnderlineDoodle className="absolute -bottom-5 left-1/2 md:left-2 -translate-x-1/2 md:translate-x-0 w-[60%] md:w-64 h-6 text-secondary pointer-events-none -rotate-2 -z-10" />
          {"MY WORKS".split("").map((char, index) => {
            const isPrimary = index === 4 || index===1 ; // The letter 'O'
            return (
              <span
                key={index}
                aria-hidden="true"
                className={`project-title-char inline-block origin-bottom will-change-transform ${isPrimary ? "text-primary" : "text-foreground"}`}
                style={{ minWidth: char === " " ? "0.3em" : "auto" }}
              >
                {char}
              </span>
            );
          })}
        </h2>
      </div>

      {/* Projects Carousel layout - Full width */}
      <div className="w-full relative z-10 mt-6 md:mt-12">
        <CardCarousel items={[...projects].reverse()} />
      </div>
    </div>
  );
};

export default Projects;
