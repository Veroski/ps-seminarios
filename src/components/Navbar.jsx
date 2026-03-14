import React, { useEffect, useRef } from 'react';
import favicon from '../favicon.ico';

const navItems = [
  { href: '#hero', label: 'Inicio' },
  { href: '#autoridad', label: 'Autoridad' },
  { href: '#biography', label: 'Patricia' },
  { href: '#philosophy', label: 'Filosofía' },
  { href: '#programa', label: 'Programa' },
  { href: '#formaciones', label: 'Formaciones' },
  { href: '#perfil', label: 'Perfil' },
  { href: '#resultados', label: 'Resultados' },
];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY > 50) {
        navRef.current.classList.add('bg-surface/60', 'backdrop-blur-xl', 'border', 'border-dark/10', 'text-primary');
        navRef.current.classList.remove('text-surface', 'border-transparent');
      } else {
        navRef.current.classList.remove('bg-surface/60', 'backdrop-blur-xl', 'border', 'border-dark/10', 'text-primary');
        navRef.current.classList.add('text-surface', 'border-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            alt="Patricia Songel Academy"
            className="h-10 w-10 object-contain"
          />
          <span className="hidden lg:block font-serif italic font-bold text-lg tracking-wide">
            Patricia Songel
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
