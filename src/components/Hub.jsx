import { useState, useRef, useEffect } from "react";
import { FiArrowUpRight, FiX, FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

import {
    LuMap, LuCode, LuBook, LuEye, LuTerminal, LuGitBranch, LuFolder, LuLayers,
    LuActivity, LuCamera, LuMail, LuComponent, LuLayoutGrid, LuScissors, LuWind,
    LuLayoutDashboard, LuBrain, LuPresentation, LuPenTool, LuLock, LuSmile,
    LuDatabase, LuImage, LuMusic, LuGlobe
} from "react-icons/lu";

import websites from "../utils/websites";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import { MagneticElement, TextReveal, TiltCard } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    map: <LuMap className="w-5 h-5 md:w-6 md:h-6" />,
    code: <LuCode className="w-5 h-5 md:w-6 md:h-6" />,
    book: <LuBook className="w-5 h-5 md:w-6 md:h-6" />,
    eye: <LuEye className="w-5 h-5 md:w-6 md:h-6" />,
    terminal: <LuTerminal className="w-5 h-5 md:w-6 md:h-6" />,
    git: <LuGitBranch className="w-5 h-5 md:w-6 md:h-6" />,
    folder: <LuFolder className="w-5 h-5 md:w-6 md:h-6" />,
    layers: <LuLayers className="w-5 h-5 md:w-6 md:h-6" />,
    activity: <LuActivity className="w-5 h-5 md:w-6 md:h-6" />,
    camera: <LuCamera className="w-5 h-5 md:w-6 md:h-6" />,
    mail: <LuMail className="w-5 h-5 md:w-6 md:h-6" />,
    component: <LuComponent className="w-5 h-5 md:w-6 md:h-6" />,
    grid: <LuLayoutGrid className="w-5 h-5 md:w-6 md:h-6" />,
    scissors: <LuScissors className="w-5 h-5 md:w-6 md:h-6" />,
    wind: <LuWind className="w-5 h-5 md:w-6 md:h-6" />,
    layout: <LuLayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />,
    brain: <LuBrain className="w-5 h-5 md:w-6 md:h-6" />,
    presentation: <LuPresentation className="w-5 h-5 md:w-6 md:h-6" />,
    pen: <LuPenTool className="w-5 h-5 md:w-6 md:h-6" />,
    lock: <LuLock className="w-5 h-5 md:w-6 md:h-6" />,
    smile: <LuSmile className="w-5 h-5 md:w-6 md:h-6" />,
    database: <LuDatabase className="w-5 h-5 md:w-6 md:h-6" />,
    image: <LuImage className="w-5 h-5 md:w-6 md:h-6" />,
    music: <LuMusic className="w-5 h-5 md:w-6 md:h-6" />,
    globe: <LuGlobe className="w-5 h-5 md:w-6 md:h-6" />,
};

