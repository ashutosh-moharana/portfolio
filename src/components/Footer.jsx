import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Squiggle, Sparkle } from "./Doodles";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(".footer-thankyou",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    tl.fromTo(".footer-copyright",
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      "-=0.2"
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="w-full relative mt-auto py-10 bg-background border-t border-border/40 overflow-hidden">
      <div className="text-center flex flex-col items-center gap-3 px-4 relative">
        <p className="footer-thankyou font-display text-2xl md:text-3xl text-primary/80 -rotate-2 mb-2 relative">
          <Sparkle className="absolute -top-6 -right-6 md:-right-8 text-primary opacity-60 pointer-events-none" size={28} />
          Have a wonderful day!
          <Squiggle className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-6 text-secondary opacity-70 pointer-events-none" />
        </p>
        <p className="footer-copyright text-sm font-sans font-medium text-subtle text-center flex items-center justify-center gap-1.5">
          &copy; {new Date().getFullYear()} Ashutosh Moharana
        </p>
      </div>
    </footer>
  );
};

export default Footer;
