import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * MagneticElement
 * A premium Awwwards-style magnetic hover effect.
 * Pulls the element towards the cursor with a physics-based spring return.
 */
export const MagneticElement = ({ children, className = "", strength = 40 }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    // We don't want magnetic effects on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * (strength / 100));
      yTo(y * (strength / 100));
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

/**
 * TextReveal
 * Wraps text in an overflow-hidden container and animates it up from y: 100%
 * Works best for bold, chunky headings.
 */
export const TextReveal = ({ children, className = "", delay = 0, triggerRef = null }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const animConfig = {
      y: 0,
      opacity: 1,
      rotation: 0,
      duration: 1.2,
      delay: delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: triggerRef?.current || containerRef.current,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    };

    gsap.fromTo(text,
      { y: "110%", opacity: 0, rotation: 3 },
      animConfig
    );
  }, [delay, triggerRef]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={textRef} className="origin-top-left">
        {children}
      </div>
    </div>
  );
};

/**
 * TiltCard
 * Disabled for the Neo-Brutalist redesign (converted to a flat container).
 */
export const TiltCard = ({ children, className = "", maxTilt = 15, scale = 1.02 }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};
