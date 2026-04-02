import {
    useState,
    createContext,
    useEffect,
    useRef,
} from "react";
import { Routes, Route } from "react-router-dom";

import { DeviceProvider } from "./contexts/DeviceContext";
import Lenis from "lenis";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Projects from "./components/Projects";
import Resources from "./components/Resources";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import NotFound from "./components/NotFound";
import HackerTyper from "./components/HackerTyper";
import TerminalMode from "./components/TerminalMode";

// Create Lenis Context for smooth scrolling
export const LenisContext = createContext();


function Portfolio() {
    const [currentSection, setCurrentSection] = useState("landing");
    const [lenis, setLenis] = useState(null);
    const lenisRef = useRef();

    // Initialize Lenis smooth scrolling
    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "horizontal",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            wheelMultiplier: 1.5,
            lerp: 0.2,
        });

        lenisRef.current = lenisInstance;
        setLenis(lenisInstance);

        function raf(time) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        lenisRef.current.on("scroll", ({ scroll }) => {
            const windowHeight = window.innerHeight;
            if (scroll < windowHeight * 0.5) {
                setCurrentSection("landing");
            } else if (scroll < windowHeight * 1.5) {
                setCurrentSection("projects");
            } else if (scroll < windowHeight * 2.5) {
                setCurrentSection("about");
            } else {
                setCurrentSection("contact");
            }
        });

        requestAnimationFrame(raf);
        return () => lenisRef.current?.destroy();
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            <DeviceProvider>
                <div className="app-container bg-background select-none">
                    <LandingPage />
                    <About />
                    <Projects />
                    <Contact />
                </div>
            </DeviceProvider>
        </LenisContext.Provider>
    );
}

function App() {
    return (
        <DeviceProvider>
            <CustomCursor />
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/terminal" element={<TerminalMode />} />
                <Route path="/hacker" element={<HackerTyper />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </DeviceProvider>
    );
}

export default App;
