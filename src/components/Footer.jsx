import { useRef } from "react";
import { FiHeart } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".footer-content",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="w-full relative mt-auto py-10 bg-background border-t border-border/40 overflow-hidden">
      <div className="footer-content text-center flex flex-col items-center gap-3 px-4">
        <p className="font-display text-3xl text-primary/80 -rotate-2 mb-2">
          Thank you for visiting!
        </p>
        <p className="text-sm font-sans font-medium text-subtle text-center flex items-center justify-center gap-1.5">
          &copy; {new Date().getFullYear()} Ashutosh Moharana. Crafted with <FiHeart className="text-primary fill-primary/20" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
