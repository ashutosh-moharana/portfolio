import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegFilePdf, FaJava, FaServer } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import {
  TbBrandTailwind,
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
  SiLeetcode,
  SiHackerrank,
  SiLinkedin,
  SiSpringboot,
  SiPostgresql,
  SiPostman,
  SiHibernate
} from "react-icons/si";

const About = () => {

  const skillGroups = useMemo(() => [
    {
      label: "Backend (Primary)",
      skills: [
        { name: "Java", tag: "[STRICT_TYPING]", icon: <FaJava size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "Spring Boot", tag: "[FRAMEWORK]", icon: <SiSpringboot size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "REST API", tag: "[ACTIVE]", icon: <FaServer size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "JPA / Hibernate", tag: "[ORM]", icon: <SiHibernate size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "PostgreSQL", tag: "[DB:RELATIONAL]", icon: <SiPostgresql size={20} className="md:group-hover:text-primary transition-colors" /> },
      ]
    },
    {
      label: "Frontend (Secondary)",
      skills: [
        { name: "React", tag: "[UI_FW]", icon: <SiReact size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "JavaScript", tag: "[DYNAMIC]", icon: <SiJavascript size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "HTML", tag: "[MARKUP]", icon: <SiHtml5 size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "CSS", tag: "[STYLE]", icon: <SiCss3 size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "TailwindCSS", tag: "[CSS_FW]", icon: <TbBrandTailwind size={20} className="md:group-hover:text-primary transition-colors" /> },
      ]
    },
    {
      label: "Familiar With",
      skills: [
        { name: "Node.js", tag: "[RUNTIME]", icon: <TbBrandNodejs size={22} className="md:group-hover:text-primary transition-colors" /> },
        { name: "Express", tag: "[FRAMEWORK]", icon: <SiExpress size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "MongoDB", tag: "[DB:NOSQL]", icon: <SiMongodb size={20} className="md:group-hover:text-primary transition-colors" /> },
      ]
    },
    {
      label: "Tools",
      skills: [
        { name: "Git", tag: "[VCS]", icon: <SiGit size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "GitHub", tag: "[FORGE]", icon: <SiGithub size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "Postman", tag: "[API_TEST]", icon: <SiPostman size={20} className="md:group-hover:text-primary transition-colors" /> },
      ]
    }
  ], []);

  const profiles = useMemo(() => [
    { name: "LeetCode", icon: <SiLeetcode size={20} />, url: "https://leetcode.com/ash_mo" },
    { name: "HackerRank", icon: <SiHackerrank size={20} />, url: "https://www.hackerrank.com/profile/ashutoshmoharan3" }
  ], []);

  const education = useMemo(() => [
    {
      degree: "M.C.A",
      institution: "IGIT, Sarang",
      year: "2025 - 2027",
      score: "",
    },
    {
      degree: "B.Sc. Computer Science",
      institution: "Udayanath Autonomous College, Cuttack",
      year: "2022 - 2025",
      score: "8.6 CGPA",
    },
    {
      degree: "Higher Secondary (Science)",
      institution: "Prananath Autonomous College, Khordha",
      year: "2020 - 2022",
      score: "86%",
    },
    {
      degree: "Secondary Education (10th)",
      institution: "Young Phoenix Public School, BBSR",
      year: "2016 - 2020",
      score: "84%",
    },
  ], []);

  const [showEducation, setShowEducation] = useState(false);

  return (
    <div id="about" className="relative flex flex-col justify-center min-h-screen bg-background text-foreground py-10 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      
      {/* S.H.I.E.L.D Tactical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-5" />

      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 z-10 relative">

        {/* Left Column: Header, Bio, Resume, Profiles */}
        <div className="lg:col-span-4 lg:col-start-1 flex flex-col gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_5px_var(--color-primary)]" />
              DOSSIER FILE: ALPHA
            </span>
            {/* Hover group: hovering SUBJECT animates the bio border line */}
            <div className="group">
              <div className="relative w-fit">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="font-cinematic text-7xl md:text-8xl xl:text-9xl uppercase tracking-wider text-heading leading-none -ml-1 md:-ml-2 cursor-default"
                >
                  SUBJECT
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 0.7, 0, 0.5, 0], x: [0, -8, 7, -3, 0], skewX: [0, 12, -8, 5, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15, ease: "linear" }}
                  className="absolute inset-0 font-cinematic text-7xl md:text-8xl xl:text-9xl uppercase tracking-wider text-primary leading-none -ml-1 md:-ml-2 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  SUBJECT
                </motion.h2>
              </div>
              <div className="mt-6 md:mt-8 text-subtle text-base md:text-lg font-mono leading-relaxed whitespace-pre-line pl-4 relative">
                {/* Static track */}
                <div className="absolute left-0 top-0 w-[1px] h-full bg-primary/20" />
                {/* Animated fill (triggers on scroll) */}
                <motion.div 
                  className="absolute left-0 top-0 w-[2px] bg-primary" 
                  initial={{ height: "16px" }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
                An enthusiastic beginner exploring the backend ecosystem.{" "}
                Currently learning Java and Spring Boot, discovering how to build robust REST APIs and handle databases cleanly and effectively.
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-8 sm:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <a
              href={import.meta.env.VITE_RESUME_LINK}
              target="_blank"
              rel="noreferrer"
              className="interactive inline-flex w-fit items-center justify-center gap-2 px-6 py-3.5 text-sm bg-background text-primary font-mono border border-primary/50 hover:bg-primary/20 hover:border-primary transition-colors duration-200 active:scale-95 uppercase tracking-[0.2em] relative overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <FaRegFilePdf size={16} />
              EXTRACT DATA
            </a>

            <div>
              <h3 className="text-sm font-mono tracking-widest text-primary uppercase mb-4 opacity-70 lg:hidden">ACCESS PORTS</h3>
              <div className="flex flex-wrap sm:flex-nowrap lg:flex-wrap gap-x-6 gap-y-4 items-center font-mono">
                {profiles.map((profile, i) => (
                  <a
                    key={i}
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group interactive flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors text-base md:text-lg font-light active:scale-95"
                  >
                    <span className="text-primary/70 md:text-foreground/80 md:group-hover:text-primary transition-colors">{profile.icon}</span>
                    <span className="border-b border-transparent group-hover:border-primary pb-0.5 transition-colors">{profile.name}</span>
                    <FiArrowUpRight className="text-primary opacity-50 md:opacity-0 md:-translate-x-2 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:translate-y-0 transition-all duration-300 ml-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Education & Skills */}
        <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-6 lg:gap-8 mt-8 lg:mt-0 justify-center min-h-[400px]">
          
          {/* Education Row: S.H.I.E.L.D header */}
          <motion.div
            className="w-full relative bg-background/40 border border-primary/20 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Tech scanner line purely visual */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40" />

            <button 
              onClick={() => setShowEducation(!showEducation)}
              className={`group interactive w-full flex items-center justify-between px-5 sm:px-6 py-5 sm:py-6 border-l-4 transition-all duration-500 outline-none cursor-pointer ${showEducation ? "bg-primary/10 border-primary shadow-[inset_1px_0_0_0_var(--color-primary),0_0_15px_rgba(0,0,0,0.5)]" : "bg-secondary border-primary/30 hover:bg-secondary/80 hover:border-primary/80"}`}
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center w-8 h-8 font-mono text-xs font-bold border transition-colors duration-500 ${showEducation ? "bg-primary text-background border-primary" : "bg-transparent text-primary/70 border-primary/30 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary"}`}>
                  E.D
                </span>
                <span className={`text-base sm:text-lg font-cinematic tracking-widest uppercase transition-colors duration-500 flex-1 text-left ${showEducation ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                  EDUCATION LOGS
                </span>
              </div>
              <span className={`transition-transform duration-300 font-mono text-xs opacity-70 ${showEducation ? "rotate-90 text-primary" : "text-subtle"}`}>[ + ]</span>
            </button>
            
            <AnimatePresence initial={false}>
              {showEducation && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden px-2 sm:px-4"
                >
                  <div className="flex flex-col w-full pt-6 pb-2">
                    {education.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="border-b border-border/30 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-2 md:gap-3 last:border-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25, delay: index * 0.04 }}
                      >
                        <div className="flex flex-col z-10 w-full lg:w-3/4 pl-3 relative">
                          {/* Slide-in border line — same style as MISSIONS */}
                          <div className="absolute left-0 top-0 w-[2px] h-full bg-primary/10 overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 w-full bg-primary"
                              initial={{ height: 0 }}
                              whileInView={{ height: "100%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.1 }}
                            />
                          </div>
                          <span className="text-primary text-[10px] sm:text-xs font-mono mb-1 opacity-80 uppercase tracking-widest">
                            CY {edu.year}
                          </span>
                          <h4 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-widest text-foreground font-cinematic uppercase mt-1">
                            {edu.degree}
                          </h4>
                          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-subtle font-mono">
                            {edu.institution}
                          </p>
                        </div>
                        
                        {edu.score && (
                          <div className="lg:text-right mt-2 lg:mt-0 pl-2 lg:pl-0">
                            <span className="text-[10px] sm:text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/30 font-mono uppercase tracking-widest inline-block">
                              {edu.score}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Skills Section: Shrinks when Education is open */}
          <AnimatePresence initial={false}>
            {!showEducation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2 md:pt-6">
                  <h3 className="text-sm font-mono tracking-widest text-primary uppercase mb-6 opacity-70 lg:hidden text-center">SKILLS LOG</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 border-t border-primary/20 pt-6">
                    {skillGroups.map((group, index) => (
                      <div 
                        key={group.label} 
                        className={`flex flex-col ${index === 0 ? "sm:col-span-2" : ""}`}
                      >
                        <span className="text-xs font-mono tracking-widest text-primary/70 uppercase mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary block shadow-[0_0_5px_var(--color-primary)]" />
                          {group.label}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="group interactive flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary text-foreground border border-border hover:border-primary hover:bg-primary/10 transition-colors duration-200 ease-out active:scale-[0.97] font-mono tracking-wide"
                            >
                              <span className="text-primary/60 md:text-primary/80 transition-colors group-hover:text-primary">{skill.icon}</span>
                              <span className="flex flex-col items-start">
                                <span className="group-hover:text-primary transition-colors leading-tight">{skill.name}</span>
                                {skill.tag && <span className="text-[8px] text-primary/30 leading-none mt-0.5 tracking-wider">{skill.tag}</span>}
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default About;
