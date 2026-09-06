import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useDevice } from "../contexts/DeviceContext";
import { ColorContext } from "../contexts/ColorContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import gsap from "gsap";

const Navbar = () => {
  const isMobile = useDevice();
  const { theme, toggleTheme } = useContext(ColorContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const [iconRotation, setIconRotation] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  // Hamburger line refs
  const lineTopRef = useRef(null);
  const lineMidRef = useRef(null);
  const lineBotRef = useRef(null);

  // Menu refs
  const menuPanelRef = useRef(null);
  const linkItemsRef = useRef([]);
  const dividerRefs = useRef([]);
  const menuTimeline = useRef(null);

  const isSubRoute = location.pathname !== '/';

  // ── GSAP Menu Open ─────────────────────────────────────────
  const openMenu = useCallback(() => {
    if (menuOpenRef.current) return;
    menuOpenRef.current = true;
    setIsMenuOpen(true);

    if (menuTimeline.current) menuTimeline.current.kill();

    const tl = gsap.timeline();
    menuTimeline.current = tl;

    // Hamburger → X: slow, deliberate morphing — no parent rotation
    tl.to(lineTopRef.current, {
      rotation: 45, y: 7, width: 20,
      duration: 0.5, ease: "power4.inOut"
    }, 0);
    tl.to(lineMidRef.current, {
      opacity: 0, width: 0,
      duration: 0.3, ease: "power2.in"
    }, 0);
    tl.to(lineBotRef.current, {
      rotation: -45, y: -7, width: 20,
      duration: 0.5, ease: "power4.inOut"
    }, 0);

    // Menu panel: expand from height 0 with a weighty ease
    gsap.set(menuPanelRef.current, { display: "block", overflow: "hidden" });
    tl.fromTo(menuPanelRef.current,
      { height: 0, opacity: 0 },
      { height: "auto", opacity: 1, duration: 0.6, ease: "expo.out" },
      0.15
    );

    // Link items: stagger slide up from below, cinematic pacing
    const items = linkItemsRef.current.filter(Boolean);
    tl.fromTo(items,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.3
    );

    // Divider lines: fade in subtly, slightly staggered
    const dividers = dividerRefs.current.filter(Boolean);
    if (dividers.length > 0) {
      tl.fromTo(dividers,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
        0.35
      );
    }
  }, []);

  // ── GSAP Menu Close ────────────────────────────────────────
  const closeMenu = useCallback(() => {
    if (!menuOpenRef.current) return;
    menuOpenRef.current = false;

    if (menuTimeline.current) menuTimeline.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsMenuOpen(false);
        if (menuPanelRef.current) gsap.set(menuPanelRef.current, { display: "none" });
      }
    });
    menuTimeline.current = tl;

    // Links: fade out upward, quick and clean
    const items = linkItemsRef.current.filter(Boolean);
    tl.to(items, {
      y: -12, opacity: 0,
      duration: 0.25, stagger: 0.03, ease: "power2.in"
    }, 0);

    // Dividers: collapse
    const dividers = dividerRefs.current.filter(Boolean);
    if (dividers.length > 0) {
      tl.to(dividers, {
        scaleX: 0, opacity: 0,
        duration: 0.2, stagger: 0.02, ease: "power2.in"
      }, 0);
    }

    // Panel: collapse with gravity
    tl.to(menuPanelRef.current, {
      height: 0, opacity: 0,
      duration: 0.4, ease: "power3.inOut"
    }, 0.1);

    // X → Hamburger: reverse morph
    tl.to(lineTopRef.current, {
      rotation: 0, y: 0, width: 20,
      duration: 0.5, ease: "power4.inOut"
    }, 0.15);
    tl.to(lineMidRef.current, {
      opacity: 1, width: 12,
      duration: 0.35, ease: "power2.out"
    }, 0.25);
    tl.to(lineBotRef.current, {
      rotation: 0, y: 0, width: 16,
      duration: 0.5, ease: "power4.inOut"
    }, 0.15);
  }, []);

  const toggleMenu = useCallback(() => {
    if (menuOpenRef.current) closeMenu();
    else openMenu();
  }, [openMenu, closeMenu]);

  // Auto-close on scroll
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      if (scrollDiff > 10) {
        closeMenu();
      }
      lastScrollY.current = currentScrollY;
    };
    const timeout = setTimeout(() => {
      lastScrollY.current = window.scrollY;
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);
    return () => { clearTimeout(timeout); window.removeEventListener('scroll', handleScroll); };
  }, [isMenuOpen, closeMenu]);

  // Close on route change
  useEffect(() => { closeMenu(); }, [location.pathname, closeMenu]);

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

  const handleThemeToggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    // If currently dark, target is light. Target light background = #F8F3E8
    // If currently light, target is dark. Target dark background = #171713
    const color = isDark ? "#F8F3E8" : "#171713";
    window.dispatchEvent(new CustomEvent('triggerWipe', { detail: { color, skipScroll: true } }));
    setTimeout(() => {
        toggleTheme();
    }, 450); // Toggle theme exactly when wipe covers screen
  };

  const handleLinkClick = (e, targetIdOrHref, type = 'scroll') => {
    e.preventDefault();
    closeMenu();
    
    if (type === 'route') {
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "#171713" : "#F8F3E8";
      window.dispatchEvent(new CustomEvent('triggerWipe', { detail: { color } }));
      setTimeout(() => {
        navigate(targetIdOrHref);
      }, 450);
      return;
    }

    const target = document.getElementById(targetIdOrHref);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
      <div className="relative">
        <div className="bg-card-bg brutal-border brutal-shadow rounded-sm px-6 md:px-10 py-4 flex flex-col transition-all duration-300">

          {/* ── Top Bar (Logo + Controls) ──────────────────────── */}
          <div className="flex items-center justify-between gap-6 md:gap-10">

            {/* Logo */}
            <a
              href={isSubRoute ? "/" : "#"}
              onClick={(e) => handleLinkClick(e, isSubRoute ? "/" : "landing", isSubRoute ? 'route' : 'scroll')}
              className="relative flex items-center group/logo"
            >
              <div className="font-display text-2xl md:text-3xl tracking-tighter text-foreground group-hover/logo:text-primary transition-colors">
                ASH<span className="text-primary group-hover/logo:text-foreground">MO</span>
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover/logo:w-full transition-all duration-300" />
            </a>

            {/* Desktop Links */}
            {!isMobile && (
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-8">
                  {navLinks.map((link) => {
                    return (
                      <a
                        key={link.name}
                        href={link.type === 'route' ? link.href : `#${link.id}`}
                        onClick={(e) => handleLinkClick(e, link.type === 'route' ? link.href : link.id, link.type)}
                        className="font-chunky text-base md:text-lg text-foreground hover:text-primary transition-all duration-300 relative group/link"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover/link:w-full transition-all duration-300" />
                      </a>
                    );
                  })}
                </div>
                
                <button
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary md:hover:scale-110 active:scale-75 transition-all duration-300"
                  aria-label="Toggle Dark Mode"
                  onClick={() => { setIconRotation(r => r + 360); handleThemeToggle(); }}
                >
                  <div className="transition-transform duration-500" style={{ transform: `rotate(${iconRotation}deg)` }}>
                    {theme === 'dark' ? <MdLightMode size={24} className="text-primary" /> : <MdDarkMode size={24} className="text-foreground" />}
                  </div>
                </button>
              </div>
            )}

            {/* Mobile Controls */}
            {isMobile && (
              <div className="flex items-center gap-3">
                <button
                  className="relative w-10 h-10 flex items-center justify-center text-foreground hover:text-primary hover:scale-110 active:scale-90 transition-all duration-300"
                  aria-label="Toggle Dark Mode"
                  onClick={() => { setIconRotation(r => r + 360); handleThemeToggle(); }}
                >
                  <div className="transition-transform duration-500" style={{ transform: `rotate(${iconRotation}deg)` }}>
                    {theme === 'dark' ? <MdLightMode size={24} className="text-primary" /> : <MdDarkMode size={24} className="text-foreground" />}
                  </div>
                </button>
                <button
                  onClick={toggleMenu}
                  className="relative w-10 h-10 flex items-center justify-center rounded-sm brutal-border brutal-shadow-sm bg-primary text-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  aria-label="Toggle Menu"
                >
                  <div className="flex flex-col gap-[5px] items-center justify-center w-5">
                    <div ref={lineTopRef} className="h-[2px] bg-foreground rounded-none w-5" style={{ transformOrigin: 'center center' }} />
                    <div ref={lineMidRef} className="h-[2px] bg-foreground rounded-none w-3" style={{ transformOrigin: 'center center' }} />
                    <div ref={lineBotRef} className="h-[2px] bg-foreground rounded-none w-4" style={{ transformOrigin: 'center center' }} />
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* ── Mobile Expandable Menu (lives inside the navbar card) ── */}
          {isMobile && (
            <div
              ref={menuPanelRef}
              style={{ display: "none", height: 0, opacity: 0 }}
            >
              <div className="pt-4 pb-2">
                {navLinks.map((link, i) => {
                  const isRoute = link.type === 'route';
                  const content = (
                    <>
                      <span className="font-chunky text-lg text-foreground">{link.name}</span>
                      <FiArrowUpRight size={16} className="text-subtle" />
                    </>
                  );

                  return (
                    <div key={link.name}>
                      {/* Divider line before each item (except first) */}
                      {i > 0 && (
                        <div
                          ref={el => dividerRefs.current[i - 1] = el}
                          className="h-[1px] bg-border/30 mx-1"
                          style={{ transformOrigin: "left center" }}
                        />
                      )}
                      <a
                        ref={el => linkItemsRef.current[i] = el}
                        href={isRoute ? link.href : `#${link.id}`}
                        onClick={(e) => handleLinkClick(e, isRoute ? link.href : link.id, link.type)}
                        className="group flex items-center justify-between px-2 py-4 rounded-lg hover:bg-secondary/30 transition-colors"
                      >
                        {content}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;