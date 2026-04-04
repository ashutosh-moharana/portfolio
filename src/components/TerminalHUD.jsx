import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ColorContext } from "../contexts/ColorContext";
import { useDevice } from "../contexts/DeviceContext";
import projectsData from "../utils/projects";

const TerminalHUD = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: "info", content: "HUD_TERMINAL ready. Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = useDevice();
  const { changeColor, COLORS } = useContext(ColorContext);

  // Backtick toggles HUD on desktop (only when no input is focused)
  useEffect(() => {
    const handleKey = (e) => {
      const tag = document.activeElement?.tagName;
      const isInputFocused = tag === "INPUT" || tag === "TEXTAREA";

      if (e.key === "`" && !isMobile && !isInputFocused) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobile]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    const args = cmd.split(" ");

    setHistory((prev) => [
      ...prev,
      { type: "input", content: `> ${cmdStr}` },
    ]);
    setInput("");

    if (cmd === "") return;

    switch (args[0]) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "Commands:" },
          {
            type: "info",
            content: (
              <>
                <span className="font-bold inline-block w-20">about</span> —
                About me
              </>
            ),
          },
          {
            type: "info",
            content: (
              <>
                <span className="font-bold inline-block w-20">projects</span> —
                My work
              </>
            ),
          },
          {
            type: "info",
            content: (
              <>
                <span className="font-bold inline-block w-20">contact</span> —
                Get in touch
              </>
            ),
          },
          {
            type: "info",
            content: (
              <>
                <span className="font-bold inline-block w-20">color</span> —
                color [name]
              </>
            ),
          },
          {
            type: "info",
            content: (
              <>
                <span className="font-bold inline-block w-20">clear</span> —
                Clear output
              </>
            ),
          },
          {
            type: "info",
            content: (
              <>
                <span className="font-bold inline-block w-20">terminal</span> —
                Full terminal
              </>
            ),
          },
          {
            type: "info",
            content: (
              <>
                <span className="font-bold inline-block w-20">exit</span> —
                Close HUD
              </>
            ),
          },
        ]);
        break;
      case "about":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "Ashutosh Moharana | Backend Developer" },
          {
            type: "info",
            content: "Java & Spring Boot | REST APIs | PostgreSQL",
          },
        ]);
        break;
      case "projects":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "Recent Projects:" },
          ...projectsData.map((p) => ({
            type: "info",
            content: (
              <>
                <span className="font-bold text-primary">{p.title}</span> —{" "}
                {p.category}
              </>
            ),
          })),
        ]);
        break;
      case "contact":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "ashutoshmoharana00@gmail.com" },
          { type: "info", content: "github.com/ashutosh-moharana" },
        ]);
        break;
      case "color":
        if (args[1] && COLORS[args[1]]) {
          changeColor(args[1]);
          setHistory((prev) => [
            ...prev,
            { type: "success", content: `Theme → ${args[1]}` },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            {
              type: "info",
              content: "Available: red, green, blue, purple, yellow, white",
            },
          ]);
        }
        break;
      case "clear":
        setHistory([{ type: "info", content: "Terminal cleared." }]);
        break;
      case "terminal":
        navigate("/terminal");
        setIsOpen(false);
        break;
      case "exit":
        setIsOpen(false);
        break;
      default:
        setHistory((prev) => [
          ...prev,
          { type: "info", content: `'${cmd}' not found. Type 'help'.` },
        ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <>
      {/* Mobile: small fixed >_ button → navigates to full /terminal page */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, scale: 0, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 1.5, 
            ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for premium feel
          }}
          onClick={() => navigate("/terminal")}
          className="fixed bottom-5 right-4 z-[90] w-7 h-7 bg-black border border-primary/40 text-primary font-mono text-[10px] font-bold flex items-center justify-center active:scale-90 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          aria-label="Open Terminal"
        >
          &gt;_
        </motion.button>
      )}

      {/* HUD Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 md:left-auto md:right-6 md:w-[500px] h-[48vh] md:h-[52vh] z-[90] bg-[#030303] border border-primary/25 md:border-b-0 flex flex-col font-mono overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.9)]"
          >
            {/* Top border accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-primary/15 bg-black/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]"
                />
                <span className="text-[9px] tracking-widest text-primary/50 uppercase font-bold">
                  HUD_TERMINAL
                </span>
              </div>
              <div className="flex items-center gap-3">
                {!isMobile && (
                  <span className="text-[9px] text-primary/25 font-mono">
                    [ ` ] toggle
                  </span>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-primary/40 hover:text-primary text-xl leading-none transition-colors px-1"
                  aria-label="Close HUD"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Output Area */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 text-xs text-primary/75 leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`mb-0.5 ${
                    line.type === "input" ? "text-white/85 font-bold" : ""
                  } ${line.type === "success" ? "text-primary font-bold" : ""}`}
                >
                  {line.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-primary/15 bg-black/40 shrink-0">
              <span className="text-primary/50 font-bold text-xs shrink-0">
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-primary caret-primary text-xs placeholder:text-primary/20"
                placeholder="enter command..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                inputMode="text"
                data-form-type="other"
                data-lpignore="true"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalHUD;
