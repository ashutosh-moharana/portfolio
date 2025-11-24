import React, { useContext, useState } from 'react';
import { LenisContext } from '../App';
import { useDevice } from "../contexts/DeviceContext";
import { motion, AnimatePresence } from "framer-motion";
import { PiReadCvLogoBold } from "react-icons/pi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.getElementById(targetId);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'ABOUT', id: 'about' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'CONTACT', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        ...(isMobile && {
          height: isMenuOpen ? "auto" : "68px",
          borderRadius: isMenuOpen ? "24px" : "34px"
        })
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-4 left-4 right-4 md:top-6 md:left-12 md:right-12 z-50 flex flex-col md:justify-center ${!isMobile ? 'md:rounded-full' : ''} backdrop-blur-md bg-background/80 border border-white/10 shadow-lg overflow-hidden`}
    >
      <div className="flex items-center justify-between px-6 py-3 md:px-8 md:py-4 w-full">
        <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => handleLinkClick(e, 'landing')}>
          <img src="/logo.webp" alt="Logo" className="h-10 w-10 md:h-12 md:w-12" />
          <span className="text-heading font-bold text-xl tracking-wider">ASHU</span>
        </div>

        {!isMobile && (
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="text-sm font-bold tracking-widest hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}

            <a href={import.meta.env.VITE_RESUME_LINK} target="_blank" rel="noopener noreferrer">
              <button className="flex items-center gap-2 border-2 border-primary text-primary px-6 py-2.5 rounded-full hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(255,20,147,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-sm">
                <PiReadCvLogoBold size={20} />
                RESUME
              </button>
            </a>
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl z-50 relative p-1"
          >
            {isMenuOpen ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-6 pb-8 pt-2 w-full"
          >
            <div className="flex flex-col items-center gap-4 w-full">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-lg font-bold tracking-widest hover:text-primary transition-colors w-full text-center py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <a href={import.meta.env.VITE_RESUME_LINK} target="_blank" rel="noopener noreferrer" className="w-full px-8">
              <button className="flex items-center justify-center gap-3 border-2 border-primary text-primary px-8 py-3.5 rounded-full hover:bg-primary hover:text-white hover:shadow-[0_0_25px_rgba(255,20,147,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-lg w-full">
                <PiReadCvLogoBold size={24} />
                RESUME
              </button>
            </a>

            <div className="flex items-center gap-6 mt-2">
              <a href="https://www.linkedin.com/in/ashutosh-moharana/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://github.com/Ashutosh-Moharana" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
                <FaGithub />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;