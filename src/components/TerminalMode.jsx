import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorContext } from "../contexts/ColorContext";
import projectsData from "../utils/projects";

const TerminalMode = () => {
  const [history, setHistory] = useState([
    { type: "system", content: "S.H.I.E.L.D COMMAND TERMINAL [Version 1.0.7]" },
    { type: "system", content: "(c) Strategic Homeland Intervention, Enforcement and Logistics Division." },
    { type: "system", content: " " },
    { type: "info", content: "Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const { changeColor, COLORS } = useContext(ColorContext);

  useEffect(() => {
    // Add small delay to let mobile keyboard and DOM settle before scrolling
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    const args = cmd.split(" ");

    setHistory((prev) => [...prev, { type: "input", content: `C:\\Users\\Guest> ${cmdStr}` }]);

    if (cmd === "") return;

    switch (args[0]) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { type: "info", content: "Commands:" },
          { type: "info", content: <><span className="font-bold inline-block w-20">about</span> - About me</> },
          { type: "info", content: <><span className="font-bold inline-block w-20">projects</span> - View my work</> },
          { type: "info", content: <><span className="font-bold inline-block w-20">contact</span> - Get in touch</> },
          { type: "info", content: <><span className="font-bold inline-block w-20">color</span> - Theme (e.g., "color green")</> },
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
          { type: "info", content: "Education:" },
          { type: "info", content: "• MCA — Indira Gandhi Institute of Technology, Sarang (2025-2027)" },
          { type: "info", content: "• B.Sc. Computer Science — Udayanath Autonomous College (2022-2025) | 8.6 CGPA" },
          { type: "info", content: "• Higher Secondary (Science) — Prananath Autonomous College (2020-2022) | 86%" },
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
              content: <><span className="font-bold text-primary">{p.title}</span> — {p.category} [{p.date}]</>
            },
            { type: "info", content: `  Stack: ${p.technologies.join(", ")}` },
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
              { type: "info", content: `Invalid. Use: red, green, blue, purple, orange` }
            ]);
          }
        } else {
          setHistory((prev) => [
            ...prev,
            { type: "info", content: "Usage: color [name]. Available: red, green, blue, purple, orange" }
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
          { type: "info", content: `'${cmd}' not found.` }
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
      className="fixed inset-0 h-[100dvh] bg-[#09090b] font-mono text-primary z-50 p-6 md:p-10 overflow-y-auto selection:bg-primary/30 antialiased"
      onClick={() => document.getElementById("cli-input")?.focus()}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-1 w-full text-sm md:text-base">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`
              ${line.type === "success" ? "text-primary opacity-90 font-bold" : ""}
              ${line.type === "input" ? "opacity-100 font-bold" : "opacity-80"}
            `}
          >
            {line.content}
          </div>
        ))}

        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold opacity-100 whitespace-nowrap">C:\Users\Guest&gt;</span>
          <input
            id="cli-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-primary caret-primary"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>

      <button
        onClick={() => navigate("/")}
        className="fixed top-4 right-4 text-primary opacity-50 hover:opacity-100 transition-opacity p-2 text-xl cursor-pointer"
        title="Close Terminal"
      >
        ×
      </button>
    </div>
  );
};

export default TerminalMode;
