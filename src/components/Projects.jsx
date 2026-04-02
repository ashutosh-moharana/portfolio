import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../utils/projects";

// Lightweight scroll entry — subtle y lift + fade
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.45, delay, ease: "easeOut" },
});

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
                <h2 className="text-5xl md:text-8xl lg:text-9xl font-cinematic uppercase tracking-widest text-primary leading-none">
                    MISSIONS
                </h2>
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
                                        <motion.div 
                                          className="absolute top-0 left-0 w-full h-[2px] bg-primary z-20 pointer-events-none"
                                          animate={{ top: ["0%", "100%", "0%"] }}
                                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        />
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