const WebsiteCard = ({ resource, onOpenModal }) => {
    const Icon = iconMap[resource.icon] || <LuGlobe className="w-5 h-5 md:w-6 md:h-6" />;

    return (
        <TiltCard maxTilt={10} scale={1.03} className="website-card w-[72vw] sm:w-full h-full snap-start shrink-0 will-change-transform">
            <div
                onClick={() => onOpenModal(resource)}
                className="group relative flex flex-col justify-between p-4 md:p-8 bg-card-bg border border-white/10 hover:border-white/20 rounded-[1.5rem] md:rounded-[2rem] cursor-pointer h-full min-h-[180px] md:min-h-[240px] overflow-hidden transition-all duration-500"
            >
                {/* Dynamic Radial Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="absolute -inset-4 bg-gradient-to-tr from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 z-0 pointer-events-none"></div>

                <div className="relative z-10 flex items-start justify-between w-full">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-secondary/90 to-secondary flex items-center justify-center text-primary shrink-0 transition-all duration-500 group-hover:scale-110 border border-white/5">
                        {Icon}
                    </div>

                    <div className="opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <MagneticElement strength={20}>
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                                title="Visit Website"
                            >
                                <FiArrowUpRight className="w-3.5 h-3.5 md:w-[18px] md:h-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </MagneticElement>
                    </div>
                </div>

                <div className="relative z-10 mt-auto pt-4 md:pt-8 flex flex-col w-full">
                    <span className="text-[9px] md:text-xs text-primary font-sans font-bold uppercase tracking-widest mb-1 md:mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {resource.subject}
                    </span>
                    <h3 className="font-chunky text-lg md:text-3xl text-foreground leading-tight line-clamp-2">
                        {resource.title}
                    </h3>
                </div>
            </div>
        </TiltCard>
    );
};

const HubModal = ({ resource, onClose }) => {
    const Icon = iconMap[resource.icon] || <LuGlobe size={28} />;

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-background/95"
                onClick={onClose}
            />

            <div
                className="relative w-full max-w-lg bg-card-bg border border-border/40 shadow-xl rounded-2xl overflow-hidden p-6 md:p-8"
            >
                <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-inner">
                        {Icon}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-subtle hover:text-foreground transition-colors p-2 bg-background rounded-full hover:bg-secondary"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full">
                            {resource.category}
                        </span>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-subtle px-3 py-1 bg-secondary rounded-full">
                            {resource.subject}
                        </span>
                    </div>
                    <h2 className="text-3xl font-chunky text-foreground mb-4">
                        {resource.title}
                    </h2>
                    <p className="text-base font-sans text-subtle leading-relaxed mb-8">
                        {resource.description}
                    </p>
                </div>

                <div className="flex pt-2">
                    <MagneticElement strength={15}>
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white font-chunky text-xl rounded-xl shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)] transition-all"
                        >
                            Visit Website
                            <FiArrowUpRight size={20} />
                        </a>
                    </MagneticElement>
                </div>
            </div>
        </div>
    );
};

const Hub = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResource, setSelectedResource] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const containerRef = useRef(null);
    const isMobile = useDevice();

    const categories = ["All", ...new Set(websites.map(r => r.category))];

    useGSAP(() => {
        // Heading letter-by-letter animation
        if (isMobile) {
            gsap.fromTo(".hub-char",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.04,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".hub-char",
                        start: "top 90%",
                        once: true
                    }
                }
            );
        } else {
            gsap.fromTo(".hub-char",
                { y: 60, opacity: 0, rotationX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: ".hub-char",
                        start: "top 90%",
                        once: true
                    }
                }
            );
        }

        // Search bar reveal
        gsap.fromTo(".hub-search-bar",
            { y: 15, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.4, stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".hub-search-bar",
                    start: "top 95%",
                    once: true
                }
            }
        );

        // Background parallax
        gsap.to(".hub-bg-blob", {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        // Section label slide-in
        gsap.utils.toArray(".category-section").forEach((section) => {
            const label = section.querySelector(".section-label");
            if (label) {
                gsap.fromTo(label,
                    { x: -20, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        duration: 0.4,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 90%",
                            once: true,
                        }
                    }
                );
            }
        });

        // Card entrance per section
        const sections = gsap.utils.toArray(".category-section");
        sections.forEach((section) => {
            gsap.fromTo(section.querySelectorAll(".website-card"),
                { opacity: 0, y: isMobile ? 15 : 30, scale: isMobile ? 1 : 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: isMobile ? 0.4 : 0.5,
                    stagger: isMobile ? 0 : 0.05,
                    ease: "power3.out",
                    force3D: true,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        once: true
                    }
                }
            );
        });
    }, { scope: containerRef });

    const filteredWebsites = websites.filter(r => {
        const matchesSearch = !searchQuery || (
            r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            r.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
            r.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const matchesCategory = activeFilter === "All" || r.category === activeFilter;
        return matchesSearch && matchesCategory;
    });

    const groupedWebsites = filteredWebsites.reduce((acc, curr) => {
        const cat = curr.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(curr);
        return acc;
    }, {});

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-foreground pb-20 relative overflow-hidden">

            {/* Background elements */}
            <div className="hub-bg-blob absolute top-[20%] left-0 w-[30%] h-[40%] bg-primary opacity-10 pointer-events-none rounded-full blur-[100px] z-0 will-change-transform" />

            {/* Page Body */}
            <div className="px-6 md:px-12 lg:px-24 pt-32 md:pt-40 relative z-10 max-w-7xl mx-auto">

                {/* ── HERO & SEARCH ───────────────────────────────────────── */}
                <div
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20"
                >
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-7xl font-chunky uppercase tracking-wide mb-4 md:mb-6 flex flex-wrap overflow-hidden">
                            {"HUB".split("").map((char, index) => {
                                const isPrimary = index === 1; // The letter 'U'
                                return (
                                    <span
                                        key={index}
                                        className={`hub-char inline-block origin-bottom will-change-transform ${isPrimary ? "text-primary" : "text-foreground"}`}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </h1>
                        <p className="text-subtle text-base md:text-lg font-sans leading-relaxed">
                            A curated collection of my favorite tools, platforms, and digital resources I use every day.
                        </p>
                    </div>

                    {/* Search & Filter Container */}
                    <div className="hub-search-bar flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0 relative z-[40]">
                        {/* Filter Dropdown */}
                        <div className="relative w-full sm:w-48 z-[50]">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`w-full flex items-center justify-between px-5 py-3 font-chunky text-sm rounded-xl transition-all duration-300 border shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_rgba(0,0,0,0.1)] ${
                                    isFilterOpen
                                        ? "bg-primary text-white border-primary"
                                        : "bg-card-bg text-foreground border-border hover:border-primary"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <FiFilter className={isFilterOpen ? "animate-pulse" : ""} />
                                    <span className="truncate max-w-[100px]">{activeFilter}</span>
                                </div>
                                <FiChevronDown className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-3 w-64 bg-card-bg border border-border/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[60] py-3 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {categories.map((cat) => {
                                        const isActive = activeFilter === cat;
                                        const count = cat === "All" ? websites.length : websites.filter(r => r.category === cat).length;
                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setActiveFilter(cat);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-6 py-3 text-left transition-colors ${
                                                    isActive
                                                        ? "bg-primary/10 text-primary font-bold"
                                                        : "text-subtle hover:bg-secondary/30 hover:text-foreground"
                                                }`}
                                            >
                                                <span className="font-sans text-xs tracking-wide">{cat}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-sans font-bold ${
                                                    isActive ? "bg-primary text-white" : "bg-secondary text-subtle"
                                                }`}>
                                                    {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-80 shrink-0 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiSearch className="text-subtle group-focus-within:text-primary transition-colors" />
                            </div>
                            <MagneticElement strength={10}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Find a resource..."
                                    className="w-full bg-card-bg border border-border/50 rounded-xl focus:border-primary text-foreground placeholder:text-subtle/60 pl-12 pr-4 py-3 font-sans text-base outline-none transition-colors shadow-sm"
                                />
                            </MagneticElement>
                        </div>
                    </div>
                </div>

                {/* ── WEBSITES LISTING ──────────────────────────────────────── */}
                <section className="space-y-16">
                    {Object.keys(groupedWebsites).length === 0 ? (
                        <div
                            className="flex flex-col items-center justify-center gap-4 py-24 text-center bg-card-bg rounded-xl border border-dashed border-border/50"
                        >
                            <div className="w-16 h-16 flex items-center justify-center bg-secondary rounded-full text-subtle">
                                <FiSearch size={28} />
                            </div>
                            <div className="font-sans space-y-2">
                                <p className="text-foreground font-chunky text-xl">No resources found</p>
                                <p className="text-subtle">Try adjusting your search criteria.</p>
                            </div>
                        </div>
                    ) : (
                        Object.entries(groupedWebsites).map(([category, items]) => (
                            <div key={category} className="category-section space-y-6">
                                <div className="section-label flex items-center gap-4 mb-4">
                                    <h3 className="text-xl md:text-3xl font-display text-primary">
                                        {category}
                                    </h3>
                                </div>

                                <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-8 sm:gap-6 overflow-x-auto sm:overflow-visible pb-8 sm:pb-0 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: "none" }}>
                                    {items.map((r) => (
                                        <div key={r.id} className="min-w-[78%] sm:min-w-full snap-start h-full">
                                            <WebsiteCard
                                                resource={r}
                                                onOpenModal={setSelectedResource}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>

            {selectedResource && (
                <HubModal
                    resource={selectedResource}
                    onClose={() => setSelectedResource(null)}
                />
            )}
        </div>
    );
};

export default Hub;
