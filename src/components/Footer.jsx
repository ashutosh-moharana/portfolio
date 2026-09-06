import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from "react-router-dom";
import { MagneticElement } from "../utils/animations";
import { SiLinkedin, SiGithub, SiLeetcode, SiHackerrank, SiWhatsapp } from "react-icons/si";
import { UnderlineDoodle, Sparkle } from "./Doodles";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const location = useLocation();
  const isSubRoute = location.pathname !== '/';

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(".footer-element",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: footerRef });

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="w-full relative mt-auto bg-background border-t-2 border-border pt-12 pb-6 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Section: Logo, Doodles, Socials, Button */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          
          {/* Logo */}
          <div className="footer-element flex-shrink-0">
            <Link
              to={isSubRoute ? "/" : "#"}
              onClick={isSubRoute ? undefined : (e) => handleLinkClick(e, 'landing')}
              className="relative flex items-center group/logo px-4 py-2 brutal-border"
            >
              <div className="font-display text-2xl md:text-3xl tracking-tighter text-foreground group-hover/logo:text-primary transition-colors">
                ASH<span className="text-primary group-hover/logo:text-foreground">MO</span>
              </div>
            </Link>
          </div>

          {/* Center Text with Doodles */}
          <div className="footer-element flex-grow flex items-center justify-center relative px-4">
            <p className="font-chunky text-xl md:text-2xl text-foreground text-center relative z-10">
              <Sparkle className="absolute -top-6 -left-6 text-primary w-8 h-8" />
              Okay, you can go now. I’ll miss you. 😄
              <UnderlineDoodle className="absolute -bottom-3 left-0 w-full h-3 text-secondary pointer-events-none" />
            </p>
          </div>

          {/* Socials & Button */}
          <div className="footer-element flex-shrink-0 flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com/in/ashutosh-moharana" target="_blank" rel="noreferrer" className="p-2 brutal-border text-foreground hover:bg-primary hover:-translate-y-1 hover:brutal-shadow transition-all">
                <SiLinkedin size={18} />
              </a>
              <a href="https://leetcode.com/u/ash_mo/" target="_blank" rel="noreferrer" className="p-2 brutal-border text-foreground hover:bg-primary hover:-translate-y-1 hover:brutal-shadow transition-all">
                <SiLeetcode size={18} />
              </a>
              <a href="https://github.com/ashutosh-moharana" target="_blank" rel="noreferrer" className="p-2 brutal-border text-foreground hover:bg-primary hover:-translate-y-1 hover:brutal-shadow transition-all">
                <SiGithub size={18} />
              </a>
              <a href="https://www.hackerrank.com/profile/ash_mo" target="_blank" rel="noreferrer" className="p-2 brutal-border text-foreground hover:bg-primary hover:-translate-y-1 hover:brutal-shadow transition-all">
                <SiHackerrank size={18} />
              </a>
            </div>

           <MagneticElement strength={15}>
              <a
                href="https://wa.me/919937727738?text=Hi%20Ashutosh%2C%20I%20checked%20out%20your%20portfolio%20and%20wanted%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn ml-2 px-6 py-2 text-sm md:text-base bg-foreground text-background border-foreground hover:bg-primary hover:text-foreground flex items-center gap-2"
              >
                <SiWhatsapp size={16} />
                Let's Talk
              </a>
            </MagneticElement>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="footer-element border-t border-border/20 pt-6 mt-4 text-center">
          <p className="font-sans text-xs md:text-sm font-medium text-subtle">
           Ashutosh Moharana &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
