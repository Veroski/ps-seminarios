import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Check, Star, Camera } from 'lucide-react';
import favicon from '../favicon.ico';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ─── PALETTE ──────────────────────────────────────────────── */
const G = {
  bgLight:  '#F3F1EE',
  bgNude:   '#E2B8A8',
  bgPink:   '#D89B9A',
  bgRed:    '#B33A4A',
  bgWine:   '#8F2D3A',
  text:     '#1A0D10',
  textLight:'#F3F1EE',
  muted:    '#7C5C52',
  mutedLight:'rgba(243,241,238,0.62)',
  gold:     '#D7B56A',
  white:    '#FFFFFF',
};

/* ─── DATA ─────────────────────────────────────────────────── */
const awards = [
  { year: '2023', title: 'New Generation', role: 'Ganadora' },
  { year: '2024', title: 'Wulop Dubai',    role: 'Ganadora' },
  { year: '2025', title: 'New Generation', role: 'Ganadora' },
];

const outcomes = [
  'Trabajar con naturalidad y precisión',
  'Realizar trabajos perfectos en apenas dos horas',
  'Trabajar sin dañar la lámina labial',
  'Obtener seguridad en el resultado',
];

const tecnicas = [
  'Uso de magnum',        'Dosier técnico completo',
  'Uso de 3 puntas abanico', 'Posición de la mano y máquina',
  'Velocidad de trabajo', 'Estiramientos correctos',
  'Diseño de competición','Contornos perfectos',
];

const dia1 = [
  'Teoría de la piel',    'Diseño y trazo',
  'Agujas y stroke',      'Pigmentología: orgánicos, inorgánicos e híbridos',
  'Neutralización de labios oscuros', 'Colorimetría avanzada',
  'Cómo evitar la inflamación', 'Diseño de competición',
  'Contornos perfectos',  'Crear contenido de impacto',
  'Demostración en modelo real', 'Práctica en látex',
];

const dia2 = [
  'Práctica completa en modelo real',
  'Preparación para campeonato',
  'Creación de contenido para redes sociales',
  'Entrega de certificado',
];

const capabilities = [
  'Recuperar el tono de la mucosa',
  'Recrear el contorno labial',
  'Definir y perfilar labios',
  'Aportar color y saturación',
];

const formFields = [
  { name: 'nombre',    label: 'Nombre completo',                         type: 'text',     placeholder: 'Tu nombre',             required: true,  span: 2 },
  { name: 'email',     label: 'Correo electrónico',                      type: 'email',    placeholder: 'tu@correo.com',          required: true,  span: 1 },
  { name: 'telefono',  label: 'Teléfono',                                type: 'tel',      placeholder: '+34 000 000 000',        required: false, span: 1 },
  { name: 'activa',    label: '¿Practicas micropigmentación actualmente?',type: 'select',   options: ['Sí, activamente', 'Sí, esporádicamente', 'No, aún no'], required: true, span: 2 },
  { name: 'tecnica',   label: 'Técnica de labios que practicas',          type: 'select',   options: ['Ninguna', 'Perfilado básico', 'Acuarela / Difuminado', 'Otra'], span: 2 },
  { name: 'inversion', label: '¿Cuánto estás dispuesto/a a invertir?',   type: 'select',   options: ['Menos de 2000€', 'Entre 2000 y 3000€', 'Más de 3000€'], required: true, span: 2 },
  { name: 'mensaje',   label: '¿Qué buscas mejorar?',                    type: 'textarea', placeholder: 'Describe tu objetivo...', span: 2 },
];

