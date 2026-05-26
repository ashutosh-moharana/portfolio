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
      <div ref={textRef} className="origin-top-left will-change-transform">
        {children}
      </div>
    </div>
  );
};

/**
 * TiltCard
 * Adds a 3D tilt effect that tracks mouse movement over the element.
 */
export const TiltCard = ({ children, className = "", maxTilt = 15, scale = 1.02 }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // We don't want tilt effects on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();

      const x = (e.clientX - left) / width; // 0 to 1
      const y = (e.clientY - top) / height; // 0 to 1

      // -1 to 1
      const tiltX = (y - 0.5) * 2 * -maxTilt;
      const tiltY = (x - 0.5) * 2 * maxTilt;

      gsap.to(card, {
        rotationX: tiltX,
        rotationY: tiltY,
        scale: scale,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center center"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, scale]);

  return (
    <div ref={cardRef} className={`relative ${className}`} style={{ willChange: "transform", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};
