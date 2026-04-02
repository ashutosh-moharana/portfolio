import React, { useState } from "react";
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
            <motion.div {...fadeUp(0)} className="mb-8 md:mb-16 z-10">
                <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Selected Works</span>
                <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-heading leading-none">
                    Projects
                </h2>
            </motion.div>

            {/* Projects List */}
            <div className="w-full flex-1 flex flex-col-reverse justify-center border-t border-border z-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        {...fadeUp(index * 0.06)}
                        className="group relative border-b border-border py-8 md:hover:py-16 transition-[padding] duration-500 flex flex-col md:flex-row justify-between interactive cursor-none"
                        onHoverStart={() => setHoveredProject(project.id)}
                        onHoverEnd={() => setHoveredProject(null)}
                        onClick={() => setExpandedMobile(expandedMobile === project.id ? null : project.id)}
                    >
                        {/* Title & Info */}
                        <div className="flex flex-col z-10 w-full md:w-1/2">
                            <span className="text-subtle text-xs md:text-sm font-mono mb-4 block opacity-70 group-hover:opacity-100 transition-opacity">
                                {project.date}
                            </span>

                            <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground transition-[transform,color] duration-500 ease-out md:group-hover:translate-x-6 md:group-hover:text-primary">
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
                                        <div className="mt-6 w-full overflow-hidden aspect-[4/3] rounded-xl shadow-lg">
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                        <p className="mt-4 text-sm text-subtle max-w-xl">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-full border border-border/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex flex-row gap-3 mt-6 mb-3">
                                            <a href={project.demoLink} target="_blank" rel="noreferrer"
                                                className="interactive flex-1 flex items-center justify-center px-6 py-2.5 bg-primary/10 text-primary border border-primary/30 font-semibold rounded-full text-sm transition-colors duration-200 hover:bg-primary/20 active:scale-95">
                                                View Live
                                            </a>
                                            <a href={project.codeLink} target="_blank" rel="noreferrer"
                                                className="interactive flex-1 flex items-center justify-center px-6 py-2.5 border border-border/50 text-foreground/80 font-semibold rounded-full text-sm transition-colors duration-200 hover:bg-white/5 active:scale-95">
                                                Source Code
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
                                            <span key={i} className="text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-full border border-border/50">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex flex-row gap-3 mt-7 mb-2 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <a href={project.demoLink} target="_blank" rel="noreferrer"
                                            className="interactive flex-none flex items-center justify-center px-6 py-2.5 bg-primary/10 text-primary border border-primary/30 font-semibold rounded-full text-sm transition-colors duration-200 hover:bg-primary/20 hover:border-primary/60 active:scale-95">
                                            View Live
                                        </a>
                                        <a href={project.codeLink} target="_blank" rel="noreferrer"
                                            className="interactive flex-none flex items-center justify-center px-6 py-2.5 bg-transparent border border-border/50 text-foreground/80 font-semibold rounded-full text-sm transition-colors duration-200 hover:bg-white/5 hover:border-border active:scale-95">
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
                                    className="hidden md:block absolute right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 w-[380px] lg:w-[430px] aspect-[4/3] z-0 pointer-events-none rounded-2xl overflow-hidden shadow-2xl will-change-transform"
                                >
                                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;