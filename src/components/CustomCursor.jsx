import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            let clientX, clientY;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            setMousePosition({ x: clientX, y: clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            // Check if we are hovering over an interactive element
            if (
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('interactive') ||
                window.getComputedStyle(e.target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('touchmove', updateMousePosition, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('touchmove', updateMousePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            opacity: 1,
            backgroundColor: "transparent",
            border: "2px solid var(--color-primary)",
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1.2,
            opacity: 0.6,
            backgroundColor: "var(--color-primary)",
            border: "0px solid var(--color-primary)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 22,
                mass: 0.5
            }
        },
        hidden: {
            opacity: 0,
            scale: 0.5,
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Main Outer Cursor */}
                    <motion.div
                        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                        variants={variants}
                        initial="hidden"
                        animate={isHovering ? "hover" : "default"}
                        exit="hidden"
                    />
                    {/* Inner Dot Cursor */}
                    <motion.div
                        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[10000] hidden md:block"
                        animate={{
                            x: mousePosition.x - 3,
                            y: mousePosition.y - 3,
                            opacity: isHovering ? 0 : 1
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 1000,
                            damping: 40,
                            mass: 0.1
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default CustomCursor;