/* ─── PAGE NAV ─────────────────────────────────────────────── */
function PageNav() {
  const navRef = useRef(null);
  const scrolled = useRef(false);
  useEffect(() => {
    const nav = navRef.current;
    const onScroll = () => {
      if (!nav) return;
      const past = window.scrollY > 60;
      if (past === scrolled.current) return;
      scrolled.current = past;
      if (past) {
        nav.style.background = 'rgba(143,45,58,0.88)';
        nav.style.backdropFilter = 'blur(18px)';
        nav.style.borderColor = 'rgba(215,181,106,0.2)';
      } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = '';
        nav.style.borderColor = 'transparent';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] md:w-[90%] max-w-5xl">
      <nav ref={navRef} className="flex items-center justify-between px-6 py-3.5 rounded-[2rem] transition-all duration-300 border border-transparent">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Volver al inicio">
          <span className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
            style={{ background: 'rgba(243,241,238,0.12)' }}>
            <ArrowLeft size={13} style={{ color: G.textLight }} />
          </span>
          <span className="font-sans text-xs font-medium hidden sm:block" style={{ color: G.mutedLight }}>Volver</span>
        </Link>
        <Link to="/" className="flex items-center gap-2.5">
          <img src={favicon} alt="Patricia Songel" width="34" height="34" className="h-[34px] w-[34px] object-contain" />
          <span className="font-serif italic font-bold text-base hidden lg:block" style={{ color: G.textLight }}>Patricia Songel</span>
        </Link>
        <a href="#formulario"
          className="font-sans font-semibold text-xs tracking-wide px-5 py-2.5 rounded-full transition-all duration-300"
          style={{ background: G.gold, color: '#1A0D10' }}>
          Reservar plaza
        </a>
      </nav>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function GlowlipsPage() {
  const pageRef  = useRef(null);
  const [formData,  setFormData]  = useState({});
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ghero > *', { y: 56, opacity: 0, duration: 1.3, stagger: 0.15, ease: 'power3.out', delay: 0.2 });

      gsap.utils.toArray('.rv').forEach(el =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%' } })
      );
      gsap.utils.toArray('.rvs').forEach(el =>
        gsap.from(Array.from(el.children), { y: 28, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' } })
      );
      gsap.utils.toArray('.rvn').forEach(el =>
        gsap.from(el, { scale: 0.92, opacity: 0, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' } })
      );
    }, pageRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleInput  = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  const inputCls = 'w-full border text-sm px-3.5 py-2.5 rounded-lg transition-colors duration-200 focus:outline-none font-sans';

  const renderField = f => {
    const base = { id: `gf-${f.name}`, name: f.name, required: f.required, onChange: handleInput, value: formData[f.name] || '' };
    const style = { background: G.white, borderColor: 'rgba(143,45,58,0.14)', color: G.text };
    if (f.type === 'select') return (
      <select {...base} className={`${inputCls} cursor-pointer appearance-none`} style={{ ...style, colorScheme: 'light' }}>
        <option value="">Seleccionar…</option>
        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
    if (f.type === 'textarea') return (
      <textarea {...base} rows={3} placeholder={f.placeholder} className={`${inputCls} resize-none`} style={style} />
    );
    return <input {...base} type={f.type} placeholder={f.placeholder} className={inputCls} style={style} />;
  };

  return (
    <div ref={pageRef} style={{ background: G.bgLight, color: G.text, overflowX: 'hidden' }}>
      <PageNav />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ height: '100svh', background: G.bgWine }}>
        <img src="/glowlips_pagina1.webp" alt="Glowlips Masterclass"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ opacity: 0.3, mixBlendMode: 'luminosity' }} />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, rgba(143,45,58,0.15) 0%, rgba(143,45,58,0.6) 50%, rgba(26,13,16,0.98) 100%)`
        }} />
        {/* Atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(215,181,106,0.08) 0%, transparent 60%)' }} />
        {/* Vertical gold line */}
        <div className="absolute top-32 right-[12%] w-px h-52 hidden lg:block pointer-events-none"
          style={{ background: `linear-gradient(180deg, transparent, ${G.gold}60, transparent)` }} />
        {/* Diagonal decorative lines */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(26,13,16,0.6))' }} />

        <div className="relative z-10 px-6 md:px-16 pb-20 md:pb-28 pt-44 max-w-6xl mx-auto w-full">
          <div className="ghero">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-4 h-px" style={{ background: G.gold }} />
              <span className="text-overline" style={{ color: G.gold }}>Masterclass · Patricia Songel</span>
            </div>
            <h1 className="font-serif italic font-bold leading-[0.9] mb-6"
              style={{ fontSize: 'clamp(4rem, 10.5vw, 8.5rem)', color: G.textLight }}>
              Glow<em style={{ color: G.gold }}>lips</em>
            </h1>
            <p className="font-sans text-base md:text-lg max-w-lg mb-6 leading-relaxed" style={{ color: G.mutedLight }}>
              Formación para profesionales.
            </p>
            <p className="font-sans text-sm max-w-md mb-10 leading-[1.75]" style={{ color: 'rgba(243,241,238,0.45)' }}>
              Técnica basada en un acabado fullips. Agujas de diferentes calibres, pigmentos variados y un solo movimiento preciso.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#formulario"
                className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
                style={{ background: G.gold, color: '#1A0D10' }}>
                Reservar plaza <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
          <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: G.textLight }}>Scroll</span>
          <div className="w-px h-8" style={{ background: `linear-gradient(180deg, ${G.gold}, transparent)` }} />
        </div>
      </section>

      {/* ══ INTRO ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40" style={{ background: G.bgLight }}>
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${G.bgNude}60 0%, transparent 70%)`, transform: 'translate(-30%, -30%)' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: G.bgRed }} />
            <span className="text-overline" style={{ color: G.bgRed }}>Introducción</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div>
              <h2 className="rv font-serif italic font-bold mb-6 leading-[1.04]"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: G.text }}>
                Diseños, acabados y curados perfectos.
              </h2>
              <p className="rv font-sans leading-[1.9] text-[0.97rem]" style={{ color: G.muted }}>
                En esta formación recibirás toda la información para realizar diseños, acabados y curados perfectos en la técnica de micropigmentación labial más demandada del mercado.
              </p>
            </div>
            <div className="rvn grid grid-cols-2 gap-3">
              {[
                { val: '6+', label: 'Años de experiencia' },
                { val: '20', label: 'Años en belleza' },
                { val: '3',  label: 'Premios internacionales' },
                { val: '2D', label: 'Formación intensiva' },
              ].map(({ val, label }, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-5 rounded-2xl"
                  style={{ background: i % 2 === 0 ? G.bgNude : G.bgLight, border: '1px solid rgba(143,45,58,0.1)' }}>
                  <span className="font-mono font-bold text-2xl" style={{ color: G.bgWine }}>{val}</span>
                  <span className="font-sans text-xs leading-snug" style={{ color: G.muted }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ AUTORIDAD ═════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40" style={{ background: G.bgWine }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(215,181,106,0.8) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none hidden xl:block"
          style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 700, fontSize: '20vw', color: `${G.gold}06`, lineHeight: 1, letterSpacing: '-0.04em', transform: 'translate(-10%, -50%)' }}>
          PS
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: G.gold }} />
            <span className="text-overline" style={{ color: G.gold }}>Autoridad</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <h2 className="rv font-serif italic font-bold mb-6 leading-[1.04]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: G.textLight }}>
                Más de 6 años perfeccionando la técnica ideal.
              </h2>
              <p className="rv font-sans leading-[1.9] text-[0.93rem]" style={{ color: G.mutedLight }}>
                Después de más de 6 años trabajando como micropigmentadora y 20 años en el mundo de la belleza, Patricia Songel ha desarrollado una técnica ideal para trabajar el maquillaje permanente en labios.
              </p>
            </div>
            <div>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-6" style={{ color: `${G.gold}80` }}>
                Reconocimientos
              </p>
              <div className="rvs space-y-3">
                {awards.map(({ year, title, role }, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 rounded-2xl"
                    style={{ background: 'rgba(243,241,238,0.07)', border: '1px solid rgba(215,181,106,0.18)' }}>
                    <div className="flex items-center gap-4">
                      <Star size={14} style={{ color: G.gold, flexShrink: 0 }} fill={G.gold} />
                      <div>
                        <p className="font-sans font-semibold text-sm" style={{ color: G.textLight }}>{title}</p>
                        <p className="font-sans text-xs mt-0.5" style={{ color: G.mutedLight }}>{role}</p>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold" style={{ color: G.gold }}>{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ A QUIÉN VA DIRIGIDA ═══════════════════════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40" style={{ background: G.bgNude }}>
        <div className="rvn absolute -right-8 top-1/2 -translate-y-1/2 font-serif italic font-bold pointer-events-none select-none hidden xl:block"
          style={{ fontSize: '16vw', color: `${G.bgWine}09`, lineHeight: 1, letterSpacing: '-0.04em' }}>
          lips
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: G.bgWine }} />
            <span className="text-overline" style={{ color: G.bgWine }}>A quién va dirigida</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <h2 className="rv font-serif italic font-bold mb-6 leading-[1.04]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: G.text }}>
                Para profesionales que buscan excelencia.
              </h2>
              <p className="rv font-sans leading-[1.9] text-[0.93rem] mb-8" style={{ color: G.muted }}>
                Esta formación está destinada a micropigmentadoras/es que quieran mejorar sus tiempos y resultados en tratamientos labiales.
              </p>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-4" style={{ color: `${G.bgWine}80` }}>
                La micropigmentación labial puede
              </p>
              <ul className="rvs space-y-2.5">
                {capabilities.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: G.bgWine }} />
                    <span className="font-sans text-[0.9rem]" style={{ color: G.muted }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Resultado', value: 'Efecto labio mordido y saturación perfecta' },
                { label: 'Estilo',    value: 'Voluminoso, natural, sin bordes marcados' },
                { label: 'Técnica',   value: 'Fullips con un solo movimiento' },
              ].map(({ label, value }, i) => (
                <div key={i} className="rv p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(143,45,58,0.1)' }}>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: `${G.bgWine}70` }}>{label}</p>
                  <p className="font-sans font-medium text-sm leading-snug" style={{ color: G.text }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUÉ APRENDERÁS ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40" style={{ background: G.bgRed }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(243,241,238,0.7) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: G.gold }} />
            <span className="text-overline" style={{ color: G.gold }}>Qué aprenderás</span>
          </div>
          <h2 className="rv font-serif italic font-bold mb-14 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: G.textLight }}>
            Precisión de competición.
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-6" style={{ color: `${G.gold}70` }}>
                Resultados
              </p>
              <ul className="rvs space-y-4">
                {outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(215,181,106,0.18)', border: `1px solid ${G.gold}40` }}>
                      <Check size={8} style={{ color: G.gold }} strokeWidth={3} />
                    </span>
                    <span className="font-sans text-[0.92rem] leading-relaxed" style={{ color: G.mutedLight }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rv mt-8 flex items-start gap-3 pt-6" style={{ borderTop: '1px solid rgba(243,241,238,0.1)' }}>
                <Camera size={16} style={{ color: G.gold, flexShrink: 0, marginTop: 2 }} />
                <p className="font-sans text-[0.88rem] leading-relaxed" style={{ color: G.mutedLight }}>
                  También aprenderás a realizar fotografías de alto impacto para redes sociales.
                </p>
              </div>
            </div>
            <div>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-6" style={{ color: `${G.gold}70` }}>
                Técnica
              </p>
              <div className="rvs grid grid-cols-2 gap-2.5">
                {tecnicas.map((item, i) => (
                  <div key={i} className="px-4 py-3 rounded-xl text-[0.82rem] font-sans"
                    style={{ background: 'rgba(243,241,238,0.07)', border: '1px solid rgba(243,241,238,0.1)', color: G.mutedLight }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROGRAMA DÍA 1 ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-36" style={{ background: G.bgLight }}>
        <div className="rvn absolute top-8 left-6 font-serif italic font-bold pointer-events-none select-none opacity-[0.045]"
          style={{ fontSize: 'clamp(7rem, 18vw, 13rem)', color: G.bgRed, lineHeight: 0.85 }}>
          D1
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-8">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: G.bgWine, borderColor: `${G.bgWine}35`, background: `${G.bgWine}09` }}>
              Día 01
            </span>
          </div>
          <h2 className="rv font-serif italic font-bold mb-12 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: G.text }}>
            Teoría, técnica y modelo real.
          </h2>
          <div className="rvs grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {dia1.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 px-4 py-3 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(143,45,58,0.08)' }}>
                <span className="font-mono text-[9px] font-bold mt-0.5 flex-shrink-0" style={{ color: `${G.bgRed}70` }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-[0.83rem] leading-snug" style={{ color: G.muted }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROGRAMA DÍA 2 ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-36 border-t" style={{ background: G.bgWine, borderColor: 'rgba(215,181,106,0.12)' }}>
        <div className="rvn absolute bottom-8 right-6 font-serif italic font-bold pointer-events-none select-none opacity-[0.05]"
          style={{ fontSize: 'clamp(7rem, 18vw, 13rem)', color: G.gold, lineHeight: 0.85 }}>
          D2
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-8">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: G.gold, borderColor: `${G.gold}35`, background: `${G.gold}09` }}>
              Día 02
            </span>
          </div>
          <h2 className="rv font-serif italic font-bold mb-12 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: G.textLight }}>
            Modelo real y certificación.
          </h2>
          <div className="rvs grid sm:grid-cols-2 gap-3">
            {dia2.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-6 py-4 rounded-2xl"
                style={{ background: 'rgba(243,241,238,0.07)', border: '1px solid rgba(215,181,106,0.14)' }}>
                <Check size={14} style={{ color: G.gold, flexShrink: 0, marginTop: 2 }} strokeWidth={2.4} />
                <span className="font-sans text-[0.9rem] leading-relaxed" style={{ color: G.mutedLight }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO ════════════════════════════════════════ */}
      <section id="formulario" className="relative overflow-hidden py-28 md:py-40" style={{ background: G.bgLight }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${G.bgNude}50 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-2xl mx-auto">
          <div className="rv text-center mb-12">
            <span className="text-overline block mb-4" style={{ color: G.bgRed }}>Solicita información</span>
            <h2 className="font-serif italic font-bold leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: G.text }}>
              Sin compromiso.
            </h2>
            <p className="font-sans text-sm leading-relaxed" style={{ color: G.muted }}>
              Rellena el formulario y te contactaremos en las próximas 24 h.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="rv space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {formFields.map(f => (
                  <div key={f.name} className={`flex flex-col gap-1.5 ${f.span === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}`}>
                    <label htmlFor={`gf-${f.name}`} className="text-ui-label" style={{ color: `${G.text}85` }}>
                      {f.label}{f.required && <span className="ml-0.5" style={{ color: G.bgRed }}>*</span>}
                    </label>
                    {renderField(f)}
                  </div>
                ))}
              </div>
              <button type="submit"
                className="w-full font-sans font-semibold text-sm py-4 rounded-full mt-2 transition-all duration-300"
                style={{ background: G.bgWine, color: G.textLight }}>
                Solicitar información — sin compromiso
              </button>
              <p className="text-center font-sans text-[10px] tracking-wide" style={{ color: `${G.muted}70` }}>
                No se realiza ningún cobro
              </p>
            </form>
          ) : (
            <div className="rv flex flex-col items-center gap-5 text-center py-12">
              <div className="w-14 h-14 rounded-full flex items-center justify-center border"
                style={{ background: `${G.bgWine}12`, borderColor: `${G.bgWine}35` }}>
                <Check size={20} style={{ color: G.bgWine }} strokeWidth={2.2} />
              </div>
              <div>
                <p className="font-serif italic text-xl mb-2" style={{ color: G.text }}>Consulta recibida.</p>
                <p className="font-sans text-sm leading-relaxed max-w-xs mx-auto" style={{ color: G.muted }}>
                  Te contactaremos en las próximas 24 h. No se ha realizado ningún cobro.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ RESERVA ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40" style={{ background: G.bgWine }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(215,181,106,0.7) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${G.bgRed}40 0%, transparent 70%)`, transform: 'translate(-30%, 30%)' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-3xl mx-auto text-center">
          <span className="rv text-overline block mb-6" style={{ color: `${G.gold}80` }}>Reserva tu plaza</span>
          <h2 className="rv font-serif italic font-bold mb-10 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: G.textLight }}>
            Confirma tu plaza.
          </h2>

          <div className="rv grid sm:grid-cols-2 gap-4 my-10 text-left">
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(243,241,238,0.07)', border: '1px solid rgba(215,181,106,0.18)' }}>
              <p className="font-sans font-semibold text-xs mb-1" style={{ color: G.mutedLight }}>Reserva previa</p>
              <p className="font-serif italic font-bold text-3xl" style={{ color: G.textLight }}>300 €</p>
              <p className="font-sans text-xs mt-1.5" style={{ color: G.mutedLight }}>El resto el día de la formación</p>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(243,241,238,0.07)', border: '1px solid rgba(215,181,106,0.18)' }}>
              <p className="font-sans font-semibold text-xs mb-2" style={{ color: G.mutedLight }}>Pago por IBAN</p>
              <p className="font-mono text-[0.78rem] font-bold leading-tight" style={{ color: G.gold }}>
                ES14 2100 7348 5602<br />0042 5031
              </p>
              <p className="font-sans text-[10px] mt-2 leading-snug" style={{ color: G.mutedLight }}>
                Beneficiaria: Patricia Songel<br />Micropigmentación y belleza
              </p>
            </div>
          </div>

          <p className="rv font-sans text-xs mb-6" style={{ color: G.mutedLight }}>
            Concepto: Nombre y apellido
          </p>

          <a href="mailto:info@patriciasongel.com"
            className="rv inline-flex items-center gap-2.5 font-sans font-semibold text-sm px-10 py-4 rounded-full transition-all duration-300"
            style={{ background: G.gold, color: '#1A0D10' }}>
            Reservar plaza ahora <ArrowRight size={14} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
