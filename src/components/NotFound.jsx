import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NotFound = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        // Card entrance — slides up with subtle rotation settle
        tl.fromTo(".notfound-card",
            { y: 40, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
        );

        // Tape scale-in
        tl.fromTo(".notfound-tape",
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.35, ease: "power2.out" },
            "-=0.2"
        );

        // 404 number — stagger each digit
        tl.fromTo(".notfound-digit",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out" },
            "-=0.2"
        );

        // Subtitle + description + button — sequential stagger
        tl.fromTo(".notfound-content",
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, stagger: 0.08, ease: "power3.out" },
            "-=0.15"
        );

        // Background blob soft drift
        gsap.to(".notfound-bg-blob", {
            yPercent: -8,
            xPercent: 5,
            ease: "sine.inOut",
            duration: 6,
            repeat: -1,
            yoyo: true,
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-background bg-dot-grid text-foreground flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
            
            {/* Scrapbook background decoration */}
            <div className="notfound-bg-blob absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-primary opacity-10 pointer-events-none rounded-full blur-[100px] z-0 will-change-transform" />
            
            <div
                className="notfound-card relative z-10 bg-card-bg p-8 md:p-16 brutal-border brutal-shadow max-w-lg w-full flex flex-col items-center rotate-2"
            >
                {/* Tape */}
                <div className="notfound-tape absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-primary/80 -rotate-3 brutal-border shadow-[2px_2px_0px_var(--color-foreground)] z-20" style={{ transformOrigin: 'center center' }} />
                
                <h1
                    className="text-8xl md:text-[120px] font-display text-primary leading-none select-none mb-4 flex"
                    aria-label="404"
                >
                    {"404".split("").map((digit, i) => (
                        <span key={i} className="notfound-digit inline-block">{digit}</span>
                    ))}
                </h1>
                <h2 className="notfound-content text-4xl md:text-5xl font-chunky text-foreground uppercase tracking-wide mb-6">
                    Page <span className="text-primary">Lost</span>
                </h2>

                <p className="notfound-content text-subtle text-lg font-sans max-w-sm mb-10 leading-relaxed">
                    Looks like this page was ripped out of the scrapbook. Let's get you back to the main collection.
                </p>

                <div className="notfound-content">
                    <Link
                        to="/"
                        className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-primary text-foreground font-chunky text-xl brutal-border brutal-shadow hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all"
                    >
                        <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
