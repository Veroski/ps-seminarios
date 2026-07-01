import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import favicon from '../favicon.ico';

/* ═══════════════════════════════════════════════════════════
   PageTopBar — shared floating pill nav for interior pages.
   Matches the landing Navbar (Aurum palette) and turns opaque
   on scroll. CTA + label are configurable per page.
   ═══════════════════════════════════════════════════════════ */
export default function PageTopBar({
  ctaLabel = 'Pedir cita',
  ctaHref = '/pedir-cita',
  ctaAnchor = false,
}) {
  const navRef = useRef(null);
  const stateRef = useRef(false);

  useEffect(() => {
    const nav = navRef.current;
    const onScroll = () => {
      if (!nav) return;
      const past = window.scrollY > 50;
      if (past === stateRef.current) return;
      stateRef.current = past;
      if (past) {
        nav.style.background = 'rgba(250,248,245,0.72)';
        nav.style.backdropFilter = 'blur(18px)';
        nav.style.borderColor = 'rgba(13,13,18,0.08)';
        nav.style.color = '#0D0D12';
      } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.borderColor = 'transparent';
        nav.style.color = '#0D0D12';
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const Cta = ctaAnchor ? 'a' : Link;
  const ctaProps = ctaAnchor ? { href: ctaHref } : { to: ctaHref };

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] md:w-[90%] max-w-5xl">
      <nav
        ref={navRef}
        className="flex items-center justify-between px-5 md:px-6 py-3.5 rounded-[2rem] border border-transparent transition-all duration-300"
        style={{ color: '#0D0D12' }}
      >
        <Link
          to="/"
          className="font-sans text-xs md:text-sm font-medium tracking-wide transition-opacity duration-200 hover:opacity-60"
          style={{ color: 'rgba(13,13,18,0.55)' }}
        >
          ← Inicio
        </Link>

        <div className="hidden md:flex items-center gap-6 font-sans text-sm font-medium tracking-wide">
          <Link to="/conoce-a-patricia" className="hover:text-accent transition-colors">Conoce a Patricia</Link>
          <Link to="/pedir-cita" className="hover:text-accent transition-colors">Pedir cita</Link>
        </div>

        <Link to="/" aria-label="Ir al inicio" className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 pointer-events-none opacity-0">
          <img src={favicon} alt="Patricia Songel" width="32" height="32" className="h-8 w-8 object-contain" />
        </Link>

        <Cta
          {...ctaProps}
          className="magnetic-btn bg-accent text-primary px-5 py-2.5 rounded-[2rem] font-sans text-xs md:text-sm font-semibold"
        >
          <span className="magnetic-btn-content">{ctaLabel}</span>
        </Cta>
      </nav>
    </div>
  );
}
