import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle, Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Star, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';

gsap.registerPlugin(ScrollTrigger);

/* ─── CLINIC DATA ───────────────────────────────────────────── */
const CLINIC = {
  address: 'Calle Molino 7, La Eliana, Valencia',
  phoneDisplay: '647 12 24 70',
  phoneTel: '+34647122470',
  email: 'info@patriciasongel.es',
  whatsapp: 'https://wa.link/06b0cv',
  instagram: 'https://www.instagram.com/patriciasongel_micro/',
  maps: 'https://maps.app.goo.gl/zPEwEZH21ywXT2Ue8',
  mapsEmbed: 'https://www.google.com/maps?q=Calle+Molino+7,+La+Eliana,+Valencia&output=embed',
};
const SITE = 'https://patriciasongel.es';

const TREATMENTS = [
  { name: 'Cejas', img: '/cejas_pagina1.webp', desc: 'Rediseña la forma de tus cejas con técnicas precisas y naturales — efecto polvo o pelo a pelo.' },
  { name: 'Labios', img: '/glowlips_pagina1.webp', desc: 'Tono uniforme, más volumen visual y armonía con la técnica Glowlips.' },
  { name: 'Ojos', img: '/micro20_pagina1.webp', desc: 'Delineado perfecto que potencia tu mirada desde que te despiertas.' },
];

const REASONS = [
  'Consulta inicial y diseño personalizado gratuitos.',
  'Pigmentos de alta calidad, seguros y certificados.',
  'Ambiente relajado con aromaterapia y máxima higiene.',
  'Retoque incluido y seguimiento hasta 12 meses.',
];

const FAQ = [
  { q: '¿Cómo pido cita?', a: 'Rellena el formulario con el día y la hora que mejor te vengan y te llamaremos para confirmar la disponibilidad. También puedes escribirnos directamente por WhatsApp o llamarnos.' },
  { q: '¿La primera consulta tiene coste?', a: 'No. La consulta inicial, con diseño y simulación previa del tratamiento, es totalmente gratuita y sin compromiso.' },
  { q: '¿Dónde está el centro?', a: 'En Calle Molino 7, La Eliana (Valencia). Atendemos con cita previa para dedicarte toda la atención que mereces.' },
  { q: '¿Los resultados son naturales?', a: 'Sí. Trabajamos siempre buscando la naturalidad: realzar tus facciones sin que se note el artificio, adaptando cada tratamiento a tu rostro.' },
];

const TREATMENT_OPTIONS = ['Cejas', 'Labios', 'Ojos', 'No lo tengo claro / Consulta'];

