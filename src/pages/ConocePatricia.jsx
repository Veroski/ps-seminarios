import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Gem } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────────────── */
const METRICS = [
  { value: '+20', label: 'Años en el mundo de la belleza' },
  { value: '+8',  label: 'Años especializada en micropigmentación' },
  { value: '+15000', label: 'Tratamientos realizados' },
  { value: '+100', label: 'Opiniones positivas en Google' },
];

const ACHIEVEMENTS = [
  { place: '1er', title: 'WULOP Dubái', year: '2024', desc: 'Liga Mundial Universal de Maquillaje Permanente — categoría Lipstick Effect.' },
  { place: '1er', title: 'New Generation PMV Congress · Madrid', year: '2023', desc: 'Categoría Full Lips.' },
  { place: '3er', title: 'New Generation PMV Congress · Madrid', year: '2023', desc: 'Categoría Hair Strokes.' },
  { place: '★',   title: 'Ponente y juez internacional', year: '', desc: 'Organizadora del congreso The Beauty Experts Dubai.' },
];

const METHOD = [
  { num: '01', title: 'Consulta inicial personalizada', desc: 'Analizamos tu rostro, tu estilo y tus expectativas. Diseño y simulación previa para que veas el resultado antes de empezar. Sin compromiso.' },
  { num: '02', title: 'Procedimiento profesional', desc: 'Una sesión cuidadosa y dedicada con pigmentos de alta calidad, técnicas avanzadas y la máxima higiene y bioseguridad.' },
  { num: '03', title: 'Seguimiento post-tratamiento', desc: 'Te acompaño durante todo el proceso de cicatrización. Retoque incluido y seguimiento completo hasta 12 meses.' },
];

const DIFFERENTIATORS = [
  { Icon: Sparkles, title: 'Naturalidad ante todo', desc: 'Menos es más. Resultados que respetan tus facciones y realzan tu belleza sin que se note el artificio.' },
  { Icon: Gem, title: 'Precisión de competición', desc: 'La misma técnica premiada en campeonatos internacionales, aplicada a cada tratamiento de tu rostro.' },
  { Icon: ShieldCheck, title: 'Seguridad y garantía', desc: 'Materiales certificados, protocolos de higiene estrictos y garantía de resultados con retoque incluido.' },
  { Icon: HeartHandshake, title: 'Trato cercano', desc: 'Atención personalizada de principio a fin. Un ambiente relajado, con aromaterapia y tiempo dedicado solo a ti.' },
];

const BENEFITS = [
  'Despiertas cada mañana con las cejas, los labios o la mirada perfectos.',
  'Ahorras tiempo y dinero en maquillaje diario durante años.',
  'Corriges asimetrías, cicatrices o zonas sin pelo con resultados naturales.',
  'Recuperas la seguridad de verte bien en cualquier momento, sin retoques.',
];

const SITE = 'https://www.patriciasongel.es';

