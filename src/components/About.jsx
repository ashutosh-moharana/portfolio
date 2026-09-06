import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import { SiLeetcode, SiHackerrank, SiLinkedin, SiGithub, SiHibernate, SiPostgresql, SiTailwindcss } from "react-icons/si";
import { FaJava,FaReact,FaJs, } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { FiArrowUpRight } from "react-icons/fi";
import { MagneticElement, TextReveal, TiltCard } from "../utils/animations";
import { ArrowDoodle, CircleDoodle, UnderlineDoodle } from "./Doodles";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    { year: "2025 - 2027", degree: "M.C.A", institution: "Indira Gandhi Institute of Technology", detail: "Cur. CGPA: 9.12" },
    { year: "2022 - 2025", degree: "B.SC. CSC", institution: "Udayanath Autonomous College", detail: "8.6 CGPA" },
    { year: "2020 - 2022", degree: "HIGHER SECONDARY", institution: "Prananath Autonomous College", detail: "86%" },
    { year: "2016 - 2020", degree: "SECONDARY EDUCATION", institution: "Young Phoenix Public School", detail: "83.8%" }
];

const About = () => {
    const containerRef = useRef(null);
    const polaroidRef = useRef(null);
    const textRef = useRef(null);
    const isMobile = useDevice();
    const [polaroidFlipped, setPolaroidFlipped] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        // Animate polaroid - Premium Reveal (Optimized for performance)
        tl.fromTo(polaroidRef.current,
            { y: isMobile ? 20 : 30, opacity: 0, rotation: isMobile ? -5 : -10 },
            { y: 0, opacity: 1, rotation: -2, duration: 0.8, ease: isMobile ? "power3.out" : "back.out(1.2)", force3D: true },
            "-=0.2"
        );
        tl.fromTo(".polaroid-img-container",
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: isMobile ? 0.8 : 1.2, ease: "power3.inOut", force3D: true },
            "-=0.8"
        );
        tl.fromTo(".polaroid-img-inner",
            { scale: isMobile ? 1.2 : 1.4 },
            { scale: 1, duration: isMobile ? 1.0 : 1.5, ease: "power3.out", force3D: true },
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
            { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "power3.out" },
            "-=0.4"
        );

        // Skills - Optimized
        tl.fromTo(".skill-card",
            { opacity: 0, scale: 0.95, y: 5 },
            { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.02, ease: "power1.out", force3D: true, willChange: "transform, opacity" },
            "-=0.2"
        );

        // Heading simple 3D flip animation
        gsap.fromTo(".about-title-char",
            { opacity: 0, rotationX: -90, y: 20 },
            {
                opacity: 1,
                rotationX: 0,
                y: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".about-title-char",
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );

        // Education scattered cards entry — Optimized for performance
        gsap.fromTo(".edu-card-wrapper",
            { opacity: 0, y: isMobile ? 20 : 30, scale: 0.98 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: isMobile ? 0.45 : 0.6,
                stagger: isMobile ? 0.12 : 0.1,
                ease: "expo.out",
                force3D: true,
                scrollTrigger: {
                    trigger: ".edu-container",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );

        // Parallax on polaroid
        if (!isMobile) {
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
        }

        // Education heading letter-by-letter 3D flip animation
        gsap.fromTo(".edu-title-char",
            { opacity: 0, rotationX: -90, y: 30 },
            {
                opacity: 1,
                rotationX: 0,
                y: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: ".edu-title-char",
                    start: "top 95%",
                    toggleActions: "play none none none"
                }
            }
        );

        // Background accent blocks parallax — layered paper depth
        if (!isMobile) {
            gsap.to(".about-bg-block-1", {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
            gsap.to(".about-bg-block-2", {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        }

        // Social links stagger
        gsap.fromTo(".social-link-item",
            { x: -15, opacity: 0 },
            {
                x: 0, opacity: 1,
                duration: 0.4,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".social-link-item",
                    start: "top 92%",
                    toggleActions: "play none none none"
                }
            }
        );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} id="about" className="relative min-h-screen bg-background bg-dot-grid pt-28 pb-12 md:pt-40 md:pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="w-full flex flex-col items-center">
                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                        {/* Left side: Polaroid */}
                        <div className="w-full lg:w-[45%] flex justify-center lg:justify-start relative pl-0 lg:pl-10">
                            {/* Inner wrapper: row on mobile (Polaroid + Links), col on desktop */}
                            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6 sm:gap-12 lg:gap-5 w-full justify-center lg:justify-start">

                                {/* Flippable Polaroid */}
                                <div
                                    ref={polaroidRef}
                                    className="relative w-40 lg:w-[320px] shrink-0 z-30 cursor-pointer"
                                    style={{ perspective: "1000px" }}
                                    onMouseEnter={() => setPolaroidFlipped(true)}
                                    onMouseLeave={() => setPolaroidFlipped(false)}
                                    onClick={() => setPolaroidFlipped(!polaroidFlipped)} 
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
                                            className="relative p-2 md:p-3 bg-card-bg brutal-border brutal-shadow rotate-[-2deg]"
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
                                            <div className="absolute right-2 bottom-1 md:hidden">
                                                <span className="font-display text-[4px] tracking-widest text-neutral-400 uppercase select-none">
                                                    TAP
                                                </span>
                                            </div>

                                            <div className="polaroid-img-container w-full h-36 sm:h-52 lg:h-72 bg-muted overflow-hidden relative brutal-border flex items-center justify-center will-change-[clip-path]">
                                                <img
                                                    src="/ashu.webp"
                                                    alt="Ashutosh"
                                                    className="polaroid-img-inner w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 will-change-transform"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="py-2 md:py-3 w-full text-center flex justify-center relative mt-2">
                                                <span className="font-display italic text-xs md:text-lg text-foreground-600 tracking-wide rotate-[-1.5deg] select-none relative z-10">
                                                    @ashutosh
                                                    <UnderlineDoodle className="absolute -bottom-2 left-0 w-[110%] -translate-x-[5%] h-3 text-primary pointer-events-none -z-10" />
                                                </span>
                                            </div>
                                        </div>

                                        {/* BACK — Funny Aadhar message */}
                                        <div
                                            className="absolute inset-0 p-3 md:p-5 bg-card-bg brutal-border brutal-shadow flex flex-col items-center justify-center gap-2 md:gap-4 text-center"
                                            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg) rotate(-2deg)" }}
                                        >
                                            <p className="font-chunky text-[10px] sm:text-sm md:text-base text-foreground leading-snug">
                                               Please stop staring. I'm getting nervous...
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile links */}
                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 pt-0 lg:pl-12 mt-0 lg:mt-12">
                                    <MagneticElement strength={20} className="social-link-item">
                                        <a href="https://linkedin.com/in/ashutosh-moharana" target="_blank" rel="noreferrer"
                                            className="group flex items-center justify-start lg:justify-center gap-3 text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300">
                                            <SiLinkedin size={24} className="shrink-0" />
                                            <span className="lg:hidden font-chunky tracking-widest text-sm">LinkedIn</span>
                                        </a>
                                    </MagneticElement>
                                    <MagneticElement strength={20} className="social-link-item">
                                        <a href="https://leetcode.com/u/ash_mo/" target="_blank" rel="noreferrer"
                                            className="group flex items-center justify-start lg:justify-center gap-3 text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300">
                                            <SiLeetcode size={24} className="shrink-0" />
                                            <span className="lg:hidden font-chunky tracking-widest text-sm">LeetCode</span>
                                        </a>
                                    </MagneticElement>
                                    <MagneticElement strength={20} className="social-link-item">
                                        <a href="https://github.com/ashutosh-moharana" target="_blank" rel="noreferrer"
                                            className="group flex items-center justify-start lg:justify-center gap-3 text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300">
                                            <SiGithub size={24} className="shrink-0" />
                                            <span className="lg:hidden font-chunky tracking-widest text-sm">GitHub</span>
                                        </a>
                                    </MagneticElement>
                                    <MagneticElement strength={20} className="social-link-item">
                                        <a href="https://www.hackerrank.com/profile/ash_mo" target="_blank" rel="noreferrer"
                                            className="group flex items-center justify-start lg:justify-center gap-3 text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-300">
                                            <SiHackerrank size={24} className="shrink-0" />
                                            <span className="lg:hidden font-chunky tracking-widest text-sm">HackerRank</span>
                                        </a>
                                    </MagneticElement>
                                </div>

                            </div>
                        </div>

                        {/* Right side: Text block */}
                        <div className="w-full lg:w-[55%] relative flex flex-col justify-center pt-8 lg:pt-0">

                            {/* Background accent blocks — extended to tie both sides together */}
                            <div className="about-bg-block-1 absolute -top-12 bottom-32 -left-[60%] -right-10 bg-primary/20  z-0 hidden lg:block rounded-none pointer-events-none"></div>
                            <div className="about-bg-block-2 absolute top-60 -bottom-10 -left-10 -right-[40%] bg-secondary/10 brutal-border z-0 hidden lg:block rounded-none pointer-events-none"></div>

                            <div ref={textRef} className="relative z-10 lg:pl-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <TextReveal delay={0.1}>
                                    <h2 className="font-chunky text-5xl sm:text-6xl lg:text-7xl mb-8 tracking-wide drop-shadow-sm flex flex-wrap justify-center lg:justify-start overflow-hidden relative" aria-label="About Me">
                                        <ArrowDoodle className="absolute -top-4 -right-12 text-secondary hidden lg:block -rotate-12" />
                                        {"ABOUT ME".split("").map((char, index) => {
                                            const isPrimary = index === 2 || index === 7;
                                            return (
                                                <span
                                                    key={index}
                                                    aria-hidden="true"
                                                    className={`about-title-char inline-block origin-bottom ${isPrimary ? "text-primary" : "text-foreground"}`}
                                                    style={{ minWidth: char === " " ? "0.3em" : "auto" }}
                                                >
                                                    {char}
                                                </span>
                                            );
                                        })}
                                    </h2>
                                </TextReveal>

                                <div className="about-text font-sans text-base sm:text-lg text-foreground/75 leading-[1.8] mb-10 max-w-xl font-normal relative">
                                    <UnderlineDoodle className="absolute top-5 left-0 md:left-2 w-36 h-4 text-secondary pointer-events-none rotate-2" />
                                    <p>
                                        <span className="font-bold text-foreground">Backend developer</span> focused on building <span className="font-bold text-foreground">scalable APIs</span>, database-driven applications, and <span className="font-bold text-foreground">clean backend architecture</span> using <span className="font-bold text-primary">Java</span> and <span className="font-bold text-primary">Spring Boot</span>. Passionate about creating reliable systems while exploring modern backend technologies.
                                    </p>
                                </div>

                                {/* Toolkit */}
                                <div className="mt-10 about-text w-full">
                                    <p className="font-sans text-2xl uppercase tracking-[0.25em] text-subtle font-bold mb-3 text-center lg:text-left">Toolkit</p>
                                    <div className="flex flex-wrap gap-2 md:gap-2.5 max-w-xl justify-center lg:justify-start mx-auto lg:mx-0">
                                        {[
                                            { name: 'Java', icon: FaJava },
                                            { name: 'Spring Boot', icon: SiSpringboot },
                                            { name: 'REST API', icon: CgWebsite},
                                            { name: 'PostgreSQL', icon: SiPostgresql },
                                            { name: 'Hibernate', icon:SiHibernate},
                                            { name: 'React', icon: FaReact },
                                            { name: 'JavaScript', icon: FaJs },
                                            { name: 'TailwindCSS', icon: SiTailwindcss },
                                        ].map((skill, i) => (
                                            <div key={i} className="skill-card flex items-center gap-2 px-3 md:px-4 py-1.5 bg-card-bg brutal-border text-foreground font-chunky text-xs md:text-sm brutal-shadow-sm hover:brutal-shadow hover:-translate-y-1 hover:bg-primary transition-all duration-100 cursor-default">
                                                <skill.icon size={16} className="text-foreground shrink-0 " />
                                                <span className="font-bold">{skill.name}</span>
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
                        <h3 className="font-chunky text-4xl md:text-5xl mb-12 tracking-wide drop-shadow-sm text-center lg:text-left max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-wrap justify-center lg:justify-start overflow-visible relative" aria-label="Education">
                            <UnderlineDoodle className="absolute -bottom-5 left-1/2 lg:left-20 -translate-x-1/2 lg:translate-x-0 w-[200px] h-5 text-secondary pointer-events-none rotate-1 -z-10" />
                            {"EDUCATION".split("").map((char, index) => {
                                const isPrimary = index === 4 || index === 7; // 'A' and 'O'
                                return (
                                    <span
                                        key={index}
                                        aria-hidden="true"
                                        className={`edu-title-char inline-block origin-bottom will-change-transform ${isPrimary ? "text-primary" : "text-foreground"}`}
                                        style={{ minWidth: char === " " ? "0.3em" : "auto" }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </h3>
                    </TextReveal>

                    {/* Mobile: swipeable scroll / Desktop: flex wrap grid */}
                    <div className="overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 -mx-6 md:mx-0 no-scrollbar" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                        <div className="flex flex-nowrap md:flex-wrap gap-6 md:gap-8 px-12 md:px-12 lg:px-20 pt-8 pb-4 w-max md:w-auto md:max-w-7xl md:mx-auto">
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
                                        <div className={`relative bg-card-bg p-5 md:p-7 brutal-border brutal-shadow transition-transform duration-300 hover:brutal-shadow-lg hover:scale-[1.02] ${rotation} w-[220px] md:w-auto`}>

                                            <span className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground mb-3 bg-primary inline-block px-2 py-1 brutal-border shadow-sm">
                                                {edu.year}
                                            </span>
                                            <h4 className="font-chunky text-lg md:text-2xl text-foreground mb-1 leading-tight mt-2">
                                                {edu.degree}
                                            </h4>
                                            <p className="font-sans text-xs md:text-sm text-subtle font-medium leading-relaxed">
                                                {edu.institution}
                                            </p>
                                            {edu.detail && (
                                                <div className="mt-4 inline-block px-2.5 py-1 bg-card-bg text-foreground text-xs font-bold brutal-border brutal-shadow-sm">
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

