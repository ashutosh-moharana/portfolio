import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const outerRingRef = useRef(null);

    const hoveredElement = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Check if device has a touch screen or no fine pointer
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        if (isTouchDevice) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        const outerRing = outerRingRef.current;
        if (!dot || !ring || !outerRing) return;

        // Pre-create reusable tweens (one-time cost)
        const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
        const ringX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });
        const outerRingX = gsap.quickTo(outerRing, "x", { duration: 0.4, ease: "power3.out" });
        const outerRingY = gsap.quickTo(outerRing, "y", { duration: 0.4, ease: "power3.out" });

        const updateCursorPosition = (clientX, clientY) => {
            if (hoveredElement.current) {
                const rect = hoveredElement.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Subtle magnetic pull based on distance from center
                const pullX = (centerX - clientX) * 0.2;
                const pullY = (centerY - clientY) * 0.2;

                dotX(clientX + pullX - 4);
                dotY(clientY + pullY - 4);
                ringX(clientX + pullX * 1.2 - 20);
                ringY(clientY + pullY * 1.2 - 20);
                outerRingX(clientX + pullX * 1.5 - 30);
                outerRingY(clientY + pullY * 1.5 - 30);
            } else {
                dotX(clientX - 4);
                dotY(clientY - 4);
                ringX(clientX - 20);
                ringY(clientY - 20);
                outerRingX(clientX - 30);
                outerRingY(clientY - 30);
            }
        };

        const onMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            updateCursorPosition(e.clientX, e.clientY);
        };

        const onMouseEnter = (e) => {
            const target = e.target;
            const interactive = target.closest("a, button, .cursor-pointer, .magnetic, [role='button']");

            if (interactive && hoveredElement.current !== interactive) {
                hoveredElement.current = interactive;

                // Animate elements to active state
                gsap.to(dot, {
                    scale: 0.5,
                    backgroundColor: "var(--primary)",
                    duration: 0.3,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                gsap.to(ring, {
                    scale: 1.5,
                    borderColor: "var(--primary)",
                    borderWidth: "2px",
                    opacity: 0.8,
                    duration: 0.3,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                gsap.to(outerRing, {
                    scale: 1.8,
                    borderColor: "var(--accent)",
                    opacity: 0.5,
                    borderStyle: "dashed",
                    rotation: 90,
                    duration: 0.4,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            }
        };

        const onMouseLeave = (e) => {
            const target = e.target;
            const interactive = target.closest("a, button, .cursor-pointer, .magnetic, [role='button']");

            if (interactive && hoveredElement.current) {
                if (!interactive.contains(e.relatedTarget)) {
                    hoveredElement.current = null;

                    // Reset dot
                    gsap.to(dot, {
                        scale: 1,
                        backgroundColor: "var(--foreground)",
                        duration: 0.4,
                        ease: "power3.inOut",
                        overwrite: "auto",
                    });

                    // Reset ring
                    gsap.to(ring, {
                        scale: 1,
                        borderColor: "var(--foreground)",
                        borderWidth: "1.5px",
                        opacity: 0.5,
                        duration: 0.4,
                        ease: "power3.inOut",
                        overwrite: "auto",
                    });

                    // Reset outer ring
                    gsap.to(outerRing, {
                        scale: 1,
                        borderColor: "var(--foreground)",
                        opacity: 0.2,
                        borderStyle: "solid",
                        rotation: 0,
                        duration: 0.5,
                        ease: "power3.inOut",
                        overwrite: "auto",
                    });

                    // Trigger a position update immediately so it doesn't wait for next mousemove to un-snap
                    updateCursorPosition(mousePos.current.x, mousePos.current.y);
                }
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseEnter);
        document.addEventListener("mouseout", onMouseLeave);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseEnter);
            document.removeEventListener("mouseout", onMouseLeave);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block" />
            <div ref={ringRef} className="cursor-ring hidden md:block" />
            <div ref={outerRingRef} className="cursor-outer-ring hidden md:block" />
        </>
    );
};

export default CustomCursor;
