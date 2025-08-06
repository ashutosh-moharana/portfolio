import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDevice } from "../contexts/DeviceContext";
import projects from "../utils/projects";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      className="min-h-screen relative flex flex-col items-center text-foreground overflow-hidden pt-8 pb-10"
    >
      {/* Section header */}
      <div className="w-full relative px-4 md:px-8">
        <motion.h2
          className="text-heading text-3xl text-center relative pb-4"
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
            <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </motion.div>
        </motion.h2>
      </div>

      {/* Timeline container */}
      <div className="w-full max-w-4xl px-4 md:px-8 mt-8">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary md:transform md:-translate-x-1/2"></div>

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
              <div className="absolute left-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center  md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>

              {/* Project card */}
              <div className={`ml-12 md:ml-0 md:w-5/6 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                <div className="bg-muted rounded-lg shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Image - Always shown on top in mobile, side-by-side in desktop */}
                    <div className="w-full md:w-2/5 h-56 md:h-auto">
                      <div className="h-full w-full relative overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover "
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-3/5 p-4 md:p-6">
                      <div className="text-heading text-xs md:text-sm mb-2">
                        {project.date}
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base mb-4 text-subtle">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs md:text-sm px-2 py-1 border "
                          >
                            {tech}
                          </span> 
                        ))}
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <motion.a
                          whileTap={{scale:0.8}}
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-transparent text-primary border border-primary px-6 py-2 font-semibold  transition-transform hover:scale-90 duration-200 "
                        >
                          View
                        </motion.a>
                        <motion.a
                        whileTap={{scale:0.8}}
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-transparent text-subtle border  px-6 py-2 font-semibold  transition-all hover:scale-90 duration-200 hover:border-subtle  "
                        >
                          Code
                        </motion.a>
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