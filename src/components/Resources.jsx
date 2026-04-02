import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowLeft, FiExternalLink } from "react-icons/fi";
import {
    LuNotebook, LuFileText, LuGlobe, LuMap, LuCode, LuBook,
    LuEye, LuTerminal, LuGitBranch, LuFolder, LuLayers,
    LuActivity, LuCamera, LuMail, LuComponent, LuLayoutGrid,
    LuScissors, LuWind, LuLayoutDashboard, LuBrain, LuPresentation,
    LuPenTool, LuLock, LuSmile, LuDatabase, LuImage, LuMusic
} from "react-icons/lu";


import notes from "../utils/notes";
import websites from "../utils/websites";


const FILE_FILTERS = [
    { label: "All", value: "all" },
    { label: "My Notes", value: "my-note" },
    { label: "Notes", value: "note" },
    { label: "Cheat Sheets", value: "cheatsheet" },
    { label: "Books", value: "book" },
];


const typeStyles = {
    "my-note": { icon: <LuNotebook size={18} />, label: "Personal Note", colorClass: "text-primary bg-primary/10 border-primary/20" },
    note: { icon: <LuBook size={18} />, label: "Study Note", colorClass: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    cheatsheet: { icon: <LuFileText size={18} />, label: "Cheat Sheet", colorClass: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    book: { icon: <LuBook size={18} />, label: "Reference Book", colorClass: "text-rose-400 bg-rose-400/10 border-rose-400/20" },
};


const iconMap = {
    map: <LuMap size={18} />,
    code: <LuCode size={18} />,
    book: <LuBook size={18} />,
    eye: <LuEye size={18} />,
    terminal: <LuTerminal size={18} />,
    git: <LuGitBranch size={18} />,
    folder: <LuFolder size={18} />,
    layers: <LuLayers size={18} />,
    activity: <LuActivity size={18} />,
    camera: <LuCamera size={18} />,
    mail: <LuMail size={18} />,
    component: <LuComponent size={18} />,
    grid: <LuLayoutGrid size={18} />,
    scissors: <LuScissors size={18} />,

    wind: <LuWind size={18} />,
    layout: <LuLayoutDashboard size={18} />,
    brain: <LuBrain size={18} />,

    presentation: <LuPresentation size={18} />,
    pen: <LuPenTool size={18} />,
    lock: <LuLock size={18} />,
    smile: <LuSmile size={18} />,
    database: <LuDatabase size={18} />,
    image: <LuImage size={18} />,
    music: <LuMusic size={18} />,
    globe: <LuGlobe size={18} />,
};


// Minimal list row for notes and cheatsheets with images
const NoteRow = ({ resource, index }) => {
    const style = typeStyles[resource.type] || typeStyles.note;
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, delay: index * 0.02, ease: "easeOut" }}

            className="group relative flex items-center gap-4 p-3 bg-muted/5 border border-border/40 rounded-xl hover:border-primary/40 hover:bg-muted/10 transition-all duration-300"
        >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border/40 shrink-0 bg-muted/20">
                {resource.imageUrl ? (
                    <img
                        src={resource.imageUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${style.colorClass}`}>
                        {style.icon}
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-subtle">{resource.subject}</span>
                </div>
                <h3 className="text-base font-bold tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
                    {resource.title}
                </h3>
                {resource.tags && (
                    <div className="flex flex-wrap gap-2 mt-1.5">
                        {resource.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[9px] px-2 py-0.5 bg-muted/50 text-subtle rounded-md border border-border/30">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <a
                href={resource.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive flex items-center justify-center w-10 h-10 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary hover:text-background transition-all duration-300 shrink-0"
            >
                <FiArrowUpRight size={18} />
            </a>
        </motion.div>
    );
};


// Pill-style link for websites (like About's profile/skills section)
const WebsitePill = ({ resource, index }) => {
    const Icon = iconMap[resource.icon] || <LuGlobe size={18} />;
    return (
        <motion.a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, delay: index * 0.02, ease: "easeOut" }}

            className="interactive group flex items-center gap-3 px-5 py-3 bg-muted/50 text-foreground rounded-full border border-border/50 hover:border-emerald-400/60 hover:bg-emerald-400/5 transition-all duration-300 ease-out active:scale-[0.97]"
        >
            <span className="text-emerald-400/60 group-hover:text-emerald-400 transition-colors shrink-0">
                {Icon}
            </span>
            <div className="flex flex-col leading-tight">
                <span className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">{resource.title}</span>
                <span className="text-xs text-subtle font-mono">{resource.subject}</span>
            </div>
            <FiExternalLink
                size={13}
                className="ml-auto text-subtle opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-emerald-400 transition-all duration-300"
            />
        </motion.a>
    );
};


const Resources = () => {
    const [activeFilter, setActiveFilter] = useState("all");

    const fileResources = notes;
    const websiteResources = websites;


    const filteredFiles = activeFilter === "all"
        ? fileResources
        : fileResources.filter(r => r.type === activeFilter);

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* Page Header */}
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md bg-background/80 border-b border-border/30"
            >
                <Link
                    to="/"
                    className="interactive group flex items-center gap-2 text-sm font-bold tracking-widest hover:text-primary transition-colors"
                >
                    <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    PORTFOLIO
                </Link>
                <div className="flex items-center gap-2">
                    <img src="/logo.webp" alt="Logo" className="h-8 w-8" />
                    <span className="text-heading font-bold text-lg tracking-wider">ASHU</span>
                </div>
                <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase opacity-70 hidden md:block">Resources</span>
            </motion.header>

            {/* Page Body */}
            <div className="px-6 md:px-12 lg:px-24 py-16 md:py-20 space-y-20">

                {/* ── HERO ───────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                        Curated Collection
                    </span>
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-heading leading-none">
                        Resources
                    </h1>
                    <p className="text-subtle text-lg md:text-xl font-light tracking-wide mt-6 max-w-xl">
                        My handwritten notes, cheat sheets, and cool websites — everything I found useful on my journey.
                    </p>
                </motion.div>

                {/* ── NOTES & CHEAT SHEETS ───────────────────────────────── */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 pb-4 border-b border-border/30"
                    >
                        <div>
                            <span className="text-primary font-mono text-xs tracking-widest uppercase opacity-70 mb-1 block">// Study Material</span>
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-heading">Notes & Cheat Sheets</h2>
                        </div>
                        {/* Filter tabs */}
                        <div className="flex flex-wrap gap-2">
                            {FILE_FILTERS.map((f) => {
                                const count = f.value === "all" ? fileResources.length : fileResources.filter(r => r.type === f.value).length;
                                return (
                                    <button
                                        key={f.value}
                                        onClick={() => setActiveFilter(f.value)}
                                        className={`interactive flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs tracking-wide border transition-all duration-300 active:scale-95 ${activeFilter === f.value
                                            ? "bg-primary text-background border-primary"
                                            : "bg-transparent text-subtle border-border/50 hover:border-primary/50 hover:text-foreground"
                                            }`}
                                    >
                                        {f.label}
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${activeFilter === f.value ? "bg-background/20" : "bg-muted"}`}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {filteredFiles.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-20 text-center">
                            <LuNotebook size={40} className="text-primary/20" />
                            <p className="text-subtle font-light">Nothing here yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {/* Grouping by type for better organization when "All" is selected */}
                            {Object.entries(
                                filteredFiles.reduce((acc, curr) => {
                                    const type = curr.type;
                                    if (!acc[type]) acc[type] = [];
                                    acc[type].push(curr);
                                    return acc;
                                }, {})
                            ).map(([type, items], typeIdx) => {
                                const style = typeStyles[type] || typeStyles.note;
                                return (
                                    <div key={type} className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${style.colorClass}`}>
                                                {style.icon}
                                            </div>
                                            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground/80">
                                                {style.label}s
                                            </h3>
                                            <div className="h-px flex-1 bg-border/30 ml-4" />
                                        </div>
                                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <AnimatePresence mode="popLayout">
                                                {items.map((r, i) => <NoteRow key={r.id} resource={r} index={i + typeIdx * 10} />)}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </section>

                {/* ── COOL WEBSITES ──────────────────────────────────────── */}
                {websiteResources.length > 0 && (
                    <section className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-end justify-between mb-8 pb-4 border-b border-border/30"
                        >
                            <div>
                                <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase opacity-80 mb-1 block">// Cool Finds</span>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-heading">
                                    Websites Worth Visiting
                                </h2>
                            </div>
                            <span className="text-subtle font-mono text-xs tracking-wider">{websiteResources.length} sites</span>
                        </motion.div>

                        {/* Grouped by Category */}
                        {Object.entries(
                            websiteResources.reduce((acc, curr) => {
                                const cat = curr.category || "Other";
                                if (!acc[cat]) acc[cat] = [];
                                acc[cat].push(curr);
                                return acc;
                            }, {})
                        ).map(([category, items], catIndex) => (
                            <div key={category} className="space-y-6">
                                <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-emerald-400/70 border-l-2 border-emerald-400/30 pl-4">
                                    {category}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {items.map((r, i) => (
                                        <WebsitePill key={r.id} resource={r} index={i + catIndex * 10} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

            </div>
        </div>
    );
};

export default Resources;
