import { useRef, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import { Link, useNavigate } from "react-router-dom";
import { MagneticElement, TextReveal } from "../utils/animations";
import { Sparkle, Squiggle, SwirlDoodle, UnderlineDoodle } from "./Doodles";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const isMobile = useDevice();
  const containerRef = useRef(null);

  const resumeLink = import.meta.env.VITE_RESUME_LINK || "#";
  const navigate = useNavigate();

  const handleNavWithWipe = (e, href) => {
    e.preventDefault();
    const isDark = document.documentElement.classList.contains("dark");
    const color = isDark ? "#171713" : "#F8F3E8";
    window.dispatchEvent(new CustomEvent('triggerWipe', { detail: { color } }));
    setTimeout(() => navigate(href), 450);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".fade-up",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.1 }
    );

    tl.fromTo(".cta-btn",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.5 },
      "-=0.2"
    );

    // Letter by letter animation for ASHUTOSH
    tl.fromTo(".hero-char",
      { y: 50, opacity: 0, rotationX: -90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.5)" },
      "-=0.6"
    );

    // Premium image reveal
    tl.fromTo(".hero-image",
      { y: 30, opacity: 0, rotation: 5 },
      { y: 0, opacity: 1, rotation: 3, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
    tl.fromTo(".hero-img-container",
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", willChange: "clip-path" },
      { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1, ease: "power2.inOut", force3D: true },
      "-=0.7"
    );
    tl.fromTo(".hero-img-inner",
      { scale: 1.15, willChange: "transform" },
      { scale: 1, duration: 1.2, ease: "power2.out", force3D: true },
      "-=1"
    );

    tl.fromTo(".decorative-element",
      { opacity: 0 },
      { opacity: 0.6, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.8"
    );

    // PORTFOLIO watermark fade in
    tl.fromTo(".portfolio-watermark",
      { opacity: 0, y: 30 },
      { opacity: 1, duration: 1.2, y: 0, ease: "power2.out" },
      "-=0.6"
    );

    // Floating shapes
    gsap.to(".decorative-element", {
      y: 20,
      rotation: "+=3",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 1.5
    });

    // PORTFOLIO watermark parallax — drifts up slowly on scroll
    gsap.to(".portfolio-watermark", {
      yPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });

    // Soft section exit on scroll
    gsap.to(containerRef.current, {
      opacity: 0.3,
      scale: 0.97,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "60% top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Parallax effect on scroll
    gsap.to(".hero-image", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="landing" className="min-h-[100svh] relative flex items-center justify-center overflow-hidden bg-background bg-dot-grid pt-32 pb-12 md:pb-16">

      {/* Brutalist background shapes */}
      <div className="decorative-element absolute top-30 left-[-10%] w-52 md:w-80 h-32 md:h-56 bg-primary/30 brutal-border brutal-shadow rotate-[-10deg] z-0" />
      <div className="decorative-element absolute bottom-28 right-[-10%] w-[300px] md:w-[400px] h-60 md:h-72 bg-secondary/30 brutal-border brutal-shadow rotate-[8deg] z-0" />

      {/* Stacked PORTFOLIO watermark — atmospheric background element */}
      <div className="portfolio-watermark absolute bottom-12 left-6 md:left-16 flex flex-col font-chunky text-6xl md:text-8xl leading-[0.85] text-foreground/[0.02] dark:text-foreground/[0.03] md:text-foreground/[0.04] md:dark:text-foreground/[0.06] z-0 pointer-events-none select-none tracking-[0.15em]"
        style={{ filter: isMobile ? "blur(1.5px)" : "blur(0.5px)" }}
        aria-hidden="true"
      >
        <span>POR</span>
        <span>TFO</span>
        <span>LIO</span>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl px-6 gap-12 lg:gap-16">

        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
          {/* Removed TextReveal from hi i'm to fix cursive font clipping */}
          <p className="font-display text-4xl md:text-5xl lg:text-7xl text-foreground mb-[-8px] md:mb-[-15px] lg:mb-[-25px] z-10 relative">
            hi i'm
          </p>

          <h1 className="font-chunky text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] text-primary leading-none uppercase relative z-10 tracking-wide pb-4 lg:pb-6 flex flex-wrap justify-center lg:justify-start"
            aria-label="Ashutosh"
            style={{
              WebkitTextStroke: isMobile ? "1px var(--color-foreground)" : "3px var(--color-foreground)",
              color: "var(--color-primary)",
              perspective: "1000px"
            }}>
            {"ASHUTOSH".split("").map((char, index) => (
              <span key={index} className="hero-char inline-block origin-bottom" aria-hidden="true">
                {char}
              </span>
            ))}
          </h1>

          <div className="fade-up mt-4 relative inline-block">
            <p className="bg-primary text-foreground brutal-border brutal-shadow-sm font-chunky px-6 md:px-10 py-2.5 lg:py-3 text-sm md:text-lg lg:text-xl uppercase tracking-[0.2em] whitespace-nowrap">
              Backend Java Developer
            </p>
            <Sparkle className="absolute -top-6 -right-8 text-foreground animate-pulse" size={24} />
          </div>

          <div className="cta-btn mt-12 lg:mt-20 flex flex-wrap justify-center lg:justify-start gap-4 relative z-20">
            <MagneticElement strength={30}>
              <a
                href="/archive"
                onClick={(e) => handleNavWithWipe(e, '/archive')}
                className="brutal-btn text-xl"
              >
                Archive
              </a>
            </MagneticElement>
            <MagneticElement strength={30}>
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn-outline text-xl"
              >
                Resume
              </a>
            </MagneticElement>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md flex justify-center items-center z-10 mt-6 lg:mt-0">
          {/* Brutalist frame */}
          <div className="hero-image relative p-3 md:p-4 pb-12 md:pb-16 bg-card-bg brutal-border brutal-shadow-lg rotate-[3deg] w-full">
            <div className="hero-img-container relative overflow-hidden w-full aspect-[4/5] bg-muted brutal-border">
              <img
                className="hero-img-inner w-full h-full object-cover filter md:grayscale hover:grayscale-0 transition-all duration-500"
                src="/ashutosh.webp"
                alt="Ashutosh Moharana"
                fetchPriority="high"
                loading="eager"
              />
            </div>

            {/* Hand-drawn decorative element */}
            <div className="absolute bottom-3 md:bottom-4 right-4 md:right-6 font-display text-xl md:text-2xl text-foreground rotate-[-10deg]">
              hello!
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
