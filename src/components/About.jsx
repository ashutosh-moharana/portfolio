import { useMemo } from "react";
import { motion } from "framer-motion";
import { useDevice } from "../contexts/DeviceContext";
import { FaRegFilePdf } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
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
  SiLeetcode,
  SiHackerrank,
  SiLinkedin
} from "react-icons/si";

const About = () => {

  const skillGroups = useMemo(() => [
    {
      label: "Core Stack",
      skills: [
        { name: "React", icon: <SiReact size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "Node.js", icon: <TbBrandNodejs size={22} className="md:group-hover:text-primary transition-colors" /> },
        { name: "Express", icon: <SiExpress size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "MongoDB", icon: <SiMongodb size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "JavaScript", icon: <SiJavascript size={20} className="md:group-hover:text-primary transition-colors" /> },
      ]
    },
    {
      label: "Tools & More",
      skills: [
        { name: "Git", icon: <SiGit size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "GitHub", icon: <SiGithub size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "TailwindCSS", icon: <TbBrandTailwind size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "HTML", icon: <SiHtml5 size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "CSS", icon: <SiCss3 size={20} className="md:group-hover:text-primary transition-colors" /> },
        { name: "Framer Motion", icon: <TbBrandFramerMotion size={20} className="md:group-hover:text-primary transition-colors" /> },
      ]
    }
  ], []);

  const profiles = useMemo(() => [
    { name: "LeetCode", icon: <SiLeetcode size={20} />, url: "https://leetcode.com/ashutosh-moharana" },
    { name: "HackerRank", icon: <SiHackerrank size={20} />, url: "https://www.hackerrank.com/profile/ashutoshmoharan3" },
    { name: "GitHub", icon: <SiGithub size={20} />, url: "https://github.com/ashutosh-moharana" },
    { name: "LinkedIn", icon: <SiLinkedin size={20} />, url: "https://linkedin.com/in/ashutosh-moharana" },
  ], []);

  const education = useMemo(() => [
    {
      degree: "Master of Computer Application (MCA)",
      institution: "Indira Gandhi Institute of Technology, Sarang",
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
      institution: "Young Phoenix Public School, Bhubaneswar",
      year: "2016 - 2020",
      score: "84%",
    },
  ], []);

  return (
    <div id="about" className="relative flex flex-col justify-center bg-background text-foreground py-10 md:py-16 px-6 md:px-12 lg:px-24 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 md:mb-16 z-10"
      >
        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Get To Know Me</span>
        <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-heading leading-none">
          About
        </h2>
        <p className="mt-4 md:mt-6 text-subtle text-base md:text-lg font-light max-w-xl leading-relaxed">
          MCA student &amp; self-taught full-stack developer from Odisha, India. I build fast, clean web apps and love turning ideas into real products.
        </p>
      </motion.div>

      <div className="w-full flex-1 flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-32 z-10">

        {/* Left Column: Resume + Profiles + Skills */}
        <motion.div
          className="lg:w-1/2 flex flex-col gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Resume + Profiles */}
          <div className="flex flex-col gap-8">
            <a
              href={import.meta.env.VITE_RESUME_LINK}
              target="_blank"
              rel="noreferrer"
              className="interactive inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm bg-primary/10 text-primary font-medium rounded-full border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-colors duration-200 active:scale-95"
            >
              <FaRegFilePdf size={15} />
              Resume
            </a>

            <div>
              <h3 className="text-sm font-mono tracking-widest text-subtle uppercase mb-6 opacity-70">Profiles</h3>
              <div className="flex flex-wrap gap-4">
                {profiles.map((profile, i) => (
                  <a
                    key={i}
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group interactive flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors text-lg md:text-xl font-light active:scale-95"
                  >
                    <span className="text-primary/70 md:text-foreground/80 md:group-hover:text-primary transition-colors">{profile.icon}</span>
                    <span className="border-b border-transparent group-hover:border-primary pb-0.5 transition-colors">{profile.name}</span>
                    <FiArrowUpRight className="text-primary md:opacity-0 md:-translate-x-2 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Skills — grouped */}
          <div className="pt-8 border-t border-border/50">
            <h3 className="text-sm font-mono tracking-widest text-subtle uppercase mb-6 opacity-70">Skills</h3>
            <div className="flex flex-col gap-6">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <span className="text-xs font-mono tracking-widest text-primary/50 uppercase mb-3 block">{group.label}</span>
                  <motion.div
                    className="flex flex-wrap gap-2.5"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4 }}
                  >
                    {group.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="group interactive flex items-center gap-2 text-sm px-4 py-2 bg-muted/50 text-foreground rounded-full border border-border/50 hover:border-primary hover:bg-primary/5 transition-colors duration-200 ease-out active:scale-[0.97]"
                      >
                        <span className="text-primary/60 md:text-inherit transition-colors group-hover:text-primary">{skill.icon}</span>
                        <span className="group-hover:text-primary transition-colors">{skill.name}</span>
                      </span>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Education */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h3 className="text-sm font-mono tracking-widest text-subtle uppercase mb-6 opacity-70">Education</h3>
          <div className="flex flex-col border-t border-border">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="group py-6 border-b border-border flex flex-col md:flex-row md:items-baseline justify-between gap-3 interactive"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="flex-1 border-l-2 border-primary/40 md:border-border/30 md:group-hover:border-primary pl-4 text-left transition-colors duration-300">
                  <h4 className="text-lg md:text-2xl font-semibold tracking-tight text-foreground md:group-hover:text-primary transition-colors duration-300">
                    {edu.degree}
                  </h4>
                  <p className="text-subtle text-sm md:text-base mt-1">{edu.institution}</p>
                </div>
                <div className="flex flex-row md:flex-col items-baseline md:items-end justify-between md:justify-start gap-2 mt-2 md:mt-0 pl-4 md:pl-0">
                  <span className="font-mono text-sm text-primary/70 md:text-subtle/80 md:group-hover:text-primary/80 transition-colors tracking-widest">{edu.year}</span>
                  {edu.score && (
                    <span className="font-mono text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">{edu.score}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default About;
