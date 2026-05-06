import { useState, useRef, useEffect } from "react";
import { FiArrowUpRight, FiX, FiSearch } from "react-icons/fi";

import {
    LuMap, LuCode, LuBook, LuEye, LuTerminal, LuGitBranch, LuFolder, LuLayers,
    LuActivity, LuCamera, LuMail, LuComponent, LuLayoutGrid, LuScissors, LuWind,
    LuLayoutDashboard, LuBrain, LuPresentation, LuPenTool, LuLock, LuSmile,
    LuDatabase, LuImage, LuMusic, LuGlobe
} from "react-icons/lu";

import websites from "../utils/websites";

const iconMap = {
    map: <LuMap size={24} />,
    code: <LuCode size={24} />,
    book: <LuBook size={24} />,
    eye: <LuEye size={24} />,
    terminal: <LuTerminal size={24} />,
    git: <LuGitBranch size={24} />,
    folder: <LuFolder size={24} />,
    layers: <LuLayers size={24} />,
    activity: <LuActivity size={24} />,
    camera: <LuCamera size={24} />,
    mail: <LuMail size={24} />,
    component: <LuComponent size={24} />,
    grid: <LuLayoutGrid size={24} />,
    scissors: <LuScissors size={24} />,
    wind: <LuWind size={24} />,
    layout: <LuLayoutDashboard size={24} />,
    brain: <LuBrain size={24} />,
    presentation: <LuPresentation size={24} />,
    pen: <LuPenTool size={24} />,
    lock: <LuLock size={24} />,
    smile: <LuSmile size={24} />,
    database: <LuDatabase size={24} />,
    image: <LuImage size={24} />,
    music: <LuMusic size={24} />,
    globe: <LuGlobe size={24} />,
};

const WebsiteCard = ({ resource, onOpenModal }) => {
    const Icon = iconMap[resource.icon] || <LuGlobe size={24} />;
    
    return (
        <div
            onClick={() => onOpenModal(resource)}
            className="group relative flex flex-col justify-between p-6 bg-card-bg border border-border/40 shadow-sm hover:shadow-[4px_4px_0px_var(--color-primary)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 rounded-xl cursor-pointer min-h-[180px] snap-start shrink-0 min-w-[75vw] sm:min-w-0 w-full"
        >
            <div className="relative z-10 flex items-start justify-between w-full">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                    {Icon}
                </div>
                
                <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 bg-background text-subtle hover:bg-primary hover:text-white rounded-full transition-colors z-20 shadow-sm"
                    title="Visit Website"
                >
                    <FiArrowUpRight size={18} />
                </a>
            </div>

            <div className="relative z-10 mt-auto pt-6 flex flex-col w-full">
                <h3 className="font-chunky text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                    {resource.title}
                </h3>
                <span className="text-sm text-subtle font-sans font-medium line-clamp-1">
                    {resource.subject}
                </span>
            </div>
        </div>
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
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
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
                    <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white font-chunky text-xl rounded-xl shadow-[4px_4px_0px_var(--color-foreground)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_var(--color-foreground)] transition-all"
                    >
                        Visit Website
                        <FiArrowUpRight size={20} />
                    </a>
                </div>
            </div>
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
        <div className="min-h-screen bg-background text-foreground pb-20">


            {/* Background elements */}
            <div className="absolute top-[20%] left-[-10%] w-[30%] h-[40%] bg-primary opacity-10 pointer-events-none rounded-full blur-[100px] z-0" />

            {/* Page Body */}
            <div className="px-6 md:px-12 lg:px-24 pt-32 md:pt-40 relative z-10 max-w-7xl mx-auto">

                {/* ── HERO & SEARCH ───────────────────────────────────────── */}
                <div
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20"
                >
                    <div className="max-w-2xl">
                        <h1 className="text-6xl md:text-8xl font-chunky text-foreground uppercase tracking-wide mb-6">
                            My <span className="text-primary">Hub</span>
                        </h1>
                        <p className="text-subtle text-lg font-sans leading-relaxed">
                            A curated collection of my favorite tools, platforms, and digital resources I use every day.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full lg:w-80 shrink-0 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiSearch className="text-subtle group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find a resource..."
                            className="w-full bg-card-bg border border-border/50 rounded-xl focus:border-primary text-foreground placeholder:text-subtle/60 pl-12 pr-4 py-3 font-sans text-base outline-none transition-colors shadow-sm"
                        />
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
                            <div key={category} className="space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <h3 className="text-3xl font-display text-primary">
                                        {category}
                                    </h3>
                                </div>
                                
                                <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 snap-x snap-mandatory pr-6 sm:pr-0" style={{ scrollbarWidth: "none" }}>
                                    {items.map((r) => (
                                        <WebsiteCard 
                                            key={r.id} 
                                            resource={r} 
                                            onOpenModal={setSelectedResource}
                                        />
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
