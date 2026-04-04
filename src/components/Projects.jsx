import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../utils/projects";

// Lightweight scroll entry — subtle y lift + fade
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.45, delay, ease: "easeOut" },
});

// HUD Coordinate Overlay — cycles fake coords on the project image preview
const HudCoords = () => {
    const [data, setData] = useState({
        hex1: "0x4F2A", hex2: "0xB91C", lat: "28.61", lon: "77.20",
    });
    useEffect(() => {
        const chars = "0123456789ABCDEF";
        const rand4 = () => "0x" + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
        const randC = (max) => (Math.random() * max).toFixed(2);
        const interval = setInterval(() => {
            setData({ hex1: rand4(), hex2: rand4(), lat: randC(90), lon: randC(180) });
        }, 380);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className="absolute top-0 left-0 right-0 p-1.5 flex justify-between z-20 pointer-events-none bg-gradient-to-b from-black/70 to-transparent">
                <span className="text-[8px] font-mono text-primary/60 tracking-wider">MEM:{data.hex1}</span>
                <span className="text-[8px] font-mono text-primary/60 tracking-wider">SIG:{data.hex2}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-1.5 flex justify-between z-20 pointer-events-none bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-[8px] font-mono text-primary/60 tracking-wider">LAT:{data.lat}</span>
                <span className="text-[8px] font-mono text-primary/60 tracking-wider">LON:{data.lon}</span>
            </div>
            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-primary/70 z-20 pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-primary/70 z-20 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-primary/70 z-20 pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-primary/70 z-20 pointer-events-none" />
        </>
    );
};

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const [expandedMobile, setExpandedMobile] = useState(null);

    return (
        <div id="projects" className="relative flex flex-col justify-center bg-background text-foreground py-10 md:py-16 px-6 md:px-12 lg:px-24 overflow-hidden">

            {/* Header */}
            <motion.div {...fadeUp(0)} className="mb-8 md:mb-16 z-10 border-b border-primary/20 pb-6 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 bottom-[-1px] h-[2px] bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "25%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
                <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary block animate-pulse" />
                    DECRYPTED ARCHIVES
                </span>
                <div className="relative w-fit">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-5xl md:text-8xl lg:text-9xl font-cinematic uppercase tracking-widest text-primary leading-none"
                    >
                        MISSIONS
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 0.7, 0, 0.5, 0], x: [0, -10, 8, -4, 0], skewX: [0, 14, -10, 6, 0] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.15, ease: "linear" }}
                        className="absolute inset-0 text-5xl md:text-8xl lg:text-9xl font-cinematic uppercase tracking-widest text-primary leading-none select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        MISSIONS
                    </motion.h2>
                </div>
            </motion.div>

            {/* Projects List */}
            <div className="w-full flex-1 flex flex-col-reverse justify-center z-10">
                {projects.map((project, index) => (
                    <motion.div key={project.id} {...fadeUp(index * 0.06)}>
                        <div
                            className="group relative border-b border-border/30 hover:border-primary py-8 md:hover:py-16 transition-all duration-500 flex flex-col md:flex-row justify-between interactive cursor-none hover:bg-gradient-to-r from-primary/5 to-transparent px-4 -mx-4"
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            onClick={() => setExpandedMobile(expandedMobile === project.id ? null : project.id)}
                        >
                            {/* Title & Info */}
                            <div className="flex flex-col z-10 w-full md:w-1/2">
                                <span className="text-primary text-[9px] md:text-xs font-mono mb-2 md:mb-4 block opacity-70 group-hover:opacity-100 transition-opacity uppercase tracking-widest border border-primary/20 px-1.5 py-0.5 w-fit">
                                    {project.date}
                                </span>

                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-cinematic tracking-widest text-foreground transition-[color,transform] duration-500 ease-out md:group-hover:translate-x-6 md:group-hover:text-primary">
                                    {project.title}
                                </h3>

                                {/* Mobile: smooth AnimatePresence height animation on tap */}
                                <AnimatePresence initial={false}>
                                    {expandedMobile === project.id && (
                                        <motion.div
                                            key="mobile-expand"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                            className="md:hidden overflow-hidden"
                                        >
                                            <div className="mt-6 w-full overflow-hidden aspect-[4/3] relative rounded-sm border border-primary/20">
                                                {project.embedUrl ? (
                                                    <iframe 
                                                        src={project.embedUrl} 
                                                        title={project.title}
                                                        className="w-full h-full border-none"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                                                )}
                                            </div>
                                            <p className="mt-4 text-sm text-subtle max-w-xl">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {project.technologies.map((tech, i) => (
                                                    <span key={i} className="text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 bg-secondary text-primary/80 border border-primary/30">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex flex-row gap-3 mt-6 mb-3">
                                                <a href={project.demoLink} target="_blank" rel="noreferrer"
                                                    className="interactive group relative flex-1 flex items-center justify-center px-6 py-2.5 bg-black text-primary border border-primary/50 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden">
                                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0" />
                                                    <span className="relative z-10">Execute</span>
                                                </a>
                                                <a href={project.codeLink} target="_blank" rel="noreferrer"
                                                    className="interactive group relative flex-1 flex items-center justify-center px-6 py-2.5 bg-black border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:bg-primary/10 hover:border-primary active:scale-95 overflow-hidden">
                                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0" />
                                                    <span className="relative z-10">Source Code</span>
                                                </a>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Desktop: CSS group-hover reveal */}
                                <div className="hidden md:grid md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                                    <div className="overflow-hidden">
                                        <p className="mt-6 text-lg text-subtle max-w-xl md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-[opacity,transform] duration-300 ease-out">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-5 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 bg-secondary text-primary/80 border border-primary/30">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex flex-row gap-3 mt-7 mb-2 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            <a href={project.demoLink} target="_blank" rel="noreferrer"
                                                className="interactive flex-none group relative flex items-center justify-center px-6 py-2.5 bg-black text-primary border border-primary/50 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden">
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                                Execute
                                            </a>
                                            <a href={project.codeLink} target="_blank" rel="noreferrer"
                                                className="interactive flex-none group relative flex items-center justify-center px-6 py-2.5 bg-black border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:bg-primary/10 hover:border-primary active:scale-95 overflow-hidden">
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                                Source Code
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop image hover — opacity only, GPU composited */}
                            <AnimatePresence>
                                {hoveredProject === project.id && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="hidden md:block absolute right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 w-[380px] lg:w-[430px] aspect-[4/3] z-0 pointer-events-none rounded-sm border border-primary overflow-hidden will-change-transform"
                                    >
                                        {/* Holographic scanner effect overlays */}
                                        <div className="absolute inset-0 bg-primary/5 mix-blend-color z-10 pointer-events-none" />
                                        {/* HUD Coordinate Overlay */}
                                        <HudCoords />

                                        {project.embedUrl ? (
                                            <div className="w-full h-full bg-background relative overflow-hidden">
                                                <iframe 
                                                    src={project.embedUrl} 
                                                    title={project.title}
                                                    className="w-[150%] h-[150%] border-none origin-top-left scale-[0.666] grayscale-[0.5] contrast-125 hover:grayscale-0 transition-all duration-700 pointer-events-none"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover filter contrast-125 saturate-[.7]" loading="lazy" />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;