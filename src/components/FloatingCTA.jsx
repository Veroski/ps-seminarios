import React, { useEffect, useRef, useState } from 'react';

export default function FloatingCTA() {
  const [isHidden, setIsHidden] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const updateVisibility = () => {
      const coursesSection = document.getElementById('formaciones');
      if (!coursesSection) {
        setIsHidden(false);
        return;
      }

      const rect = coursesSection.getBoundingClientRect();
      const reachedCourses = rect.top <= window.innerHeight * 0.9;
      setIsHidden(reachedCourses);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        updateVisibility();
        rafRef.current = 0;
      });
    };

    updateVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed left-1/2 -translate-x-1/2 bottom-24 sm:bottom-8 z-[120] transition-all duration-300 ${
        isHidden ? 'opacity-0 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      <div
        className="hero-cta-wrapper group relative rounded-full cursor-pointer
                   hover:scale-[1.03] active:scale-[0.98]
                   transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      >
        <div
          className="hero-cta-border absolute -inset-[2px] rounded-full"
          aria-hidden="true"
        />
        <a
          href="#formaciones"
          className="relative z-10 w-full px-8 py-3.5 md:px-10 md:py-4 rounded-full
                     font-sans text-[0.82rem] md:text-[0.85rem] font-semibold tracking-[0.04em] uppercase
                     cursor-pointer transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #D4B65E 50%, #C9A84C 100%)',
            color: '#0D0D12',
            boxShadow: '0 4px 24px rgba(201,168,76,0.25), 0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.28) 55%, transparent 80%)',
            }}
            aria-hidden="true"
          />
          <span className="relative z-10">Ver formaciones</span>
        </a>
        <div
          className="hero-cta-glow absolute -inset-[6px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
