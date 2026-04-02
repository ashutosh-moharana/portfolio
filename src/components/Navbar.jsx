import { useContext, useState, useEffect } from 'react';
import { LenisContext } from '../App';
import { ColorContext } from '../contexts/ColorContext';
import { useDevice } from "../contexts/DeviceContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);
  const { activeColor, changeColor, COLORS } = useContext(ColorContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                className="text-sm font-bold tracking-widest hover:text-primary transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
            {desktopRouteLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="interactive group/btn relative flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary border border-primary/30 font-bold text-sm tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:border-primary/80 active:scale-95"
              >
                <span className="relative z-10">{link.name}</span>
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0" />
              </Link>
            ))}
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
              className="text-2xl z-50 relative p-1 text-foreground"
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
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-2 pb-5 pt-3 w-full"
          >
            <div className="flex flex-col items-center gap-1 w-full px-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-sm font-bold tracking-widest hover:text-primary transition-colors w-full text-center py-2.5 border-b border-border/20 last:border-0"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="w-full px-5 pt-2">
              {mobileRouteLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="interactive group/btn relative flex items-center justify-center px-5 py-2.5 w-full bg-primary/10 text-primary border border-primary/30 font-bold text-sm tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:border-primary/80 active:scale-95"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;