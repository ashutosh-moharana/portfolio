import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
    "h-note": { icon: <LuPenTool className="w-4 h-4 md:w-5 md:h-5" />, label: "Handwritten", colorClass: "text-[#C38661]" },
    "cheatsheet": { icon: <LuFileText className="w-4 h-4 md:w-5 md:h-5" />, label: "Cheat Sheet", colorClass: "text-[#D8C3B5]" },
    "my-note": { icon: <LuNotebook className="w-4 h-4 md:w-5 md:h-5" />, label: "My Notes", colorClass: "text-primary/80" },
    "note": { icon: <LuNotebook className="w-4 h-4 md:w-5 md:h-5" />, label: "Notes", colorClass: "text-primary" },
    "book": { icon: <LuBook className="w-4 h-4 md:w-5 md:h-5" />, label: "Book", colorClass: "text-subtle" },
};

const NoteCard = ({ resource, onOpenModal }) => {
    const style = typeStyles[resource.type] || typeStyles.note;
    const linkUrl = resource.fileUrl || resource.folderUrl || "#";
    
    // Randomize tape properties based on ID for an organic feel
    return (
        <TiltCard maxTilt={15} scale={1.04} className="archive-card w-[72vw] sm:w-full h-full snap-start shrink-0 will-change-transform">

            <div
                onClick={() => onOpenModal(resource)}
                onKeyDown={(e) => e.key === 'Enter' && onOpenModal(resource)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${resource.title}`}
                className="group relative flex flex-col justify-between p-4 md:p-8 bg-card-bg brutal-border brutal-shadow hover:-translate-y-1 hover:brutal-shadow-lg cursor-pointer h-full min-h-[170px] md:min-h-[220px] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary"
            >

                <div className="relative z-10 flex items-start justify-between w-full mt-1 md:mt-2">
                    <div className={`w-10 h-10 md:w-14 md:h-14  flex items-center justify-center ${style.colorClass} shrink-0 transition-transform duration-300 group-hover:scale-110 brutal-border shadow-[2px_2px_0px_var(--color-primary)]`}>
                        {style.icon}
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        <MagneticElement strength={20}>
                            <a
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-primary text-foreground brutal-border hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all shadow-[2px_2px_0px_var(--color-foreground)]"
                                title={resource.folderUrl ? "Open Folder" : "Open File"}
                            >
                                {resource.folderUrl ? <FiFolder className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" /> : <FiArrowUpRight className="w-3.5 h-3.5 md:w-[18px] md:h-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                            </a>
                        </MagneticElement>
                        <span className="text-[8px] md:text-[10px] font-chunky uppercase tracking-widest text-foreground bg-card-bg px-1.5 md:px-2 py-0.5 md:py-1 brutal-border shadow-sm whitespace-nowrap">
                            {resource.format} {resource.size ? `• ${resource.size}` : ""}
                        </span>
                    </div>
                </div>

                <div className="relative z-10 mt-auto pt-4 md:pt-8 flex flex-col w-full">
                    <h3 className="font-chunky text-lg md:text-3xl text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {resource.title}
                    </h3>
                    <span className="text-[10px] md:text-xs text-subtle font-sans mt-1 md:mt-2 flex items-center gap-2 uppercase tracking-widest font-bold opacity-70 group-hover:opacity-100 transition-opacity">
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
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEsc);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".modal-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
        tl.fromTo(".modal-content", 
            { y: 40, opacity: 0, rotationX: -10 }, 
            { y: 0, opacity: 1, rotationX: 0, duration: 0.5, ease: "back.out(1.2)" }, 
            "-=0.1"
        );
        tl.fromTo(".modal-stagger", 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }, 
            "-=0.2"
        );
    }, { scope: modalRef });

    return createPortal(
        <div ref={modalRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div
                className="modal-overlay absolute inset-0 bg-background/95"
                onClick={onClose}
            />

            <div
                className="modal-content relative w-full max-w-lg bg-card-bg brutal-border shadow-[8px_8px_0px_var(--color-foreground)] p-6 md:p-8"
            >

                <div className="modal-stagger flex items-start justify-between mb-6">
                    <div className={`w-12 h-12  flex items-center justify-center ${style.colorClass} brutal-border shadow-[2px_2px_0px_var(--color-foreground)]`}>
                        {style.icon}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-foreground hover:bg-primary transition-colors p-2 bg-card-bg brutal-border brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className="modal-stagger">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[10px] font-chunky uppercase tracking-widest text-foreground px-2 py-1 bg-primary brutal-border">
                            {style.label}
                        </span>
                        <span className="text-[10px] font-chunky uppercase tracking-widest text-foreground px-2 py-1 bg-card-bg brutal-border shadow-[2px_2px_0px_var(--color-secondary)]">
                            {resource.subject}
                        </span>
                        <span className="text-[10px] font-chunky uppercase tracking-widest text-foreground px-2 py-1 bg-card-bg brutal-border shadow-[2px_2px_0px_var(--color-secondary)]">
                            {resource.format} {resource.size ? `• ${resource.size}` : ""}
                        </span>
                    </div>
                    <h2 id="modal-title" className="text-3xl font-chunky text-foreground leading-tight mb-4">
                        {resource.title}
                    </h2>
                    <p className="text-base font-sans text-foreground/80 leading-relaxed mb-8">
                        {resource.description}
                    </p>
                </div>

                <div className="modal-stagger flex flex-col sm:flex-row gap-4">
                <div className="flex flex-wrap gap-4 pt-2">
                    <MagneticElement strength={15}>
                        <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-foreground font-chunky text-lg brutal-border shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)] transition-all"
                        >
                            {isFolder ? <FiFolder size={18} /> : <FiArrowUpRight size={18} />}
                            {isFolder ? "Open Folder" : "Open File"}
                        </a>
                    </MagneticElement>
                    {!isFolder && (
                        <MagneticElement strength={15}>
                            <a
                                href={getDownloadUrl(linkUrl)}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-card-bg text-foreground font-chunky text-lg brutal-border shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)] transition-all"
                            >
                                <LuDownload size={18} />
                                Download
                            </a>
                        </MagneticElement>
                    )}
                </div>
                </div>
            </div>
        </div>,
        document.body
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

        // Heading 3D flip animation
        gsap.fromTo(".archive-char",
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
                    start: "top 95%",
                    once: true
                }
            }
        );

        // Search bar reveal
        tl.fromTo(".archive-search-bar",
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" },
            "-=0.3"
        );

        // Background parallax
        gsap.to(".archive-bg-blob", {
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

        // 3D card flip entry on scroll
        const sections = gsap.utils.toArray(".category-section");
        sections.forEach((section) => {
            gsap.fromTo(section.querySelectorAll(".archive-card"),
                { y: isMobile ? 15 : 30, opacity: 0, scale: isMobile ? 1 : 0.98 },
                {
                    y: 0, opacity: 1,
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
        <div ref={containerRef} className="min-h-screen bg-background bg-dot-grid text-foreground pb-20 overflow-x-hidden relative">
            {/* Background elements */}
            <div className="archive-bg-blob absolute top-0 right-0 w-[35%] h-[50%] bg-secondary opacity-30 pointer-events-none rounded-full blur-3xl z-0 will-change-transform" />

            {/* Page Body */}
            <div className="px-6 md:px-12 lg:px-24 pt-32 md:pt-40 relative z-10 max-w-7xl mx-auto">

                {/* ── HERO & SEARCH ───────────────────────────────────────── */}
                <div
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20"
                >
                    <div className="max-w-2xl fade-up">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-chunky uppercase tracking-wide mb-4 md:mb-6 drop-shadow-sm flex flex-wrap overflow-hidden">
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
                        <p className="text-subtle text-base md:text-lg font-sans leading-relaxed">
                            A digital scrapbook of the best study notes, learning materials, and useful PDFs I've collected along the way.
                        </p>

                        {/* Notice & Direct Access */}
                        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 items-start sm:items-center bg-card-bg p-3 md:p-4 brutal-border brutal-shadow-sm">
                            <div className="flex-1 text-xs md:text-sm font-sans text-foreground/80 leading-relaxed">
                                <span className="text-primary font-bold mr-2 inline-flex items-center gap-1.5 bg-transparent px-1 brutal-border shadow-[2px_2px_0px_var(--color-foreground)]">
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
                                    className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-foreground font-chunky brutal-border brutal-shadow-sm hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all"
                                >
                                    <FiFolder size={16} />
                                    Root Folder
                                </a>
                            </MagneticElement>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="archive-search-bar relative w-full lg:w-80 shrink-0 group fade-up">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiSearch className="text-foreground transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search the archive..."
                            aria-label="Search the archive"
                            className="w-full bg-card-bg border-2 border-foreground focus:bg-primary/5 text-foreground font-chunky placeholder:text-foreground/50 pl-12 pr-4 py-3 text-base outline-none transition-colors shadow-[4px_4px_0px_var(--color-foreground)] hover:shadow-[6px_6px_0px_var(--color-foreground)] focus:shadow-[2px_2px_0px_var(--color-foreground)]"
                        />
                    </div>
                </div>

                {/* ── NOTES & CHEAT SHEETS ───────────────────────────────── */}
                <section>
                    <div
                        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative"
                    >
                        <div className="archive-search-bar">
                            <h2 className="text-2xl md:text-4xl font-display text-foreground">Collection</h2>
                        </div>
                        
                        {/* Filter Dropdown */}
                        <div className="relative group self-start md:self-auto">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                aria-expanded={isFilterOpen}
                                aria-haspopup="listbox"
                                aria-label="Filter archive by type"
                                className={`flex items-center gap-3 px-4 md:px-6 py-2.5 font-chunky text-sm md:text-base transition-all duration-300 border-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-primary ${
                                    isFilterOpen 
                                    ? "bg-muted text-foreground border-foreground shadow-[2px_2px_0px_var(--color-foreground)]" 
                                    : "bg-card-bg text-foreground border-foreground shadow-[4px_4px_0px_var(--color-foreground)] hover:bg-muted/40"
                                }`}
                            >
                                <FiFilter className={isFilterOpen ? "animate-pulse" : ""} />
                                <span>Filter: {FILE_FILTERS.find(f => f.value === activeFilter)?.label}</span>
                                <FiChevronDown className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isFilterOpen && (
                                <div className="absolute top-full left-0 md:left-auto md:right-0 mt-3 w-56 md:w-64 bg-card-bg border-2 border-foreground shadow-[6px_6px_0px_var(--color-foreground)] z-[60] py-3 overflow-hidden animate-in fade-in zoom-in duration-200">
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
                                                    ? "bg-muted text-foreground font-bold" 
                                                    : "text-foreground hover:bg-muted/60 hover:font-bold"
                                                }`}
                                            >
                                                <span className="font-chunky text-sm tracking-wide">{f.label}</span>
                                                <span className={`text-[10px] px-2 py-0.5 font-chunky font-bold brutal-border ${
                                                    isActive ? "bg-foreground text-background" : "bg-card-bg text-foreground shadow-[2px_2px_0px_var(--color-foreground)]"
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
                                        <div className="section-label flex items-center gap-4 mb-4 mt-6">
                                            <h3 className="text-xl md:text-3xl font-chunky uppercase text-background bg-foreground inline-block px-4 py-1 brutal-border shadow-sm">
                                                {style.label}
                                            </h3>
                                        </div>
                                        <div className="-mx-6 px-6 sm:mx-0 sm:px-0">
                                            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-8 sm:gap-6 overflow-x-auto sm:overflow-visible pb-8 sm:pb-0 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: "none" }}>
                                                {items.map((r) => (
                                                    <div key={r.id} className="min-w-[78%] sm:min-w-full snap-start h-full">
                                                        <NoteCard
                                                            resource={r}
                                                            onOpenModal={setSelectedResource}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
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
