import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import favicon from '../favicon.ico';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ─── PALETTE ──────────────────────────────────────────────── */
const C = {
  bgLight:    '#F1EEEA',
  bgWarm:     '#F0E7E0',
  bgDark:     '#474647',
  bgDeep:     '#2A2929',
  text:       '#1A1A19',
  textLight:  '#F1EEEA',
  muted:      '#6A6463',
  mutedLight: 'rgba(241,238,234,0.62)',
  accent:     '#C2703A',
  gold:       '#C6A75C',
  white:      '#FFFFFF',
};

const STRIPE_URL = import.meta.env.VITE_STRIPE_CEJAS || 'https://link.fastpaydirect.com/payment-link/69fda8e434d67b041e7e84a7';

/* ─── DATA ─────────────────────────────────────────────────── */
const outcomes = [
  'Ejecutar el pelo a pelo más realista del mercado',
  'Entender y trabajar la piel en profundidad',
  'Diseñar según morfología y fototipo',
  'Rentabilizar y comunicar tu trabajo',
];

const temario = [
  'Pelo a pelo',          'Realismo',
  'La piel',              'Tipos de piel',
  'Problemas en la piel', 'Fototipos de piel',
  'Consentimiento informado', 'Movimiento y velocidad',
  'Cuidados previos',     'Cuidados posteriores',
  'Tarifas y marketing',  'Redes sociales',
  'Imagen corporativa',
];

const incluye = [
  'Dossier formativo completo',
  'Práctica paso a paso con resolución de dudas',
  'Bolsa de tela',
  'Libreta y bolis',
  'Regla de cejas',
  'Kit de agujas',
  'Pigmento de cejas',
  'Kit desechables',
  'Diploma oficial',
];

const formFields = [
  { name: 'nombre',        label: 'Nombre completo',                           type: 'text',     placeholder: 'Tu nombre',             required: true,  span: 2 },
  { name: 'email',         label: 'Correo electrónico',                        type: 'email',    placeholder: 'tu@correo.com',          required: true,  span: 1 },
  { name: 'telefono',      label: 'Teléfono',                                  type: 'tel',      placeholder: '+34 000 000 000',        required: true,  span: 1 },
  { name: 'activa',        label: '¿Practicas micropigmentación actualmente?', type: 'select',   options: ['Sí, activamente', 'Sí, esporádicamente', 'No, aún no'], required: true, span: 2 },
  { name: 'tecnica_cejas', label: 'Técnica de cejas que practicas',            type: 'select',   options: ['Ninguna', 'Pelo a pelo', 'Sombreado', 'Ombre / Combinada', 'Otra'], span: 2 },
  { name: 'inversion',     label: '¿Cuánto estás dispuesto/a a invertir?',     type: 'select',   options: ['Menos de 950 €', 'Entre 950 y 1250 €', 'Más de 1250 €'], required: true, span: 2 },
  { name: 'mensaje',       label: '¿Qué buscas mejorar?',                      type: 'textarea', placeholder: 'Describe tu objetivo...', span: 2 },
];

