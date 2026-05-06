import {
    useState,
    createContext,
    useEffect,
    lazy,
    Suspense
} from "react";
import { Routes, Route } from "react-router-dom";

import { DeviceProvider } from "./contexts/DeviceContext";
import { SoundProvider } from "./contexts/SoundContext";
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
const Archive     = lazy(() => import("./components/Archive"));
const Hub         = lazy(() => import("./components/Hub"));
const NotFound     = lazy(() => import("./components/NotFound"));

// Create Lenis Context for smooth scrolling
export const LenisContext = createContext();

function Portfolio() {
    return (
        <>
            <section id="landing" className="relative z-[1]">
                <LandingPage />
            </section>
            <section id="about" className="relative z-[2]">
                <About />
            </section>
            <section id="projects" className="relative z-[3]">
                <Projects />
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
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            lerp: 0.1,
        });

        setLenis(lenisInstance);

        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
        };
    }, []);

    return (
        <SoundProvider>
        <DeviceProvider>
            <LenisContext.Provider value={lenis}>
                <div className="film-grain" aria-hidden="true" />
                <CustomCursor />
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
        </SoundProvider>
    );
}

export default App;
