import React, { useEffect, useRef } from 'react';
import favicon from '../favicon.ico';

const navItems = [
  { href: '#hero', label: 'Inicio' },
  { href: '#autoridad', label: 'Autoridad' },
  { href: '#biography', label: 'Biografía' },
  { href: '#programa', label: 'Programa' },
  { href: '#resultados', label: 'Resultados' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const didScrollPastRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const applyScrollState = () => {
      const nav = navRef.current;
      if (!nav) return;

      const didScrollPast = window.scrollY > 50;
      if (didScrollPast === didScrollPastRef.current) return;
      didScrollPastRef.current = didScrollPast;

      if (didScrollPast) {
        nav.classList.add('bg-surface/60', 'backdrop-blur-xl', 'border', 'border-dark/10', 'text-primary');
        nav.classList.remove('text-surface', 'border-transparent');
        return;
      }

      nav.classList.remove('bg-surface/60', 'backdrop-blur-xl', 'border', 'border-dark/10', 'text-primary');
      nav.classList.add('text-surface', 'border-transparent');
    };

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        applyScrollState();
        rafRef.current = 0;
      });
    };

    applyScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] md:w-[90%] max-w-5xl">
      <nav
        ref={navRef}
        className="flex items-center justify-between px-6 py-4 rounded-[2rem] transition-all duration-300 text-surface border border-transparent"
      >
        <a
          href="#hero"
          aria-label="Ir al inicio"
          className="flex items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <img
            src={favicon}
            alt="Seminarios Patricia Songel"
            width="40"
            height="40"
            decoding="async"
            fetchPriority="high"
            className="h-10 w-10 object-contain"
          />
          <span className="hidden lg:block font-serif italic font-bold text-lg tracking-wide">
          </span>
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-5 font-sans text-xs lg:text-sm font-medium tracking-wide">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover-lift whitespace-nowrap">
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#formaciones"
          className="magnetic-btn bg-accent text-primary px-5 py-2.5 rounded-[2rem] font-sans text-sm font-semibold"
        >
          <span className="magnetic-btn-content">Reservar plaza</span>
        </a>
      </nav>
    </div>
  );
}
