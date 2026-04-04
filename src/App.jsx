import {
    useState,
    createContext,
    useEffect,
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
import BootSequence from "./components/BootSequence";
import TerminalHUD from "./components/TerminalHUD";

// Create Lenis Context for smooth scrolling
export const LenisContext = createContext();


function Portfolio() {
    const [lenis, setLenis] = useState(null);
    const [booted, setBooted] = useState(
        () => !!sessionStorage.getItem("ash_boot_done")
    );

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

        setLenis(lenisInstance);

        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenisInstance.destroy();
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {!booted && <BootSequence onComplete={() => setBooted(true)} />}
            <TerminalHUD />
            <div className="app-container bg-background select-none">
                <LandingPage />
                <About />
                <Projects />
                <Contact />
            </div>
        </LenisContext.Provider>
    );
}

function App() {
    // Preload critical assets into browser cache
    useEffect(() => {
        const criticalAssets = ["/ashu.webp"];
        criticalAssets.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

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
