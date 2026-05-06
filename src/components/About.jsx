import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiLeetcode, SiHackerrank, SiLinkedin, SiGithub } from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef  = useRef(null);
  const polaroidRef   = useRef(null);
  const textRef       = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    // Animate polaroid - Simplified
    tl.fromTo(polaroidRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );

    // Arrow animation - Simplified
    tl.fromTo(".arrow-svg", 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
    );

    // Animate heading and text
    tl.fromTo(".about-text",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

    // Skills - Simplified
    tl.fromTo(".skill-card",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" },
      "-=0.2"
    );

    // Parallax on polaroid
    gsap.to(polaroidRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="about" className="relative min-h-screen flex items-center bg-background py-20 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        
        {/* Removed duplicate PORTFOLIO text to prevent stacking with LandingPage */}

        <div className="max-w-7xl mx-auto w-full relative z-10 mt-12 lg:mt-0">
            <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-8 items-center lg:items-start">
                
                {/* Left side: Polaroid */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative pl-0 lg:pl-10 self-start">
                    {/* Inner wrapper: row on mobile (links beside), col on desktop (links below) */}
                    <div className="flex flex-row lg:flex-col items-start gap-4 lg:gap-5">

                        {/* Polaroid */}
                        <div ref={polaroidRef} className="relative p-2 md:p-3 h-fit bg-[#f4f4f5] dark:bg-[#e4e4e7] shadow-[0_20px_50px_rgba(0,0,0,0.2)] rotate-[-2deg] w-36 sm:w-56 lg:w-[320px] border-2 border-white/20 z-30 shrink-0">
                            <div className="w-full h-36 sm:h-52 lg:h-72 bg-muted overflow-hidden relative shadow-inner flex items-center justify-center text-subtle/30 text-sm font-sans">
                                {/* image coming soon */}
                            </div>
                            <div className="py-1.5 md:py-3 w-full text-center">
                                <span className="font-display italic text-xs md:text-lg text-neutral-600 tracking-wide">@ash_mo</span>
                            </div>
                        </div>

                        {/* Profile links — right of polaroid on mobile, below on desktop */}
                        <div className="flex flex-col gap-3 pt-1 lg:pt-0 lg:pl-1 mt-0 lg:mt-3">
                            <a href="https://linkedin.com/in/ashutosh-moharana" target="_blank" rel="noreferrer"
                               className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors duration-200 font-sans text-xs sm:text-sm">
                                <SiLinkedin size={14} className="shrink-0" />
                                <span className="group-hover:underline underline-offset-4">linkedin.com/in/ashutosh-moharana</span>
                                <FiArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                            </a>
                            <a href="https://leetcode.com/u/ash_mo/" target="_blank" rel="noreferrer"
                               className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors duration-200 font-sans text-xs sm:text-sm">
                                <SiLeetcode size={14} className="shrink-0" />
                                <span className="group-hover:underline underline-offset-4">leetcode.com/ash_mo</span>
                                <FiArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                            </a>
                            <a href="https://github.com/ashutosh-moharana" target="_blank" rel="noreferrer"
                               className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors duration-200 font-sans text-xs sm:text-sm">
                                <SiGithub size={14} className="shrink-0" />
                                <span className="group-hover:underline underline-offset-4">github.com/ashutosh-moharana</span>
                                <FiArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                            </a>
                            <a href="https://www.hackerrank.com/profile/ash_mo" target="_blank" rel="noreferrer"
                               className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors duration-200 font-sans text-xs sm:text-sm">
                                <SiHackerrank size={14} className="shrink-0" />
                                <span className="group-hover:underline underline-offset-4">hackerrank.com/ash_mo</span>
                                <FiArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                            </a>
                        </div>

                    </div>
                </div>

                {/* Right side: Text block */}
                <div className="w-full lg:w-1/2 relative flex flex-col justify-center pt-8 lg:pt-0">
                    
                    {/* SVG Arrow pointing to the heading */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 md:-top-20 md:-left-12 z-20 w-32 h-32 md:w-44 md:h-44 arrow-svg">
                        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                            <path 
                                d="M40,20 C100,-10 160,40 100,100 C40,160 120,200 170,150" 
                                stroke="var(--color-primary)" 
                                strokeWidth="4" 
                                strokeDasharray="10 10" 
                                strokeLinecap="round" 
                                fill="none"
                                className="arrow-path"
                            />
                            <path d="M155,145 L180,155 L165,125 Z" fill="var(--color-primary)" />
                        </svg>
                    </div>

                    {/* Background accent blocks */}
                    <div className="absolute -top-12 bottom-20 -left-10 lg:-left-32 -right-10 bg-secondary/30 z-0 hidden lg:block rounded-sm"></div>
                    <div className="absolute top-32 -bottom-10 left-10 lg:left-0 -right-20 bg-secondary/50 z-0 hidden lg:block rounded-sm"></div>

                    <div ref={textRef} className="relative z-10 lg:pl-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h2 className="about-text font-chunky text-6xl sm:text-7xl lg:text-[5rem] mb-8 tracking-wide drop-shadow-sm">
                            <span className="text-foreground">AB</span>
                            <span className="text-primary">O</span>
                            <span className="text-foreground">UT M</span>
                            <span className="text-primary">E</span>
                        </h2>

                        <div className="about-text font-sans text-base sm:text-lg text-foreground/80 leading-relaxed mb-8 max-w-xl font-medium">
                            <p className="mb-6">
                                I'm a creative developer who blends aesthetic intuition with
                                systematic thinking to craft memorable digital experiences. From robust APIs to interactive interfaces, I believe every line of code should tell a story.
                            </p>
                            <p>
                                My approach combines design thinking with modern architecture, creating work that is not only beautiful but strategically effective. I specialize in backend development, frontend integration, and seamless user experiences.
                            </p>
                        </div>

                        {/* Toolkit */}
                        <div className="mt-12 about-text w-full">
                            <div className="flex flex-wrap gap-2 md:gap-3 max-w-xl justify-center lg:justify-start mx-auto lg:mx-0">
                            {['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'React', 'JavaScript', 'TailwindCSS', 'Node.js'].map((skill, i) => (
                                <div key={i} className="skill-card px-3 md:px-4 py-2 bg-card-bg border-2 border-primary/20 text-foreground font-chunky text-xs md:text-sm shadow-[2px_2px_0px_var(--color-primary)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_var(--color-primary)] transition-all cursor-default">
                                {skill}
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Profiles */}
                        <div className="mt-6 about-text w-full">
                            <div className="flex flex-wrap gap-3 max-w-xl justify-center lg:justify-start mx-auto lg:mx-0">
                                <a href="https://leetcode.com/u/ash_mo/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card-bg border-2 border-primary/20 text-foreground font-chunky text-xs md:text-sm shadow-[2px_2px_0px_var(--color-primary)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_var(--color-primary)] transition-all">
                                    <SiLeetcode size={16} />
                                    LeetCode
                                </a>
                                <a href="https://www.hackerrank.com/profile/ash_mo" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card-bg border-2 border-primary/20 text-foreground font-chunky text-xs md:text-sm shadow-[2px_2px_0px_var(--color-primary)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_var(--color-primary)] transition-all">
                                    <SiHackerrank size={16} />
                                    HackerRank
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default About;
