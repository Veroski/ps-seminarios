import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import favicon from '../favicon.ico';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const STRIPE_URL = import.meta.env.VITE_STRIPE_MICRO || null;

/* ─── PALETTE ──────────────────────────────────────────────── */
const P = {
  bgSoft:  '#F0E8E1',
  bgMain:  '#E5D8CF',
  bgWarm:  '#D7B9A7',
  bgDark:  '#1A1A1A',
  text:    '#1F1F1F',
  muted:   '#6E6E6E',
  accent:  '#C6474B',
  white:   '#FFFFFF',
};

/* ─── DATA ─────────────────────────────────────────────────── */
const temario = [
  '¿Qué es la micropigmentación?', 'La piel — tipos y fototipos',
  'Problemas cutáneos frecuentes',  'Higiene y esterilización',
  'Bioseguridad y vacunas',          'Aspectos legales — consentimiento',
  'Cuándo evitar la micropigmentación', 'Máquinas, agujas y fuente',
  'Movimiento, velocidad y stroke',  'El diseño — compás áureo',
  'Cejas efecto polvo',              'Cejas pelo a pelo — Hairstrokes',
  'Labios Glowlips',                 'Ojos sombreados — Softliner',
  'Cuidados previos y posteriores',  'Colorimetría y pigmentología',
  'Corrección y neutralización',     'Eliminación de la micropigmentación',
  'Anestesias — tipos y acción',     'Cómo rentabilizar tarifas',
  'Marketing publicitario',          'Redes sociales',
  'Imagen corporativa',
];

const kitItems = [
  'Compás áureo', 'Regla de cejas', 'Kit de agujas (varios calibres)',
  'Látex con diseño', 'Labio de látex (simula piel real)', 'Pigmento de cejas',
  'Pigmento de labios', 'Rotulador gel blanco y negro', 'Lápiz de diseño', 'Kit desechables',
];

const extrasItems = ['Dosier formativo completo', 'Bolsa de tela', 'Libreta y bolis'];

const seguimientoItems = [
  { num: '01', label: 'Diploma acreditativo', desc: 'Entregado al finalizar la formación.' },
  { num: '02', label: '35 días de prácticas', desc: 'Tareas desde casa, corregidas individualmente.' },
  { num: '03', label: 'Grupo WhatsApp',        desc: 'Consultas y seguimiento continuos.' },
  { num: '04', label: 'Reuniones semanales',   desc: 'Acompañamiento hasta cerrar el programa.' },
];

const formFields = [
  { name: 'nombre',      label: 'Nombre completo',    type: 'text',     placeholder: 'Tu nombre',               required: true,  span: 2 },
  { name: 'email',       label: 'Correo electrónico', type: 'email',    placeholder: 'tu@correo.com',            required: true,  span: 1 },
  { name: 'telefono',    label: 'Teléfono',           type: 'tel',      placeholder: '+34 000 000 000',          required: false, span: 1 },
  { name: 'experiencia', label: 'Experiencia previa', type: 'select',   options: ['Sin experiencia', 'Iniciado', 'Intermedio / Avanzado'], required: true, span: 2 },
  { name: 'inversion',   label: '¿Cuánto estás dispuesto/a a invertir?', type: 'select', options: ['Menos de 2000€', 'Entre 2000 y 3000€', 'Más de 3000€'], required: true, span: 2 },
  { name: 'mensaje',     label: '¿Alguna pregunta?',  type: 'textarea', placeholder: 'Cuéntanos qué quieres saber...', span: 2 },
];

