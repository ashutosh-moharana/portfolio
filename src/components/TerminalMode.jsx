import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDevice } from "../contexts/DeviceContext";
import { useTerminalCommands } from "../hooks/useTerminalCommands";

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
  const processCommand = useTerminalCommands(setHistory, () => { }, false);

  const BOOT_SEQUENCE = [
    "INITIALIZING CORE SYSTEM...",
    "SECURE_LINK: ENCRYPTED",
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
          { type: "info", content: <>Type <span className="font-bold whitespace-pre">'help'</span> and press enter to see commands.</> }
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
    const prompt = isMobile ? ">" : "C:\\Users\\Guest>";

    if (!isBooting) {
      setHistory((prev) => [...prev, { type: "input", content: `${prompt} ${cmdStr}` }]);
    }

    if (cmd === "") return;

    processCommand(cmdStr);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-background font-mono text-primary z-50 overflow-hidden flex flex-col antialiased selection:bg-primary/30"
      style={{ height: `calc(100dvh - ${keyboardOffset}px)` }}
    >



      {/* Persistent Tactical Header */}
      <div className="w-full bg-background/80 border-b border-primary/20 py-2 px-4 md:px-8 flex items-center justify-between z-[70] backdrop-blur-sm">
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
        <div className="max-w-4xl mx-auto flex flex-col gap-1 w-full text-[10px] md:text-xs leading-relaxed">
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
