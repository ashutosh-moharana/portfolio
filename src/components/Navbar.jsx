import { useContext, useState, useEffect, useRef } from 'react';
import { LenisContext } from '../App';

import { useDevice } from "../contexts/DeviceContext";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);

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
    { name: '>_', href: '/terminal' },
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
        ...(isMobile && {
          height: isMenuOpen ? "auto" : "68px",
        })
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col md:justify-center backdrop-blur-md bg-black/90 border-b-2 border-primary overflow-hidden`}
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-2 md:px-8 md:pt-6 md:pb-3 w-full">
        {/* Logo / brand — links home on sub-routes, scrolls to top on main */}
        {isSubRoute ? (
          <Link to="/" className="flex items-center gap-3 cursor-pointer translate-y-[2px]">
            <div className="relative flex items-center justify-center w-8 h-8 border border-primary bg-primary/10">
              <span className="w-1.5 h-1.5 bg-primary animate-ping absolute" />
              <span className="w-1.5 h-1.5 bg-primary relative shadow-[0_0_5px_var(--color-primary)]" />
            </div>
            <span className="text-white font-cinematic text-3xl tracking-widest leading-none">ASH<span className="text-primary">MO</span></span>
          </Link>
        ) : (
          <div className="flex items-center gap-3 cursor-pointer translate-y-[2px]" onClick={(e) => handleLinkClick(e, 'landing')}>
            <div className="relative flex items-center justify-center w-8 h-8 border border-primary bg-primary/10">
              <span className="w-1.5 h-1.5 bg-primary animate-ping absolute" />
              <span className="w-1.5 h-1.5 bg-primary relative shadow-[0_0_5px_var(--color-primary)]" />
            </div>
            <span className="text-white font-cinematic text-3xl tracking-widest leading-none">ASH<span className="text-primary">MO</span></span>
          </div>
        )}

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
                  className="text-sm font-mono tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors relative group py-1"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_5px_var(--color-primary)]"></span>
                </a>
              )
            )}

            {/* Show Portfolio button on sub-routes instead of route links */}
            {isSubRoute ? (
              <Link
                to="/"
                className="interactive group/btn relative flex items-center gap-1.5 px-6 py-2.5 bg-black text-primary border border-primary/50 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                <span className="relative z-10">◈ PORTFOLIO</span>
              </Link>
            ) : (
              desktopRouteLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="interactive group/btn relative flex items-center gap-1.5 px-6 py-2.5 bg-black text-primary border border-primary/50 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))
            )}
          </div>
        )}

        {isMobile && (
          <div className="flex items-center gap-5">
            <Link
              to="/terminal"
              className="text-primary font-mono font-bold text-lg tracking-widest z-50 transition-transform active:scale-95"
            >
              &gt;_
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl z-50 relative p-1 text-primary"
            >
              {isMenuOpen ? <RxCross2 /> : <RxHamburgerMenu />}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex flex-col items-center gap-2 pb-5 pt-3 w-full border-t-2 border-primary"
          >
            <div className="flex flex-col items-center gap-1 w-full px-5">
              {navLinks.map((link) =>
                isSubRoute ? (
                  <span
                    key={link.name}
                    className="text-sm font-mono tracking-[0.2em] uppercase text-foreground/20 w-full text-center py-3 border-b border-primary/10 last:border-0 cursor-not-allowed select-none"
                  >
                    {link.name}
                  </span>
                ) : (
                  <a
                    key={link.name}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-sm font-mono tracking-[0.2em] uppercase text-primary hover:text-primary transition-colors w-full text-center py-3 border-b border-primary/20 last:border-0"
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
            <div className="w-full px-5 pt-4">
              {/* On sub-routes show Portfolio button; otherwise show route links */}
              {isSubRoute ? (
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="interactive group/btn relative flex items-center justify-center px-6 py-3 w-full bg-black text-primary border border-primary/50 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                  <span className="relative z-10">◈ PORTFOLIO</span>
                </Link>
              ) : (
                mobileRouteLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="interactive group/btn relative flex items-center justify-center px-6 py-3 w-full bg-black text-primary border border-primary/50 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:bg-primary/20 hover:border-primary active:scale-95 overflow-hidden mt-3"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 z-0" />
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;