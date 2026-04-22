import {
    useState,
    createContext,
    useEffect,
    lazy,
    Suspense,
} from "react";
import { Routes, Route } from "react-router-dom";

import { DeviceProvider } from "./contexts/DeviceContext";
import Lenis from "lenis";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import BootSequence from "./components/BootSequence";

import TerminalMode from "./components/TerminalMode";

// Lazy-loaded routes — only downloaded when the user navigates to them
const Resources   = lazy(() => import("./components/Resources"));
const HackerTyper  = lazy(() => import("./components/HackerTyper"));
const NotFound     = lazy(() => import("./components/NotFound"));

// Create Lenis Context for smooth scrolling
export const LenisContext = createContext();


function Portfolio() {
    const [lenis, setLenis] = useState(null);
    const [booted, setBooted] = useState(
        () => !!sessionStorage.getItem("ash_boot_done")
    );

    // Initialize Lenis smooth scrolling — only after boot to avoid startup CPU contention
    useEffect(() => {
        if (!booted) return; // wait until boot sequence is done

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

        let rafId;
        function raf(time) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenisInstance.destroy();
        };
    }, [booted]);

    return (
        <LenisContext.Provider value={lenis}>
            {!booted && <BootSequence onComplete={() => setBooted(true)} />}

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

    return (
        <DeviceProvider>
            <CustomCursor />
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/terminal" element={<TerminalMode />} />
                    <Route path="/hacker" element={<HackerTyper />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </DeviceProvider>
    );
}

export default App;
