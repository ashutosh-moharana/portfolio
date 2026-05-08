import { useRef } from "react";
import { FiHeart } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
        toggleActions: "play reverse play reverse"
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
      <div className="text-center flex flex-col items-center gap-3 px-4">
        <p className="footer-thankyou font-display text-3xl text-primary/80 -rotate-2 mb-2">
          Thank you for visiting!
        </p>
        <p className="footer-copyright text-sm font-sans font-medium text-subtle text-center flex items-center justify-center gap-1.5">
          &copy; {new Date().getFullYear()} Ashutosh Moharana. Crafted with <FiHeart className="text-primary fill-primary/20" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
