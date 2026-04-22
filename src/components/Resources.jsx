import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FiExternalLink } from "react-icons/fi";
import Navbar from "./Navbar";
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
    "my-note": { icon: <LuNotebook size={18} />, label: "Personal Note", colorClass: "text-primary bg-primary/10 border-primary/30" },
    note:      { icon: <LuBook size={18} />,     label: "Study Note",    colorClass: "text-primary/80 bg-primary/5 border-primary/20" },
    cheatsheet:{ icon: <LuFileText size={18} />, label: "Cheat Sheet",   colorClass: "text-primary/70 bg-primary/5 border-primary/20" },
    book:      { icon: <LuBook size={18} />,     label: "Reference Book",colorClass: "text-primary bg-primary/10 border-primary/30" },
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


const NoteRow = ({ resource, index }) => {
    const style = typeStyles[resource.type] || typeStyles.note;
    return (
        <motion.a
            href={resource.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, delay: index * 0.02, ease: "easeOut" }}

            className="interactive group relative flex items-center gap-4 p-3 bg-secondary border border-border/30 hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--color-primary),0.2)] min-w-[65vw] md:min-w-0 snap-start shrink-0 overflow-hidden"
        >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0 pointer-events-none" />

            <div className="relative z-10 w-16 h-16 overflow-hidden border border-primary/20 shrink-0 bg-background">
                {resource.imageUrl ? (
                    <img
                        src={resource.imageUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${style.colorClass}`}>
                        {style.icon}
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 min-w-0 z-10">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-subtle">{resource.subject}</span>
                </div>
                <h3 className="text-base font-bold tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
                    {resource.title}
                </h3>
            </div>
        </motion.a>
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

            className="interactive group flex items-center gap-3 px-5 py-3 bg-secondary text-primary/80 border border-border hover:border-primary transition-all duration-300 ease-out active:border-primary relative overflow-hidden"
        >
            {/* Expanding line — hover on desktop, tap on mobile */}
            <div className="absolute top-0 left-0 h-[2px] bg-primary w-2 group-hover:w-full group-active:w-full transition-all duration-500 ease-out" />
            <span className="text-primary/50 group-hover:text-primary transition-colors shrink-0">
                {Icon}
            </span>
            <div className="flex flex-col leading-tight">
                <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">{resource.title}</span>
                <span className="text-xs text-subtle font-mono">{resource.subject}</span>
            </div>
            <FiExternalLink
                size={13}
                className="ml-auto text-subtle opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all duration-300"
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

            <Navbar />

            {/* Page Body */}
            <div className="px-6 md:px-12 lg:px-24 pt-28 md:pt-32 pb-16 md:pb-20 space-y-20 relative">

                {/* ── HERO ───────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary block animate-pulse" />
                        DECRYPTED FILES
                    </span>
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-cinematic uppercase tracking-widest text-heading leading-none">
                        RESOURCES
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
                    <p className="text-foreground/40 text-xs md:text-sm font-mono tracking-wider mt-6 max-w-xl border-l-2 border-primary/30 pl-4 py-1">
                        Classified notes, syntax logs, and external network nodes — cataloged for immediate access.
                    </p>
                </motion.div>

                {/* ── NOTES & CHEAT SHEETS ───────────────────────────────── */}
                <section>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 pb-4 border-b border-primary/20 relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute left-0 bottom-0 h-[2px] bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: "20%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        />
                        <div>
                            <span className="text-primary/60 font-mono text-[10px] tracking-[0.3em] uppercase mb-1 block">// STUDY MATERIAL</span>
                            <h2 className="text-2xl md:text-4xl font-cinematic tracking-widest text-heading uppercase mt-1">Notes &amp; Cheat Sheets</h2>
                        </div>
                        {/* Filter tabs */}
                        <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 snap-x snap-mandatory pr-6 md:pr-0" style={{ scrollbarWidth: "none" }}>
                            {FILE_FILTERS.map((f) => {
                                const count = f.value === "all" ? fileResources.length : fileResources.filter(r => r.type === f.value).length;
                                const isActive = activeFilter === f.value;
                                return (
                                    <button
                                        key={f.value}
                                        onClick={() => setActiveFilter(f.value)}
                                        className={`interactive group relative flex items-center gap-2 px-5 py-2.5 font-mono text-[10px] sm:text-xs tracking-widest border transition-colors duration-300 active:scale-95 uppercase overflow-hidden shrink-0 snap-start ${
                                            isActive
                                                ? "text-primary border-primary shadow-[inset_0_0_15px_rgba(var(--color-primary),0.3)] bg-primary/10"
                                                : "bg-secondary border-border text-primary/70 hover:border-primary hover:text-primary"
                                        }`}
                                    >
                                        {!isActive && (
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0" />
                                        )}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeFilterBg"
                                                className="absolute inset-0 bg-primary/20 z-0"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            {f.label}
                                            <span className={`text-[9px] px-1.5 py-0.5 font-mono transition-colors ${isActive ? "bg-primary text-black font-bold" : "bg-muted text-subtle"}`}>{count}</span>
                                        </span>
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
                                    <div key={type} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-7 h-7 border flex items-center justify-center ${style.colorClass}`}>
                                                {style.icon}
                                            </div>
                                            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-primary/60">
                                                {style.label}s
                                            </h3>
                                            <div className="h-px flex-1 bg-primary/10 ml-2" />
                                        </div>
                                        <motion.div layout className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory pr-6" style={{ scrollbarWidth: "none" }}>
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
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-end justify-between mb-10 pb-4 border-b border-primary/20 relative overflow-hidden"
                        >
                            <motion.div
                                className="absolute left-0 bottom-0 h-[2px] bg-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: "20%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            />
                            <div>
                                <span className="text-primary/60 font-mono text-[10px] tracking-[0.3em] uppercase mb-1 block">// EXTERNAL NODES</span>
                                <h2 className="text-2xl md:text-4xl font-cinematic tracking-widest text-heading uppercase mt-1">
                                    Websites Worth Visiting
                                </h2>
                            </div>
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
                                <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary/70 border-l-2 border-primary/30 pl-4">
                                    {category}
                                </h3>
                                <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory pr-6" style={{ scrollbarWidth: "none" }}>
                                    {items.map((r, i) => (
                                        <div key={r.id} className="min-w-[75vw] sm:min-w-0 snap-start shrink-0">
                                            <WebsitePill resource={r} index={i + catIndex * 10} />
                                        </div>
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
