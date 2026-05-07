import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiLeetcode, SiHackerrank, SiLinkedin, SiGithub } from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";
import { MagneticElement, TextReveal, TiltCard } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    { year: "2025 - 2027", degree: "M.C.A", institution: "Indira Gandhi Institute of Technology", detail: "" },
    { year: "2022 - 2025", degree: "B.SC. CSC", institution: "Udayanath Autonomous College", detail: "8.6 CGPA" },
    { year: "2020 - 2022", degree: "HIGHER SECONDARY", institution: "Prananath Autonomous College", detail: "86%" },
    { year: "2016 - 2020", degree: "SECONDARY EDUCATION", institution: "Young Phoenix Public School", detail: "84%" }
];

const About = () => {
    const containerRef = useRef(null);
    const polaroidRef = useRef(null);
    const textRef = useRef(null);
    const [polaroidFlipped, setPolaroidFlipped] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
            }
        });

        // Animate polaroid - Premium Reveal
        tl.fromTo(polaroidRef.current,
            { y: 30, opacity: 0, rotation: -10 },
            { y: 0, opacity: 1, rotation: -2, duration: 0.8, ease: "back.out(1.2)" },
            "-=0.2"
        );
        tl.fromTo(".polaroid-img-container",
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1.2, ease: "power3.inOut" },
            "-=0.8"
        );
        tl.fromTo(".polaroid-img-inner",
            { scale: 1.4 },
            { scale: 1, duration: 1.5, ease: "power3.out" },
            "-=1.2"
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

        // Heading letter-by-letter animation
        gsap.fromTo(".about-title-char",
            { y: 60, opacity: 0, rotationX: -90 },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: ".about-title-char",
                    start: "top 90%",
                    once: true
                }
            }
        );

        // Education scattered cards entry (premium 3D flip)
        gsap.fromTo(".edu-card-wrapper",
            { opacity: 0, y: 100, rotationX: -45, z: -100 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                z: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: ".edu-container",
                    start: "top 75%"
                }
            }
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
        <div ref={containerRef} id="about" className="relative min-h-screen bg-background pt-28 pb-12 md:pt-40 md:pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="w-full flex flex-col items-center">
                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                        {/* Left side: Polaroid */}
                        <div className="w-full lg:w-[45%] flex justify-center lg:justify-start relative pl-0 lg:pl-10">
                            {/* Inner wrapper: row on mobile (links beside), col on desktop (links below) */}
                            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 sm:gap-6 lg:gap-5">

                                {/* Flippable Polaroid */}
                                <div
                                    ref={polaroidRef}
                                    className="relative w-36 sm:w-56 lg:w-[320px] shrink-0 z-30 cursor-pointer"
                                    style={{ perspective: "1000px" }}
                                    onMouseEnter={() => setPolaroidFlipped(true)}
                                    onMouseLeave={() => setPolaroidFlipped(false)}
                                    onClick={() => setPolaroidFlipped(!polaroidFlipped)} // Fallback for mobile
                                    title="Hover to flip"
                                >
                                    <div
                                        className="relative w-full transition-transform duration-700"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            transform: polaroidFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                                        }}
                                    >
                                        {/* FRONT — Photo */}
                                        <div
                                            className="relative p-2 md:p-3 bg-[#f4f4f5] shadow-[0_20px_50px_rgba(0,0,0,0.2)] rotate-[-2deg] border-2 border-white/10"
                                            style={{ backfaceVisibility: "hidden" }}
                                        >
                                            {/* EST 2005 vertical text */}
                                            <div
                                                className="absolute -left-6 top-0 h-full flex items-start justify-start"
                                                style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                            >
                                                <span className="font-display text-[10px] sm:text-xs tracking-[0.25em] text-neutral-400 uppercase select-none">
                                                    EST 2005
                                                </span>
                                            </div>

                                            {/* TAP text - Bottom Right inside white area (Mobile only) */}
                                            <div className="absolute right-1 bottom-1 sm:hidden">
                                                <span className="font-display text-[7px] tracking-widest text-neutral-400 uppercase select-none">
                                                    TAP
                                                </span>
                                            </div>

                                            <div className="polaroid-img-container w-full h-36 sm:h-52 lg:h-72 bg-muted overflow-hidden relative shadow-inner flex items-center justify-center">
                                                <img
                                                    src="/ashu.webp"
                                                    alt="Ashutosh"
                                                    className="polaroid-img-inner w-full h-full object-cover grayscale-[0.2] transition-all duration-700"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="py-1.5 md:py-3 w-full text-center flex justify-center">
                                                <span className="font-display italic text-xs md:text-lg text-neutral-600/80 tracking-wide rotate-[-1.5deg] select-none">@ashutosh</span>
                                            </div>
                                        </div>

                                        {/* BACK — Funny Aadhar message */}
                                        <div
                                            className="absolute inset-0 p-3 md:p-5 bg-[#f4f4f5] dark:bg-[#3D2F2F] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-2 border-white/20 dark:border-white/5 flex flex-col items-center justify-center gap-2 md:gap-4 text-center"
                                            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg) rotate(-2deg)" }}
                                        >
                                            <p className="font-display italic text-[10px] sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-snug">
                                               “this child thought adulthood looked fun.”
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile links — right of polaroid on mobile, below on desktop */}
                                <div className="flex flex-col gap-3 pt-0 lg:pl-1 mt-0 lg:mt-3">
                                    <MagneticElement strength={20}>
                                        <a href="https://linkedin.com/in/ashutosh-moharana" target="_blank" rel="noreferrer"
                                            className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors duration-200 font-sans text-xs sm:text-sm">
                                            <SiLinkedin size={18} className="shrink-0" />
                                            <span className="group-hover:underline underline-offset-4 hidden sm:inline">linkedin.com/in/ashutosh-moharana</span>
                                            <span className="group-hover:underline underline-offset-4 sm:hidden">LinkedIn</span>
                                            <FiArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 hidden sm:inline" />
                                        </a>
                                    </MagneticElement>
                                    <MagneticElement strength={20}>
                                        <a href="https://leetcode.com/u/ash_mo/" target="_blank" rel="noreferrer"
                                            className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors duration-200 font-sans text-xs sm:text-sm">
                                            <SiLeetcode size={18} className="shrink-0" />
                                            <span className="group-hover:underline underline-offset-4 hidden sm:inline">leetcode.com/ash_mo</span>
                                            <span className="group-hover:underline underline-offset-4 sm:hidden">LeetCode</span>
                                            <FiArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 hidden sm:inline" />
                                        </a>
                                    </MagneticElement>
                                    <MagneticElement strength={20}>
                                        <a href="https://github.com/ashutosh-moharana" target="_blank" rel="noreferrer"
                                            className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors duration-200 font-sans text-xs sm:text-sm">
                                            <SiGithub size={18} className="shrink-0" />
                                            <span className="group-hover:underline underline-offset-4 hidden sm:inline">github.com/ashutosh-moharana</span>
                                            <span className="group-hover:underline underline-offset-4 sm:hidden">GitHub</span>
                                            <FiArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 hidden sm:inline" />
                                        </a>
                                    </MagneticElement>
                                    <MagneticElement strength={20}>
                                        <a href="https://www.hackerrank.com/profile/ash_mo" target="_blank" rel="noreferrer"
                                            className="group flex items-center gap-2 text-subtle hover:text-primary transition-colors duration-200 font-sans text-xs sm:text-sm">
                                            <SiHackerrank size={18} className="shrink-0" />
                                            <span className="group-hover:underline underline-offset-4 hidden sm:inline">hackerrank.com/ash_mo</span>
                                            <span className="group-hover:underline underline-offset-4 sm:hidden">HackerRank</span>
                                            <FiArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 hidden sm:inline" />
                                        </a>
                                    </MagneticElement>
                                </div>

                            </div>
                        </div>

                        {/* Right side: Text block */}
                        <div className="w-full lg:w-[55%] relative flex flex-col justify-center pt-8 lg:pt-0">

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

                            {/* Background accent blocks — extended to tie both sides together */}
                            <div className="absolute -top-12 bottom-32 -left-[60%] -right-10 bg-secondary/20 z-0 hidden lg:block rounded-sm pointer-events-none"></div>
                            <div className="absolute top-40 -bottom-10 -left-20 -right-[40%] bg-secondary/35 z-0 hidden lg:block rounded-sm pointer-events-none"></div>

                            <div ref={textRef} className="relative z-10 lg:pl-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <TextReveal delay={0.1}>
                                    <h2 className="font-chunky text-6xl sm:text-7xl lg:text-[5rem] mb-8 tracking-wide drop-shadow-sm flex flex-wrap justify-center lg:justify-start overflow-hidden">
                                        {"ABOUT ME".split("").map((char, index) => {
                                            const isPrimary = index === 2 || index === 7;
                                            return (
                                                <span
                                                    key={index}
                                                    className={`about-title-char inline-block origin-bottom ${isPrimary ? "text-primary" : "text-foreground"}`}
                                                    style={{ minWidth: char === " " ? "0.3em" : "auto" }}
                                                >
                                                    {char}
                                                </span>
                                            );
                                        })}
                                    </h2>
                                </TextReveal>

                                <div className="about-text font-sans text-base sm:text-lg text-foreground/75 leading-[1.8] mb-10 max-w-xl font-normal">
                                    <p>
                                        Backend developer focused on building scalable APIs, database-driven applications, and clean backend architecture using Java and Spring Boot. Passionate about creating reliable systems while exploring modern backend technologies.
                                    </p>
                                </div>

                                {/* Toolkit */}
                                <div className="mt-10 about-text w-full">
                                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-subtle font-bold mb-3 text-center lg:text-left">Toolkit</p>
                                    <div className="flex flex-wrap gap-2 md:gap-2.5 max-w-xl justify-center lg:justify-start mx-auto lg:mx-0">
                                        {['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'React', 'JavaScript', 'TailwindCSS', 'Node.js'].map((skill, i) => (
                                            <div key={i} className="skill-card px-3 md:px-4 py-1.5 bg-card-bg border border-primary/20 text-foreground font-chunky text-xs md:text-sm shadow-[2px_2px_0px_var(--color-primary)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_var(--color-primary)] transition-all cursor-default">
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Education — Horizontal Cards */}
                <div className="edu-container w-full mt-24 relative z-10 pb-20">

                    <TextReveal delay={0.1}>
                        <h3 className="font-chunky text-4xl md:text-5xl mb-12 tracking-wide drop-shadow-sm text-center lg:text-left max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                            <span className="text-foreground">EDUC</span>
                            <span className="text-primary">A</span>
                            <span className="text-foreground">TI</span>
                            <span className="text-primary">O</span>
                            <span className="text-foreground">N</span>
                        </h3>
                    </TextReveal>

                    {/* Mobile: swipeable scroll / Desktop: flex wrap grid */}
                    <div className="overflow-x-auto md:overflow-x-visible pb-6 md:pb-0" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                        <div className="flex flex-nowrap md:flex-wrap gap-6 md:gap-8 px-6 md:px-12 lg:px-20 pt-8 pb-4 md:max-w-7xl md:mx-auto">
                            {educationData.map((edu, idx) => {
                                const rotations = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1"];
                                const rotation = rotations[idx % rotations.length];
                                const tapeColors = [
                                    "bg-secondary/60 border-secondary",
                                    "bg-primary/30 border-primary/40",
                                    "bg-muted/70 border-muted",
                                    "bg-border/60 border-border",
                                ];
                                const tapeColor = tapeColors[idx % tapeColors.length];

                                return (
                                    <div key={idx} className="edu-card-wrapper shrink-0 md:shrink md:flex-1 md:min-w-[200px] relative pt-6">
                                        <div className={`relative bg-[#f4f4f5] dark:bg-[#e4e4e7]/10 backdrop-blur-sm p-5 md:p-7 shadow-[4px_4px_0px_var(--color-border)] border border-border/40 dark:border-white/10 transition-all duration-300 hover:shadow-[6px_6px_0px_var(--color-primary)] hover:scale-[1.02] ${rotation} w-[220px] md:w-auto`}>

                                            {/* Tape */}
                                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 ${tapeColor} shadow-sm ${rotation} z-20`} />

                                            <span className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-primary mb-3">
                                                {edu.year}
                                            </span>
                                            <h4 className="font-chunky text-lg md:text-2xl text-foreground mb-1 leading-tight">
                                                {edu.degree}
                                            </h4>
                                            <p className="font-sans text-xs md:text-sm text-subtle/80 font-medium leading-relaxed">
                                                {edu.institution}
                                            </p>
                                            {edu.detail && (
                                                <div className="mt-4 inline-block px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-bold shadow-[2px_2px_0px_var(--color-primary)]">
                                                    {edu.detail}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

