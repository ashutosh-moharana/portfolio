import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ColorContext } from "../contexts/ColorContext";
import { useDevice } from "../contexts/DeviceContext";
import projectsData from "../utils/projects";

const TerminalMode = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = useDevice();
  const { changeColor, COLORS } = useContext(ColorContext);

  const BOOT_SEQUENCE = [
    "INITIALIZING CORE SYSTEM...",
    "SECURE_LINK: ENCRYPTED",
    "LOADING SECTOR 0xFF91A...",
    "MEM_CHECK: OK",
    "I/O_CHECK: OK",
    "GUEST_ACCESS: GRANTED",
    "SYSTEM_V.2.4: ONLINE"
  ];

  // Boot sequence simulation
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setHistory(prev => [...prev, { type: "system", content: BOOT_SEQUENCE[currentLine] }]);
        setBootProgress(((currentLine + 1) / BOOT_SEQUENCE.length) * 100);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooting(false);
          setHistory(prev => [...prev, 
            { type: "system", content: " " },
            { type: "info", content: "Type 'help' to see available commands." }
          ]);
        }, 500);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Keyboard detection — shrink layout so input stays visible
  useEffect(() => {
    if (!isMobile || !window.visualViewport) return;
    const onViewportChange = () => {
      const offset = window.innerHeight - window.visualViewport.height;
      setKeyboardOffset(Math.max(0, offset));
    };
    window.visualViewport.addEventListener("resize", onViewportChange);
    return () => window.visualViewport.removeEventListener("resize", onViewportChange);
  }, [isMobile]);

  useEffect(() => {
    const delay = isMobile ? 150 : 50;
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, delay);
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    const args = cmd.split(" ");
    const prompt = isMobile ? ">" : "C:\\Users\\Guest>";

    if (!isBooting) {
      setHistory((prev) => [...prev, { type: "input", content: `${prompt} ${cmdStr}` }]);
    }

    if (cmd === "") return;

    switch (args[0]) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "Commands:" },
          { type: "info", content: <><span className="font-bold inline-block w-20">about</span> - About me</> },
          { type: "info", content: <><span className="font-bold inline-block w-20">projects</span> - View my work</> },
          { type: "info", content: <><span className="font-bold inline-block w-20">contact</span> - Get in touch</> },
          { type: "info", content: <><span className="font-bold inline-block w-20">color</span> - color [name] </> },
          { type: "info", content: <><span className="font-bold inline-block w-20">hacker</span> - Hacker mode</> },
          { type: "info", content: <><span className="font-bold inline-block w-20">clear</span> - Clear terminal</> },
          { type: "info", content: <><span className="font-bold inline-block w-20">exit</span> - Close terminal</> }
        ]);
        break;
      case "about":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "Ashutosh Moharana | Backend Developer" },
          { type: "info", content: "An enthusiastic beginner exploring the backend ecosystem." },
          { type: "info", content: "Learning Java & Spring Boot — building REST APIs and handling databases." },
          { type: "info", content: " " },
          { type: "info", content: "Backend (Primary):" },
          { type: "info", content: "  Java, Spring Boot, REST API, JPA/Hibernate, PostgreSQL" },
          { type: "info", content: "Frontend (Secondary):" },
          { type: "info", content: "  React, JavaScript, HTML, CSS, TailwindCSS" },
          { type: "info", content: "Familiar With:" },
          { type: "info", content: "  Node.js, Express, MongoDB" },
          { type: "info", content: "Tools:" },
          { type: "info", content: "  Git, GitHub, Postman" },
        ]);
        break;
      case "projects":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "Recent Projects:" },
          { type: "info", content: " " },
          ...projectsData.flatMap((p) => ([
            {
              type: "info",
              content: <><span className="font-bold text-primary">{p.title}</span> — {p.category}</>
            },
            { type: "info", content: `  Stack: ${p.technologies.slice(0, 3).join(", ")}...` },
            { type: "info", content: " " },
          ])),
          { type: "info", content: "Type 'exit' to view full UI." }
        ]);
        break;
      case "contact":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "Email: ashutoshmoharana00@gmail.com" },
          { type: "info", content: "LinkedIn: linkedin.com/in/ashutosh-moharana" },
          { type: "info", content: "GitHub: github.com/ashutosh-moharana" }
        ]);
        break;
      case "color":
        if (args.length > 1) {
          const colorName = args[1];
          if (COLORS[colorName]) {
            changeColor(colorName);
            setHistory((prev) => [...prev, { type: "success", content: `Theme changed to ${colorName}.` }]);
          } else {
            setHistory((prev) => [
              ...prev, 
              { type: "info", content: `Invalid. Available: red, green, blue, deepblue, purple, amber` }
            ]);
          }
        } else {
          setHistory((prev) => [
            ...prev,
            { type: "info", content: "Usage: color [name]. Available: red, green, blue, deepblue, purple, amber" }
          ]);
        }


        break;
      case "hacker":
        setHistory((prev) => [...prev, { type: "system", content: "Initiating hacker mode..." }]);
        setTimeout(() => navigate("/hacker"), 800);
        break;
      case "clear":
        setHistory([]);
        break;
      case "exit":
        setHistory((prev) => [...prev, { type: "system", content: "Exiting..." }]);
        setTimeout(() => navigate("/"), 500);
        break;
      default:
        setHistory((prev) => [
          ...prev,
          { type: "info", content: `'${cmd}' not found.` },
          { type: "info", content: "Available: help, about, projects, contact, color, hacker, clear, exit" }
        ]);
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#020202] font-mono text-primary z-50 overflow-hidden flex flex-col antialiased selection:bg-primary/30"
      style={{ height: `calc(100dvh - ${keyboardOffset}px)` }}
    >
      
      {/* Visual Overlays: CRT Scanline & Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_3px,3px_100%]" />
      <div className="absolute inset-0 pointer-events-none z-[60] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      {/* Persistent Tactical Header */}
      <div className="w-full bg-black/80 border-b border-primary/20 py-2 px-4 md:px-8 flex items-center justify-between z-[70] backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
            />
            <span className="text-[10px] md:text-xs tracking-widest font-bold opacity-80 uppercase">SYSTEM_STATUS: ONLINE</span>
          </div>
          <span className="hidden md:block text-[10px] md:text-xs tracking-widest opacity-40 uppercase">Connection: Encrypted</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[10px] md:text-xs opacity-60 font-mono tracking-tighter hidden sm:block">
            SECURE_SESSION_{new Date().getMinutes()}{new Date().getSeconds()}
          </div>
          {isMobile && (
            <button
              onClick={() => navigate("/")}
              className="text-primary font-bold text-2xl leading-none px-2 active:scale-90 transition-transform"
              title="Close Terminal"
              aria-label="Close Terminal"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Main Terminal Area */}
      <div 
        className="flex-1 p-6 md:p-10 pt-4 overflow-y-auto relative z-10"
        onClick={() => document.getElementById("cli-input")?.focus()}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-1 w-full text-xs md:text-sm leading-relaxed">
          <AnimatePresence initial={false}>
            {history.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                  ${line.type === "success" ? "text-primary opacity-100 font-bold" : ""}
                  ${line.type === "input" ? "font-bold text-white/90" : "opacity-80"}
                  ${line.type === "system" ? "text-primary/70 font-bold" : ""}
                  flex items-start gap-1
                `}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {!isBooting && (
            <div className="flex items-start gap-2 mt-2">
              <span className="font-bold opacity-100 whitespace-nowrap text-primary/70">
                {isMobile ? ">" : "C:\\Users\\Guest>"}
              </span>
              <input
                id="cli-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 350)}
                className="flex-1 bg-transparent border-none outline-none text-primary caret-primary w-full"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                inputMode="text"
                data-form-type="other"
                data-lpignore="true"
              />
            </div>
          )}
          <div ref={bottomRef} className="h-20" />
        </div>
      </div>

      {/* Close Button Desktop */}
      {!isMobile && (
        <button
          onClick={() => navigate("/")}
          className="fixed top-20 right-8 text-primary opacity-50 hover:opacity-100 transition-opacity p-2 text-3xl z-[80] cursor-pointer"
          title="Close Terminal"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TerminalMode;
