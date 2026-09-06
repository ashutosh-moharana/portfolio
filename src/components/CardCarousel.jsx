import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import gsap from 'gsap';

const CardCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  // Handle swipe
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { dx < 0 ? handleNext() : handlePrev(); }
    touchStartX.current = null;
  };

  // Responsive configuration
  const CARD_WIDTH = isMobile ? 220 : 300;
  const CARD_HEIGHT = isMobile ? 320 : 370;
  const CARD_GAP = isMobile ? -60 : -70;
  const OFFSET = CARD_WIDTH + CARD_GAP;

  useEffect(() => {
    items.forEach((_, index) => {
      let diff = index - activeIndex;
      if (diff < -Math.floor(items.length / 2)) diff += items.length;
      if (diff > Math.floor(items.length / 2)) diff -= items.length;

      const el = cardRefs.current[index];
      if (!el) return;

      const translateX = diff * OFFSET;
      const isActive = diff === 0;
      const translateY = isActive ? 0 : (index % 2 === 0 ? -15 : 15);
      const rotate = isActive ? 0 : (diff * 3);
      const zIndex = isActive ? 20 : 10 - Math.abs(diff);
      const absDiff = Math.abs(diff);
      const brightness = isActive ? 1 : absDiff === 1 ? 0.55 : 0.3;

      gsap.to(el, {
        xPercent: -50,
        yPercent: -50,
        x: translateX,
        y: translateY,
        rotation: rotate,
        scale: isActive ? 1.04 : 0.88,
        opacity: absDiff <= 3 ? 1 : 0,
        filter: `brightness(${absDiff <= 3 ? brightness : 1})`,
        zIndex: zIndex,
        boxShadow: isActive ? '10px 10px 0px 0px var(--color-foreground)' : '2px 2px 0px 0px rgba(0,0,0,0.25)',
        duration: 0.6,
        ease: "power3.out"
      });
    });
  }, [activeIndex, items.length, OFFSET]);

  const containerHeight = isMobile ? 470 : 570;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent select-none"
      style={{ height: `${containerHeight}px` }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {items.map((item, index) => {
        const diff = (() => {
          let d = index - activeIndex;
          if (d < -Math.floor(items.length / 2)) d += items.length;
          if (d > Math.floor(items.length / 2)) d -= items.length;
          return d;
        })();

        return (
          <div
            key={item.id || index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="absolute left-1/2 top-[45%] bg-card-bg brutal-border overflow-hidden"
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              pointerEvents: diff === 0 ? 'auto' : 'none',
            }}
            onClick={() => {
              if (diff !== 0) setActiveIndex(index);
            }}
          >
            <div className="p-3 sm:p-4 h-full flex flex-col bg-card-bg">
              {/* Project Image */}
              {item.imageUrl ? (
                <div className="w-full h-24 sm:h-28 bg-muted mb-3 brutal-border overflow-hidden shrink-0">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-24 sm:h-28 bg-muted mb-3 brutal-border flex items-center justify-center shrink-0">
                  <span className="font-chunky text-foreground/30 text-2xl">{item.title?.charAt(0)}</span>
                </div>
              )}

              {/* Title */}
              <h3 className="font-chunky text-sm sm:text-base text-foreground mb-1.5 leading-tight line-clamp-1">
                {item.title || "Project Title"}
              </h3>

              {/* Description */}
              <p className="font-sans text-[10px] sm:text-xs text-foreground/70 mb-2 line-clamp-2 leading-relaxed">
                {item.description || "Project description goes here."}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-3">
                {(item.technologies || []).slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-[8px] sm:text-[9px] uppercase font-sans font-bold px-1.5 py-0.5 bg-muted text-foreground brutal-border">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-auto flex gap-2">
                {item.demoLink && (
                  <a
                    href={item.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-foreground text-background brutal-border font-chunky text-[10px] py-1.5 active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live
                  </a>
                )}
                {item.codeLink && (
                  <a
                    href={item.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-card-bg text-foreground brutal-border font-chunky text-[10px] py-1.5 active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 flex -translate-x-1/2 gap-6 sm:gap-8 z-20">
        <button
          onClick={handlePrev}
          className="grid h-10 w-10 sm:h-12 sm:w-12 place-content-center cursor-pointer text-2xl sm:text-3xl border-2 border-foreground bg-card-bg transition-colors active:bg-foreground active:text-background"
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="grid h-10 w-10 sm:h-12 sm:w-12 place-content-center cursor-pointer text-2xl sm:text-3xl border-2 border-foreground bg-card-bg transition-colors active:bg-foreground active:text-background"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;
