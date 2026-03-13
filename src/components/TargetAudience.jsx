import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TargetAudience() {
  const sectionRef = useRef(null);
  const seamRef    = useRef(null);
  const sparkRef   = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 68%' };

      // Header fades down
      gsap.from('.ta-header', {
        y: 32, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: trigger,
      });

      // Left panel slides from left
      gsap.from('.ta-left', {
        x: -48, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.15,
        scrollTrigger: trigger,
      });

      // Right panel slides from right
      gsap.from('.ta-right', {
        x: 48, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.15,
        scrollTrigger: trigger,
      });

      // Seam line grows from center outward
      gsap.fromTo(seamRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1, opacity: 1, duration: 1.2, ease: 'power4.inOut', delay: 0.35,
          scrollTrigger: trigger,
        }
      );

      // Center spark blooms after line — just the pure light point
      gsap.fromTo(sparkRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', delay: 1.1,
          scrollTrigger: trigger,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fits = [
    'Personas que quieren iniciarse profesionalmente',
    'Profesionales de la estética que desean ampliar servicios',
    'Micropigmentadores que buscan perfeccionar su técnica',
    'Profesionales que buscan un criterio técnico sólido',
    'Personas que valoran una formación de alta calidad',
  ];

  const notFits = [
    'Buscan aprender una técnica rápida sin profundizar',
    'No están dispuestos a practicar constantemente',
    'No valoran la formación continua',
    'Buscan atajos sin compromiso con la excelencia',
  ];

  return (
    <section
      id="perfil"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden font-sans border-y border-white/5 scroll-mt-32"
    >

      {/* ── Split backgrounds ── */}
      <div className="absolute inset-0 flex flex-col md:flex-row pointer-events-none">
        {/* Dark — NO */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#0D0D12]">
          {/* Subtle inward vignette toward the seam */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 100% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)',
            }}
          />
        </div>
        {/* Light — SÍ */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#FAF8F5]">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 0% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)',
            }}
          />
        </div>
      </div>

      {/* ── Center seam — the collision ── */}
      <div
        className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-30 hidden md:block pointer-events-none"
        style={{ width: '1px' }}
      >
        {/* Wide gold halo behind the line */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2"
          style={{
            width: '260px',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 65%)',
            filter: 'blur(24px)',
          }}
        />

        {/* The line — dark and light slamming into each other, gold at the fracture */}
        <div
          ref={seamRef}
          className="absolute inset-y-0 left-0"
          style={{
            width: '1px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.5) 20%, rgba(255,255,255,0.85) 50%, rgba(201,168,76,0.5) 80%, transparent 100%)',
            boxShadow: '0 0 6px rgba(201,168,76,0.7), 0 0 20px rgba(201,168,76,0.25)',
            transformOrigin: 'center center',
          }}
        />

        {/* Center impact — pure light, no shape */}
        <div
          ref={sparkRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '3px', height: '3px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 8px rgba(255,255,255,1), 0 0 22px rgba(201,168,76,0.9), 0 0 60px rgba(201,168,76,0.3)',
          }}
        />
      </div>

      {/* ── Mobile seam — horizontal ── */}
      <div
        className="md:hidden absolute left-0 right-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
        style={{ height: '1px' }}
      >
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent 0%, rgba(201,168,76,0.5) 20%, rgba(255,255,255,0.85) 50%, rgba(201,168,76,0.5) 80%, transparent 100%)',
            boxShadow: '0 0 8px rgba(201,168,76,0.5)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 30px rgba(201,168,76,0.8)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-40 w-full py-24 px-6 md:px-0">

        {/* Header — both sides at the same baseline */}
        <div className="ta-header w-full flex flex-col md:flex-row mb-16 md:mb-20">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end md:pr-20 lg:pr-28 mb-10 md:mb-0">
            <p className="text-overline text-[#C9A84C] opacity-60 mb-3">La Restricción</p>
            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white text-center md:text-right">
              Para quién{' '}
              <span className="font-sans not-italic font-light opacity-35 tracking-tight">NO</span>
            </h2>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:pl-20 lg:pl-28">
            <p className="text-overline text-[#C9A84C] opacity-60 mb-3">La Excelencia</p>
            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-[#0D0D12] text-center md:text-left">
              Para quién{' '}
              <span className="font-sans not-italic font-bold tracking-tight">SÍ</span>
            </h2>
          </div>
        </div>

        {/* Two columns — perfectly aligned */}
        <div className="w-full flex flex-col md:flex-row">

          {/* LEFT — NO */}
          <div className="ta-left w-full md:w-1/2 flex justify-center md:justify-end md:pr-20 lg:pr-28 pb-20 md:pb-0">
            <div className="w-full max-w-sm text-right">

              <div
                className="w-12 h-12 rounded-full border border-white/12 flex items-center justify-center ml-auto mb-10 group cursor-default transition-all duration-300 hover:border-red-500/40"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <X size={18} className="text-red-500/40 group-hover:text-red-500/70 transition-colors" />
              </div>

              <p
                className="border-r border-red-500/20 pr-5 mb-10 font-sans text-[0.92rem] leading-[1.85] tracking-[-0.015em]"
                style={{ color: 'rgba(244,237,225,0.62)' }}
              >
                Estas formaciones{' '}
                <span style={{ color: 'rgba(244,237,225,0.88)', fontWeight: 500 }}>no están diseñadas</span>{' '}
                para quienes buscan atajos.
              </p>

              <ul className="space-y-6">
                {notFits.map((item, i) => (
                  <li key={i} className="flex items-start justify-end gap-4 group cursor-default">
                    <span
                      className="font-sans text-[0.9rem] leading-[1.75] tracking-[-0.01em] transition-colors duration-300 group-hover:text-white/90"
                      style={{ color: 'rgba(244,237,225,0.50)' }}
                    >
                      {item}
                    </span>
                    <X
                      size={11}
                      className="mt-1.5 shrink-0 text-red-500/25 group-hover:text-red-500/60 transition-colors"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — SÍ */}
          <div className="ta-right w-full md:w-1/2 flex justify-center md:justify-start md:pl-20 lg:pl-28 pt-20 md:pt-0">
            <div className="w-full max-w-sm text-left">

              <div
                className="w-12 h-12 rounded-full border border-black/8 bg-white flex items-center justify-center mb-10 group cursor-default transition-all duration-300 hover:border-[#C9A84C]/40"
                style={{ boxShadow: '0 4px 20px rgba(201,168,76,0.08)' }}
              >
                <Check size={18} className="text-[#0D0D12]/50 group-hover:text-[#C9A84C] transition-colors" />
              </div>

              <p
                className="border-l border-[#C9A84C]/50 pl-5 mb-10 font-sans text-[0.92rem] leading-[1.85] tracking-[-0.015em]"
                style={{ color: 'rgba(13,13,18,0.62)' }}
              >
                Creadas para{' '}
                <span style={{ color: 'rgba(13,13,18,0.88)', fontWeight: 600 }}>líderes comprometidos</span>{' '}
                con la ciencia y el arte del detalle.
              </p>

              <ul className="space-y-6">
                {fits.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group cursor-default">
                    <ArrowRight
                      size={11}
                      className="mt-1.5 shrink-0 text-[#C9A84C]/40 group-hover:text-[#C9A84C] group-hover:translate-x-0.5 transition-all"
                    />
                    <span
                      className="font-sans text-[0.9rem] leading-[1.75] tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#0D0D12]/90"
                      style={{ color: 'rgba(13,13,18,0.55)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
