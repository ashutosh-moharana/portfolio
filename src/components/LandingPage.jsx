import { motion, useScroll } from "framer-motion";
import { useContext } from "react";
import { useDevice } from "../contexts/DeviceContext";
import { LenisContext } from "../App";
import Navbar from "./Navbar";

// Lightweight fade — no y translation, no spring
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);

  const scrollToProjects = () => {
    const target = document.getElementById("projects");
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="landing" className="h-screen scroll-smooth flex relative items-center justify-center overflow-hidden">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 inset-x-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />

      {/* Name — top right */}
      <div className="absolute top-28 md:top-32 right-4 md:right-10 z-20 text-right">
        <motion.p {...fadeIn(0.1)} className="font-light text-3xl md:text-4xl">
          A S H U T O S H
        </motion.p>
        <motion.p {...fadeIn(0.2)} className="text-heading text-4xl md:text-5xl mt-2">
          M O H A R A N A
        </motion.p>
        <motion.button
          {...fadeIn(0.4)}
          onClick={scrollToProjects}
          className="interactive mt-4 ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary border border-primary/30 font-semibold rounded-full text-xs tracking-wide transition-colors duration-200 hover:bg-primary/20 hover:border-primary/60 active:scale-95 md:hidden"
        >
          View My Work ↓
        </motion.button>
      </div>

      {/* Center — SVG ring + profile image */}
      <div className="flex h-screen w-screen justify-center items-center">
        <motion.svg
          className={`${isMobile ? "w-[80vw]" : "h-9/10"} drop-shadow-[0px_0px_15px_var(--color-primary)] rounded-full relative mt-12 md:mt-20`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Static background track */}
          <circle className="fill-none stroke-primary/20 stroke-16 md:stroke-6" cx="50" cy="50" r={isMobile ? "50" : "40"} />
          {/* Breathing aura ring */}
          <motion.circle
            className="fill-none stroke-primary/40 stroke-16 md:stroke-6 origin-center"
            cx="50" cy="50" r={isMobile ? "50" : "40"}
            strokeLinecap="round"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.svg>

        <motion.div
          className={`absolute bottom-0 flex items-center justify-center ${isMobile ? "h-[45vh] bottom-32" : "h-3/4 mr-8"}`}
          initial={{ opacity: 0.5, x: -20, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <img
            className="h-full drop-shadow-[0px_0px_20px_rgb(255,255,255,0.2)]"
            src="/ashutosh.webp"
            alt="Ashutosh Moharana — Full-Stack Developer"
          />
        </motion.div>
      </div>

      {/* Bottom left — role + location */}
      <motion.div
  {...fadeIn(0.2)}
  className={`absolute left-0 bottom-10 ${isMobile
    ? "box-border h-auto w-full mb-6 px-8 py-4 border-t-2 border-primary rounded-4xl bg-background"
    : "m-4 left-4 bottom-8"
  }`}
>
  <h2 className="font-bold text-2xl md:text-3xl text-foreground leading-tight">
    Java Backend Developer
  </h2>
  
  <div className="flex items-center gap-3 text-sm md:text-base mt-2 font-mono uppercase tracking-widest">
    <span className="text-subtle">From</span>
    <span className="text-primary font-medium">Odisha, India</span>
  </div>
</motion.div>

      {/* Desktop scroll indicator */}
      {!isMobile && (
        <motion.div
          {...fadeIn(1)}
          className="absolute bottom-10 right-10 md:right-12 flex flex-col items-center gap-4 z-20"
        >
          <span className="text-subtle font-mono text-xs tracking-[0.3em] uppercase opacity-70" style={{ writingMode: "vertical-rl" }}>
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-border/50 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
    </div>
  );
};

export default LandingPage;
