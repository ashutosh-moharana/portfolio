import React, { useRef, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useDevice } from "../contexts/DeviceContext";

import {
  TbBrandTailwind,
  TbBrandFramerMotion,
  TbBrandNodejs,
} from "react-icons/tb";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiGit,
  SiGithub,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

/**
 * About component that displays professional information
 * Features:
 * - Responsive skill icons with animations
 * - Educational background with timeline
 * - Dynamic animations using Framer Motion
 * - Mobile-responsive layout
 * - Skills section with interactive tech stack display
 */
const About = () => {
  const isMobile = useDevice();
  const controls = useAnimation();
  const skillRef = useRef(null);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);
  
  const skills = useMemo(() => [
    { name: "MongoDB", icon: <SiMongodb color="var(--p-color)" size={22} /> },
    { name: "Express", icon: <SiExpress color="var(--p-color)" size={24} /> },
    { name: "Node.js", icon: <TbBrandNodejs color="var(--p-color)" size={24} /> },
    { name: "Git", icon: <SiGit color="var(--p-color)" size={24} /> },
    { name: "React", icon: <SiReact color="var(--p-color)" size={24} /> },
    { name: "HTML", icon: <SiHtml5 color="var(--p-color)" size={24} /> },
    { name: "GitHub", icon: <SiGithub color="var(--p-color)" size={24} /> },
    {
      name: "TailwindCSS",
      icon: <TbBrandTailwind color="var(--p-color)" size={24} />,
    },
    { name: "JavaScript", icon: <SiJavascript color="var(--p-color)" size={24} /> },
    { name: "CSS", icon: <SiCss3 color="var(--p-color)" size={24} /> },
    {
      name: "Framer Motion",
      icon: <TbBrandFramerMotion color="var(--p-color)" size={24} />,
    },
  ], []);
  const education = useMemo(() => ([
    {
      degree: "Bachelor of Science in Comp Sc. (B.Sc CSc)",
      institution: "Udayanath Autonomous College, Cuttack",
      year: "2022 - 2025",
      score: "8.6 CGPA",
    },
    {
      degree: "Higher Secondary (+2 Science)",
      institution: "Prananath Autonomous College, Khordha",
      year: "2020 - 2022",
      score: "86%",
    },
    {
      degree: "Secondary Education (10th)",
      institution: "Young Phoenix Public School, Bhubaneswar",
      year: "2016 - 2020",
      score: "83.83%",
    },
  ]), []);
  return (
    <div
      id="about"
      className="min-h-screen  relative text-[var(--text-p-color)] overflow-hidden "
    >
      {" "}
      <div className="pt-6 md:pt-10 px-4 md:px-8">
        <div className="relative">
          {" "}
          <motion.h2
            className="text-[var(--p-color)] text-3xl mb-4 text-center relative pb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A B O U T
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="h-full bg-gradient-to-r from-transparent via-[var(--p-color)] to-transparent"></div>
            </motion.div>
          </motion.h2>
        </div>
      </div>
      <div className="z-10 w-full px-4 md:px-8 md:mt-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 justify-center max-w-7xl mx-auto">
          <motion.div
            className=" md:max-w-xl font-sora"
            initial={{ opacity: 0, x: isMobile ? -20 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {" "}
            <p className="text-[var(--text-p-color)] mb-3 md:mb-5 leading-relaxed text-base md:text-lg ">
              I'm a passionate full-stack developer with a strong focus on
              creating elegant,
            </p>
            <p className="text-[var(--text-p-color)] mb-6 md:mb-10 leading-relaxed text-base md:text-lg">
              My approach combines technical expertise with creative
              problem-solving
            </p>
            <h3 className="text-lg md:text-xl  mb-3 md:mb-4 tracking-wider font-mono text-[var(--p-color)]">
              SKILLS
            </h3>
            <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-12" ref={skillRef}>
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{opacity:0, x:-10}}
                  whileInView={{opacity:1,x:0}}
                  viewport={{amount:0.2,once:true}}
                  transition={{type:"spring",stiffness:200,damping:10,duration:0.2}}
                  whileHover={{borderColor:"var(--p-color)",scale:0.9}}
                  whileTap={{borderColor:"var(--p-color)",scale:0.95}}
               
                  className={`flex items-center gap-2 group ${
                    isMobile ? "text-base px-4 py-2" : "text-lg px-6 py-3"
                  } border-2 bg-[var(--bg-p-color)]  border-[var(--bg-t-color)] text-[var(--text-s-color)]  font-medium `}
                >
                  {skill.icon}
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* right div */}
          <motion.div >
            <h3 className="font-mono mb-3 md:mb-6 tracking-wider text-lg md:text-2xl  text-[var(--p-color)] ">
              EDUCATION
            </h3>
            <div className="space-y-6 md:space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    duration: 0.5,
                  }}
                  viewport={{ amount: 0.5,once:true }}
                  className="border-l-2 border-[var(--bg-t-color)] pl-4 md:pl-6 py-2"
                  whileHover={{
                    borderColor: "var(--p-color)",
                    x: 10,
                  }}
                  whileTap={{ borderColor: "var(--p-color)", x: 10 }}
                >
                  <h4 className="text-lg md:text-2xl  mb-1 md:mb-2">
                    {edu.degree} - {edu.score}
                  </h4>
                  <p className="text-[var(--p-color)] text-sm md:text-base mb-1">
                    {edu.institution}
                  </p>
                  <p className=" text-sm md:text-base font-mono">{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
