import { useState, useRef, useEffect } from "react";
import { FiArrowUpRight, FiX, FiSearch, FiInfo, FiFolder, FiFilter, FiChevronDown } from "react-icons/fi";
import { LuNotebook, LuFileText, LuBook, LuDownload, LuPenTool } from "react-icons/lu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useDevice } from "../contexts/DeviceContext";
import notes from "../utils/notes";
import { MagneticElement, TextReveal, TiltCard } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const getDownloadUrl = (url) => {
    if (!url) return "#";
    if (url.includes("drive.google.com/file/d/")) {
        const match = url.match(/\/d\/(.+?)\//);
        if (match && match[1]) {
            return `https://drive.google.com/uc?export=download&id=${match[1]}`;
        }
    }
    return url;
};

const FILE_FILTERS = [
    { label: "All", value: "all" },
    { label: "Handwritten", value: "h-note" },
    { label: "Cheat Sheets", value: "cheatsheet" },
    { label: "My Notes", value: "my-note" },
    { label: "Notes", value: "note" },
    { label: "Books", value: "book" },
];

const typeStyles = {
    "h-note": { icon: <LuPenTool size={20} />, label: "Handwritten", colorClass: "text-[#C38661]" },
    "cheatsheet": { icon: <LuFileText size={20} />, label: "Cheat Sheet", colorClass: "text-[#D8C3B5]" },
    "my-note": { icon: <LuNotebook size={20} />, label: "My Notes", colorClass: "text-primary/80" },
    "note": { icon: <LuNotebook size={20} />, label: "Notes", colorClass: "text-primary" },
    "book": { icon: <LuBook size={20} />, label: "Book", colorClass: "text-subtle" },
};

const NoteCard = ({ resource, onOpenModal }) => {
    const style = typeStyles[resource.type] || typeStyles.note;
    const linkUrl = resource.fileUrl || resource.folderUrl || "#";
    
    // Randomize tape properties based on ID for an organic feel
    const tapeRotations = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-4", "-rotate-1"];
    const tapeRotation = tapeRotations[resource.id % tapeRotations.length];
    const tapeOffsetX = resource.id % 2 === 0 ? "-translate-x-3" : "translate-x-2";

    return (
        <TiltCard maxTilt={15} scale={1.04} className="archive-card w-[80vw] sm:w-full h-full snap-start shrink-0 will-change-transform">
            {/* Masking Tape (placed outside clip-path so it doesn't get cut off) */}
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${tapeOffsetX} w-16 h-7 bg-secondary/60 z-30 ${tapeRotation}`}></div>

            <div
                onClick={() => onOpenModal(resource)}
                className="group relative flex flex-col justify-between p-6 md:p-8 bg-card-bg/90 backdrop-blur-xl border border-border/50 cursor-pointer h-full min-h-[220px] transition-shadow duration-500"
                style={{ clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)" }}
            >
                {/* Folded Corner */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary/20 to-card-bg shadow-[-4px_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-110 origin-top-right"></div>

                <div className="relative z-10 flex items-start justify-between w-full mt-2">
                    <div className={`w-14 h-14 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center ${style.colorClass} shrink-0 transition-transform duration-500 group-hover:scale-110 border border-border/40`}>
                        {style.icon}
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        <MagneticElement strength={20}>
                            <a
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                                title={resource.folderUrl ? "Open Folder" : "Open File"}
                            >
                                {resource.folderUrl ? <FiFolder size={18} /> : <FiArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                            </a>
                        </MagneticElement>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md border border-primary/20 whitespace-nowrap opacity-80">
                            {resource.format} {resource.size ? `• ${resource.size}` : ""}
                        </span>
                    </div>
                </div>

                <div className="relative z-10 mt-auto pt-8 flex flex-col w-full">
                    <h3 className="font-chunky text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {resource.title}
                    </h3>
                    <span className="text-xs text-subtle font-sans mt-2 flex items-center gap-2 uppercase tracking-widest font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                        {resource.subject}
                    </span>
                </div>
            </div>
        </TiltCard>
    );
};

const ResourceModal = ({ resource, onClose }) => {
    const style = typeStyles[resource.type] || typeStyles.note;
    const linkUrl = resource.fileUrl || resource.folderUrl || "#";
    const isFolder = !!resource.folderUrl;

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
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className="relative w-full max-w-lg bg-card-bg border-2 border-border/50 shadow-[12px_12px_0px_rgba(0,0,0,0.08)] rounded-md overflow-hidden p-6 md:p-8"
            >
                {/* Tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-secondary/90 rotate-2 shadow-sm z-20 border border-black/5" />

                <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center ${style.colorClass}`}>
                        {style.icon}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-subtle hover:text-foreground transition-colors p-1"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary px-2 py-1 bg-primary/10 rounded-sm">
                            {style.label}
                        </span>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-subtle px-2 py-1 bg-secondary rounded-sm">
                            {resource.subject}
                        </span>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-subtle px-2 py-1 bg-secondary rounded-sm">
                            {resource.format} {resource.size ? `• ${resource.size}` : ""}
                        </span>
                    </div>
                    <h2 className="text-3xl font-display text-foreground leading-tight mb-4">
                        {resource.title}
                    </h2>
                    <p className="text-base font-sans text-subtle leading-relaxed mb-8">
                        {resource.description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-wrap gap-4 pt-2">
                    <MagneticElement strength={15}>
                        <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-chunky text-lg rounded-xl shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)] transition-all"
                        >
                            {isFolder ? <FiFolder size={18} /> : <FiArrowUpRight size={18} />}
                            {isFolder ? "Open Folder" : "Open File"}
                        </a>
                    </MagneticElement>
                    {!isFolder && (
                        <MagneticElement strength={15}>
                            <a
                                href={getDownloadUrl(linkUrl)}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground font-chunky text-lg rounded-xl hover:bg-[#D8C3B5] transition-colors"
                            >
                                <LuDownload size={18} />
                                Download
                            </a>
                        </MagneticElement>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

const Archive = () => {
    const containerRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResource, setSelectedResource] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const isMobile = useDevice();

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".fade-up",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.1 }
        );

        if (isMobile) {
            gsap.fromTo(".archive-char",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: ".archive-char",
                        start: "top 90%",
                        once: true
                    }
                }
            );
        } else {
            tl.fromTo(".archive-char",
                { y: 60, opacity: 0, rotationX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: ".archive-char",
                        start: "top 90%",
                        once: true
                    }
                }
            );
        }

        // 3D card flip entry on scroll
        const sections = gsap.utils.toArray(".category-section");
        sections.forEach((section) => {
            gsap.fromTo(section.querySelectorAll(".archive-card"),
                { y: isMobile ? 15 : 30, opacity: 0, scale: isMobile ? 1 : 0.98 },
                {
                    y: 0, opacity: 1,
                    scale: 1,
                    duration: isMobile ? 0.5 : 0.8,
                    stagger: isMobile ? 0 : 0.05,
                    ease: "power2.out",
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

    const filteredFiles = notes.filter(r => {
        if (activeFilter !== "all" && r.type !== activeFilter) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (!r.title.toLowerCase().includes(query) && !r.subject.toLowerCase().includes(query)) return false;
        }
        return true;
    });

    const typeOrder = ["h-note", "cheatsheet", "my-note", "note", "book"];

    const groupedFiles = filteredFiles.reduce((acc, curr) => {
        const type = curr.type;
        if (!acc[type]) acc[type] = [];
        acc[type].push(curr);
        return acc;
    }, {});

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-foreground pb-20 overflow-x-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-secondary opacity-30 pointer-events-none rounded-full blur-3xl z-0" />

            {/* Page Body */}
            <div className="px-6 md:px-12 lg:px-24 pt-32 md:pt-40 relative z-10 max-w-7xl mx-auto">

                {/* ── HERO & SEARCH ───────────────────────────────────────── */}
                <div
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20"
                >
                    <div className="max-w-2xl fade-up">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-chunky uppercase tracking-wide mb-6 drop-shadow-sm flex flex-wrap overflow-hidden">
                            {"ARCHIVE".split("").map((char, index) => {
                                const isPrimary = index === 1 || index === 5; // 'R' and 'V' in ARCHIVE
                                return (
                                    <span
                                        key={index}
                                        className={`archive-char inline-block origin-bottom will-change-transform ${isPrimary ? "text-primary" : "text-foreground"}`}
                                        style={{ minWidth: char === " " ? "0.3em" : "auto" }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </h1>
                        <p className="text-subtle text-lg font-sans leading-relaxed">
                            A digital scrapbook of the best study notes, learning materials, and useful PDFs I've collected along the way.
                        </p>

                        {/* Notice & Direct Access */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-card-bg p-4 rounded-md shadow-sm border border-border/40">
                            <div className="flex-1 text-sm font-sans text-subtle leading-relaxed">
                                <span className="text-primary font-bold mr-2 inline-flex items-center gap-1.5">
                                    <FiInfo size={16} />
                                    Tip:
                                </span>
                                Files are high quality and uncompressed. You can preview them here or download them directly.
                            </div>
                            <MagneticElement strength={15}>
                                <a
                                    href="https://drive.google.com/drive/folders/18ZpcXJCSQGKq663thA-D8toZXgBX7J0F?usp=drive_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-background text-foreground font-chunky rounded-md hover:bg-primary hover:text-white transition-colors border border-border/50"
                                >
                                    <FiFolder size={16} />
                                    Root Folder
                                </a>
                            </MagneticElement>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full lg:w-80 shrink-0 group fade-up">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiSearch className="text-subtle group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search the archive..."
                            className="w-full bg-card-bg border-2 border-border/40 rounded-md focus:border-primary text-foreground placeholder:text-subtle/60 pl-12 pr-4 py-3 font-sans text-base outline-none transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.05)]"
                        />
                    </div>
                </div>

                {/* ── NOTES & CHEAT SHEETS ───────────────────────────────── */}
                <section>
                    <div
                        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative"
                    >
                        <div>
                            <h2 className="text-4xl font-display text-foreground">Collection</h2>
                        </div>
                        
                        {/* Filter Dropdown */}
                        <div className="relative group self-start md:self-auto">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-3 px-6 py-2.5 font-chunky text-base rounded-xl transition-all duration-300 border shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_rgba(0,0,0,0.1)] ${
                                    isFilterOpen 
                                    ? "bg-primary text-primary-foreground border-primary" 
                                    : "bg-card-bg/80 backdrop-blur-xl text-foreground border-border hover:border-primary"
                                }`}
                            >
                                <FiFilter className={isFilterOpen ? "animate-pulse" : ""} />
                                <span>Filter: {FILE_FILTERS.find(f => f.value === activeFilter)?.label}</span>
                                <FiChevronDown className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isFilterOpen && (
                                <div className="absolute top-full left-0 md:left-auto md:right-0 mt-3 w-64 bg-card-bg/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[60] py-3 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {FILE_FILTERS.map((f) => {
                                        const count = f.value === "all" ? notes.length : notes.filter(r => r.type === f.value).length;
                                        const isActive = activeFilter === f.value;
                                        return (
                                            <button
                                                key={f.value}
                                                onClick={() => {
                                                    setActiveFilter(f.value);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-6 py-3 text-left transition-colors ${
                                                    isActive 
                                                    ? "bg-primary/10 text-primary font-bold" 
                                                    : "text-subtle hover:bg-secondary/30 hover:text-foreground"
                                                }`}
                                            >
                                                <span className="font-sans text-sm tracking-wide">{f.label}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-sans font-bold ${
                                                    isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-subtle"
                                                }`}>
                                                    {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {filteredFiles.length === 0 ? (
                        <div
                            className="flex flex-col items-center justify-center gap-4 py-24 text-center bg-card-bg rounded-xl border border-dashed border-border/50"
                        >
                            <div className="w-16 h-16 flex items-center justify-center bg-secondary rounded-full text-subtle">
                                <FiSearch size={28} />
                            </div>
                            <div className="font-sans space-y-2">
                                <p className="text-foreground font-chunky text-xl">Nothing found</p>
                                <p className="text-subtle">Try adjusting your search or filters.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {typeOrder.map((type) => {
                                const items = groupedFiles[type];
                                if (!items || items.length === 0) return null;

                                const style = typeStyles[type] || typeStyles.note;
                                return (
                                    <div key={type} className="category-section space-y-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <h3 className="text-3xl font-display text-primary">
                                                {style.label}
                                            </h3>
                                        </div>
                                        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-8 overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 snap-x snap-mandatory pr-6 sm:pr-0 pt-4 no-scrollbar" style={{ scrollbarWidth: "none" }}>
                                            {items.map((r) => (
                                                <NoteCard
                                                    key={r.id}
                                                    resource={r}
                                                    onOpenModal={setSelectedResource}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>

            {selectedResource && (
                <ResourceModal
                    resource={selectedResource}
                    onClose={() => setSelectedResource(null)}
                />
            )}
        </div>
    );
};

export default Archive;