export default function PedirCita() {
  const pageRef = useRef(null);
  const [form, setForm] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chero > *', { y: 44, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
      gsap.utils.toArray('.rv').forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      );
      gsap.utils.toArray('.rvs').forEach((el) =>
        gsap.from(Array.from(el.children), { y: 26, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      );
    }, pageRef);
    // Recalculate trigger positions after images/iframe/fonts settle so
    // nothing stays stuck in its hidden state.
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

  const handleInput = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          telefono: form.telefono,
          dia: form.dia,
          hora: form.hora,
          tratamiento: form.tratamiento,
          mensaje: form.mensaje,
        }),
      });
      if (res.ok) setStatus('success');
      else throw new Error('network');
    } catch {
      setStatus('error');
    }
  };

  const inputCls = 'w-full border border-primary/15 bg-white text-sm px-3.5 py-3 rounded-xl transition-colors duration-200 focus:outline-none focus:border-accent font-sans text-primary placeholder:text-primary/35';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      name: 'Patricia Songel Micropigmentación & Belleza',
      image: 'https://patriciasongel.es/patricia-portrait.webp',
      url: `${SITE}/pedir-cita`,
      telephone: CLINIC.phoneTel,
      email: CLINIC.email,
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Molino 7',
        addressLocality: 'La Eliana',
        addressRegion: 'Valencia',
        postalCode: '46183',
        addressCountry: 'ES',
      },
      areaServed: 'Valencia',
      sameAs: [CLINIC.instagram, CLINIC.maps],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '100',
      },
      makesOffer: TREATMENTS.map((t) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `Micropigmentación de ${t.name.toLowerCase()}` },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Pedir cita', item: `${SITE}/pedir-cita` },
      ],
    },
  ];

  return (
    <div ref={pageRef} className="font-sans bg-surface text-primary" style={{ overflowX: 'hidden' }}>
      <Seo
        title="Pedir cita | Micropigmentación en La Eliana, Valencia · Patricia Songel"
        description="Pide tu cita de micropigmentación de cejas, labios u ojos con Patricia Songel en La Eliana, Valencia. Primera consulta gratuita. Llama al 647 12 24 70, escríbenos por WhatsApp o reserva desde el formulario."
        canonical={`${SITE}/pedir-cita`}
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-44 md:pb-20 px-6 md:px-16">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 25% 20%, rgba(201,168,76,0.10) 0%, transparent 45%), radial-gradient(ellipse at 80% 70%, rgba(201,168,76,0.07) 0%, transparent 45%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center chero">
          <p className="font-mono text-[0.62rem] tracking-[0.32em] uppercase mb-6" style={{ color: '#8E6A26' }}>
            Pide cita o consúltanos
          </p>
          <h1 className="mb-6">
            <span className="block font-sans font-semibold text-[1.5rem] sm:text-[1.9rem] md:text-[2.1rem] leading-[1.12] tracking-[-0.02em] text-primary">
              Reserva tu tratamiento
            </span>
            <span className="block font-serif italic text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] leading-[1] tracking-[-0.03em] mt-1" style={{ color: '#C9A84C' }}>
              de micropigmentación
            </span>
          </h1>
          <p className="font-sans text-[0.95rem] md:text-base leading-[1.9] max-w-xl mx-auto mb-9" style={{ color: '#5B4A36' }}>
            Elige el día y la hora que mejor te vengan y te llamaremos para confirmar la disponibilidad.
            Tu primera consulta es <strong className="text-primary font-semibold">gratuita y sin compromiso</strong>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-7 py-4 rounded-full bg-accent text-primary hover:scale-[1.03] transition-transform duration-500">
              <MessageCircle size={16} /> WhatsApp directo
            </a>
            <a href="#formulario"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium px-7 py-4 rounded-full border border-primary/15 text-primary/75 hover:border-accent hover:text-accent transition-colors">
              Rellenar formulario
            </a>
          </div>
        </div>
      </section>

      {/* ══ CONTACTO RÁPIDO ═══════════════════════════════════ */}
      <section className="border-y border-primary/10 bg-surface">
        <div className="max-w-6xl mx-auto px-6 md:px-16 py-10 md:py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { Icon: Phone, label: 'Llámanos', value: CLINIC.phoneDisplay, href: `tel:${CLINIC.phoneTel}` },
            { Icon: MessageCircle, label: 'WhatsApp', value: 'Escríbenos ahora', href: CLINIC.whatsapp, ext: true },
            { Icon: Mail, label: 'Email', value: CLINIC.email, href: `mailto:${CLINIC.email}` },
            { Icon: MapPin, label: 'Dónde estamos', value: 'La Eliana, Valencia', href: CLINIC.maps, ext: true },
          ].map(({ Icon, label, value, href, ext }) => (
            <a key={label} href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-3.5 p-5 rounded-2xl border border-primary/10 hover:border-accent/40 hover:bg-white/50 transition-all duration-300 min-w-0">
              <span className="shrink-0 w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Icon size={17} className="text-accent" />
              </span>
              <span className="flex flex-col min-w-0">
                <span className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-primary/45">{label}</span>
                <span className="font-sans text-[0.9rem] font-medium text-primary tracking-[-0.01em] truncate">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ══ FORMULARIO + INFO ═════════════════════════════════ */}
      <section id="formulario" className="relative overflow-hidden py-20 md:py-28 px-6 md:px-16 bg-surface scroll-mt-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">

          {/* FORM */}
          <div className="rv">
            <p className="text-overline text-accent mb-4">Solicita tu cita</p>
            <h2 className="font-serif italic font-bold text-3xl md:text-4xl leading-tight mb-3 text-primary">
              Nos encantará hablar contigo.
            </h2>
            <p className="font-sans text-sm leading-relaxed text-primary/60 mb-8 max-w-md">
              Déjanos tus datos y tu disponibilidad. Te contactaremos para confirmar tu cita cuanto antes.
            </p>

            {status !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label htmlFor="c-nombre" className="text-ui-label text-primary/80">Nombre<span className="text-accent ml-0.5">*</span></label>
                    <input id="c-nombre" name="nombre" required value={form.nombre || ''} onChange={handleInput} placeholder="Tu nombre" className={inputCls} />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5">
                    <label htmlFor="c-telefono" className="text-ui-label text-primary/80">Teléfono<span className="text-accent ml-0.5">*</span></label>
                    <input id="c-telefono" name="telefono" type="tel" required value={form.telefono || ''} onChange={handleInput} placeholder="+34 600 000 000" className={inputCls} />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5">
                    <label htmlFor="c-tratamiento" className="text-ui-label text-primary/80">Tratamiento</label>
                    <select id="c-tratamiento" name="tratamiento" value={form.tratamiento || ''} onChange={handleInput} className={`${inputCls} cursor-pointer appearance-none`} style={{ colorScheme: 'light' }}>
                      <option value="">Seleccionar…</option>
                      {TREATMENT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5">
                    <label htmlFor="c-dia" className="text-ui-label text-primary/80">Día preferido</label>
                    <input id="c-dia" name="dia" type="date" value={form.dia || ''} onChange={handleInput} className={`${inputCls} cursor-pointer`} style={{ colorScheme: 'light' }} />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5">
                    <label htmlFor="c-hora" className="text-ui-label text-primary/80">Hora preferida</label>
                    <input id="c-hora" name="hora" type="time" value={form.hora || ''} onChange={handleInput} className={`${inputCls} cursor-pointer`} style={{ colorScheme: 'light' }} />
                  </div>
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label htmlFor="c-mensaje" className="text-ui-label text-primary/80">Mensaje</label>
                    <textarea id="c-mensaje" name="mensaje" rows={3} value={form.mensaje || ''} onChange={handleInput} placeholder="Cuéntanos qué te gustaría mejorar…" className={`${inputCls} resize-none`} />
                  </div>
                </div>

                <label className="flex items-start gap-2.5 text-[0.78rem] text-primary/55 leading-relaxed">
                  <input type="checkbox" required className="mt-0.5 accent-[#C9A84C]" />
                  <span>Acepto la <Link to="/privacidad" className="text-accent hover:underline underline-offset-2">Política de Privacidad</Link> y el tratamiento de mis datos para gestionar mi cita.</span>
                </label>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm p-3 rounded-xl" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    No se pudo enviar. Prueba de nuevo o escríbenos por WhatsApp.
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full font-sans font-semibold text-sm py-4 rounded-full mt-1 bg-accent text-primary flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform duration-300"
                  style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? (<><Loader2 className="w-4 h-4 animate-spin" />Enviando…</>) : 'Solicitar cita — sin compromiso'}
                </button>
                <p className="text-center font-sans text-[10px] tracking-wide text-primary/40">
                  Te llamaremos para confirmar disponibilidad.
                </p>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 text-center rounded-2xl border border-accent/20 bg-white/50 p-10" style={{ minHeight: '360px' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-accent/12 border border-accent/30">
                  <span className="font-serif italic font-bold text-2xl text-accent">✓</span>
                </div>
                <div className="space-y-3">
                  <p className="font-serif italic font-bold text-2xl md:text-3xl text-primary">¡Gracias por tu solicitud!</p>
                  <p className="font-sans text-sm leading-relaxed max-w-xs mx-auto text-primary/60">
                    Hemos recibido tus datos. Te llamaremos muy pronto para confirmar tu cita.
                  </p>
                  <a href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 font-sans text-sm font-semibold text-accent hover:underline underline-offset-2">
                    <MessageCircle size={15} /> ¿Prefieres WhatsApp? Escríbenos
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* INFO / MAP */}
          <div className="rv flex flex-col gap-5">
            <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-sm">
              <iframe
                title="Ubicación del centro Patricia Songel en La Eliana, Valencia"
                src={CLINIC.mapsEmbed}
                width="100%" height="240" style={{ border: 0 }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="rounded-2xl border border-primary/10 p-6 bg-white/40">
              <p className="text-overline text-accent mb-4">El centro</p>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-primary/75 leading-relaxed">{CLINIC.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-primary/75 leading-relaxed">Atención con cita previa. Escríbenos y buscamos tu mejor hueco.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-accent shrink-0" />
                  <a href={`tel:${CLINIC.phoneTel}`} className="text-primary/75 hover:text-accent transition-colors">{CLINIC.phoneDisplay}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram size={16} className="text-accent shrink-0" />
                  <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className="text-primary/75 hover:text-accent transition-colors">@patriciasongel_micro</a>
                </li>
              </ul>
            </div>

            <a href={CLINIC.maps} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold py-3.5 rounded-full border border-primary/15 text-primary/75 hover:border-accent hover:text-accent transition-colors">
              Cómo llegar <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ══ RESEÑAS / CONFIANZA ═══════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-16 bg-primary text-surface">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="rv flex items-center justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-accent fill-accent" />)}
          </div>
          <h2 className="rv font-serif italic font-bold text-3xl md:text-5xl leading-[1.1] mb-6">
            Más de 100 opiniones positivas en Google.
          </h2>
          <p className="rv font-sans text-base leading-relaxed text-[#F3ECE1]/72 max-w-xl mx-auto mb-9">
            La confianza de cada clienta es mi mayor recompensa. Detrás de cada reseña hay un rostro que salió
            del centro sintiéndose más seguro y radiante.
          </p>
          <a href={CLINIC.maps} target="_blank" rel="noopener noreferrer"
            className="rv inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-4 rounded-full bg-accent text-primary hover:scale-[1.03] transition-transform duration-500">
            Leer las reseñas en Google <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* ══ TRATAMIENTOS ══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-16 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="rv flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-accent" />
            <span className="text-overline text-accent">Qué puedes reservar</span>
          </div>
          <h2 className="rv font-serif italic font-bold text-4xl md:text-5xl leading-[1.08] mb-14 max-w-2xl text-primary">
            Corrige, perfecciona y realza tu belleza.
          </h2>
          <div className="rvs grid md:grid-cols-3 gap-5">
            {TREATMENTS.map((t) => (
              <div key={t.name} className="group rounded-2xl overflow-hidden border border-primary/10 bg-white/40 hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={t.img} alt={`Micropigmentación de ${t.name.toLowerCase()} — Patricia Songel, Valencia`}
                    loading="lazy" decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif italic text-2xl text-primary mb-2">{t.name}</h3>
                  <p className="font-sans text-[0.9rem] leading-[1.75] text-primary/65">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POR QUÉ ELEGIRNOS ═════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-16 bg-[#F0EBE0] border-y border-primary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="rv font-serif italic font-bold text-3xl md:text-4xl leading-tight mb-12 text-center text-primary">
            Una experiencia diseñada para ti.
          </h2>
          <div className="rvs grid sm:grid-cols-2 gap-4">
            {REASONS.map((r, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-surface border border-primary/10">
                <span className="font-mono text-sm text-accent mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-sans text-[0.95rem] leading-relaxed text-primary/75">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-16 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="rv flex items-center gap-3 mb-10 justify-center">
            <div className="w-8 h-px bg-accent" />
            <span className="text-overline text-accent">Preguntas frecuentes</span>
            <div className="w-8 h-px bg-accent" />
          </div>
          <div className="rvs flex flex-col divide-y divide-primary/10">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-sans font-medium text-primary text-[1.02rem] tracking-[-0.01em]">
                  {f.q}
                  <span className="ml-4 text-accent transition-transform duration-300 group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="font-sans text-[0.92rem] leading-[1.8] text-primary/65 mt-3 pr-8">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6 md:px-16 bg-accent">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="rv text-overline mb-6" style={{ color: 'rgba(13,13,18,0.5)' }}>Tu belleza, en las mejores manos</p>
          <h2 className="rv font-serif italic font-bold text-4xl md:text-6xl leading-[1.05] mb-8 text-primary">
            Reserva tu cita hoy.
          </h2>
          <div className="rv flex flex-wrap items-center justify-center gap-3">
            <a href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-9 py-4 rounded-full bg-primary text-surface hover:scale-[1.03] transition-transform duration-500">
              <MessageCircle size={16} /> Escríbenos por WhatsApp
            </a>
            <a href={`tel:${CLINIC.phoneTel}`}
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-9 py-4 rounded-full border border-primary/25 text-primary hover:bg-primary/5 transition-colors">
              <Phone size={16} /> {CLINIC.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
