import { useContext, useState } from 'react';
import { LenisContext } from '../App';
import { ColorContext } from '../contexts/ColorContext';
import { useDevice } from "../contexts/DeviceContext";
import { Link, useLocation } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);
  const { theme, toggleTheme } = useContext(ColorContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isSubRoute = location.pathname !== '/';

  const navLinks = isSubRoute 
    ? [
        { name: 'HOME', href: '/', type: 'route' },
        { name: 'HUB', href: '/hub', type: 'route' },
        { name: 'ARCHIVE', href: '/archive', type: 'route' },
      ].filter(link => link.href !== location.pathname)
    : [
        { name: 'ABOUT', id: 'about', type: 'scroll' },
        { name: 'PROJECTS', id: 'projects', type: 'scroll' },
        { name: 'HUB', href: '/hub', type: 'route' },
        { name: 'ARCHIVE', href: '/archive', type: 'route' },
        { name: 'CONTACT', id: 'contact', type: 'scroll' },
      ];

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

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
      <div className="relative group">
        {/* Aesthetic "Tape" elements on corners */}
        <div className="absolute -top-3 -left-2 w-12 h-6 bg-primary/40 -rotate-12 backdrop-blur-[2px] z-20 pointer-events-none mix-blend-multiply shadow-sm" />
        <div className="absolute -bottom-3 -right-2 w-12 h-6 bg-secondary/60 rotate-12 backdrop-blur-[2px] z-20 pointer-events-none mix-blend-multiply shadow-sm" />

        <div className="bg-card-bg/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/40 rounded-2xl px-6 md:px-10 py-4 flex items-center justify-between gap-6 md:gap-10 transition-all duration-300">
          
          {/* Logo - Styled like a stamp or signature */}
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

          {/* Desktop Links - Minimal & Elegant */}
          {!isMobile && (
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const LinkElement = link.type === 'route' ? Link : 'a';
                  const props = link.type === 'route' ? { to: link.href } : { href: `#${link.id}`, onClick: (e) => handleLinkClick(e, link.id) };

                  return (
                    <LinkElement
                      key={link.name}
                      {...props}
                      className="font-chunky text-base md:text-lg text-foreground/70 hover:text-primary transition-all duration-300 relative group/link"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary/40 group-hover/link:w-full transition-all duration-300" />
                    </LinkElement>
                  )
                })}
              </div>

              {/* Decorative vertical separator */}
              <div className="h-6 w-[1px] bg-border/60" />
              
              {/* Theme Toggle - Modern aesthetic icon */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-xl bg-secondary/40 text-primary hover:bg-primary hover:text-white transition-all duration-500 overflow-hidden group/theme flex items-center justify-center w-10 h-10"
                aria-label="Toggle Theme"
              >
                <div className="relative z-10 transition-transform duration-500 group-hover/theme:rotate-[360deg]">
                  {theme === 'dark' ? <MdLightMode size={22} className="animate-in zoom-in-50 duration-500" /> : <MdDarkMode size={22} className="animate-in zoom-in-50 duration-500" />}
                </div>
                {/* Magnetic-like hover effect background */}
                <div className="absolute inset-0 bg-primary translate-y-full group-hover/theme:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </button>
            </div>
          )}

          {/* Mobile Controls */}
          {isMobile && (
            <div className="flex items-center gap-4">
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
              >
                <div className="flex flex-col gap-1.5 items-end">
                  <div className={`w-6 h-0.5 bg-background rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-2 w-6' : ''}`} />
                  <div className={`w-4 h-0.5 bg-background rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <div className={`w-5 h-0.5 bg-background rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 -translate-y-2 w-6' : ''}`} />
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown - Aesthetic glassmorphism effect */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-[110%] left-0 w-full bg-card-bg/95 backdrop-blur-2xl shadow-2xl rounded-2xl border border-border/40 py-8 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="text-[10px] font-sans font-bold text-subtle tracking-[0.3em] uppercase mb-2">Navigation</div>
            {navLinks.map((link) => {
              const LinkElement = link.type === 'route' ? Link : 'a';
              const props = link.type === 'route' ? { to: link.href } : { href: `#${link.id}`, onClick: (e) => handleLinkClick(e, link.id) };

              return (
                <LinkElement
                  key={link.name}
                  {...props}
                  className="font-chunky text-2xl text-foreground hover:text-primary transition-all py-3 flex items-center justify-between group"
                >
                  {link.name}
                  <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </LinkElement>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;