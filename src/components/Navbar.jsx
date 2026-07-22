import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { studentAreaConfig } from '../config/studentArea';

/* Unified site navbar — identical on every page. A "Formación"
   dropdown keeps the bar uncluttered; dark text on a glass pill
   stays legible on any background; full mobile menu included. */

const FORMACIONES = [
  { to: '/formacion/micropigmentacion', label: 'Formación 3 técnicas' },
  { to: '/formacion/glowlips', label: 'Glow Lips' },
  { to: '/formacion/hairstrokes', label: 'Cejas · Hairstrokes' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const rafRef = useRef(0);
  const scrolledRef = useRef(null);
  const [formOpen, setFormOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const apply = () => {
      const nav = navRef.current;
      if (!nav) return;
      const scrolled = window.scrollY > 40;
      if (scrolled === scrolledRef.current) return;
      scrolledRef.current = scrolled;
      if (scrolled) {
        nav.style.background = 'rgba(241,237,237,0.94)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.borderColor = 'rgba(13,13,18,0.08)';
        nav.style.boxShadow = '0 8px 30px rgba(24,20,12,0.06)';
      } else {
        nav.style.background = 'rgba(241,237,237,0.78)';
        nav.style.backdropFilter = 'blur(16px)';
        nav.style.borderColor = 'rgba(10,10,10,0.08)';
        nav.style.boxShadow = '0 6px 22px rgba(10,10,10,0.05)';
      }
    };
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        apply();
        rafRef.current = 0;
      });
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const linkCls = 'font-sans text-[0.82rem] lg:text-sm font-medium tracking-wide text-primary/80 hover:text-accent transition-colors whitespace-nowrap';
  const closeMenus = () => {
    setMobileOpen(false);
    setFormOpen(false);
  };

  return (
    <div className="fixed top-4 left-4 z-[100] w-[calc(100%-2rem)] md:left-10 md:top-6 md:w-[min(88%,64rem)]">
      <nav
        ref={navRef}
        className="flex items-center justify-between px-5 md:px-6 py-2.5 md:py-3 rounded-[2rem] border transition-all duration-300"
        style={{ color: '#0A0A0A' }}
      >
        <Link to="/" aria-label="Inicio" className="flex items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5 shrink-0">
          <img src="/ps-monogram.webp" alt="Patricia Songel" width="38" height="38" decoding="async" fetchPriority="high" className="h-9 w-9 md:h-10 md:w-10 object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-7">
          <Link to="/" onClick={closeMenus} className={linkCls}>Inicio</Link>

          <div
            className="relative"
            onMouseEnter={() => setFormOpen(true)}
            onMouseLeave={() => setFormOpen(false)}
          >
            <Link
              to="/formaciones"
              onClick={closeMenus}
              className={`${linkCls} flex items-center gap-1`}
            >
              Formaciones
              <ChevronDown size={14} className={`transition-transform duration-300 ${formOpen ? 'rotate-180' : ''}`} />
            </Link>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-60 transition-all duration-200 ${formOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}
            >
              <div className="rounded-2xl bg-surface/95 backdrop-blur-xl border border-primary/10 shadow-xl p-2">
                <Link to="/formaciones" onClick={closeMenus} className="block px-4 py-2.5 rounded-xl font-sans text-[0.85rem] font-semibold text-primary hover:text-accent hover:bg-primary/[0.04] transition-colors">
                  Todas las formaciones
                </Link>
                {FORMACIONES.map((f) => (
                  <Link
                    key={f.to}
                    to={f.to}
                    className="block px-4 py-2.5 rounded-xl font-sans text-[0.85rem] text-primary/80 hover:text-accent hover:bg-primary/[0.04] transition-colors"
                  >
                    {f.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/conoce-a-patricia" onClick={closeMenus} className={linkCls}>Conoce a Patricia</Link>
          <Link to={studentAreaConfig.internalPath} onClick={closeMenus} className={linkCls}>Alumnas</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={studentAreaConfig.internalPath}
            onClick={closeMenus}
            className="hidden sm:inline-flex items-center justify-center border border-primary/15 text-primary/80 px-4 md:px-5 py-2.5 rounded-[2rem] font-sans text-xs md:text-sm font-semibold whitespace-nowrap hover:border-accent/50 hover:text-accent transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/pedir-cita"
            onClick={closeMenus}
            className="magnetic-btn bg-primary text-surface px-4 md:px-5 py-2.5 rounded-[2rem] font-sans text-xs md:text-sm font-semibold whitespace-nowrap"
          >
            <span className="magnetic-btn-content">Pedir cita</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-primary/80 hover:text-accent transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden mt-2 origin-top transition-all duration-200 ${mobileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="rounded-3xl bg-surface/95 backdrop-blur-xl border border-primary/10 shadow-xl p-4 flex flex-col">
          <Link to="/" onClick={closeMenus} className="px-3 py-3 rounded-xl font-sans text-sm font-medium text-primary/85 hover:text-accent hover:bg-primary/[0.04] transition-colors">Inicio</Link>
          <Link to="/conoce-a-patricia" onClick={closeMenus} className="px-3 py-3 rounded-xl font-sans text-sm font-medium text-primary/85 hover:text-accent hover:bg-primary/[0.04] transition-colors">Conoce a Patricia</Link>
          <Link to="/formaciones" onClick={closeMenus} className="px-3 py-3 rounded-xl font-sans text-sm font-medium text-primary/85 hover:text-accent hover:bg-primary/[0.04] transition-colors">Formaciones</Link>
          <p className="px-3 pt-3 pb-1 text-overline-soft text-primary/40">Especializaciones</p>
          {FORMACIONES.map((f) => (
            <Link key={f.to} to={f.to} onClick={closeMenus} className="px-3 py-2.5 rounded-xl font-sans text-[0.9rem] text-primary/75 hover:text-accent hover:bg-primary/[0.04] transition-colors">
              {f.label}
            </Link>
          ))}
          <Link to={studentAreaConfig.internalPath} onClick={closeMenus} className="px-3 py-3 rounded-xl font-sans text-sm font-medium text-primary/85 hover:text-accent hover:bg-primary/[0.04] transition-colors">
            Área de alumnas
          </Link>
          <Link to={studentAreaConfig.internalPath} onClick={closeMenus} className="mt-3 text-center border border-primary/15 text-primary px-5 py-3 rounded-full font-sans text-sm font-semibold">
            Iniciar sesión
          </Link>
          <Link to="/pedir-cita" onClick={closeMenus} className="mt-3 text-center bg-primary text-surface px-5 py-3 rounded-full font-sans text-sm font-semibold">
            Pedir cita
          </Link>
        </div>
      </div>
    </div>
  );
}
