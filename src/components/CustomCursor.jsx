import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Spring physics for the trailing ring to create a "fluid" feel
    const ringX = useSpring(-100, { stiffness: 150, damping: 20, mass: 0.1 });
    const ringY = useSpring(-100, { stiffness: 150, damping: 20, mass: 0.1 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            setMousePosition({ x, y });
            ringX.set(x);
            ringY.set(y);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("interactive") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsHovering(isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", updateMousePosition, { passive: true });
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleMouseOver, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible, ringX, ringY]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block select-none overflow-hidden">
                    {/* ─── HUD Crosshairs (Appear on Hover) ─── */}
                    <motion.div
                        className="fixed border-l border-primary/30"
                        animate={{
                            left: mousePosition.x,
                            top: 0,
                            bottom: 0,
                            width: isHovering ? 1 : 0,
                            opacity: isHovering ? 0.6 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.div
                        className="fixed border-t border-primary/30"
                        animate={{
                            top: mousePosition.y,
                            left: 0,
                            right: 0,
                            height: isHovering ? 1 : 0,
                            opacity: isHovering ? 0.6 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                    />

                    {/* ─── Targeting Indicators ─── */}
                    <AnimatePresence>
                        {isHovering && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 10 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="fixed pointer-events-none text-primary font-mono text-[8px] tracking-[0.2em]"
                                style={{
                                    left: mousePosition.x + 30,
                                    top: mousePosition.y - 12,
                                }}
                            >
                                [ TARGET_ACQUIRED ]
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ─── Fluid Trailing Ring ─── */}
                    <motion.div
                        style={{
                            x: ringX,
                            y: ringY,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        className="fixed w-10 h-10 border border-primary/40 rounded-full mix-blend-difference"
                        animate={{
                            scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
                            rotate: isHovering ? 180 : 0,
                            borderWidth: isHovering ? "1px" : "2px",
                            borderColor: isHovering ? "var(--color-primary)" : "var(--color-primary)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />

                    {/* ─── Main Interactive Ring ─── */}
                    <motion.div
                        className="fixed w-8 h-8 rounded-full border-2 border-primary mix-blend-difference"
                        animate={{
                            x: mousePosition.x - 16,
                            y: mousePosition.y - 16,
                            scale: isClicking ? 1.4 : isHovering ? 0.4 : 1,
                            backgroundColor: isHovering ? "var(--color-primary)" : "transparent",
                            borderColor: isHovering ? "var(--color-primary)" : "var(--color-primary)",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 28,
                            mass: 0.5,
                        }}
                    />

                    {/* ─── Inner Core Dot ─── */}
                    <motion.div
                        className="fixed w-1.5 h-1.5 bg-primary rounded-full z-10"
                        animate={{
                            x: mousePosition.x - 3,
                            y: mousePosition.y - 3,
                            scale: isClicking ? 0 : isHovering ? 2.5 : 1,
                            opacity: isClicking ? 0 : 1,
                            boxShadow: isHovering ? "0 0 15px var(--color-primary)" : "none",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 1000,
                            damping: 40,
                            mass: 0.1,
                        }}
                    />

                    {/* ─── Corner Brackets (Tech Aesthetic) ─── */}
                    <AnimatePresence>
                        {isHovering && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="fixed pointer-events-none"
                                style={{
                                    left: mousePosition.x - 28,
                                    top: mousePosition.y - 28,
                                    width: 56,
                                    height: 56,
                                }}
                            >
                                <motion.div 
                                    animate={{ opacity: [1, 0.5, 1] }} 
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" 
                                />
                                <motion.div 
                                    animate={{ opacity: [1, 0.5, 1] }} 
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                    className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" 
                                />
                                <motion.div 
                                    animate={{ opacity: [1, 0.5, 1] }} 
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                    className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" 
                                />
                                <motion.div 
                                    animate={{ opacity: [1, 0.5, 1] }} 
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
                                    className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" 
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CustomCursor;

