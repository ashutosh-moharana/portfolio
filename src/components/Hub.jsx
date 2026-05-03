import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiX, FiSearch } from "react-icons/fi";
import Navbar from "./Navbar";
import {
    LuMap, LuCode, LuBook, LuEye, LuTerminal, LuGitBranch, LuFolder, LuLayers,
    LuActivity, LuCamera, LuMail, LuComponent, LuLayoutGrid, LuScissors, LuWind,
    LuLayoutDashboard, LuBrain, LuPresentation, LuPenTool, LuLock, LuSmile,
    LuDatabase, LuImage, LuMusic, LuGlobe
} from "react-icons/lu";

import websites from "../utils/websites";

const iconMap = {
    map: <LuMap size={20} />,
    code: <LuCode size={20} />,
    book: <LuBook size={20} />,
    eye: <LuEye size={20} />,
    terminal: <LuTerminal size={20} />,
    git: <LuGitBranch size={20} />,
    folder: <LuFolder size={20} />,
    layers: <LuLayers size={20} />,
    activity: <LuActivity size={20} />,
    camera: <LuCamera size={20} />,
    mail: <LuMail size={20} />,
    component: <LuComponent size={20} />,
    grid: <LuLayoutGrid size={20} />,
    scissors: <LuScissors size={20} />,
    wind: <LuWind size={20} />,
    layout: <LuLayoutDashboard size={20} />,
    brain: <LuBrain size={20} />,
    presentation: <LuPresentation size={20} />,
    pen: <LuPenTool size={20} />,
    lock: <LuLock size={20} />,
    smile: <LuSmile size={20} />,
    database: <LuDatabase size={20} />,
    image: <LuImage size={20} />,
    music: <LuMusic size={20} />,
    globe: <LuGlobe size={20} />,
};

