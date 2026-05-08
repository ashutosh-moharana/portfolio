import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { LenisContext } from '../App';
import { ColorContext } from '../contexts/ColorContext';
import { useDevice } from "../contexts/DeviceContext";
import { Link, useLocation } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";

const Navbar = () => {
  const isMobile = useDevice();
  const lenis = useContext(LenisContext);
  const { theme, toggleTheme } = useContext(ColorContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const themeIconRef = useRef(null);
  const isAnimating = useRef(false);

  // Hamburger line refs
  const lineTopRef = useRef(null);
  const lineMidRef = useRef(null);
  const lineBotRef = useRef(null);

  // Menu refs
  const menuPanelRef = useRef(null);
  const linkItemsRef = useRef([]);
  const dividerRefs = useRef([]);
  const menuTimeline = useRef(null);

  // Theme toggle animation
  const handleThemeToggle = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; }
    });

    tl.to(themeIconRef.current, {
      scale: 0,
      rotation: 180,
      duration: 0.3,
      ease: "power2.in",
      onComplete: toggleTheme,
    });

    tl.to(themeIconRef.current, {
      scale: 1,
      rotation: 360,
      duration: 0.5,
      ease: "back.out(3)",
    });

    tl.set(themeIconRef.current, { rotation: 0 });
  }, [toggleTheme]);

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

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();
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

        <div className="bg-card-bg border border-border/40 rounded-2xl px-6 md:px-10 py-4 flex flex-col">

          {/* ── Top Bar (Logo + Controls) ──────────────────────── */}
          <div className="flex items-center justify-between gap-6 md:gap-10">

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
                  onClick={handleThemeToggle}
                  className="p-2 text-primary hover:text-primary/70 transition-colors duration-300 flex items-center justify-center w-10 h-10"
                  aria-label="Toggle Theme"
                >
                  <div ref={isMobile ? undefined : themeIconRef} className="flex items-center justify-center">
                    {theme === 'dark' ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
                  </div>
                </button>
              </div>
            )}

            {/* Mobile Controls */}
            {isMobile && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleThemeToggle}
                  className="p-2.5 text-primary transition-colors flex items-center justify-center w-10 h-10"
                  aria-label="Toggle Theme"
                >
                  <div ref={isMobile ? themeIconRef : undefined} className="flex items-center justify-center">
                    {theme === 'dark' ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
                  </div>
                </button>

                <button
                  onClick={toggleMenu}
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-foreground text-background"
                  aria-label="Toggle Menu"
                >
                  <div className="flex flex-col gap-[5px] items-center justify-center w-5">
                    <div ref={lineTopRef} className="h-[2px] bg-background rounded-full w-5" style={{ transformOrigin: 'center center' }} />
                    <div ref={lineMidRef} className="h-[2px] bg-background rounded-full w-3" style={{ transformOrigin: 'center center' }} />
                    <div ref={lineBotRef} className="h-[2px] bg-background rounded-full w-4" style={{ transformOrigin: 'center center' }} />
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
                      {isRoute ? (
                        <Link
                          ref={el => linkItemsRef.current[i] = el}
                          to={link.href}
                          onClick={closeMenu}
                          className="group flex items-center justify-between px-2 py-4 rounded-lg hover:bg-secondary/30 transition-colors"
                        >
                          {content}
                        </Link>
                      ) : (
                        <a
                          ref={el => linkItemsRef.current[i] = el}
                          href={`#${link.id}`}
                          onClick={(e) => handleLinkClick(e, link.id)}
                          className="group flex items-center justify-between px-2 py-4 rounded-lg hover:bg-secondary/30 transition-colors"
                        >
                          {content}
                        </a>
                      )}
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