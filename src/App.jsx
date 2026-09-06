import {
    useRef,
    useEffect,
    lazy,
    Suspense
} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";

import { DeviceProvider } from "./contexts/DeviceContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// Lazy-loaded routes
const Archive = lazy(() => import("./components/Archive"));
const Hub = lazy(() => import("./components/Hub"));
const NotFound = lazy(() => import("./components/NotFound"));

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
            <Footer />
        </>
    );
}

function PageEntrance({ children }) {
    const ref = useRef(null);
    useGSAP(() => {
        gsap.fromTo(ref.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.75 }
        );
    }, { scope: ref });
    return <div ref={ref}>{children}</div>;
}

/* ── Page Transition Wipe Overlay ──────────────────────── */
function PageTransition() {
    const containerRef = useRef(null);

    useEffect(() => {
        const slices = gsap.utils.toArray(".wipe-slice", containerRef.current);
        if (slices.length === 0) return;
        
        const playWipe = (color) => {
            const tl = gsap.timeline();
            
            // Set all slices to be anchored at the top, scale 0, and apply requested color or fallback to background
            tl.set(containerRef.current, { display: "flex" });
            const wipeColor = color || "var(--background)";
            tl.set(slices, { transformOrigin: "top", scaleY: 0, backgroundColor: wipeColor });
            
            // Stagger scaleY to 1
            tl.to(slices, {
                scaleY: 1,
                duration: 0.45,
                stagger: 0.05,
                ease: "power4.inOut",
            });
            
            // Swap origin to bottom so they exit downwards
            tl.set(slices, { transformOrigin: "bottom" });
            
            // Stagger scaleY to 0
            tl.to(slices, {
                scaleY: 0,
                duration: 0.45,
                stagger: 0.05,
                ease: "power4.inOut",
                delay: 0.1,
            });
            
            tl.set(containerRef.current, { display: "none" });
            return tl;
        };

        const handleManualWipe = (e) => {
            const color = e.detail?.color;
            const skipScroll = e.detail?.skipScroll;
            const tl = playWipe(color);
            
            if (!skipScroll) {
                // Scroll to top after wipe covers the screen (middle of animation)
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 450); // Adjusted to align with stagger completion
            }
        };
        
        window.addEventListener('triggerWipe', handleManualWipe);

        return () => {
            window.removeEventListener('triggerWipe', handleManualWipe);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9990] pointer-events-none flex"
            style={{ display: "none" }}
        >
            {[...Array(5)].map((_, i) => (
                <div key={i} className="wipe-slice flex-1 h-full bg-background will-change-transform" />
            ))}
        </div>
    );
}

function App() {
    const isTouch = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

    /* ── Lenis Smooth Scroll ──────────────────────────────── */
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (     
        <DeviceProvider>
            {!isTouch && <CustomCursor />}
            <PageTransition />
            <Navbar />
            <div className="app-container bg-background">
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                    <PageEntrance>
                        <Routes>
                            <Route path="/" element={<Portfolio />} />
                            <Route path="/archive" element={<Archive />} />
                            <Route path="/hub" element={<Hub />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </PageEntrance>
                </Suspense>
            </div>
        </DeviceProvider>
    );
}

export default App;

