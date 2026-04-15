import { useContext, useState, useEffect, useRef } from 'react';
import { LenisContext } from '../App';
import { ColorContext } from '../contexts/ColorContext';

import { useDevice } from "../contexts/DeviceContext";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);
  const { theme, toggleTheme } = useContext(ColorContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // True when we're on a sub-route (not the main portfolio page)
  const isSubRoute = location.pathname !== '/';

  const lastScrollY = useRef(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current && latest > 150 && !isMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  // Close mobile menu on scroll
  useEffect(() => {
    const onScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

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

  const desktopRouteLinks = [
    { name: 'RESOURCES', href: '/resources' },
  ];

  const mobileRouteLinks = [
    { name: 'RESOURCES', href: '/resources' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden ? "-150%" : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col md:justify-center bg-background/98 md:bg-background/90 md:backdrop-blur-md border-b-2 border-primary`}
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-4 md:px-8 md:pt-7 md:pb-5 w-full">
        {/* Logo / brand — links home on sub-routes, scrolls to top on main */}
        <Link 
          to={isSubRoute ? "/" : "#"} 
          onClick={isSubRoute ? undefined : (e) => handleLinkClick(e, 'landing')}
          className="group relative flex items-center gap-4 cursor-pointer"
        >
          
          <div className="relative overflow-hidden pt-1 flex flex-col justify-center">
            <div className="flex items-baseline gap-1">
              <span className="text-foreground font-cinematic text-3xl tracking-[0.2em] leading-none uppercase">ASH</span>
              <span className="text-primary font-cinematic text-3xl tracking-[0.2em] leading-none uppercase">MO</span>
            </div>
            
            {/* High-Precision Glitch Overlays */}
            <motion.div 
              animate={{ 
                x: [0, -4, 4, -2, 0], 
                skewX: [0, 10, -10, 5, 0],
                opacity: [0, 0.4, 0, 0.4, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.3, repeatDelay: 4 }}
              className="absolute inset-0 text-primary font-cinematic text-3xl tracking-[0.2em] leading-none select-none pointer-events-none opacity-0"
            >
              ASHMO
            </motion.div>
          </div>
        </Link>

        {!isMobile && (
          <div className="flex items-center gap-8">
            {/* Main scroll-links: disabled (greyed) on sub-routes */}
            {navLinks.map((link) =>
              isSubRoute ? (
                <span
                  key={link.name}
                  className="text-sm font-mono tracking-[0.2em] uppercase text-foreground/20 cursor-not-allowed py-1 select-none"
                  title="Navigate to portfolio to use this"
                >
                  {link.name}
                </span>
              ) : (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-sm font-mono tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors relative group py-2 px-5"
                >
                  {link.name}
                  
                  {/* HUD Brackets on Hover - Larger and Thicker */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary shadow-[0_0_5px_var(--color-primary)]" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary shadow-[0_0_5px_var(--color-primary)]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary shadow-[0_0_5px_var(--color-primary)]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary shadow-[0_0_5px_var(--color-primary)]" />
                  </div>
                </a>
              )
            )}

            {/* Show Portfolio button on sub-routes instead of route links */}
            {isSubRoute ? (
              <Link
                to="/"
                className="interactive group/btn relative flex items-center gap-1.5 px-6 py-2.5 bg-background text-primary border border-primary/50 font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                <span className="relative z-10">◈ PORTFOLIO</span>
                
                {/* HUD Brackets */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/0 group-hover/btn:border-primary transitions-colors duration-300" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/0 group-hover/btn:border-primary transitions-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/0 group-hover/btn:border-primary transitions-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/0 group-hover/btn:border-primary transitions-colors duration-300" />
                </div>
              </Link>
            ) : (
              desktopRouteLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="interactive group/btn relative flex items-center gap-1.5 px-6 py-2.5 bg-background text-primary border border-primary/50 font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* HUD Brackets */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/0 group-hover/btn:border-primary transitions-colors duration-300" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/0 group-hover/btn:border-primary transitions-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/0 group-hover/btn:border-primary transitions-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/0 group-hover/btn:border-primary transitions-colors duration-300" />
                  </div>
                </Link>
              ))
            )}

            <button
               onClick={toggleTheme}
               className="text-foreground/80 hover:text-primary transition-colors font-mono font-bold text-sm tracking-widest z-50 transition-transform active:scale-95 px-2 uppercase"
               aria-label="Toggle Theme"
            >
               [{theme === 'dark' ? 'LIGHT' : 'DARK'}]
            </button>

            {/* Minimal Terminal Button (Desktop) */}
            <Link
              to="/terminal"
              className="text-foreground hover:text-primary transition-colors font-mono font-bold text-lg tracking-widest z-50 transition-transform active:scale-95 px-2"
            >
              &gt;_
            </Link>

          </div>
        )}

        {isMobile && (
          <div className="flex items-center gap-6">
            {/* Minimal Terminal Button (Mobile) */}
            <Link
              to="/terminal"
              className="text-foreground active:text-primary transition-colors font-mono font-bold text-xl tracking-widest z-50 transition-transform active:scale-90"
            >
              &gt;_
            </Link>

            <button

              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative flex flex-col items-center justify-center w-10 h-10 z-50 overflow-hidden"
              aria-label="Toggle Menu"
            >
              {/* Custom Hamburger Lines */}
              <div className="flex flex-col gap-1.5 items-end">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 8, width: "24px" } : { rotate: 0, y: 0, width: "20px" }}
                  transition={{ duration: 0.3, ease: "anticipate" }}
                  className="h-[2px] bg-primary block"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, width: "24px" }}
                  transition={{ duration: 0.2 }}
                  className="h-[2px] bg-primary block"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -8, width: "24px" } : { rotate: 0, y: 0, width: "16px" }}
                  transition={{ duration: 0.3, ease: "anticipate" }}
                  className="h-[2px] bg-primary block"
                />
              </div>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { 
                opacity: { duration: 0.15, ease: "linear" },
                height: { duration: 0.3, ease: [0.4, 0, 1, 1] }
              }
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full border-t border-primary/30 bg-background md:bg-background/95 md:backdrop-blur-xl overflow-hidden"
          >
            <div className="relative flex flex-col items-center gap-2 pb-8 pt-4 w-full">
            {/* Tactical Scanline Effect */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "200%" }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 w-full h-[50%] bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none z-0"
            />
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[linear-gradient(to_right,#ed1d24_1px,transparent_1px),linear-gradient(to_bottom,#ed1d24_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="flex flex-col items-center gap-1 w-full px-8 relative z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.4 }}
                  className="w-full"
                >
                  {isSubRoute ? (
                    <span className="flex items-center justify-between text-sm font-mono tracking-[0.2em] uppercase text-foreground/20 w-full py-4 border-b border-primary/10 last:border-0 cursor-not-allowed select-none">
                      <span className="text-[10px] opacity-50">[{String(idx+1).padStart(2, '0')}]</span>
                      <span>{link.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full border border-white/10" />
                    </span>
                  ) : (
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className="flex items-center justify-between text-sm font-mono tracking-[0.2em] uppercase text-primary hover:text-foreground transition-all duration-300 w-full py-4 border-b border-primary/20 last:border-0 active:bg-primary/5 px-2"
                    >
                      <span className="text-[10px] opacity-70">[{String(idx+1).padStart(2, '0')}]</span>
                      <span className="font-bold">{link.name}</span>
                      <motion.span 
                        animate={{ scale: [1, 1.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" 
                      />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-full px-8 pt-6 relative z-10"
            >
              <button
                onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                className="interactive group/btn relative flex items-center justify-center gap-3 px-6 py-4 w-full bg-background text-foreground border border-border font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-foreground/5 active:scale-90 overflow-hidden mb-3"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                <span className="relative z-10 font-bold">MODE: {theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
              </button>

              {/* On sub-routes show Portfolio button; otherwise show route links */}
              {isSubRoute ? (
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="interactive group/btn relative flex items-center justify-center gap-3 px-6 py-4 w-full bg-background text-primary border border-primary/50 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-primary/10 hover:border-primary active:scale-90 overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                  <span className="text-lg">◈</span>
                  <span className="relative z-10 font-bold">RETURN TO BASE</span>
                </Link>
              ) : (
                <div className="flex flex-col gap-3">
                  {mobileRouteLinks.map((link, idx) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="interactive group/btn relative flex items-center justify-center gap-3 px-6 py-4 w-full bg-background text-primary border border-primary/40 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-primary/10 hover:border-primary active:scale-90 overflow-hidden"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                      <span className="relative z-10 font-bold">{link.name}</span>
                      <span className="text-lg opacity-50">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
            
            
            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;