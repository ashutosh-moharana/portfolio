import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDevice } from "../contexts/DeviceContext";
import projects from "../utils/projects";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useDevice();
  const sectionRef = useRef(null);

  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Timeline item variants for animation
  const timelineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    }),
  };

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="min-h-screen relative flex flex-col items-center text-[var(--text-p-color)] overflow-hidden pt-8 pb-10"
    >
      {/* Section header */}
      <div className="w-full relative px-4 md:px-8">
        <motion.h2
          className="text-[var(--p-color)] text-3xl text-center relative pb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          viewport={{once:true}}
        >
          P R O J E C T S
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{once:true}}
          >
            <div className="h-full bg-gradient-to-r from-transparent via-[var(--p-color)] to-transparent"></div>
          </motion.div>
        </motion.h2>
      </div>

      {/* Timeline container */}
      <div className="w-full max-w-4xl px-4 md:px-8 mt-8">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--p-color)] md:transform md:-translate-x-1/2"></div>

          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative mb-8 md:mb-10"
              custom={index}
              initial="hidden"
               whileInView= "visible" 
              variants={timelineVariants}
              viewport={{once:true, amount:0.2}}

            >
              {/* Timeline marker */}
              <div className="absolute left-0 w-8 h-8 rounded-full bg-[var(--bg-p-color)] border-2 border-[var(--p-color)] flex items-center justify-center z-10 md:left-1/2 md:transform md:-translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-[var(--p-color)]"></div>
              </div>

              {/* Project card */}
              <div className={`ml-12 md:ml-0 md:w-5/6 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                <div className="bg-[var(--bg-s-color)] rounded-lg shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Image - Always shown on top in mobile, side-by-side in desktop */}
                    <div className="w-full md:w-2/5 h-56 md:h-auto">
                      <div className="h-full w-full relative overflow-hidden">
                        <img
                          src={null}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-p-color)] to-transparent opacity-70" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-3/5 p-4 md:p-6">
                      <div className="text-[var(--p-color)] text-xs md:text-sm mb-2">
                        {project.date}
                      </div>
                      <h3 className="text-xl md:text-2xl font-light mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs md:text-sm px-2 py-1 border border-[var(--bg-t-color)] text-[var(--text-s-color)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${
                            isMobile ? "text-sm px-4 py-1.5" : "px-4 py-2"
                          } border border-[var(--p-color)] text-[var(--p-color)] hover:bg-[var(--p-color)] hover:text-[var(--bg-p-color)] transition-all`}
                        >
                          See Live
                        </a>
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${
                            isMobile ? "text-sm px-4 py-1.5" : "px-4 py-2"
                          } border border-[var(--bg-t-color)] transition-all hover:border-[var(--p-color)]`}
                        >
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;