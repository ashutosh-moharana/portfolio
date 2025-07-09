import React, { useContext } from 'react'
import { LenisContext } from '../App'
import { useDevice } from "../contexts/DeviceContext";

const Navbar = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    if (lenis) {
      requestAnimationFrame(() => {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`absolute flex ${isMobile ? " bottom-41 text-sm right-6  gap-4 rounded-full font-bold font-mono " : " p-1 z-40 top-1/2 -right-20 rotate-90  gap-14 animate-pulse"}  `}>
      <a 
        href="#about" 
        onClick={(e) => handleLinkClick(e, 'about')}
        className="hover:text-primary transition-colors cursor-pointer"
      >
        ABOUT
      </a>
      <a 
        href="#projects" 
        onClick={(e) => handleLinkClick(e, 'projects')}
        className="hover:text-primary transition-colors cursor-pointer "
      >
        PROJECTS
      </a>
      <a 
        href="#contact" 
        onClick={(e) => handleLinkClick(e, 'contact')}
        className="hover:text-primary transition-colors cursor-pointer "
      >
        CONTACT
      </a>
    </div>
  )
}

export default Navbar