/* ─── PAGE NAV ─────────────────────────────────────────────── */
function PageNav() {
  const navRef   = useRef(null);
  const scrolled = useRef(false);
  useEffect(() => {
    const nav = navRef.current;
    const onScroll = () => {
      if (!nav) return;
      const past = window.scrollY > 60;
      if (past === scrolled.current) return;
      scrolled.current = past;
      if (past) {
        nav.style.background = 'rgba(42,41,41,0.88)';
        nav.style.backdropFilter = 'blur(18px)';
        nav.style.borderColor = 'rgba(198,167,92,0.2)';
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
        <Link to="/" className="font-sans text-sm font-medium transition-opacity duration-200 hover:opacity-60" style={{ color: C.mutedLight }}>
          ← Volver
        </Link>
        <Link to="/" className="flex items-center gap-2.5">
          <img src={favicon} alt="Patricia Songel" width="34" height="34" className="h-[34px] w-[34px] object-contain" />
        </Link>
        <a href="#formulario"
          className="font-sans font-semibold text-xs tracking-wide px-5 py-2.5 rounded-full transition-all duration-300"
          style={{ background: C.gold, color: '#1A1A19' }}>
          Reservar plaza
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
      <div className="px-4 py-3" style={{ background: C.bgDeep, borderTop: `1px solid ${C.gold}30` }}>
        <a
          href="#formulario"
          className="flex items-center justify-center gap-2 w-full font-sans font-semibold text-sm py-3.5 rounded-full"
          style={{ background: C.gold, color: '#1A1A19' }}
        >
          Reservar plaza →
        </a>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function CejasPage() {
  const pageRef  = useRef(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chero > *', { y: 56, opacity: 0, duration: 1.3, stagger: 0.15, ease: 'power3.out', delay: 0.2 });

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

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Masterclass Hairstrokes — Cejas Pelo a Pelo | Patricia Songel';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = 'Formación avanzada en micropigmentación de cejas pelo a pelo con Patricia Songel. Técnica hiperrealista, kit completo y diploma incluidos. La Eliana, Valencia.';
    return () => { document.title = 'Seminarios Patricia Songel'; meta.content = ''; };
  }, []);

  const handleInput = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload = {
        nombre:        formData.nombre,
        email:         formData.email,
        telefono:      formData.telefono,
        activa:        formData.activa,
        tecnica_cejas: formData.tecnica_cejas,
        inversion:     formData.inversion,
        mensaje:       formData.mensaje,
      };

      const res = await fetch('/api/ghl-cejas', {
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
    const base = { id: `cf-${f.name}`, name: f.name, required: f.required, onChange: handleInput, value: formData[f.name] || '' };
    const style = { background: C.white, borderColor: 'rgba(42,41,41,0.14)', color: C.text };
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
    <div ref={pageRef} className="pb-24 lg:pb-0" style={{ background: C.bgLight, color: C.text, overflowX: 'hidden' }}>
      <PageNav />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ height: '100svh', background: C.bgDeep }}>
        <img src="/cejas_pagina1_hq.webp" alt="Hairstrokes Masterclass"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ opacity: 0.04, mixBlendMode: 'luminosity' }} />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, rgba(42,41,41,0.1) 0%, rgba(42,41,41,0.55) 55%, rgba(26,26,25,0.97) 100%)`
        }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 65% 25%, rgba(194,112,58,0.06) 0%, transparent 60%)' }} />
        <div className="absolute top-32 right-[12%] w-px h-52 hidden lg:block pointer-events-none"
          style={{ background: `linear-gradient(180deg, transparent, ${C.gold}50, transparent)` }} />

        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-28 pt-36 max-w-6xl mx-auto w-full">
          <div className="chero">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-4 h-px" style={{ background: C.gold }} />
              <span className="text-overline" style={{ color: C.gold }}>Masterclass · Patricia Songel</span>
            </div>

            <h1 className="font-serif italic font-bold leading-[0.88] mb-7"
              style={{ fontSize: 'clamp(3.8rem, 10vw, 8.5rem)', color: C.textLight }}>
              Hair<em style={{ color: C.accent, fontStyle: 'normal' }}>strokes</em>
            </h1>

            <p className="font-sans text-base md:text-lg max-w-lg mb-3 leading-relaxed font-medium"
              style={{ color: C.mutedLight }}>
              "Donde empieza el{' '}
              <em style={{ color: C.accent, fontStyle: 'italic' }}>REALISMO.</em>"
            </p>

            <p className="font-sans text-sm max-w-md mb-2 leading-[1.75]"
              style={{ color: 'rgba(241,238,234,0.45)' }}>
              Técnica hiperrealista. Precisión. Diseño estratégico.
            </p>
            <p className="font-sans text-xs max-w-md mb-10 tracking-wide uppercase"
              style={{ color: 'rgba(241,238,234,0.32)' }}>
              Formación avanzada en micropigmentación de cejas pelo a pelo
            </p>

            <a href="#formulario"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
              style={{ background: C.gold, color: '#1A1A19' }}>
              Reservar plaza →
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-8" style={{ background: `linear-gradient(180deg, ${C.gold}, transparent)` }} />
        </div>
      </section>

      {/* ══ INTRO ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-40" style={{ background: C.bgLight }}>
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.bgWarm}80 0%, transparent 70%)`, transform: 'translate(-30%, -30%)' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: C.bgDark }} />
            <span className="text-overline" style={{ color: C.bgDark }}>Introducción</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div>
              <h2 className="rv font-serif italic font-bold mb-6 leading-[1.04]"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: C.text }}>
                Donde la técnica se convierte en arte.
              </h2>
              <p className="rv font-sans leading-[1.9] text-[0.97rem]" style={{ color: C.muted }}>
                Aprende a ejecutar el pelo a pelo más realista del mercado con precisión milimétrica,
                movimiento natural y resultados que perduran en el tiempo.
              </p>
            </div>
            <div className="rv grid grid-cols-2 gap-3">
              {[
                { val: 'pelo a pelo', label: 'Técnica protagonista' },
                { val: '1 día',       label: 'Formación intensiva' },
                { val: 'live',        label: 'Modelo real incluido' },
                { val: 'cert.',       label: 'Diploma oficial' },
              ].map(({ val, label }, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-5 rounded-2xl"
                  style={{ background: i % 2 === 0 ? C.bgWarm : C.bgLight, border: '1px solid rgba(42,41,41,0.1)' }}>
                  <span className="font-mono font-bold text-sm" style={{ color: C.bgDeep }}>{val}</span>
                  <span className="font-sans text-xs leading-snug" style={{ color: C.muted }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ A QUIÉN VA DIRIGIDA ═══════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-40" style={{ background: C.bgWarm }}>
        <div className="rvn absolute -right-8 top-1/2 -translate-y-1/2 font-serif italic font-bold pointer-events-none select-none hidden xl:block"
          style={{ fontSize: '13vw', color: `${C.bgDark}06`, lineHeight: 1, letterSpacing: '-0.04em' }}>
          hairstrokes
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: C.bgDeep }} />
            <span className="text-overline" style={{ color: C.bgDeep }}>A quién va dirigida</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <h2 className="rv font-serif italic font-bold mb-6 leading-[1.04]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: C.text }}>
                Para quienes buscan el hiperrealismo.
              </h2>
              <p className="rv font-sans leading-[1.9] text-[0.93rem] mb-8" style={{ color: C.muted }}>
                Destinada a micropigmentadoras/es que quieren elevar su técnica de cejas al siguiente nivel,
                dominando el pelo a pelo con criterio artístico y precisión de competición.
              </p>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-4" style={{ color: `${C.bgDeep}80` }}>
                La técnica puede conseguir
              </p>
              <ul className="rvs space-y-2.5">
                {[
                  'Cejas de aspecto 100% natural',
                  'Trazo fino y con textura real',
                  'Diseño adaptado a cada morfología',
                  'Resultados que perduran en el tiempo',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.accent }} />
                    <span className="font-sans text-[0.9rem]" style={{ color: C.muted }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Resultado', value: 'Pelo a pelo hiperrealista' },
                { label: 'Técnica',   value: 'Hairstrokes con movimiento natural' },
                { label: 'Estilo',    value: 'Diseño estratégico por morfología' },
              ].map(({ label, value }, i) => (
                <div key={i} className="rv p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(42,41,41,0.1)' }}>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: `${C.bgDeep}70` }}>{label}</p>
                  <p className="font-sans font-medium text-sm leading-snug" style={{ color: C.text }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEMARIO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-40" style={{ background: C.bgDark }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(241,238,234,0.7) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: C.gold }} />
            <span className="text-overline" style={{ color: C.gold }}>Temario</span>
          </div>
          <h2 className="rv font-serif italic font-bold mb-14 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: C.textLight }}>
            Precisión en cada pelo.
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-6" style={{ color: `${C.gold}70` }}>
                Resultados
              </p>
              <ul className="rvs space-y-4">
                {outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 font-mono text-sm font-medium mt-0.5" style={{ color: C.accent }}>—</span>
                    <span className="font-sans text-[0.92rem] leading-relaxed" style={{ color: C.mutedLight }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-6" style={{ color: `${C.gold}70` }}>
                Contenido
              </p>
              <div className="rvs grid grid-cols-2 gap-2.5">
                {temario.map((item, i) => (
                  <div key={i} className="px-4 py-3 rounded-xl text-[0.82rem] font-sans"
                    style={{ background: 'rgba(241,238,234,0.06)', border: '1px solid rgba(241,238,234,0.1)', color: C.mutedLight }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUÉ INCLUYE ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-12 md:py-36" style={{ background: C.bgLight }}>
        <div className="rvn absolute top-8 left-4 font-serif italic font-bold pointer-events-none select-none opacity-[0.04]"
          style={{ fontSize: 'clamp(7rem, 18vw, 13rem)', color: C.bgDark, lineHeight: 0.85 }}>
          kit
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-8">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: C.bgDeep, borderColor: `${C.bgDeep}35`, background: `${C.bgDeep}08` }}>
              Qué incluye
            </span>
          </div>
          <h2 className="rv font-serif italic font-bold mb-12 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Todo para empezar desde el primer día.
          </h2>
          <div className="rvs grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-10">
            {incluye.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 px-4 py-3.5 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(42,41,41,0.08)' }}>
                <span className="flex-shrink-0 font-mono text-sm font-medium mt-0.5" style={{ color: C.gold }}>—</span>
                <span className="font-sans text-[0.83rem] leading-snug" style={{ color: C.muted }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="rv inline-flex items-center gap-2 px-4 py-2.5 rounded-full"
            style={{ background: `${C.bgWarm}`, border: `1px solid rgba(42,41,41,0.1)` }}>
            <span className="font-sans text-sm" style={{ color: C.muted }}>📍</span>
            <span className="font-sans text-sm font-medium" style={{ color: C.text }}>La Eliana, Valencia</span>
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO ════════════════════════════════════════ */}
      <section id="formulario" className="relative overflow-hidden py-14 md:py-40" style={{ background: C.bgLight }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.bgWarm}60 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-2xl mx-auto">
          <div className="rv text-center mb-12">
            <span className="text-overline block mb-4" style={{ color: C.bgDark }}>Solicita información</span>
            <h2 className="font-serif italic font-bold leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: C.text }}>
              Sin compromiso.
            </h2>
            <p className="font-sans text-sm leading-relaxed" style={{ color: C.muted }}>
              Rellena el formulario y te contactaremos en las próximas 24 h.
            </p>
          </div>

          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="rv space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {formFields.map(f => (
                  <div key={f.name} className={`flex flex-col gap-1.5 ${f.span === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}`}>
                    <label htmlFor={`cf-${f.name}`} className="text-ui-label" style={{ color: `${C.text}85` }}>
                      {f.label}{f.required && <span className="ml-0.5" style={{ color: C.accent }}>*</span>}
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
                style={{ background: C.bgDeep, color: C.textLight, opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Enviando...</>
                ) : 'Solicitar información — sin compromiso'}
              </button>
              <p className="text-center font-sans text-[10px] tracking-wide" style={{ color: `${C.muted}70` }}>
                No se realiza ningún cobro
              </p>
            </form>
          ) : (
            <div className="rv flex flex-col items-center justify-center gap-6 text-center"
              style={{ minHeight: '420px' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `${C.accent}15`, border: `1px solid ${C.accent}30` }}>
                <span className="font-serif italic font-bold text-2xl" style={{ color: C.accent }}>✓</span>
              </div>
              <div className="space-y-3">
                <p className="font-serif italic font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: C.text }}>
                  ¡Gracias por tu interés!
                </p>
                <p className="font-sans text-sm leading-relaxed max-w-xs mx-auto" style={{ color: C.muted }}>
                  Hemos recibido tu solicitud.<br />Nos pondremos en contacto contigo en las próximas 24 h.
                </p>
              </div>
            </div>
          )}

          {/* ── Pago Stripe ─────────────────────────────────── */}
          <div className="rv mt-10 pt-10" style={{ borderTop: `1px solid rgba(42,41,41,0.1)` }}>
            <p className="font-sans font-semibold text-xs tracking-widest uppercase text-center mb-6" style={{ color: C.muted }}>
              ¿Ya lo tienes claro? Reserva tu plaza
            </p>
            <div className="p-6 rounded-2xl text-center mb-4" style={{ background: `${C.bgWarm}60`, border: `1px solid rgba(42,41,41,0.08)` }}>
              <p className="font-sans text-xs mb-1" style={{ color: C.muted }}>Reserva previa</p>
              <p className="font-serif italic font-bold text-3xl" style={{ color: C.text }}>
                {STRIPE_URL ? '250 €' : 'Consultar'}
              </p>
              <p className="font-sans text-[10px] mt-1" style={{ color: `${C.muted}80` }}>El resto se abona el día de la formación</p>
            </div>
            {STRIPE_URL ? (
              <>
                <a href={STRIPE_URL}
                  className="flex items-center justify-center gap-2 w-full font-sans font-semibold text-sm py-4 rounded-full transition-all duration-300"
                  style={{ background: C.bgDeep, color: C.textLight }}>
                  Pagar reserva con tarjeta →
                </a>
                <p className="text-center font-sans text-[10px] mt-2" style={{ color: `${C.muted}70` }}>
                  Pago seguro gestionado por Stripe
                </p>
              </>
            ) : (
              <p className="text-center font-sans text-sm" style={{ color: `${C.muted}70` }}>
                Pago con tarjeta próximamente disponible
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ══ RESERVA ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 md:py-40" style={{ background: C.bgDeep }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(198,167,92,0.7) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.bgDark}60 0%, transparent 70%)`, transform: 'translate(-30%, 30%)' }} />
        <div className="relative z-10 px-6 md:px-16 max-w-3xl mx-auto text-center">
          <span className="rv text-overline block mb-6" style={{ color: `${C.gold}80` }}>Reserva tu plaza</span>
          <h2 className="rv font-serif italic font-bold mb-10 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: C.textLight }}>
            Confirma tu plaza.
          </h2>

          <div className="rv mb-10 max-w-sm mx-auto">
            <div className="p-8 rounded-2xl text-left" style={{ background: 'rgba(241,238,234,0.06)', border: '1px solid rgba(198,167,92,0.18)' }}>
              <p className="font-sans font-semibold text-xs mb-1" style={{ color: C.mutedLight }}>Reserva previa</p>
              <p className="font-serif italic font-bold text-4xl mb-2" style={{ color: C.textLight }}>
                {STRIPE_URL ? '250 €' : 'Consultar'}
              </p>
              <p className="font-sans text-xs leading-relaxed" style={{ color: C.mutedLight }}>
                El resto se abona el día de la formación.<br />Formación exenta de IVA.
              </p>
            </div>
          </div>

          {STRIPE_URL ? (
            <>
              <a
                href={STRIPE_URL}
                className="rv inline-flex items-center justify-center gap-3 font-sans font-semibold text-sm px-10 py-4 rounded-full transition-all duration-300 w-full max-w-sm"
                style={{ background: C.gold, color: '#1A1A19' }}
              >
                <span>Pagar reserva con tarjeta</span>
                <span className="font-mono text-xs opacity-60">→</span>
              </a>
              <p className="rv mt-4 font-sans text-[10px] tracking-wide" style={{ color: C.mutedLight }}>
                Pago seguro gestionado por Stripe
              </p>
            </>
          ) : (
            <p className="rv font-sans text-sm" style={{ color: C.mutedLight }}>
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
