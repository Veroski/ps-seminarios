import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const syllabusData = [
  { num: "01", title: "Análisis y Diseño",     desc: "Análisis del rostro y diseño previo milimétrico, adaptado a la morfología única de cada cliente." },
  { num: "02", title: "Teoría del Color",       desc: "Teoría del color aplicada a la micropigmentación para evitar virajes y asegurar la estabilidad en el tiempo." },
  { num: "03", title: "Selección de Pigmento",  desc: "Elección correcta de pigmentos biológicamente compatibles según el fototipo y características de la piel." },
  { num: "04", title: "Control Técnico",        desc: "Control absoluto de la profundidad de la aguja y la saturación del pigmento en distintas densidades dérmicas." },
  { num: "05", title: "Adaptación",             desc: "Modificación de la técnica apoyada en la respuesta biológica de la piel en tiempo real durante el tratamiento." },
  { num: "06", title: "Resultados",             desc: "Creación de resultados hiperrealistas, elegantes, naturales y duraderos que se integran perfectamente en el rostro." },
];

const casesData = [
  { num: '01', title: 'Analizar',    text: 'Trabajos y asimetrías anteriores antes de tocar la piel.'     },
  { num: '02', title: 'Identificar', text: 'Cambios biológicos de color en el pigmento antiguo.'           },
  { num: '03', title: 'Comprender',  text: 'El origen químico de los virajes a lo largo del tiempo.'       },
  { num: '04', title: 'Adaptar',     text: 'Técnicas especializadas en piel saturada o con trauma.'        },
];

