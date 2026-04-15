import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorContext } from "../contexts/ColorContext";
import projectsData from "../utils/projects";

// The hook returns a function that processes a single command line string
export const useTerminalCommands = (setHistory, setIsOpen, isHUD = false) => {
    const navigate = useNavigate();
    const { changeColor, COLORS, theme, changeTheme } = useContext(ColorContext);

    const processCommand = (cmdStr) => {
        const cmd = cmdStr.trim().toLowerCase();
        const args = cmd.split(" ");

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
                    { type: "info", content: <><span className="font-bold inline-block w-20">theme</span> - theme [light/dark] </> },
                    ...(!isHUD ? [{ type: "info", content: <><span className="font-bold inline-block w-20">hacker</span> - Hacker mode</> }] : []),
                    ...(isHUD ? [{ type: "info", content: <><span className="font-bold inline-block w-20">terminal</span> - Full terminal</> }] : []),
                    { type: "info", content: <><span className="font-bold inline-block w-20">clear</span> - Clear output</> },
                    { type: "info", content: <><span className="font-bold inline-block w-20">exit</span> - Close {isHUD ? "HUD" : "terminal"}</> }
                ]);
                break;
            case "about":
                setHistory((prev) => [
                    ...prev,
                    { type: "info", content: "Ashutosh Moharana | Backend Developer" },
                    ...(isHUD ? 
                        [{ type: "info", content: "Java & Spring Boot | REST APIs | PostgreSQL" }] : 
                        [
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
                            { type: "info", content: "  Git, GitHub, Postman" }
                        ]
                    )
                ]);
                break;
            case "projects":
                setHistory((prev) => [
                    ...prev,
                    { type: "info", content: "Recent Projects:" },
                    ...(!isHUD ? [{ type: "info", content: " " }] : []),
                    ...projectsData.flatMap((p) => {
                        const titleLine = {
                            type: "info",
                            content: <><span className="font-bold text-primary">{p.title}</span> — {p.category}</>
                        };
                        return isHUD ? [titleLine] : [
                            titleLine,
                            { type: "info", content: `  Stack: ${p.technologies.slice(0, 3).join(", ")}...` },
                            { type: "info", content: " " },
                        ];
                    }),
                    ...(!isHUD ? [{ type: "info", content: "Type 'exit' to view full UI." }] : [])
                ]);
                break;
            case "contact":
                setHistory((prev) => [
                    ...prev,
                    ...(!isHUD ? [
                        { type: "info", content: "Email: ashutoshmoharana00@gmail.com" },
                        { type: "info", content: "LinkedIn: linkedin.com/in/ashutosh-moharana" },
                        { type: "info", content: "GitHub: github.com/ashutosh-moharana" }
                    ] : [
                        { type: "info", content: "ashutoshmoharana00@gmail.com" },
                        { type: "info", content: "github.com/ashutosh-moharana" }
                    ])
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
                            { type: "info", content: `Invalid. Available: ${Object.keys(COLORS).join(", ")}` }
                        ]);
                    }
                } else {
                    setHistory((prev) => [
                        ...prev,
                        { type: "info", content: `Usage: color [name]. Available: ${Object.keys(COLORS).join(", ")}` }
                    ]);
                }
                break;
            case "theme":
                if (args.length > 1) {
                    const mode = args[1];
                    if (mode === "light" || mode === "dark") {
                        changeTheme(mode);
                        setHistory((prev) => [...prev, { type: "success", content: `Theme changed to ${mode} mode.` }]);
                    } else {
                        setHistory((prev) => [...prev, { type: "info", content: `Invalid theme. Available: light, dark` }]);
                    }
                } else {
                    setHistory((prev) => [...prev, { type: "info", content: `Usage: theme [light/dark]. Current: ${theme}` }]);
                }
                break;
            case "clear":
                setHistory(isHUD ? [{ type: "info", content: "Terminal cleared." }] : []);
                break;
            case "hacker":
                if (!isHUD) {
                    setHistory((prev) => [...prev, { type: "system", content: "Initiating hacker mode..." }]);
                    setTimeout(() => navigate("/hacker"), 800);
                } else {
                    setHistory((prev) => [...prev, { type: "info", content: `'${cmd}' not found. Type 'help'.` }]);
                }
                break;
            case "terminal":
                if (isHUD) {
                    navigate("/terminal");
                    setIsOpen(false);
                } else {
                    setHistory((prev) => [
                        ...prev,
                        { type: "info", content: `'${cmd}' not found.` },
                        { type: "info", content: "Available: help, about, projects, contact, color, theme, hacker, clear, exit" }
                    ]);
                }
                break;
            case "exit":
                if (!isHUD) {
                    setHistory((prev) => [...prev, { type: "system", content: "Exiting..." }]);
                    setTimeout(() => navigate("/"), 500);
                } else {
                    setIsOpen(false);
                }
                break;
            default:
                setHistory((prev) => [
                    ...prev,
                    { type: "info", content: `'${cmd}' not found.${isHUD ? " Type 'help'." : ""}` },
                    ...(!isHUD ? [{ type: "info", content: "Available: help, about, projects, contact, color, theme, hacker, clear, exit" }] : [])
                ]);
                break;
        }
    };

    return processCommand;
};
