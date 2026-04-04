import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BOOT_LINES = [
  "BIOS v2.4.1 — INTEGRITY CHECK: PASSED",
  "LOADING ENCRYPTED_MODULES...",
  "PORTAL_ARRAY: CALIBRATED",
  "AUTH_CHECK: IDENTITY_VERIFIED",
  "FIREWALL_MESH: ACTIVE",
  "PORTFOLIO_OS v3.0: ONLINE",
];

const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ash_boot_done")) {
      onComplete();
      return;
    }

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          sessionStorage.setItem("ash_boot_done", "1");
          setTimeout(onComplete, 700);
        }, 600);
      }
    }, 260);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[300] bg-[#020202] flex flex-col items-start justify-center px-8 md:px-24 font-mono select-none"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
    >
      {/* CRT scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />

      <div className="flex flex-col gap-2.5 max-w-xl z-10">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-xs md:text-sm tracking-widest uppercase ${
              i === lines.length - 1
                ? "text-primary font-bold"
                : "text-primary/40"
            }`}
          >
            <span className="text-primary/25 mr-3">
              [{String(i + 1).padStart(2, "0")}]
            </span>
            {line}
          </motion.p>
        ))}

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-primary text-xl mt-1 leading-none"
        >
          _
        </motion.span>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-10 left-8 right-8 md:left-24 md:right-24">
        <div className="w-full h-[1px] bg-primary/10 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{
              width: `${(lines.length / BOOT_LINES.length) * 100}%`,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] font-mono text-primary/25 tracking-widest uppercase">
            LOADING SYSTEM
          </span>
          <span className="text-[9px] font-mono text-primary/25">
            {Math.round((lines.length / BOOT_LINES.length) * 100)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BootSequence;
