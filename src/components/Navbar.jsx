import { useContext, useState, useEffect, useRef } from 'react';
import { LenisContext } from '../App';
import { ColorContext } from '../contexts/ColorContext';
import { useDevice } from "../contexts/DeviceContext";
import { Link, useLocation } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";

const Navbar = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);
  const { theme, toggleTheme } = useContext(ColorContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);

  const isSubRoute = location.pathname !== '/';

  // Auto-close on scroll
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);

      // Close menu if user scrolls more than 10px in either direction
      if (scrollDiff > 10) {
        setIsMenuOpen(false);
      }
      lastScrollY.current = currentScrollY;
    };
    const timeout = setTimeout(() => {
      lastScrollY.current = window.scrollY;
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);
    return () => { clearTimeout(timeout); window.removeEventListener('scroll', handleScroll); };
  }, [isMenuOpen]);

  // Close on route change
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const navLinks = isSubRoute
    ? [
      { name: 'Home', href: '/', type: 'route' },
      { name: 'Hub', href: '/hub', type: 'route' },
      { name: 'Archive', href: '/archive', type: 'route' },
    ].filter(link => link.href !== location.pathname)
    : [
      { name: 'About', id: 'about', type: 'scroll' },
      { name: 'Projects', id: 'projects', type: 'scroll' },
      { name: 'Hub', href: '/hub', type: 'route' },
      { name: 'Archive', href: '/archive', type: 'route' },
      { name: 'Contact', id: 'contact', type: 'scroll' },
    ];

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.getElementById(targetId);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
      <div className="relative">
        {/* Tape corners */}
        <div className="absolute -top-3 -left-2 w-12 h-6 bg-secondary/90 -rotate-12 z-20 pointer-events-none border border-black/5" />
        <div className="absolute -bottom-3 -right-2 w-12 h-6 bg-secondary/90 rotate-12 z-20 pointer-events-none border border-black/5" />

        <div className="bg-card-bg border border-border/40 rounded-2xl px-6 md:px-10 py-4 flex items-center justify-between gap-6 md:gap-10">

          {/* Logo */}
          <Link
            to={isSubRoute ? "/" : "#"}
            onClick={isSubRoute ? undefined : (e) => handleLinkClick(e, 'landing')}
            className="relative flex items-center group/logo"
          >
            <div className="font-display text-2xl md:text-3xl tracking-tighter text-foreground group-hover/logo:text-primary transition-colors">
              ASH<span className="text-primary group-hover/logo:text-foreground">MO</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover/logo:w-full transition-all duration-300" />
          </Link>

          {/* Desktop Links */}
          {!isMobile && (
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const LinkElement = link.type === 'route' ? Link : 'a';
                  const props = link.type === 'route'
                    ? { to: link.href }
                    : { href: `#${link.id}`, onClick: (e) => handleLinkClick(e, link.id) };
                  return (
                    <LinkElement
                      key={link.name}
                      {...props}
                      className="font-chunky text-base md:text-lg text-foreground/70 hover:text-primary transition-all duration-300 relative group/link"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary/40 group-hover/link:w-full transition-all duration-300" />
                    </LinkElement>
                  );
                })}
              </div>
              <div className="h-6 w-[1px] bg-border/60" />
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-xl bg-secondary/40 text-primary hover:bg-primary hover:text-white transition-all duration-500 overflow-hidden group/theme flex items-center justify-center w-10 h-10"
                aria-label="Toggle Theme"
              >
                <div className="relative z-10 transition-transform duration-500 group-hover/theme:rotate-[360deg]">
                  {theme === 'dark' ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
                </div>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover/theme:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </button>
            </div>
          )}

          {/* Mobile Controls */}
          {isMobile && (
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-secondary/40 text-primary transition-colors flex items-center justify-center w-10 h-10"
                aria-label="Toggle Theme"
              >
                <div className="transition-transform duration-500 active:rotate-[180deg]">
                  {theme === 'dark' ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
                </div>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-foreground text-background transition-transform active:scale-90"
                aria-label="Toggle Menu"
              >
                <div className="flex flex-col gap-[5px] items-center justify-center w-5">
                  <div className={`h-[2px] bg-background rounded-full transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[7px] w-5' : 'w-5'}`} />
                  <div className={`h-[2px] bg-background rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 w-0' : 'w-3'}`} />
                  <div className={`h-[2px] bg-background rounded-full transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[7px] w-5' : 'w-4'}`} />
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-card-bg rounded-2xl border border-border/40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col divide-y divide-border/20">
              {navLinks.map((link, i) => {
                const isRoute = link.type === 'route';
                const content = (
                  <>
                    <span className="font-chunky text-xl text-foreground">{link.name}</span>
                    <FiArrowUpRight size={18} className="text-subtle group-hover:text-primary transition-colors" />
                  </>
                );
                return isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between px-6 py-5 hover:bg-secondary/40 transition-colors"
                  >
                    {content}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="group flex items-center justify-between px-6 py-5 hover:bg-secondary/40 transition-colors"
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;