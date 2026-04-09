import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useDevice } from "../contexts/DeviceContext";
import { LenisContext } from "../App";
import Navbar from "./Navbar";
import BackendBackground from "./BackendBackground";


// Lightweight fade — opacity only, no layout-triggering transforms
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

const LandingPage = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);



  return (
    <div id="landing" className="h-screen flex relative items-center justify-center overflow-hidden bg-background">
      <Navbar />

      {/* Global Data Flux / Scanline Overlay - Increased Opacity for Visibility */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.08]">
        <motion.div 
          animate={{ y: ["-100%", "100%"] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="w-full h-1 bg-primary shadow-[0_0_25px_var(--color-primary)]" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
      </div>

      {/* Name — top right */}
      <div className="absolute top-28 md:top-32 right-4 md:right-10 z-20 text-right">
        <motion.p {...fadeIn(0.15)} className="font-mono text-sm md:text-base text-subtle tracking-[0.3em] uppercase mb-1">
          A S H U T O S H
        </motion.p>
        <motion.h1 {...fadeIn(0.3)} className="font-cinematic text-primary text-6xl md:text-8xl mt-0 tracking-wider">
          MOHARANA
        </motion.h1>
      </div>

      <BackendBackground />





      {/* Center — Profile */}
      <div className="flex h-screen w-screen justify-center items-center">


        {/* Profile image — translate Y only (GPU composited) */}
        <motion.div
          className={`absolute h-[45vh] md:h-3/4 bottom-32 md:mx-20 md:bottom-0 flex items-center justify-center z-10  translate-x-6`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            willChange: "transform, opacity",
            transformStyle: "preserve-3d"
          }}
        >
          <img
            className="h-full"
            style={{ filter: "drop-shadow(0 0 15px rgb(255,255,255,0.2)) brightness(0.8)" }}
            src="/ashutosh.webp"
            alt="Ashutosh Moharana"
            fetchPriority="high"
          />
        </motion.div>
      </div>

      {/* Bottom left — role dossier */}
      <motion.div
        {...fadeIn(0.2)}
        className={`absolute left-0 bottom-10 z-20 ${isMobile
          ? "box-border h-auto w-full mb-6 px-8 py-4 border-t border-primary/50 bg-black/80 overflow-hidden"
          : "m-4 left-4 bottom-8 p-6 border-l-2 border-primary bg-gradient-to-r from-primary/10 to-transparent shadow-[10px_0_30px_rgba(237,29,36,0.05)]"
        }`}
      >
        {/* Grid only on mobile */}
        {isMobile && (
          <div className="absolute inset-0 bg-[linear-gradient(var(--color-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-5" />
        )}
        
        {/* Desktop HUD Corners */}
        {!isMobile && (
          <>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50" />
          </>
        )}

        <div className="relative overflow-hidden w-fit">
          <h2 className="font-cinematic text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-widest uppercase relative z-10 flex gap-2 md:gap-4">
            <span className="text-primary">BACKEND</span>
            <span>DEVELOPER</span>
          </h2>
          
          {/* High-Precision Glitch Overlay matching ASHMO */}
          <motion.h2 
            animate={{ 
              x: [0, -6, 6, -3, 0], 
              skewX: [0, 10, -10, 5, 0],
              opacity: [0, 0.4, 0, 0.4, 0],
            }}
            transition={{ repeat: Infinity, duration: 0.3, repeatDelay: 4 }}
            className="absolute inset-0 font-cinematic text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-widest uppercase select-none pointer-events-none opacity-0 flex gap-2 md:gap-4"
            aria-hidden="true"
          >
            <span>BACKEND</span>
            <span>DEVELOPER</span>
          </motion.h2>
        </div>
        <div className="flex items-center gap-3 text-xs md:text-sm mt-2 font-mono uppercase tracking-widest max-w-[280px] md:max-w-md lg:max-w-lg text-subtle relative z-10">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Classified: Secure APIs &amp; Data Infrastructures</span>
        </div>
      </motion.div>

      {/* Desktop scroll indicator */}
      {!isMobile && (
        <motion.div
          {...fadeIn(1.2)}
          className="absolute bottom-10 right-10 md:right-12 flex flex-col items-center gap-4 z-20"
        >
          <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase opacity-70" style={{ writingMode: "vertical-rl" }}>
            INITIATE
          </span>
          <div className="w-[1px] h-16 bg-border/40 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            />
          </div>
        </motion.div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
    </div>
  );
};

export default LandingPage;
