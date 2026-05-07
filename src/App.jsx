import {
    useState,
    createContext,
    useEffect,
    lazy,
    Suspense
} from "react";
import { Routes, Route } from "react-router-dom";

import { DeviceProvider } from "./contexts/DeviceContext";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// Lazy-loaded routes
const Archive = lazy(() => import("./components/Archive"));
const Hub = lazy(() => import("./components/Hub"));
const NotFound = lazy(() => import("./components/NotFound"));

// Create Lenis Context for smooth scrolling
export const LenisContext = createContext();

function Portfolio() {
    return (
        <>
            <section id="landing" className="relative z-[1]">
                <LandingPage />
            </section>
            <section id="projects" className="relative z-[2]">
                <Projects />
            </section>
            <section id="about" className="relative z-[3]">
                <About />
            </section>
            <section id="contact" className="relative z-[4]">
                <Contact />
            </section>
        </>
    );
}

function App() {
    const [lenis, setLenis] = useState(null);

    // Initialize Lenis
    useEffect(() => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches;

        const lenisInstance = new Lenis({
            duration: isTouch ? 2.5 : 1.2, // Slower duration on mobile for that "deliberate" feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            smoothTouch: true, // Enable smooth scroll on touch
            wheelMultiplier: 1,
            touchMultiplier: isTouch ? 0.6 : 2, // Significantly slow down touch scroll
            infinite: false,
        });

        setLenis(lenisInstance);

        // Synchronize Lenis with ScrollTrigger
        lenisInstance.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenisInstance.destroy();
            gsap.ticker.remove(lenisInstance.raf);
        };
    }, []);

    const isTouch = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

    return (     
        <DeviceProvider>
            <LenisContext.Provider value={lenis}>
                {!isTouch && <CustomCursor />}
                <Navbar />
                <div className="app-container bg-background">
                    <Suspense fallback={<div className="min-h-screen bg-background" />}>
                        <Routes>
                            <Route path="/" element={<Portfolio />} />
                            <Route path="/archive" element={<Archive />} />
                            <Route path="/hub" element={<Hub />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </div>
            </LenisContext.Provider>
        </DeviceProvider>
    );
}

export default App;