const WebsiteCard = ({ resource, index, onOpenModal }) => {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const Icon = iconMap[resource.icon] || <LuGlobe size={20} />;
    
    return (
        <motion.button
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onClick={() => onOpenModal(resource)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            className="interactive group relative flex flex-col justify-between p-5 bg-secondary/50 border border-primary/20 hover:border-primary/80 transition-all duration-300 overflow-hidden min-h-[140px] md:min-h-[160px] snap-start shrink-0 min-w-[75vw] sm:min-w-0 text-left w-full"
        >
            {/* Spotlight Gradient */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{ background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--color-primary), 0.15), transparent 100%)` }}
            />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex items-start justify-between w-full">
                <div className="w-10 h-10 rounded-sm bg-background border border-primary/30 flex items-center justify-center text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all duration-500 shadow-[0_0_10px_rgba(var(--color-primary),0.1)] group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.3)] shrink-0">
                    {Icon}
                </div>
                
                {/* Quick Access Link */}
                <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-primary/5 hover:bg-primary/20 border border-primary/20 hover:border-primary rounded-sm transition-all duration-300 group/link shrink-0 z-20"
                    title="Visit Website"
                >
                    <FiArrowUpRight size={16} className="text-primary/70 group-hover/link:text-primary" />
                </a>
            </div>

            <div className="relative z-10 mt-auto pt-4 flex flex-col w-full">
                <h3 className="font-mono text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                    {resource.title}
                </h3>
                <span className="text-xs text-subtle font-mono tracking-wider uppercase mt-1">
                    {resource.subject}
                </span>
            </div>
            
            {/* Animated Bottom Line */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </motion.button>
    );
};

const HubModal = ({ resource, onClose }) => {
    const Icon = iconMap[resource.icon] || <LuGlobe size={24} />;
    
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-secondary border border-primary/30 shadow-[0_0_30px_rgba(var(--color-primary),0.1)] overflow-hidden"
            >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

                <div className="p-6 md:p-8 space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-sm bg-background border border-primary/50 text-primary flex items-center justify-center shadow-[inset_0_0_10px_rgba(var(--color-primary),0.1)]">
                            {Icon}
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-subtle hover:text-primary transition-colors p-1"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-primary px-2 py-0.5 border border-primary/20 bg-primary/10 rounded-sm">
                                {resource.category}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/60 px-2 py-0.5 border border-border bg-background rounded-sm">
                                {resource.subject}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-cinematic uppercase tracking-wider text-heading leading-tight mb-2">
                            {resource.title}
                        </h2>
                        <div className="h-px w-full bg-primary/10 mb-4" />
                        <p className="text-sm md:text-base font-mono text-subtle leading-relaxed">
                            {resource.description}
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <a 
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="interactive group/btn relative overflow-hidden flex items-center justify-center gap-2 px-6 py-3 bg-background text-primary border border-primary/50 font-mono text-sm uppercase tracking-widest hover:bg-primary/20 hover:border-primary transition-all duration-300 active:scale-95 w-full"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                            <FiArrowUpRight size={18} className="relative z-10" />
                            <span className="relative z-10">ACCESS NODE</span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Hub = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResource, setSelectedResource] = useState(null);

    const filteredWebsites = websites.filter(r => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (!r.title.toLowerCase().includes(query) && !r.subject.toLowerCase().includes(query) && !r.description.toLowerCase().includes(query)) return false;
        }
        return true;
    });

    const groupedWebsites = filteredWebsites.reduce((acc, curr) => {
        const cat = curr.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(curr);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Page Body */}
            <div className="px-6 md:px-12 lg:px-24 pt-24 md:pt-28 pb-16 md:pb-20 space-y-10 md:space-y-12 relative">

                {/* ── HERO & SEARCH ───────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
                >
                    <div>
                        <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary block animate-pulse" />
                            EXTERNAL NODES
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinematic uppercase tracking-widest text-heading leading-none">
                            HUB
                        </h1>
                        {/* Animated underline */}
                        <div className="relative border-b border-primary/20 pb-2 mt-2 overflow-hidden">
                            <motion.div
                                className="absolute left-0 bottom-0 h-[2px] bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: "40%" }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            />
                        </div>
                        <p className="text-foreground/40 text-xs md:text-sm font-mono tracking-wider mt-4 max-w-xl border-l-2 border-primary/30 pl-4 py-1">
                            An organized hub of powerful platforms and web resources I rely on daily, collected throughout my coding journey.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full lg:w-96 shrink-0 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-primary/50 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="> Search network nodes..._"
                            className="w-full bg-secondary/50 border-b border-primary/30 focus:border-primary text-foreground placeholder:text-subtle/50 pl-10 pr-4 py-3 font-mono text-sm md:text-base outline-none transition-colors"
                        />
                    </div>
                </motion.div>

                {/* ── WEBSITES LISTING ──────────────────────────────────────── */}
                <section className="space-y-16">
                    {Object.keys(groupedWebsites).length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center gap-4 py-20 text-center border border-dashed border-primary/20 bg-secondary/30"
                        >
                            <div className="w-16 h-16 flex items-center justify-center border border-primary/30 text-primary/50 relative overflow-hidden">
                                <motion.div 
                                    animate={{ y: ["0%", "-100%", "0%"] }} 
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    className="absolute inset-0 bg-primary/10"
                                />
                                <FiSearch size={24} className="relative z-10" />
                            </div>
                            <div className="font-mono space-y-1">
                                <p className="text-primary font-bold tracking-widest">[ERR_404]</p>
                                <p className="text-subtle text-sm">No data nodes found in this sector.</p>
                            </div>
                        </motion.div>
                    ) : (
                        Object.entries(groupedWebsites).map(([category, items], catIndex) => (
                            <div key={category} className="space-y-6">
                                <div className="flex items-center gap-4 border-b border-primary/10 pb-2">
                                    <h3 className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-primary">
                                        {category}
                                    </h3>
                                </div>
                                
                                <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory pr-6 sm:pr-0" style={{ scrollbarWidth: "none" }}>
                                    <AnimatePresence mode="popLayout">
                                        {items.map((r, i) => (
                                            <WebsiteCard 
                                                key={r.id} 
                                                resource={r} 
                                                index={i + catIndex * 5} 
                                                onOpenModal={setSelectedResource}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>

            <AnimatePresence>
                {selectedResource && (
                    <HubModal 
                        resource={selectedResource} 
                        onClose={() => setSelectedResource(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Hub;
