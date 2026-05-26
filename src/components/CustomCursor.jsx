import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ring2Ref = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    // Check if device has a touch screen or no fine pointer
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Pre-create reusable tweens (one-time cost)
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power2.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power2.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power2.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power2.out" });
    const ring2X = gsap.quickTo(ring2Ref.current, "x", { duration: 0.6, ease: "power3.out" });
    const ring2Y = gsap.quickTo(ring2Ref.current, "y", { duration: 0.6, ease: "power3.out" });

    const onMouseMove = (e) => {
      dotX(e.clientX - 4);
      dotY(e.clientY - 4);
      ringX(e.clientX - 16);
      ringY(e.clientY - 16);
      ring2X(e.clientX - 22);
      ring2Y(e.clientY - 22);
    };

    const onMouseEnter = (e) => {
      const target = e.target;
      const interactive = target.closest("a, button, .cursor-pointer, .magnetic");

      if (interactive && !isHovering.current) {
        isHovering.current = true;
        gsap.to([ringRef.current, ring2Ref.current], {
          scale: 1.5,
          borderColor: "var(--primary)",
          borderWidth: "2.5px",
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dotRef.current, {
          scale: 0.6,
          opacity: 0.9,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseLeave = (e) => {
      const target = e.target;
      const interactive = target.closest("a, button, .cursor-pointer, .magnetic");

      // Only reset if we are actually leaving an interactive element
      if (interactive && isHovering.current) {
        // Check if the relatedTarget is still inside the interactive element
        if (!interactive.contains(e.relatedTarget)) {
          isHovering.current = false;
          gsap.to([ringRef.current, ring2Ref.current], {
            scale: 1,
            backgroundColor: "transparent",
            stagger: 0.04,
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: "auto",
          });
          gsap.to(dotRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
            overwrite: "auto",
          });
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
      <div ref={ring2Ref} className="cursor-ring-2 hidden md:block" />
    </>
  );
};

export default CustomCursor;
