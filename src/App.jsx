import {
    useRef,
    lazy,
    Suspense
} from "react";
import { Routes, Route } from "react-router-dom";
import { useGSAP } from "@gsap/react";

import { DeviceProvider } from "./contexts/DeviceContext";
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

function PageEntrance({ children }) {
    const ref = useRef(null);
    useGSAP(() => {
        gsap.fromTo(ref.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
    }, { scope: ref });
    return <div ref={ref}>{children}</div>;
}

function App() {
    const isTouch = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

    return (     
        <DeviceProvider>
            {!isTouch && <CustomCursor />}
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
