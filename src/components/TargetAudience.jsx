import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TargetAudience() {
  const sectionRef  = useRef(null);
  const fractureRef = useRef(null);
  const sparkRef    = useRef(null);
  const glowRef     = useRef(null);

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 68%' };

      // ── Overlines ──
      gsap.from('.ta-overline', {
        y: 14, opacity: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.06, scrollTrigger: trigger,
      });

      // ── Headings ──
      gsap.from('.ta-heading', {
        y: 44, opacity: 0, duration: 1.05, ease: 'power3.out',
        stagger: 0.08, delay: 0.06, scrollTrigger: trigger,
      });

      // ── Circle icons ──
      gsap.from('.ta-icon', {
        scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2.5)',
        stagger: 0.1, delay: 0.18, scrollTrigger: trigger,
      });

      // ── Intro paragraphs ──
      gsap.from('.ta-intro', {
        y: 20, opacity: 0, duration: 0.85, ease: 'power3.out',
        stagger: 0.08, delay: 0.22, scrollTrigger: trigger,
      });

      // ── NO items (fade up) ──
      gsap.from('.ta-item-no', {
        y: 14, opacity: 0, duration: 0.5, ease: 'power2.out',
        stagger: 0.06, delay: 0.36, scrollTrigger: trigger,
      });

      // ── SÍ items (fade up) ──
      gsap.from('.ta-item-si', {
        y: 14, opacity: 0, duration: 0.5, ease: 'power2.out',
        stagger: 0.06, delay: 0.36, scrollTrigger: trigger,
      });

      // ── Desktop fracture line grow ──
      if (fractureRef.current) {
        gsap.fromTo(fractureRef.current,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1, opacity: 1, duration: 1.3,
            ease: 'power4.inOut', delay: 0.25,
            scrollTrigger: trigger,
          },
        );
      }

      // ── Spark bloom ──
      if (sparkRef.current) {
        gsap.fromTo(sparkRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.45,
            ease: 'back.out(3)', delay: 1.1,
            scrollTrigger: trigger,
          },
        );
      }

      // ── Glow pulse (continuous) ──
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.32, duration: 2.5,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="perfil"
      ref={sectionRef}
      className="relative w-full overflow-hidden font-sans scroll-mt-32"
    >

      {/* ═══════════════════════════════════════════════════════════
          Desktop split backgrounds (hidden on mobile)
      ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 hidden md:flex pointer-events-none">
        {/* Dark half */}
        <div className="w-1/2 bg-[#0A0A0F] relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 100% 50%, rgba(201,168,76,0.04) 0%, transparent 50%)',
            }}
          />
        </div>
        {/* Light half */}
        <div className="w-1/2 bg-surface relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 0% 50%, rgba(201,168,76,0.05) 0%, transparent 50%)',
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          Desktop fracture line — vertical (hidden on mobile)
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-30 pointer-events-none"
        style={{ width: '1px' }}
      >
        {/* Wide ambient glow */}
        <div
          ref={glowRef}
          className="absolute inset-y-0 left-1/2 -translate-x-1/2"
          style={{
            width: '280px',
            background:
              'radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 65%)',
            filter: 'blur(28px)',
            opacity: 0.6,
          }}
        />

        {/* Sharp fracture */}
        <div
          ref={fractureRef}
          className="absolute inset-y-0 left-0"
          style={{
            width: '1px',
            background:
              'linear-gradient(to bottom, transparent 5%, rgba(201,168,76,0.4) 18%, rgba(255,255,255,0.92) 50%, rgba(201,168,76,0.4) 82%, transparent 95%)',
            boxShadow:
              '0 0 6px rgba(201,168,76,0.65), 0 0 24px rgba(201,168,76,0.2)',
            transformOrigin: 'center center',
          }}
        />

        {/* Center spark */}
        <div
          ref={sparkRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow:
              '0 0 8px #fff, 0 0 24px rgba(201,168,76,0.9), 0 0 60px rgba(201,168,76,0.25)',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          Content — stacked on mobile, side-by-side on desktop
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-20 flex flex-col md:flex-row">

        {/* ─────────────────────────────────────────────────────────
            NO side
        ───────────────────────────────────────────────────────── */}
        <div className="w-full md:w-1/2 bg-[#0A0A0F] md:bg-transparent py-20 sm:py-24 md:pt-32 md:pb-28 px-6 sm:px-10 md:px-0">
          <div className="w-full max-w-[380px] mx-auto md:ml-auto md:mr-14 lg:mr-20 xl:mr-28">

            {/* Header */}
            <div className="text-center md:text-right mb-10 md:mb-14">
              <p className="ta-overline text-overline text-accent/45 mb-4">
                La Restricción
              </p>
              <h2 className="ta-heading font-serif italic text-[2.1rem] sm:text-[2.6rem] md:text-[2.8rem] lg:text-[3.4rem] text-white leading-[1.08]">
                Para quién{' '}
                <span className="font-sans not-italic font-extralight opacity-25 tracking-tight">
                  NO
                </span>
              </h2>
            </div>

            {/* Circle icon */}
            <div className="ta-icon flex justify-center md:justify-end mb-8">
              <div
                className="w-10 h-10 rounded-full border border-white/8 flex items-center justify-center
                           transition-all duration-300 hover:border-red-500/30 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <X size={14} className="text-red-500/30" />
              </div>
            </div>

            {/* Intro */}
            <p
              className="ta-intro md:border-r border-red-500/15 md:pr-6 mb-10
                         font-sans text-[0.84rem] sm:text-[0.9rem] leading-[1.9] tracking-[-0.012em]
                         text-center md:text-right"
              style={{ color: 'rgba(244,237,225,0.50)' }}
            >
              Estas formaciones{' '}
              <span style={{ color: 'rgba(244,237,225,0.82)', fontWeight: 500 }}>
                no están diseñadas
              </span>{' '}
              para quienes buscan atajos.
            </p>

            {/* Items */}
            <ul className="space-y-5 sm:space-y-6">
              {notFits.map((item, i) => (
                <li
                  key={i}
                  className="ta-item-no flex items-start gap-3.5 flex-row md:flex-row-reverse group cursor-default"
                >
                  <span
                    className="font-mono text-[0.6rem] mt-[7px] shrink-0 select-none
                               transition-colors duration-300 group-hover:text-red-500/50"
                    style={{ color: 'rgba(239,68,68,0.18)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-sans text-[0.82rem] sm:text-[0.87rem] leading-[1.8] tracking-[-0.01em]
                               text-left md:text-right transition-colors duration-300 group-hover:text-white/75"
                    style={{ color: 'rgba(244,237,225,0.36)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            Mobile fracture — horizontal (hidden on desktop)
        ───────────────────────────────────────────────────────── */}
        <div className="md:hidden relative">
          {/* Glow halo */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-20"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 65%)',
              filter: 'blur(14px)',
            }}
          />
          {/* Line */}
          <div
            className="relative h-px mx-10"
            style={{
              background:
                'linear-gradient(to right, transparent 0%, rgba(201,168,76,0.45) 20%, rgba(255,255,255,0.8) 50%, rgba(201,168,76,0.45) 80%, transparent 100%)',
              boxShadow: '0 0 8px rgba(201,168,76,0.4)',
            }}
          />
          {/* Spark */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#fff',
              boxShadow:
                '0 0 8px rgba(255,255,255,0.85), 0 0 24px rgba(201,168,76,0.7)',
            }}
          />
        </div>

        {/* ─────────────────────────────────────────────────────────
            SÍ side
        ───────────────────────────────────────────────────────── */}
        <div className="w-full md:w-1/2 bg-surface md:bg-transparent py-20 sm:py-24 md:pt-32 md:pb-28 px-6 sm:px-10 md:px-0">
          <div className="w-full max-w-[380px] mx-auto md:mr-auto md:ml-14 lg:ml-20 xl:ml-28">

            {/* Header */}
            <div className="text-center md:text-left mb-10 md:mb-14">
              <p className="ta-overline text-overline text-accent/60 mb-4">
                La Excelencia
              </p>
              <h2 className="ta-heading font-serif italic text-[2.1rem] sm:text-[2.6rem] md:text-[2.8rem] lg:text-[3.4rem] text-primary leading-[1.08]">
                Para quién{' '}
                <span className="font-sans not-italic font-bold tracking-tight">
                  SÍ
                </span>
              </h2>
            </div>

            {/* Circle icon */}
            <div className="ta-icon flex justify-center md:justify-start mb-8">
              <div
                className="w-10 h-10 rounded-full border border-primary/6 bg-white flex items-center justify-center
                           transition-all duration-300 hover:border-accent/35 cursor-default"
                style={{ boxShadow: '0 3px 16px rgba(201,168,76,0.08)' }}
              >
                <Check size={14} className="text-primary/45" />
              </div>
            </div>

            {/* Intro */}
            <p
              className="ta-intro md:border-l border-accent/40 md:pl-6 mb-10
                         font-sans text-[0.84rem] sm:text-[0.9rem] leading-[1.9] tracking-[-0.012em]
                         text-center md:text-left"
              style={{ color: 'rgba(13,13,18,0.50)' }}
            >
              Creadas para{' '}
              <span style={{ color: 'rgba(13,13,18,0.88)', fontWeight: 600 }}>
                líderes comprometidos
              </span>{' '}
              con la ciencia y el arte del detalle.
            </p>

            {/* Items */}
            <ul className="space-y-5 sm:space-y-6">
              {fits.map((item, i) => (
                <li
                  key={i}
                  className="ta-item-si flex items-start gap-3.5 group cursor-default"
                >
                  <span
                    className="font-mono text-[0.6rem] mt-[7px] shrink-0 select-none
                               transition-colors duration-300 group-hover:text-accent/65"
                    style={{ color: 'rgba(201,168,76,0.24)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-sans text-[0.82rem] sm:text-[0.87rem] leading-[1.8] tracking-[-0.01em]
                               transition-colors duration-300 group-hover:text-primary/85"
                    style={{ color: 'rgba(13,13,18,0.42)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