/* ─── PAGE NAV ─────────────────────────────────────────────── */
function PageNav() {
  const navRef = useRef(null);
  useEffect(() => {
    const nav = navRef.current;
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(229,216,207,0.88)';
        nav.style.backdropFilter = 'blur(18px)';
        nav.style.borderColor = 'rgba(31,31,31,0.1)';
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
      <nav ref={navRef} className="flex items-center justify-between px-6 py-3.5 rounded-[2rem] transition-all duration-300 border border-transparent" style={{ color: P.text }}>
        <Link to="/" className="font-sans text-sm font-medium transition-opacity duration-200 hover:opacity-60" style={{ color: P.muted }}>
          ← Volver
        </Link>
        <Link to="/" className="flex items-center gap-2.5">
          <img src={favicon} alt="Patricia Songel" width="34" height="34" className="h-[34px] w-[34px] object-contain" />
        </Link>
        <a href="#formulario"
          className="font-sans font-semibold text-xs tracking-wide px-5 py-2.5 rounded-full transition-all duration-300"
          style={{ background: P.accent, color: P.white }}>
          Solicitar info
        </a>
      </nav>
    </div>
  );
}

/* ─── STICKY MOBILE CTA ────────────────────────────────────── */
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-[90] transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="px-4 py-3" style={{ background: P.bgDark, borderTop: `1px solid ${P.accent}40` }}>
        <a
          href="#formulario"
          className="flex items-center justify-center gap-2 w-full font-sans font-semibold text-sm py-3.5 rounded-full"
          style={{ background: P.accent, color: P.white }}
        >
          Solicitar información →
        </a>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function MicropigmentacionPage() {
  const pageRef  = useRef(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mhero > *', { y: 52, opacity: 0, duration: 1.2, stagger: 0.13, ease: 'power3.out', delay: 0.2 });

      gsap.utils.toArray('.rv').forEach(el =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%' } })
      );
      gsap.utils.toArray('.rvs').forEach(el =>
        gsap.from(Array.from(el.children), { y: 28, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' } })
      );
      gsap.utils.toArray('.rvn').forEach(el =>
        gsap.from(el, { y: 40, opacity: 0, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' } })
      );
    }, pageRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleInput = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload = {
        nombre:      formData.nombre,
        email:       formData.email,
        telefono:    formData.telefono,
        experiencia: formData.experiencia,
        inversion:   formData.inversion,
        mensaje:     formData.mensaje,
      };

      const res = await fetch('/api/ghl-micro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        throw new Error('Error de red');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputCls = 'w-full border text-sm px-3.5 py-2.5 rounded-lg transition-colors duration-200 focus:outline-none font-sans';

  const renderField = f => {
    const base = { id: `mf-${f.name}`, name: f.name, required: f.required, onChange: handleInput, value: formData[f.name] || '' };
    const style = { background: P.white, borderColor: 'rgba(31,31,31,0.14)', color: P.text };
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
    <div ref={pageRef} className="pb-24 lg:pb-0" style={{ background: P.bgMain, color: P.text, overflowX: 'hidden' }}>
      <PageNav />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ height: '100svh', background: P.bgDark }}>
        <img src="/micro20_pagina1.webp" alt="Micropigmentación 3.0"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ opacity: 0.28 }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0.65) 55%, rgba(26,26,26,0.97) 100%)'
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 right-[10%] w-px h-40 pointer-events-none hidden lg:block"
          style={{ background: `linear-gradient(180deg, transparent, ${P.accent}80, transparent)` }} />

        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-28 pt-36 max-w-6xl mx-auto w-full">
          <div className="mhero">
            <span className="text-overline mb-5 block" style={{ color: P.accent, letterSpacing: '0.36em' }}>
              Basic Course · Patricia Songel
            </span>
            <h1 className="font-serif italic font-bold leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(3.8rem, 9.5vw, 7.5rem)', color: P.white }}>
              Micropig-<br />mentation<br /><em style={{ color: P.accent }}>3.0</em>
            </h1>
            <p className="font-sans text-base md:text-lg max-w-lg mb-8 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.58)' }}>
              Eleva tu carrera al siguiente nivel.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Softliner', 'Hairstrokes', 'Glowlips', 'Sombreado'].map(t => (
                <span key={t} className="font-mono text-[9.5px] tracking-[0.24em] uppercase px-4 py-2 rounded-full border"
                  style={{ color: 'rgba(255,255,255,0.75)', borderColor: 'rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.05)' }}>
                  {t}
                </span>
              ))}
            </div>
            <a href="#formulario"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
              style={{ background: P.accent, color: P.white }}>
              Solicitar plaza →
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-8" style={{ background: `linear-gradient(180deg, ${P.white}, transparent)` }} />
        </div>
      </section>

      {/* ══ BIENVENIDA ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-40" style={{ background: P.bgSoft }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(31,31,31,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="rvn absolute top-1/2 -translate-y-1/2 right-0 font-serif italic font-bold pointer-events-none select-none hidden xl:block"
          style={{ fontSize: '18vw', color: `${P.accent}07`, lineHeight: 1, letterSpacing: '-0.04em' }}>
          01
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <div className="w-10 h-px" style={{ background: P.accent }} />
            <span className="text-overline" style={{ color: P.accent }}>Sobre la formación</span>
          </div>
          <h2 className="rv font-serif italic font-bold mb-8 leading-[1.06]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', color: P.text }}>
            La base sólida que todo<br />profesional necesita.
          </h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <p className="rv font-sans leading-[1.9] text-[0.97rem]" style={{ color: P.muted }}>
              Te damos la bienvenida a esta formación profesional en micropigmentación, diseñada para brindarte
              una base sólida, completa y actualizada en cuatro técnicas clave del sector.
            </p>
            <p className="rv font-sans leading-[1.9] text-[0.97rem]" style={{ color: P.muted }}>
              Dirigida a quienes desean formarse con calidad, flexibilidad y acompañamiento personalizado.
              Comprende el por qué de cada movimiento desde el primer día.
            </p>
          </div>
        </div>
      </section>

      {/* ══ PARTE 1 — ONLINE ══════════════════════════════════ */}
      <section className="relative overflow-hidden py-12 md:py-36 border-t" style={{ background: P.bgMain, borderColor: 'rgba(31,31,31,0.06)' }}>
        <div className="rvn absolute -top-4 left-6 font-serif italic font-bold pointer-events-none select-none opacity-[0.055]"
          style={{ fontSize: 'clamp(8rem, 22vw, 18rem)', color: P.accent, lineHeight: 0.85 }}>
          12H
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-8">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: P.accent, borderColor: `${P.accent}40`, background: `${P.accent}09` }}>
              Parte 01
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <h2 className="rv font-serif italic font-bold mb-4 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: P.text }}>
                Formación teórica online.
              </h2>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex flex-col px-6 py-4 rounded-2xl border" style={{ background: P.white, borderColor: 'rgba(31,31,31,0.1)' }}>
                  <span className="font-mono font-bold text-2xl" style={{ color: P.accent }}>12h</span>
                  <span className="font-sans text-xs mt-0.5" style={{ color: P.muted }}>Duración</span>
                </div>
                <div className="flex flex-col px-6 py-4 rounded-2xl border" style={{ background: P.white, borderColor: 'rgba(31,31,31,0.1)' }}>
                  <span className="font-mono font-bold text-2xl" style={{ color: P.accent }}>Live</span>
                  <span className="font-sans text-xs mt-0.5" style={{ color: P.muted }}>Online en directo</span>
                </div>
              </div>
            </div>
            <ul className="rv rvs space-y-3 mt-2">
              {[
                'Estudio completo del dossier formativo',
                'Revisión de fundamentos teóricos',
                'Sesiones interactivas de diseño con lápiz',
                'Clases en vivo con resolución de dudas',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-mono text-sm font-medium mt-0.5" style={{ color: P.accent }}>—</span>
                  <span className="font-sans text-[0.93rem] leading-relaxed" style={{ color: P.muted }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ TEMARIO ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-40" style={{ background: P.bgDark }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-4 mb-12">
            <div className="w-8 h-px" style={{ background: P.accent }} />
            <span className="text-overline" style={{ color: P.accent }}>Temario completo</span>
            <div className="w-8 h-px" style={{ background: P.accent }} />
          </div>
          <h2 className="rv font-serif italic font-bold mb-14 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: P.white }}>
            Todo lo que dominarás.
          </h2>
          <div className="rvs grid sm:grid-cols-2 gap-x-12 gap-y-0">
            {temario.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="font-mono text-[9.5px] font-bold tabular-nums mt-0.5 flex-shrink-0 w-6"
                  style={{ color: `${P.accent}90` }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-[0.88rem] leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARTE 2 — PRESENCIAL ══════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-40" style={{ background: P.bgWarm }}>
        <div className="rvn absolute -top-6 right-4 font-serif italic font-bold pointer-events-none select-none opacity-[0.06]"
          style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', color: P.accent, lineHeight: 0.85 }}>
          4D
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-8">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: P.accent, borderColor: `${P.accent}40`, background: `${P.accent}09` }}>
              Parte 02
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <h2 className="rv font-serif italic font-bold mb-4 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: P.text }}>
                Formación presencial en sala.
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex flex-col px-6 py-4 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(31,31,31,0.1)' }}>
                  <span className="font-mono font-bold text-2xl" style={{ color: P.accent }}>4</span>
                  <span className="font-sans text-xs mt-0.5" style={{ color: P.muted }}>Días</span>
                </div>
                <p className="font-sans text-sm" style={{ color: P.muted }}>La Eliana, Valencia</p>
              </div>
            </div>
            <ul className="rvs space-y-3 mt-2">
              {[
                'Demostraciones en vivo de cada técnica',
                'Práctica de trazos en papel',
                'Práctica sobre látex plano',
                'Práctica sobre látex realista',
                'Diseño y práctica sobre modelo real',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-mono text-sm font-medium mt-0.5" style={{ color: P.accent }}>—</span>
                  <span className="font-sans text-[0.93rem] leading-relaxed" style={{ color: P.muted }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ SEGUIMIENTO ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-12 md:py-36 border-t" style={{ background: P.bgSoft, borderColor: 'rgba(31,31,31,0.06)' }}>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <div className="w-8 h-px" style={{ background: P.accent }} />
            <span className="text-overline" style={{ color: P.accent }}>Seguimiento</span>
          </div>
          <h2 className="rv font-serif italic font-bold mb-12 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: P.text }}>
            No termina el último día.
          </h2>
          <div className="rvs grid grid-cols-2 lg:grid-cols-4 gap-4">
            {seguimientoItems.map(({ num, label, desc }, i) => (
              <div key={i} className="flex flex-col gap-3 p-5 md:p-6 rounded-2xl border"
                style={{ background: P.white, borderColor: 'rgba(31,31,31,0.08)' }}>
                <span className="font-mono text-xs font-bold" style={{ color: P.accent }}>{num}</span>
                <p className="font-sans font-semibold text-[0.82rem] md:text-[0.88rem]" style={{ color: P.text }}>{label}</p>
                <p className="font-sans text-[0.75rem] md:text-[0.8rem] leading-relaxed" style={{ color: P.muted }}>{desc}</p>
              </div>
            ))}
          </div>
          <p className="rv mt-8 font-sans text-sm text-center" style={{ color: P.muted }}>
            Grupo reducido — <strong style={{ color: P.text }}>Máximo 6 personas</strong>
          </p>
        </div>
      </section>

      {/* ══ QUÉ INCLUYE ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-12 md:py-36 border-t" style={{ background: P.white, borderColor: 'rgba(31,31,31,0.06)' }}>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <div className="w-8 h-px" style={{ background: P.accent }} />
            <span className="text-overline" style={{ color: P.accent }}>Qué incluye</span>
          </div>
          <h2 className="rv font-serif italic font-bold mb-12"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: P.text }}>
            Todo listo desde el primer día.
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-5" style={{ color: P.muted }}>Extras del curso</p>
              <ul className="rvs space-y-2.5">
                {[...extrasItems, 'Diploma acreditativo', 'Almuerzos días presenciales'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: P.accent }} />
                    <span className="font-sans text-[0.9rem]" style={{ color: P.muted }}>{item}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(31,31,31,0.07)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-30" style={{ background: P.muted }} />
                  <span className="font-sans text-[0.88rem] line-through" style={{ color: P.muted }}>No incluye demógrafo</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-5" style={{ color: P.muted }}>Kit de inicio</p>
              <ul className="rvs grid grid-cols-1 gap-2.5">
                {kitItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: P.accent }}>—</span>
                    <span className="font-sans text-[0.9rem]" style={{ color: P.muted }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO ════════════════════════════════════════ */}
      <section id="formulario" className="relative overflow-hidden py-14 md:py-40 border-t" style={{ background: P.bgMain, borderColor: 'rgba(31,31,31,0.06)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(31,31,31,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-2xl mx-auto">
          <div className="rv text-center mb-12">
            <span className="text-overline block mb-4" style={{ color: P.accent }}>Solicita información</span>
            <h2 className="font-serif italic font-bold leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: P.text }}>
              Sin compromiso.
            </h2>
            <p className="font-sans text-sm leading-relaxed" style={{ color: P.muted }}>
              Rellena el formulario y te contactaremos en las próximas 24 h.
            </p>
          </div>

          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="rv space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {formFields.map(f => (
                  <div key={f.name} className={`flex flex-col gap-1.5 ${f.span === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}`}>
                    <label htmlFor={`mf-${f.name}`} className="text-ui-label" style={{ color: `${P.text}85` }}>
                      {f.label}{f.required && <span className="ml-0.5" style={{ color: P.accent }}>*</span>}
                    </label>
                    {renderField(f)}
                  </div>
                ))}
              </div>
              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Hubo un error al enviar. Por favor, inténtalo de nuevo.
                </div>
              )}
              <button type="submit"
                disabled={status === 'loading'}
                className="w-full font-sans font-semibold text-sm py-4 rounded-full mt-2 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ background: P.accent, color: P.white, opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Enviando...</>
                ) : 'Solicitar información — sin compromiso'}
              </button>
              <p className="text-center font-sans text-[10px] tracking-wide" style={{ color: `${P.muted}80` }}>
                No se realiza ningún cobro
              </p>
            </form>
          ) : (
            <div className="rv flex flex-col items-center justify-center gap-6 text-center"
              style={{ minHeight: '420px' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `${P.accent}15`, border: `1px solid ${P.accent}30` }}>
                <span className="font-serif italic font-bold text-2xl" style={{ color: P.accent }}>✓</span>
              </div>
              <div className="space-y-3">
                <p className="font-serif italic font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: P.text }}>
                  ¡Gracias por tu interés!
                </p>
                <p className="font-sans text-sm leading-relaxed max-w-xs mx-auto" style={{ color: P.muted }}>
                  Hemos recibido tu solicitud.<br />Nos pondremos en contacto contigo en las próximas 24 h.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ RESERVA ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-40" style={{ background: P.accent }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-3xl mx-auto text-center">
          <p className="rv text-overline mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>Reserva tu plaza</p>
          <h2 className="rv font-serif italic font-bold mb-12 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: P.white }}>
            Confirma tu plaza.
          </h2>

          <div className="rv mb-12 max-w-sm mx-auto">
            <div className="p-8 rounded-2xl text-left" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <p className="font-sans font-semibold text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Reserva previa</p>
              <p className="font-serif italic font-bold text-4xl mb-2" style={{ color: P.white }}>250 €</p>
              <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                El resto se abona el día de la formación.<br />Formación exenta de IVA.
              </p>
            </div>
          </div>

          <p className="rv font-sans text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>La Eliana, Valencia</p>

          {STRIPE_URL ? (
            <>
              <a
                href={STRIPE_URL}
                className="rv inline-flex items-center justify-center gap-3 font-sans font-semibold text-sm px-10 py-4 rounded-full transition-all duration-300 w-full max-w-sm"
                style={{ background: P.white, color: P.accent }}
              >
                <span>Pagar reserva con tarjeta</span>
                <span className="font-mono text-xs opacity-60">→</span>
              </a>
              <p className="rv mt-4 font-sans text-[10px] tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Pago seguro gestionado por Stripe
              </p>
            </>
          ) : (
            <p className="rv font-sans text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Próximamente — reserva por teléfono
            </p>
          )}
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
