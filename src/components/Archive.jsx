import { useState, useRef, useEffect } from "react";
import { FiArrowUpRight, FiX, FiSearch, FiInfo, FiFolder } from "react-icons/fi";
import { LuNotebook, LuFileText, LuBook, LuDownload, LuPenTool } from "react-icons/lu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import notes from "../utils/notes";

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
    "h-note":    { icon: <LuPenTool size={20} />,    label: "Handwritten", colorClass: "text-[#C38661]" },
    "cheatsheet":{ icon: <LuFileText size={20} />,   label: "Cheat Sheet", colorClass: "text-[#D8C3B5]" },
    "my-note":   { icon: <LuNotebook size={20} />,   label: "My Notes",    colorClass: "text-primary/80" },
    "note":      { icon: <LuNotebook size={20} />,   label: "Notes",       colorClass: "text-primary" },
    "book":      { icon: <LuBook size={20} />,       label: "Book",        colorClass: "text-subtle" },
};

const NoteCard = ({ resource, onOpenModal }) => {
    const style = typeStyles[resource.type] || typeStyles.note;
    const linkUrl = resource.fileUrl || resource.folderUrl || "#";
    
    return (
        <div
            onClick={() => onOpenModal(resource)}
            className="archive-card group relative flex flex-col justify-between p-6 bg-card-bg border border-border/50 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] hover:shadow-[8px_8px_0px_var(--color-primary)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 rounded-sm cursor-pointer min-h-[160px] snap-start shrink-0 w-[85vw] sm:w-full"
        >
            {/* Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-border/80 backdrop-blur-sm -rotate-2 mix-blend-multiply shadow-sm z-20" />
            
            <div className="relative z-10 flex items-start justify-between w-full">
                <div className={`w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center ${style.colorClass} shrink-0`}>
                    {style.icon}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-sm whitespace-nowrap hidden sm:inline-block">
                        {resource.format} {resource.size ? `• ${resource.size}` : ""}
                    </span>
                    
                    <a 
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-secondary text-foreground hover:bg-primary hover:text-white rounded-full transition-colors z-20"
                        title={resource.folderUrl ? "Open Folder" : "Open File"}
                    >
                        {resource.folderUrl ? <FiFolder size={16} /> : <FiArrowUpRight size={16} />}
                    </a>
                </div>
            </div>

            <div className="relative z-10 mt-auto pt-6 flex flex-col w-full">
                <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {resource.title}
                </h3>
                <span className="text-sm text-subtle font-sans mt-1 flex items-center gap-2">
                    {resource.subject}
                </span>
            </div>
        </div>
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-border/80 backdrop-blur-sm rotate-2 mix-blend-multiply shadow-sm z-20" />

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
                    <a 
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-chunky text-lg rounded-xl shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)] transition-all"
                    >
                        {isFolder ? <FiFolder size={18} /> : <FiArrowUpRight size={18} />}
                        {isFolder ? "Open Folder" : "Open File"}
                    </a>
                    {!isFolder && (
                        <a 
                            href={getDownloadUrl(linkUrl)}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground font-chunky text-lg rounded-xl hover:bg-[#D8C3B5] transition-colors"
                        >
                            <LuDownload size={18} />
                            Download
                        </a>
                    )}
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

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".fade-up",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.1 }
        );

        gsap.utils.toArray(".archive-card").forEach((card) => {
            gsap.fromTo(card,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%",
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
        <div ref={containerRef} className="min-h-screen bg-background text-foreground pb-20">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-secondary opacity-30 pointer-events-none rounded-full blur-3xl z-0" />

            {/* Page Body */}
            <div className="px-6 md:px-12 lg:px-24 pt-32 md:pt-40 relative z-10 max-w-7xl mx-auto">

                {/* ── HERO & SEARCH ───────────────────────────────────────── */}
                <div
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20"
                >
                    <div className="max-w-2xl fade-up">
                        <h1 className="text-6xl sm:text-7xl lg:text-[5rem] font-chunky uppercase tracking-wide mb-6 drop-shadow-sm">
                            <span className="text-foreground">MY A</span>
                            <span className="text-primary">R</span>
                            <span className="text-foreground">CHI</span>
                            <span className="text-primary">V</span>
                            <span className="text-foreground">E</span>
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
                            <a 
                                href="https://drive.google.com/drive/folders/18ZpcXJCSQGKq663thA-D8toZXgBX7J0F?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-background text-foreground font-chunky rounded-md hover:bg-primary hover:text-white transition-colors border border-border/50"
                            >
                                <FiFolder size={16} />
                                Root Folder
                            </a>
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
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative"
                    >
                        <div>
                            <h2 className="text-4xl font-display text-foreground">Collection</h2>
                        </div>
                        {/* Filter tabs */}
                        <div className="flex flex-nowrap md:flex-wrap gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 snap-x snap-mandatory pr-6 md:pr-0" style={{ scrollbarWidth: "none" }}>
                            {FILE_FILTERS.map((f) => {
                                const count = f.value === "all" ? notes.length : notes.filter(r => r.type === f.value).length;
                                const isActive = activeFilter === f.value;
                                return (
                                    <button
                                        key={f.value}
                                        onClick={() => setActiveFilter(f.value)}
                                        className={`relative flex items-center gap-2 px-5 py-2.5 font-chunky text-sm rounded-sm transition-all duration-300 snap-start shrink-0 border-2 ${
                                            isActive
                                                ? "bg-foreground text-background border-foreground shadow-[3px_3px_0px_var(--color-primary)] -translate-y-1"
                                                : "bg-card-bg text-subtle hover:text-foreground border-border/40 hover:border-foreground hover:shadow-[3px_3px_0px_var(--color-primary)] hover:-translate-y-1"
                                        }`}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {f.label}
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-sans font-bold transition-colors ${isActive ? "bg-primary text-white" : "bg-secondary text-subtle"}`}>{count}</span>
                                        </span>
                                    </button>
                                );
                            })}
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
                                    <div key={type} className="space-y-6">
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-2xl font-display text-primary">
                                                {style.label}
                                            </h3>
                                        </div>
                                        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 snap-x snap-mandatory pr-6 sm:pr-0" style={{ scrollbarWidth: "none" }}>
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