export default function Curriculum() {
  const containerRef = useRef(null);
  const cardsRef     = useRef([]);

  const syllabusShellStyle = {
    background: `
      radial-gradient(circle at top left, rgba(201,168,76,0.18) 0%, transparent 26%),
      radial-gradient(circle at 85% 18%, rgba(255,255,255,0.78) 0%, transparent 30%),
      linear-gradient(180deg, #F6F1E8 0%, #EFE7DA 52%, #F8F4EC 100%)
    `,
  };

  const cardSurfaceStyle = {
    background: `
      linear-gradient(135deg, rgba(255,252,246,0.88) 0%, rgba(241,233,220,0.78) 52%, rgba(255,250,241,0.86) 100%),
      radial-gradient(circle at top right, rgba(201,168,76,0.16) 0%, transparent 34%)
    `,
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    border: '1px solid rgba(188,158,93,0.22)',
    boxShadow: `
      0 28px 64px rgba(55, 42, 19, 0.13),
      inset 0 1px 0 rgba(255,255,255,0.82),
      inset 0 -1px 0 rgba(165,132,70,0.08)
    `,
  };

  const numberPanelStyle = {
    background: `
      linear-gradient(160deg, rgba(113,91,45,0.08) 0%, rgba(255,248,237,0.3) 42%, rgba(200,174,109,0.22) 100%),
      radial-gradient(circle at 18% 12%, rgba(255,255,255,0.65) 0%, transparent 42%)
    `,
  };

  useLayoutEffect(() => {
    const TOP_OFFSET = 80; // px from viewport top where cards stick

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      // ── 1. Intro reveal ────────────────────────────────────────
      gsap.from('.curr-header', {
        y: 28, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: '.intro-section', start: 'top 80%' },
      });

      // ── 2. Sticky stacking — pin and scale are SEPARATE triggers
      //    This eliminates the sync drift caused by coupling animation
      //    to the endTrigger scrub range across the entire stack.
      cards.forEach((card, i) => {
        const isLast  = i === cards.length - 1;
        const lastCard = cards[cards.length - 1];
        const panel   = card.querySelector('.glass-panel');

        // Pin this card until the last card is done
        ScrollTrigger.create({
          trigger: card,
          start: `top ${TOP_OFFSET}px`,
          pin: true,
          pinSpacing: false,
          endTrigger: lastCard,
          end: `bottom ${TOP_OFFSET}px`,
          invalidateOnRefresh: true,
        });

        // Scale down precisely as the NEXT card scrolls into place
        if (!isLast && panel) {
          gsap.to(panel, {
            scale: 0.93,
            opacity: 0.25,
              filter: 'blur(8px)',
              ease: 'none',
              scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 80%',
              end: `top ${TOP_OFFSET}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      // ── 3. Cases section reveal ─────────────────────────────────
      gsap.from('.cases-header', {
        y: 28, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.cases-section', start: 'top 80%' },
      });

      // ── 4. Scanner lines ────────────────────────────────────────
      gsap.to('.scanning-line', {
        y: '200%', duration: 3, repeat: -1, ease: 'none', stagger: 0.5,
      });

    }, containerRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="programa"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#F4EEE4] text-[#121212] scroll-mt-32"
      style={{
        backgroundImage: `
          radial-gradient(circle at top left, rgba(255,255,255,0.88) 0%, transparent 22%),
          linear-gradient(180deg, #F7F1E6 0%, #F1E8DB 50%, #F7F3EC 100%)
        `,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 20%, rgba(255,255,255,0.9) 0%, transparent 14%),
            radial-gradient(circle at 72% 12%, rgba(198,167,92,0.1) 0%, transparent 24%),
            linear-gradient(118deg, transparent 0%, transparent 42%, rgba(255,255,255,0.55) 49%, transparent 55%),
            linear-gradient(102deg, transparent 0%, rgba(174,148,88,0.06) 37%, transparent 44%)
          `,
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          INTRO — compact, clinical copy
      ═══════════════════════════════════════════════════════════ */}
      <div className="intro-section pt-20 pb-12 px-6 md:px-16 max-w-5xl mx-auto">

        <h2 className="curr-header font-serif italic text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.05] text-[#17120C] mb-8 max-w-3xl">
          Lo que nadie te explica cuando empiezas en micropigmentación.
        </h2>

        <div className="curr-header max-w-2xl space-y-4 font-sans text-[15px] leading-relaxed text-[#2E261A]/70 border-l border-[#C6A75C]/25 pl-6">
          <p>
            Cuando muchas personas comienzan en este sector, suelen pensar que dominar una técnica
            es suficiente. La realidad es que es una disciplina mucho más compleja.
          </p>
          <p>
            Cada piel es diferente. Cada rostro necesita un análisis previo. Descubres que el
            trabajo{' '}
            <strong className="text-[#17120C] font-medium">
              no consiste solo en pigmentar, sino en analizar, decidir y adaptarse.
            </strong>
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SYLLABUS — porcelain bg, glass stacking cards
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative w-full pb-14 md:pb-20" style={syllabusShellStyle}>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.22]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.88) 0%, transparent 18%),
              radial-gradient(circle at 78% 68%, rgba(198,167,92,0.16) 0%, transparent 22%),
              linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.7) 48%, transparent 54%),
              linear-gradient(100deg, transparent 0%, rgba(201,168,76,0.08) 36%, transparent 41%)
            `,
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(198,167,92,0.45) 50%, transparent 100%)' }}
        />

        {/* Micro-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(118,98,56,0.8) 0.8px, transparent 0.9px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Section sub-header */}
        <div className="relative px-6 md:px-16 max-w-5xl mx-auto pt-16 md:pt-20 pb-14 border-t border-[#C6A75C]/15">
          <div className="flex flex-col gap-7 items-start">
            <h2 className="font-serif italic font-bold text-3xl md:text-4xl text-[#17120C] leading-tight max-w-3xl">
              Qué aprenderás.
            </h2>
            <div className="max-w-2xl border-l border-[#C6A75C]/25 pl-6">
              <p className="font-sans text-sm md:text-[15px] text-[#4B4030]/78 leading-[1.8] tracking-[-0.01em]">
                Ciencia dérmica, criterio clínico y una estética de lujo que no grita: se percibe.
              </p>
            </div>
          </div>
        </div>

        {/* ── Stacking Cards ── */}
        {syllabusData.map((item, index) => (
          <div
            key={index}
            ref={el => {
              cardsRef.current[index] = el;
            }}
            className="w-full flex items-center justify-center px-4 md:px-10 py-3"
            style={{ height: '58vh', minHeight: '360px' }}
          >
            <div
              className="glass-panel w-full max-w-4xl h-full rounded-[2.5rem] overflow-hidden
                flex flex-col lg:flex-row relative isolate"
              style={cardSurfaceStyle}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.42]"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 12% 14%, rgba(255,255,255,0.92) 0%, transparent 16%),
                    linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.75) 47%, transparent 53%),
                    linear-gradient(103deg, transparent 0%, rgba(172,146,89,0.1) 31%, transparent 38%)
                  `,
                }}
              />
              <div
                className="absolute left-6 right-6 top-5 h-px pointer-events-none opacity-80"
                style={{ background: 'linear-gradient(90deg, rgba(198,167,92,0) 0%, rgba(198,167,92,0.36) 18%, rgba(255,255,255,0.65) 50%, rgba(198,167,92,0.28) 82%, rgba(198,167,92,0) 100%)' }}
              />

              {/* Left: number panel */}
              <div
                className="w-full lg:w-[200px] shrink-0 h-24 lg:h-full flex items-center
                  justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r
                  border-[#A3844A]/20"
                style={numberPanelStyle}
              >
                {/* dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(122,98,51,0.85) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                  }}
                />
                <div
                  className="absolute inset-x-4 top-4 bottom-4 rounded-[2rem] border border-white/30 opacity-70"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.08)' }}
                />
                {/* watermark number */}
                <span
                  className="absolute font-serif italic font-bold leading-none text-[#8F6B28]/[0.18]
                    select-none tracking-tighter"
                  style={{
                    fontSize: 'clamp(6.5rem, 14vw, 11rem)',
                    textShadow: '0 8px 28px rgba(109, 79, 24, 0.12)',
                    WebkitTextStroke: '1px rgba(255, 245, 222, 0.32)',
                  }}
                >
                  {item.num}
                </span>
                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    backgroundImage: 'linear-gradient(150deg, transparent 0%, rgba(255,255,255,0.5) 48%, transparent 58%)',
                  }}
                />
                <div className="relative z-10" />
              </div>

              {/* Right: content */}
              <div className="flex-1 flex flex-col justify-center px-8 py-8 lg:px-12 lg:py-10 relative">
                <h3 className="font-serif italic font-bold text-[1.95rem] md:text-[2.35rem] text-[#17120C]
                  leading-tight mb-4">
                  {item.title}
                </h3>
                <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-[#352B1D]/72 max-w-lg">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CASOS COMPLICADOS — Aurum Clinic: surgical white, clinical precision
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="cases-section w-full py-14 md:py-20 px-6 md:px-16 relative overflow-hidden z-10"
        style={{
          background: 'linear-gradient(180deg, #F7F7F5 0%, #ECEBE7 52%, #F7F7F5 100%)',
        }}
      >
        {/* Clinical dot grid — instrumentation texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(31,31,31,0.055) 0.8px, transparent 0.9px)',
            backgroundSize: '26px 26px',
          }}
        />

        {/* Gold hairline separator — top */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(198,167,92,0.55) 30%, rgba(198,167,92,0.55) 70%, transparent 100%)' }}
        />

        {/* Soft ambient light — top-right */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: '55vw', height: '70%',
            background: 'radial-gradient(ellipse at top right, rgba(198,167,92,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Secondary wash — bottom-left */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{
            width: '40vw', height: '50%',
            background: 'radial-gradient(ellipse at bottom left, rgba(198,167,92,0.04) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Header row — headline + descriptor side-by-side on lg */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start lg:items-end mb-8">

            {/* Left: headline */}
            <div className="w-full lg:w-[45%]">
              <h2
                className="cases-header font-serif italic font-bold text-4xl md:text-5xl lg:text-[3.1rem] leading-[1.05] text-[#1F1F1F]"
              >
                Trabajo sobre{' '}
                <span style={{ color: '#C6A75C' }}>casos complicados</span>.
              </h2>
            </div>

            {/* Right: descriptor */}
            <div
              className="cases-header w-full lg:w-[55%] lg:pl-8 lg:border-l"
              style={{ borderColor: 'rgba(198,167,92,0.20)' }}
            >
              <p
                className="font-sans text-sm md:text-[15px] leading-[1.85] tracking-[-0.01em]"
                style={{ color: 'rgba(31,31,31,0.58)' }}
              >
                Esta profesión no se trata solo de lienzos limpios. Aprenderás a abordar{' '}
                <strong style={{ color: 'rgba(31,31,31,0.82)', fontWeight: 500 }}>casos críticos</strong>{' '}
                con el máximo rigor clínico sobre pieles ya tratadas y dañadas.
              </p>
            </div>
          </div>

          {/* Gold rule divider */}
          <div
            className="h-px w-full mb-6"
            style={{ background: 'linear-gradient(90deg, rgba(198,167,92,0.35) 0%, rgba(184,184,178,0.18) 100%)' }}
          />

          {/* Luxury case cards */}
          <div className="cases-grid relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {casesData.map((item, i) => {
              const romanNumerals = ['I', 'II', 'III', 'IV'];
              return (
                <div
                  key={i}
                  className="case-card group relative flex flex-col p-6 rounded-2xl overflow-hidden cursor-default
                    transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(145deg, rgba(247,247,245,0.96) 0%, rgba(236,235,231,0.82) 100%)',
                    border: '1px solid rgba(184,184,178,0.32)',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.90) inset, 0 2px 16px rgba(31,31,31,0.05), 0 8px 32px rgba(31,31,31,0.04)',
                  }}
                >
                  {/* Top-edge gold accent */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, rgba(198,167,92,0.55) 0%, rgba(198,167,92,0.08) 100%)' }}
                  />

                  {/* Hover ambient glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                    style={{ background: 'radial-gradient(ellipse at 80% 0%, rgba(198,167,92,0.07) 0%, transparent 65%)' }}
                  />

                  {/* Roman numeral + dot — luxury marker */}
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span
                      className="font-serif italic"
                      style={{
                        fontSize: '0.72rem',
                        color: 'rgba(198,167,92,0.65)',
                        letterSpacing: '0.06em',
                        fontStyle: 'italic',
                      }}
                    >
                      {romanNumerals[i]}
                    </span>
                    <div
                      className="w-1 h-1 rounded-full transition-all duration-300 group-hover:scale-125"
                      style={{ background: 'rgba(198,167,92,0.35)' }}
                    />
                  </div>

                  {/* Title */}
                  <h4
                    className="relative z-10 font-serif italic font-bold text-[1.15rem] text-[#1F1F1F] mb-2
                      transition-colors duration-300 group-hover:text-[#C6A75C]"
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="relative z-10 font-sans text-[13px] leading-[1.7] tracking-[-0.01em]"
                    style={{ color: 'rgba(31,31,31,0.50)' }}
                  >
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Gold hairline separator — bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(198,167,92,0.45) 30%, rgba(198,167,92,0.45) 70%, transparent 100%)' }}
        />
      </div>

    </section>
  );
}
