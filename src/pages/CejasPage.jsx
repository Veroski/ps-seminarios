import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo, { SITE } from '../components/Seo';

gsap.registerPlugin(ScrollTrigger);

/* ─── PALETTE ──────────────────────────────────────────────── */
const C = {
  bgLight:   '#F9F4E9',
  bgWarm:    '#E9DEC9',
  bgDark:    '#0A0A0A',
  bgMid:     '#262222',
  text:      '#0A0A0A',
  textLight: '#F3EDE2',
  muted:     '#625C5C',
  mutedLight:'rgba(243,237,226,0.72)',
  gold:      '#F3EDE2',
  accent:    '#0A0A0A',
  white:     '#F3EDE2',
};

const SEO_TITLE = 'Hairstrokes Masterclass — Cejas pelo a pelo | Patricia Songel Valencia';
const SEO_DESC  = 'Domina la técnica de hairstrokes con Patricia Songel, campeona de España. Masterclass presencial de 2 días en La Eliana, Valencia. Cejas ultrarrealistas sobre modelo real. Grupos reducidos.';

/* ─── DATA ─────────────────────────────────────────────────── */
const outcomes = [
  'Ejecutar hairstrokes perfectos en piel real',
  'Controlar la profundidad y velocidad del trazo',
  'Diseñar cejas simétricas adaptadas al rostro',
  'Trabajar con presión exacta para evitar retracciones',
];

const tecnicas = [
  'Movimiento needle-on-skin',    'Control de profundidad',
  'Diseño con compás áureo',      'Velocidad y presión de trazo',
  'Pigmentología para cejas',     'Corrección de simetría',
  'Polvo vs hairstrokes',         'Fotografía para redes sociales',
];

const dia1 = [
  'Anatomía del folículo piloso',  'Tipos de piel y comportamiento',
  'Elección de agujas liner',      'Pigmentos: fríos, cálidos, neutros',
  'Colorimetría aplicada a cejas', 'Diseño de arco y proporciones',
  'Dirección y ángulo del pelo',   'Práctica en látex plano',
  'Práctica en látex realista 3D', 'Demostración en modelo real',
];

const dia2 = [
  'Práctica completa en modelo real',
  'Corrección de simetría en vivo',
  'Fijación del pigmento y curado',
  'Sesión de fotografía con resultado',
  'Contenido para redes sociales',
  'Entrega de certificado acreditativo',
];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Hairstrokes Masterclass — Cejas pelo a pelo · Patricia Songel',
    description: 'Masterclass intensiva de cejas pelo a pelo (hairstrokes). 2 días presenciales en La Eliana, Valencia. Modelo real incluido. Impartida por Patricia Songel, campeona de España 2023 y 2025.',
    url: `${SITE}/formacion/hairstrokes`,
    image: `${SITE}/cejas_pagina1.webp`,
    provider: {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Patricia Songel',
      url: SITE,
    },
    inLanguage: 'es-ES',
    teaches: [
      'Hairstrokes cejas pelo a pelo',
      'Diseño de cejas con compás áureo',
      'Colorimetría micropigmentación',
      'Control de profundidad y trazo',
    ],
    courseMode: 'onsite',
    availableLanguage: 'Spanish',
    educationalLevel: 'intermediate',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: 'Centro Patricia Songel',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Molino 7',
          addressLocality: 'La Eliana',
          addressRegion: 'Valencia',
          addressCountry: 'ES',
        },
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Formaciones', item: `${SITE}/#formaciones` },
      { '@type': 'ListItem', position: 3, name: 'Hairstrokes Masterclass', item: `${SITE}/formacion/hairstrokes` },
    ],
  },
];

