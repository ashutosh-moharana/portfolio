import { useRef, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import { LenisContext } from "../App";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);
  const containerRef = useRef(null);

  const resumeLink = import.meta.env.VITE_RESUME_LINK || "#";

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".fade-up",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.1 }
    );

    tl.fromTo(".hero-image",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    );

    tl.fromTo(".decorative-element",
      { opacity: 0 },
      { opacity: 0.6, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.8"
    );

    // Parallax effect on scroll
    gsap.to(".hero-image", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="landing" className="min-h-[100svh] relative flex items-center justify-center overflow-hidden bg-background pt-32 pb-16">


      {/* Decorative background shapes mimicking scrapbook paper */}
      <div className="decorative-element absolute top-20 left-[-10%] w-64 md:w-80 h-40 md:h-56 bg-secondary rotate-[-10deg] rounded-sm opacity-60 z-0 shadow-sm" />
      <div className="decorative-element absolute bottom-0 right-[-10%] w-[300px] md:w-[400px] h-60 md:h-72 bg-muted rotate-[8deg] rounded-sm opacity-60 z-0 shadow-sm" />

      {/* Stacked PORTFOLIO text - Bottom Left */}
      <div className="fade-up absolute bottom-8 left-4 md:left-12 flex flex-col font-chunky text-5xl md:text-7xl leading-none text-foreground/10 z-0 pointer-events-none">
        <span>POR</span>
        <span>TFO</span>
        <span>LIO</span>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl px-6 gap-12 lg:gap-16">

        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
          <p className="fade-up font-display text-4xl md:text-5xl lg:text-7xl text-foreground mb-[-10px] md:mb-[-15px] lg:mb-[-25px] z-10 relative">
            hi i'm
          </p>

          <h1 className="fade-up font-chunky text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] text-primary leading-none uppercase drop-shadow-md relative z-10 tracking-wide"
            style={{
              WebkitTextStroke: isMobile ? "1px var(--color-foreground)" : "3px var(--color-foreground)",
              color: "var(--color-primary)"
            }}>
            ASHUTOSH
          </h1>

          <div className="fade-up mt-6 lg:mt-8 relative inline-block">
            {/* Pill shape background */}
            <div className="absolute inset-0 bg-foreground rounded-full transform scale-[1.05]" />
            <p className="relative z-10 text-background font-sans font-medium px-6 md:px-10 py-2.5 lg:py-3 text-sm md:text-lg lg:text-xl uppercase tracking-[0.2em] whitespace-nowrap">
              Backend Developer
            </p>
          </div>

          <div className="fade-up mt-12 lg:mt-20 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              to="/archive"
              className="bg-foreground text-background px-8 py-3 rounded-2xl font-chunky text-xl shadow-[4px_4px_0px_var(--color-primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-primary)] transition-all flex items-center justify-center"
            >
              Archive
            </Link>
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-foreground px-8 py-3 rounded-2xl font-chunky text-xl shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)] transition-all flex items-center justify-center"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 relative w-full max-w-sm lg:max-w-md flex justify-center items-center z-10 mt-8 lg:mt-0">
          {/* Simulated polaroid/torn paper frame */}
          <div className="hero-image relative p-3 md:p-4 pb-12 md:pb-16 bg-card-bg shadow-xl rotate-[3deg] w-full">
            <div className="relative overflow-hidden w-full aspect-[4/5] bg-muted">
              <img
                className="w-full h-full object-cover border border-border/20"
                src="/ashmo.webp"
                alt="Ashutosh Moharana"
              />
            </div>

            {/* Tape effect */}
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-10 bg-secondary/80 backdrop-blur-sm -rotate-2 shadow-sm mix-blend-multiply" />

            {/* Hand-drawn decorative element */}
            <div className="absolute bottom-3 md:bottom-4 right-4 md:right-6 font-display text-xl md:text-2xl text-foreground opacity-80 rotate-[-10deg]">
              hello!
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