export default function ConocePatricia() {
  const pageRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chero > *', { y: 46, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
      gsap.utils.toArray('.rv').forEach((el) =>
        gsap.from(el, { y: 52, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      );
      gsap.utils.toArray('.rvs').forEach((el) =>
        gsap.from(Array.from(el.children), { y: 26, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      );
    }, pageRef);
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1200);
    window.addEventListener('load', refresh);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Patricia Songel',
      jobTitle: 'Especialista en micropigmentación y diseño facial',
      description: 'Especialista en micropigmentación facial y formadora en Valencia. Campeona internacional de maquillaje permanente, ponente y juez.',
      image: 'https://www.patriciasongel.es/patricia-portrait.webp',
      url: `${SITE}/conoce-a-patricia`,
      sameAs: [
        'https://www.instagram.com/patriciasongel_micro/',
        'https://maps.app.goo.gl/zPEwEZH21ywXT2Ue8',
      ],
      knowsAbout: ['Micropigmentación', 'Micropigmentación de cejas', 'Micropigmentación de labios', 'Micropigmentación de ojos', 'Diseño facial'],
      worksFor: {
        '@type': 'BeautySalon',
        name: 'Patricia Songel Micropigmentación & Belleza',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Molino 7',
          addressLocality: 'La Eliana',
          addressRegion: 'Valencia',
          addressCountry: 'ES',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Conoce a Patricia', item: `${SITE}/conoce-a-patricia` },
      ],
    },
  ];

  return (
    <div ref={pageRef} className="font-sans bg-surface text-primary" style={{ overflowX: 'hidden' }}>
      <Seo
        title="Conoce a Patricia Songel | Especialista en micropigmentación en Valencia"
        description="Descubre quién es Patricia Songel: especialista en micropigmentación facial y diseño de cejas, labios y ojos en La Eliana, Valencia. Campeona internacional, +20 años de experiencia y trato personalizado. Pide tu consulta gratuita."
        canonical={`${SITE}/conoce-a-patricia`}
        type="profile"
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24 px-6 md:px-16">
        {/* Ambient gold glow + marble veins */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 15%, rgba(10,10,10,0.10) 0%, transparent 45%), radial-gradient(ellipse at 85% 60%, rgba(10,10,10,0.08) 0%, transparent 45%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="chero">
            <p className="font-mono text-[0.62rem] tracking-[0.32em] uppercase mb-6" style={{ color: '#625C5C' }}>
              Conoce a Patricia Songel
            </p>
            <h1 className="mb-6">
              <span className="block font-sans font-semibold text-[1.5rem] sm:text-[1.9rem] md:text-[2.2rem] leading-[1.12] tracking-[-0.02em] text-primary">
                Especialista en micropigmentación
              </span>
              <span className="block font-serif italic text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] leading-[1] tracking-[-0.03em] mt-1" style={{ color: '#0A0A0A' }}>
                y diseño facial en Valencia
              </span>
            </h1>
            <p className="font-sans text-[0.95rem] md:text-base leading-[1.9] max-w-md mb-9" style={{ color: '#625C5C' }}>
              Realzo la belleza natural de cada rostro con técnica, sensibilidad estética y una atención
              totalmente personalizada. Resultados naturales, seguros y duraderos.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/pedir-cita"
                className="magnetic-btn bg-primary text-surface px-8 py-4 rounded-full font-sans text-sm font-semibold inline-flex items-center gap-2">
                <span className="magnetic-btn-content flex items-center gap-2">Pide tu consulta gratuita <ArrowRight size={16} /></span>
              </Link>
              <a href="#historia" className="font-sans text-sm font-medium tracking-wide text-primary/60 hover:text-accent transition-colors">
                Leer mi historia
              </a>
            </div>
          </div>

          <div className="chero relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="/patricia-portrait.webp" alt="Patricia Songel, especialista en micropigmentación en Valencia"
                loading="eager" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-surface/90 backdrop-blur-md border border-primary/10 rounded-2xl px-5 py-4 shadow-xl">
              <p className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-accent mb-1">Campeona internacional</p>
              <p className="font-serif italic text-lg text-primary leading-tight">Dubái · España · Madrid</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MÉTRICAS ══════════════════════════════════════════ */}
      <section className="border-y border-primary/10 bg-surface">
        <div className="max-w-6xl mx-auto px-6 md:px-16 py-12 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="font-serif italic text-4xl md:text-5xl text-accent mb-2">{m.value}</span>
              <span className="font-sans text-[0.82rem] md:text-sm text-primary/70 leading-snug tracking-[-0.01em]">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HISTORIA (dark, inverted) ═════════════════════════ */}
      <section id="historia" className="relative overflow-hidden py-24 md:py-32 px-6 md:px-16 bg-primary text-surface scroll-mt-24">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2 relative pb-16 lg:pb-0 rv">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden">
              <img src="/patricia-portrait.webp" alt="Patricia Songel en su centro de micropigmentación"
                loading="lazy" decoding="async" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute bottom-0 right-0 md:-bottom-8 md:-right-8 w-[56%] max-w-[240px] rounded-2xl overflow-hidden border border-accent/20 shadow-2xl">
              <img src="/patricia-premios.png.webp" alt="Premios internacionales de micropigmentación de Patricia Songel"
                loading="lazy" decoding="async" className="w-full h-auto object-cover" />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <p className="rv text-overline text-accent mb-6">Mi historia</p>
            <h2 className="rv font-serif italic font-bold text-4xl md:text-5xl leading-[1.1] mb-8">
              Una búsqueda constante de la perfección.
            </h2>
            <div className="rv font-sans flex flex-col gap-6 text-[15px] md:text-[16px] leading-[1.9] tracking-[-0.015em] text-[#F3EDE2]/74">
              <p>
                Desde que descubrí mi pasión por el embellecimiento facial, he dedicado más de
                <strong className="text-surface font-semibold"> 20 años</strong> a perfeccionar técnicas que realzan
                la belleza natural de cada persona.
              </p>
              <p>
                Tras especializarme en micropigmentación, he entendido la piel y el comportamiento del pigmento
                como una <strong className="text-surface font-semibold">ciencia</strong>. Esa obsesión por la precisión
                me llevó a lo más alto en competiciones internacionales:
                <strong className="text-accent font-semibold"> Campeona de Dubái (2024) y de España (2023 y 2025)</strong>.
              </p>
              <p>
                Hoy comparto ese conocimiento como <strong className="text-surface font-semibold">ponente y juez internacional</strong>,
                sin dejar de atender personalmente a cada clienta que confía en mí.
              </p>
            </div>
            <div className="rv mt-10 pl-6 border-l-2 border-accent/40">
              <p className="font-serif italic text-2xl md:text-3xl text-surface/90 leading-snug">
                “Menos es más. En la sencillez está la elegancia.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOGROS ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-32 px-6 md:px-16 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="rv flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-accent" />
            <span className="text-overline text-accent">Autoridad reconocida</span>
          </div>
          <h2 className="rv font-serif italic font-bold text-4xl md:text-5xl leading-[1.08] mb-14 max-w-2xl text-primary">
            Reconocimientos que avalan cada tratamiento.
          </h2>
          <div className="rvs grid sm:grid-cols-2 gap-5">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className="flex items-start gap-5 p-6 md:p-7 rounded-2xl border border-primary/10 bg-white/40 hover-lift">
                <span className="font-serif italic text-3xl text-accent leading-none shrink-0 w-14">{a.place}</span>
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="font-sans font-semibold text-primary text-[0.98rem] tracking-[-0.01em]">{a.title}</h3>
                    {a.year && <span className="font-mono text-[0.7rem] text-primary/45">{a.year}</span>}
                  </div>
                  <p className="font-sans text-[0.88rem] leading-relaxed text-primary/60 mt-1.5">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MÉTODO ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-32 px-6 md:px-16 bg-[#F3EDE2] border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <div className="rv flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-accent" />
            <span className="text-overline text-accent">Mi método de trabajo</span>
          </div>
          <h2 className="rv font-serif italic font-bold text-4xl md:text-5xl leading-[1.08] mb-14 max-w-2xl text-primary">
            Cada paso, pensado para tu tranquilidad.
          </h2>
          <div className="rvs grid md:grid-cols-3 gap-5">
            {METHOD.map((m) => (
              <div key={m.num} className="p-7 md:p-8 rounded-2xl bg-surface border border-primary/10 flex flex-col hover-lift">
                <span className="font-mono text-sm font-bold text-accent mb-5">{m.num}</span>
                <h3 className="font-serif italic text-2xl text-primary mb-3 leading-tight">{m.title}</h3>
                <p className="font-sans text-[0.9rem] leading-[1.8] text-primary/65">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUÉ LA DIFERENCIA ═════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-32 px-6 md:px-16 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="rv flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-accent" />
            <span className="text-overline text-accent">Lo que me diferencia</span>
          </div>
          <h2 className="rv font-serif italic font-bold text-4xl md:text-5xl leading-[1.08] mb-14 max-w-2xl text-primary">
            No es solo micropigmentación. Es criterio.
          </h2>
          <div className="rvs grid sm:grid-cols-2 gap-5">
            {DIFFERENTIATORS.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-5 p-7 md:p-8 rounded-2xl border border-primary/10 hover-lift">
                <span className="shrink-0 w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon size={18} className="text-accent" />
                </span>
                <div>
                  <h3 className="font-sans font-semibold text-primary text-[1.02rem] mb-2 tracking-[-0.01em]">{title}</h3>
                  <p className="font-sans text-[0.9rem] leading-[1.8] text-primary/65">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BENEFICIOS PARA TI ════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-32 px-6 md:px-16 bg-primary text-surface">
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div className="rv">
            <p className="text-overline text-accent mb-6">Lo que ganas tú</p>
            <h2 className="font-serif italic font-bold text-4xl md:text-5xl leading-[1.1] mb-6">
              Belleza que te acompaña cada día.
            </h2>
            <p className="font-sans text-[15px] md:text-base leading-[1.9] text-[#F3EDE2]/72 max-w-md">
              La micropigmentación bien hecha no cambia quién eres: te devuelve tiempo, seguridad y una
              versión descansada de ti misma desde que abres los ojos.
            </p>
          </div>
          <ul className="rvs flex flex-col gap-4">
            {BENEFITS.map((b, i) => (
              <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="font-mono text-sm text-accent mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-sans text-[0.95rem] leading-relaxed text-surface/85">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-36 px-6 md:px-16 bg-primary text-surface">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="rv text-overline mb-6 text-surface/60">Tu primera consulta es gratuita</p>
          <h2 className="rv font-serif italic font-bold text-4xl md:text-6xl leading-[1.05] mb-8 text-surface">
            Diseñemos juntas tu mejor versión.
          </h2>
          <p className="rv font-sans text-base leading-relaxed text-surface/75 max-w-xl mx-auto mb-10">
            Cuéntame qué te gustaría mejorar. Analizamos tu rostro, resolvemos tus dudas y te propongo el
            tratamiento ideal para ti, sin compromiso.
          </p>
          <Link to="/pedir-cita"
            className="rv inline-flex items-center justify-center gap-3 font-sans font-semibold text-sm px-10 py-4 rounded-full bg-surface text-primary hover:scale-[1.03] transition-transform duration-500">
            Pedir cita ahora <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