const formFields = [
  { name: 'nombre',      label: 'Nombre completo',      type: 'text',     placeholder: 'Tu nombre',              required: true,  span: 2 },
  { name: 'email',       label: 'Correo electrónico',   type: 'email',    placeholder: 'tu@correo.com',           required: true,  span: 1 },
  { name: 'telefono',    label: 'Teléfono',             type: 'tel',      placeholder: '+34 000 000 000',         required: true,  span: 1 },
  { name: 'activa',      label: '¿Practicas micropigmentación actualmente?', type: 'select',
    options: ['Sí, activamente', 'Sí, esporádicamente', 'No, aún no'], required: true, span: 2 },
  { name: 'experiencia', label: 'Experiencia con cejas', type: 'select',
    options: ['Sin experiencia', 'Efecto polvo básico', 'Hairstrokes básico', 'Hairstrokes avanzado'], span: 2 },
  { name: 'inversion',   label: '¿Cuánto estás dispuesto/a a invertir?', type: 'select',
    options: ['Menos de 1.000 €', 'Entre 1.000 y 1.500 €', 'Más de 1.500 €'], required: true, span: 2 },
  { name: 'mensaje',     label: '¿Qué quieres mejorar?', type: 'textarea',
    placeholder: 'Cuéntanos tu objetivo...', span: 2 },
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
        nav.style.background = 'rgba(44,26,14,0.9)';
        nav.style.backdropFilter = 'blur(18px)';
        nav.style.borderColor = 'rgba(10,10,10,0.2)';
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
      <nav
        ref={navRef}
        className="flex items-center justify-between px-6 py-3.5 rounded-[2rem] transition-all duration-300 border border-transparent"
      >
        <Link
          to="/"
          className="font-sans text-sm font-medium transition-opacity duration-200 hover:opacity-60"
          style={{ color: C.mutedLight }}
        >
          ← Volver
        </Link>
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/ps-monogram.webp" alt="Patricia Songel" width="34" height="34" className="h-[34px] w-[34px] object-contain" />
        </Link>
        <a
          href="#formulario"
          className="font-sans font-semibold text-xs tracking-wide px-5 py-2.5 rounded-full transition-all duration-300"
          style={{ background: C.gold, color: '#0A0A0A' }}
        >
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
      <div className="px-4 py-3" style={{ background: C.bgDark, borderTop: `1px solid ${C.gold}30` }}>
        <a
          href="#formulario"
          className="flex items-center justify-center gap-2 w-full font-sans font-semibold text-sm py-3.5 rounded-full"
          style={{ background: C.gold, color: '#0A0A0A' }}
        >
          Reservar plaza →
        </a>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function CejasPage() {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chero > *', {
        y: 56, opacity: 0, duration: 1.3, stagger: 0.15, ease: 'power3.out', delay: 0.2,
      });
      gsap.utils.toArray('.rv').forEach((el) =>
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%' },
        })
      );
      gsap.utils.toArray('.rvs').forEach((el) =>
        gsap.from(Array.from(el.children), {
          y: 28, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      );
      gsap.utils.toArray('.rvn').forEach((el) =>
        gsap.from(el, {
          scale: 0.94, opacity: 0, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      );
    }, pageRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleInput = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload = {
        nombre:      formData.nombre,
        email:       formData.email,
        telefono:    formData.telefono,
        activa:      formData.activa,
        experiencia: formData.experiencia,
        inversion:   formData.inversion,
        mensaje:     formData.mensaje,
        formacion:   'Hairstrokes Masterclass',
      };
      const res = await fetch('/api/cita', {
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

  const renderField = (f) => {
    const base = {
      id: `cf-${f.name}`,
      name: f.name,
      required: f.required,
      onChange: handleInput,
      value: formData[f.name] || '',
    };
    const style = { background: C.white, borderColor: 'rgba(44,26,14,0.14)', color: C.text };

    if (f.type === 'select') return (
      <select {...base} className={`${inputCls} cursor-pointer appearance-none`} style={{ ...style, colorScheme: 'light' }}>
        <option value="">Seleccionar…</option>
        {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
    if (f.type === 'textarea') return (
      <textarea {...base} rows={3} placeholder={f.placeholder} className={`${inputCls} resize-none`} style={style} />
    );
    return <input {...base} type={f.type} placeholder={f.placeholder} className={inputCls} style={style} />;
  };

  return (
    <div ref={pageRef} className="pb-24 lg:pb-0" style={{ background: C.bgLight, color: C.text, overflowX: 'hidden' }}>
      <Seo
        title={SEO_TITLE}
        description={SEO_DESC}
        canonical={`${SITE}/formacion/hairstrokes`}
        image={`${SITE}/cejas_pagina1.webp`}
        imageAlt="Hairstrokes Masterclass — cejas pelo a pelo con Patricia Songel en La Eliana, Valencia"
        jsonLd={JSON_LD}
      />
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col justify-end overflow-hidden"
        style={{ height: '100svh', background: C.bgDark }}
      >
        <img
          src="/cejas_pagina1.webp"
          alt="Cejas hairstrokes pelo a pelo — técnica de micropigmentación de Patricia Songel"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ opacity: 0.32, mixBlendMode: 'luminosity' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(44,26,14,0.12) 0%, rgba(44,26,14,0.55) 50%, rgba(28,15,6,0.98) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(10,10,10,0.07) 0%, transparent 60%)' }}
        />
        <div
          className="absolute top-32 right-[12%] w-px h-52 hidden lg:block pointer-events-none"
          style={{ background: `linear-gradient(180deg, transparent, ${C.gold}60, transparent)` }}
        />

        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-28 pt-36 max-w-6xl mx-auto w-full">
          <div className="chero">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-4 h-px" style={{ background: C.gold }} />
              <span
                className="font-mono text-[9px] tracking-[0.32em] uppercase"
                style={{ color: C.gold }}
              >
                Masterclass · Patricia Songel
              </span>
            </div>
            <h1
              className="font-serif italic font-bold leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(3.8rem, 10vw, 8rem)', color: C.textLight }}
            >
              Hair<em style={{ color: C.gold }}>strokes</em>
            </h1>
            <p
              className="font-sans text-base md:text-lg max-w-lg mb-6 leading-relaxed"
              style={{ color: C.mutedLight }}
            >
              Cejas pelo a pelo. El nivel más alto de realismo.
            </p>
            <p
              className="font-sans text-sm max-w-md mb-10 leading-[1.75]"
              style={{ color: 'rgba(245,240,232,0.45)' }}
            >
              Una técnica que exige dominar la presión, la velocidad y la dirección de cada trazo.
              La masterclass que convierte técnicas corrientes en resultados de competición.
            </p>
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
              style={{ background: C.gold, color: '#0A0A0A' }}
            >
              Reservar plaza →
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
          <div className="w-px h-8" style={{ background: `linear-gradient(180deg, ${C.gold}, transparent)` }} />
        </div>
      </section>

      {/* ══ INTRO ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-12 md:py-24" style={{ background: C.bgLight }}>
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${C.bgWarm}60 0%, transparent 70%)`,
            transform: 'translate(-30%, -30%)',
          }}
        />
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: C.accent }} />
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase"
              style={{ color: C.accent }}
            >
              Introducción
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div>
              <h2
                className="rv font-serif italic font-bold mb-6 leading-[1.04]"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: C.text }}
              >
                El trazo que define la diferencia.
              </h2>
              <p className="rv font-sans leading-[1.9] text-[0.97rem]" style={{ color: C.muted }}>
                Los hairstrokes son la técnica más demandada —y más difícil de dominar— en micropigmentación
                de cejas. Un pelo mal ejecutado, con la presión equivocada o la dirección incorrecta, arruina
                el conjunto. En esta masterclass aprendes a que no ocurra.
              </p>
            </div>
            <div className="rv grid grid-cols-2 gap-3">
              {[
                { val: '2 días',   label: 'Formación intensiva' },
                { val: 'realismo', label: 'Resultado ultranatural' },
                { val: 'live',     label: 'Modelo real incluido' },
                { val: 'cert.',    label: 'Certificado oficial' },
              ].map(({ val, label }, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1.5 p-5 rounded-2xl"
                  style={{
                    background: i % 2 === 0 ? C.bgWarm : C.bgLight,
                    border: '1px solid rgba(44,26,14,0.1)',
                  }}
                >
                  <span className="font-mono font-bold text-base" style={{ color: C.accent }}>{val}</span>
                  <span className="font-sans text-xs leading-snug" style={{ color: C.muted }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ A QUIÉN VA DIRIGIDA ═══════════════════════════════ */}
      <section className="relative overflow-hidden py-12 md:py-24" style={{ background: C.bgWarm }}>
        <div
          className="rvn absolute -right-8 top-1/2 -translate-y-1/2 font-serif italic font-bold pointer-events-none select-none hidden xl:block"
          style={{ fontSize: '16vw', color: `${C.accent}09`, lineHeight: 1, letterSpacing: '-0.04em' }}
        >
          cejas
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: C.accent }} />
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase"
              style={{ color: C.accent }}
            >
              Para quién es
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div>
              <h2
                className="rv font-serif italic font-bold mb-6 leading-[1.04]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: C.text }}
              >
                Para profesionales que buscan el siguiente nivel.
              </h2>
              <p className="rv font-sans leading-[1.9] text-[0.93rem] mb-8" style={{ color: C.muted }}>
                Pensada para micropigmentadoras/es que ya trabajan y quieren perfeccionar su técnica de cejas,
                mejorar la retención del trazo y conseguir resultados de competición.
              </p>
              <ul className="rvs space-y-2.5">
                {[
                  'Cejas más naturales y perfectamente simétricas',
                  'Menor tasa de retocados y mejor curado',
                  'Capacidad de trabajar en pieles difíciles',
                  'Resultados de competición aplicados al día a día',
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
                { label: 'Resultado', value: 'Hairstrokes perfectos, ultrarrealistas y duraderos' },
                { label: 'Nivel',     value: 'Intermedio / Avanzado — requiere base en micropigmentación' },
                { label: 'Formato',   value: '2 días presenciales, La Eliana, Valencia. Grupos reducidos.' },
              ].map(({ label, value }, i) => (
                <div
                  key={i}
                  className="rv p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(44,26,14,0.1)' }}
                >
                  <p
                    className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: `${C.accent}70` }}
                  >
                    {label}
                  </p>
                  <p className="font-sans font-medium text-sm leading-snug" style={{ color: C.text }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUÉ APRENDERÁS ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-12 md:py-24" style={{ background: C.bgMid }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(245,240,232,0.7) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: C.gold }} />
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase"
              style={{ color: C.gold }}
            >
              Qué aprenderás
            </span>
          </div>
          <h2
            className="rv font-serif italic font-bold mb-14 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: C.textLight }}
          >
            Técnica de élite.
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p
                className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-6"
                style={{ color: `${C.gold}70` }}
              >
                Resultados
              </p>
              <ul className="rvs space-y-4">
                {outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 font-mono text-sm font-medium mt-0.5"
                      style={{ color: C.gold }}
                    >
                      —
                    </span>
                    <span
                      className="font-sans text-[0.92rem] leading-relaxed"
                      style={{ color: C.mutedLight }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p
                className="rv font-sans font-semibold text-xs tracking-widest uppercase mb-6"
                style={{ color: `${C.gold}70` }}
              >
                Técnica
              </p>
              <div className="rvs grid grid-cols-2 gap-2.5">
                {tecnicas.map((item, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 rounded-xl text-[0.82rem] font-sans"
                    style={{
                      background: 'rgba(245,240,232,0.07)',
                      border: '1px solid rgba(245,240,232,0.1)',
                      color: C.mutedLight,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROGRAMA DÍA 1 ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-10 md:py-20" style={{ background: C.bgLight }}>
        <div
          className="rvn absolute top-8 left-6 font-serif italic font-bold pointer-events-none select-none opacity-[0.045]"
          style={{ fontSize: 'clamp(7rem, 18vw, 13rem)', color: C.accent, lineHeight: 0.85 }}
        >
          D1
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-8">
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: C.accent, borderColor: `${C.accent}35`, background: `${C.accent}09` }}
            >
              Día 01
            </span>
          </div>
          <h2
            className="rv font-serif italic font-bold mb-12 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}
          >
            Teoría, técnica y primer modelo real.
          </h2>
          <div className="rvs grid grid-cols-2 lg:grid-cols-3 gap-2.5">
            {dia1.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(44,26,14,0.08)' }}
              >
                <span
                  className="font-mono text-[9px] font-bold mt-0.5 flex-shrink-0"
                  style={{ color: `${C.accent}70` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-[0.83rem] leading-snug" style={{ color: C.muted }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROGRAMA DÍA 2 ════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-10 md:py-20 border-t"
        style={{ background: C.bgDark, borderColor: `${C.gold}18` }}
      >
        <div
          className="rvn absolute bottom-8 right-6 font-serif italic font-bold pointer-events-none select-none opacity-[0.05]"
          style={{ fontSize: 'clamp(7rem, 18vw, 13rem)', color: C.gold, lineHeight: 0.85 }}
        >
          D2
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
          <div className="rv flex items-center gap-3 mb-8">
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
              style={{ color: C.gold, borderColor: `${C.gold}35`, background: `${C.gold}09` }}
            >
              Día 02
            </span>
          </div>
          <h2
            className="rv font-serif italic font-bold mb-12 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.textLight }}
          >
            Modelo real y certificación.
          </h2>
          <div className="rvs grid sm:grid-cols-2 gap-3">
            {dia2.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-6 py-4 rounded-2xl"
                style={{
                  background: 'rgba(245,240,232,0.06)',
                  border: `1px solid rgba(10,10,10,0.14)`,
                }}
              >
                <span
                  className="flex-shrink-0 font-mono text-sm font-medium mt-0.5"
                  style={{ color: C.gold }}
                >
                  —
                </span>
                <span
                  className="font-sans text-[0.9rem] leading-relaxed"
                  style={{ color: C.mutedLight }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO ════════════════════════════════════════ */}
      <section
        id="formulario"
        className="relative overflow-hidden py-12 md:py-24"
        style={{ background: C.bgLight }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${C.bgWarm}50 0%, transparent 70%)`,
            transform: 'translate(30%, -30%)',
          }}
        />
        <div className="relative z-10 px-6 md:px-16 max-w-2xl mx-auto">
          <div className="rv text-center mb-12">
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-4"
              style={{ color: C.accent }}
            >
              Solicita información
            </span>
            <h2
              className="font-serif italic font-bold leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: C.text }}
            >
              Sin compromiso.
            </h2>
            <p className="font-sans text-sm leading-relaxed" style={{ color: C.muted }}>
              Rellena el formulario y te contactaremos en las próximas 24 h.
            </p>
          </div>

          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="rv space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {formFields.map((f) => (
                  <div
                    key={f.name}
                    className={`flex flex-col gap-1.5 ${f.span === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}`}
                  >
                    <label
                      htmlFor={`cf-${f.name}`}
                      className="font-sans text-xs font-medium"
                      style={{ color: `${C.text}85` }}
                    >
                      {f.label}
                      {f.required && <span className="ml-0.5" style={{ color: C.accent }}>*</span>}
                    </label>
                    {renderField(f)}
                  </div>
                ))}
              </div>
              {status === 'error' && (
                <div
                  className="flex items-center gap-2 text-sm p-3 rounded-lg"
                  style={{ background: '#FEE2E2', color: '#B91C1C' }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Hubo un error al enviar. Por favor, inténtalo de nuevo.
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full font-sans font-semibold text-sm py-4 rounded-full mt-2 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ background: C.bgDark, color: C.textLight, opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Enviando...</>
                ) : (
                  'Solicitar información — sin compromiso'
                )}
              </button>
              <p
                className="text-center font-sans text-[10px] tracking-wide"
                style={{ color: `${C.muted}70` }}
              >
                No se realiza ningún cobro
              </p>
            </form>
          ) : (
            <div
              className="rv flex flex-col items-center justify-center gap-6 text-center"
              style={{ minHeight: '420px' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `${C.gold}15`, border: `1px solid ${C.gold}30` }}
              >
                <span className="font-serif italic font-bold text-2xl" style={{ color: C.gold }}>✓</span>
              </div>
              <div className="space-y-3">
                <p
                  className="font-serif italic font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: C.text }}
                >
                  ¡Gracias por tu interés!
                </p>
                <p
                  className="font-sans text-sm leading-relaxed max-w-xs mx-auto"
                  style={{ color: C.muted }}
                >
                  Hemos recibido tu solicitud.<br />
                  Nos pondremos en contacto contigo en las próximas 24 h.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-12 md:py-24"
        style={{ background: C.bgDark }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(10,10,10,0.7) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 px-6 md:px-16 max-w-3xl mx-auto text-center">
          <span
            className="rv font-mono text-[9px] tracking-[0.3em] uppercase block mb-6"
            style={{ color: `${C.gold}80` }}
          >
            Reserva tu plaza
          </span>
          <h2
            className="rv font-serif italic font-bold mb-10 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: C.textLight }}
          >
            Confirma tu plaza.
          </h2>
          <div className="rv mb-10 max-w-sm mx-auto">
            <div
              className="p-8 rounded-2xl text-left"
              style={{ background: 'rgba(245,240,232,0.06)', border: `1px solid rgba(10,10,10,0.18)` }}
            >
              <p className="font-sans font-semibold text-xs mb-1" style={{ color: C.mutedLight }}>
                Reserva previa
              </p>
              <p className="font-serif italic font-bold text-4xl mb-2" style={{ color: C.textLight }}>
                300 €
              </p>
              <p className="font-sans text-xs leading-relaxed" style={{ color: C.mutedLight }}>
                El resto se abona el día de la formación.<br />Formación exenta de IVA.
              </p>
            </div>
          </div>
          <a
            href="#formulario"
            className="rv inline-flex items-center justify-center gap-3 font-sans font-semibold text-sm px-10 py-4 rounded-full w-full max-w-sm"
            style={{ background: C.gold, color: '#0A0A0A' }}
          >
            <span>Solicitar información</span>
            <span className="font-mono text-xs opacity-60">→</span>
          </a>
          <p className="rv mt-6 font-sans text-sm" style={{ color: C.mutedLight }}>
            La Eliana, Valencia — grupos reducidos
          </p>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
