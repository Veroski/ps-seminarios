import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ──────────────────────────────────────────────────────────────────────
// Each course can have its own popup.formFields while sharing the same modal base.
// popup.details: use Lucide icon components. popup.includes: CTA column bullet list.
const courses = [
  {
    title: "Curso Básico de Micropigmentación",
    desc: "Los cimientos de la élite. Domina la técnica desde 0 con una base sólida teórica y práctica. Comprende el por qué de cada movimiento, cómo responde la piel y desarrolla un criterio profesional desde el primer día.",
    tag: "Fundamentos",
    img: "/micro20_pagina1.webp",
    popup: {
      headline: "Los Cimientos de la Élite",
      body: "Domina la técnica desde cero con una base sólida teórica y práctica. Comprende el por qué de cada movimiento, cómo responde la piel y desarrolla un criterio profesional desde el primer día.",
      // ── Form fields — customise per course ────────────────────────────────
      formFields: [
        { name: "nombre",      label: "Nombre completo",    type: "text",     placeholder: "Tu nombre",             required: true,  span: 2 },
        { name: "email",       label: "Correo electrónico", type: "email",    placeholder: "tu@correo.com",         required: true,  span: 1 },
        { name: "telefono",    label: "Teléfono",           type: "tel",      placeholder: "+34 000 000 000",       required: false, span: 1 },
        { name: "experiencia", label: "Experiencia previa", type: "select",   options: ["Sin experiencia", "Iniciado", "Intermedio / Avanzado"], required: true, span: 2 },
        { name: "inversion",   label: "¿Cuánto estás dispuesto a invertir?", type: "select", options: ["Menos de 2000", "Entre 2000 y 3000", "Más de 3000€"], required: true, span: 2 },
        { name: "mensaje",     label: "¿Alguna pregunta?",  type: "textarea", placeholder: "Cuéntanos qué quieres saber...", span: 2 },
      ],
    },
  },
  {
    title: "Glow Lips",
    desc: "Efecto labio mordido y saturación perfecta. Consigue resultados voluminosos, naturales y sin bordes marcados. La técnica de labios más demandada del mercado, con metodología clínica y artística.",
    tag: "Especialización",
    img: "/glowlips_pagina1.webp",
    popup: {
      headline: "Labios. Técnica Definitiva.",
      body: "Efecto labio mordido y saturación perfecta. Consigue resultados voluminosos, naturales y sin bordes marcados. La técnica de labios más demandada del mercado.",
      formFields: [
        { name: "nombre",   label: "Nombre completo",                           type: "text",    placeholder: "Tu nombre",             required: true,  span: 2 },
        { name: "email",    label: "Correo electrónico",                        type: "email",   placeholder: "tu@correo.com",         required: true,  span: 1 },
        { name: "telefono", label: "Teléfono",                                  type: "tel",     placeholder: "+34 000 000 000",       required: false, span: 1 },
        { name: "activa",   label: "¿Practicas micropigmentación actualmente?", type: "select",  options: ["Sí, activamente", "Sí, esporádicamente", "No, aún no"], required: true, span: 2 },
        { name: "tecnica",  label: "Técnica de labios que practicas",           type: "select",  options: ["Ninguna", "Perfilado básico", "Acuarela / Difuminado", "Otra"], span: 2 },
        { name: "inversion", label: "¿Cuánto estás dispuesto a invertir?",      type: "select",  options: ["Menos de 2000", "Entre 2000 y 3000", "Más de 3000€"], required: true, span: 2 },
        { name: "mensaje",  label: "¿Qué buscas mejorar?",                     type: "textarea", placeholder: "Describe tu objetivo...", span: 2 },
      ],
    },
  },
];

// ─── COURSE MODAL ─────────────────────────────────────────────────────────────
// 3-column layout: [image] | [content + info form] | [details + reservar CTA]
// Everything visible in one viewport — no scroll on desktop.
function CourseModal({ course, index, onClose }) {
  const backdropRef = useRef(null);
  const dialogRef   = useRef(null);
  const [formData,  setFormData]  = useState({});
  const [submitted, setSubmitted] = useState(false);

  const dialogShellStyle = {
    maxHeight: '96dvh',
    background: `
      radial-gradient(circle at 12% 10%, rgba(255,255,255,0.88) 0%, transparent 18%),
      radial-gradient(circle at 86% 12%, rgba(198,167,92,0.18) 0%, transparent 22%),
      radial-gradient(circle at 92% 84%, rgba(185,28,28,0.08) 0%, transparent 16%),
      linear-gradient(155deg, #FFFCF7 0%, #F6EEDF 52%, #FCF8F1 100%)
    `,
    border: '1px solid rgba(194, 165, 106, 0.26)',
    boxShadow: `
      0 42px 120px rgba(7, 7, 9, 0.24),
      inset 0 1px 0 rgba(255,255,255,0.96),
      inset 0 -1px 0 rgba(188,158,93,0.09)
    `,
  };

  const contentColumnStyle = {
    background: `
      linear-gradient(180deg, rgba(255,253,249,0.92) 0%, rgba(246,238,225,0.96) 100%),
      radial-gradient(circle at top right, rgba(17,17,19,0.06) 0%, transparent 26%)
    `,
  };

  const reserveColumnStyle = {
    background: `
      linear-gradient(180deg, rgba(249,244,235,0.95) 0%, rgba(239,230,214,0.96) 100%),
      radial-gradient(circle at top right, rgba(190,33,33,0.08) 0%, transparent 26%)
    `,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.72)',
  };

  // ── Open animation ────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(dialogRef.current,   { opacity: 0, y: 44, scale: 0.94 });

    const tl = gsap.timeline();
    tl.to(backdropRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    tl.to(dialogRef.current,   { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'expo.out' }, 0.05);

    const img = dialogRef.current?.querySelector('.modal-img');
    if (img) tl.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 0.7, ease: 'power3.out' }, 0.05);

    const items = dialogRef.current?.querySelectorAll('.m-item');
    if (items?.length) {
      tl.fromTo(items,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.38, stagger: 0.048, ease: 'power3.out' },
        0.2,
      );
    }
  }, []);

  const doClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(dialogRef.current,   { opacity: 0, y: 24, scale: 0.95, duration: 0.28, ease: 'power2.in' });
    tl.to(backdropRef.current, { opacity: 0, duration: 0.28 }, 0);
  };

  // ── Body lock + Escape ────────────────────────────────────────────────────
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    const onKey = (e) => { if (e.key === 'Escape') doClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Form ──────────────────────────────────────────────────────────────────
  const handleInput  = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const inputCls =
    'w-full bg-white/82 border border-[#111113]/10 text-[#17120C] ' +
    'placeholder-[#6B5A43]/45 font-sans text-[12px] px-3.5 py-2.5 rounded-lg ' +
    'focus:outline-none focus:border-[#C6A75C]/40 focus:bg-white ' +
    'transition-colors duration-200';

  const renderField = (f) => {
    if (f.type === 'select') return (
      <select
        id={`f-${f.name}`} name={f.name} required={f.required}
        className={`${inputCls} appearance-none cursor-pointer`}
        style={{ colorScheme: 'light' }}
        onChange={handleInput} value={formData[f.name] || ''}
      >
        <option value="">Seleccionar…</option>
        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
    if (f.type === 'textarea') return (
      <textarea
        id={`f-${f.name}`} name={f.name} placeholder={f.placeholder}
        required={f.required} rows={2}
        className={`${inputCls} resize-none`}
        onChange={handleInput} value={formData[f.name] || ''}
      />
    );
    return (
      <input
        id={`f-${f.name}`} type={f.type} name={f.name}
        placeholder={f.placeholder} required={f.required}
        className={inputCls}
        onChange={handleInput} value={formData[f.name] || ''}
      />
    );
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-end lg:items-center justify-center p-2 sm:p-4 lg:p-8"
      style={{
        background: 'linear-gradient(180deg, rgba(17,17,19,0.34) 0%, rgba(17,17,19,0.5) 100%)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) doClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={course.popup.headline}
        className="relative w-full max-w-[98vw] sm:max-w-[96vw] lg:max-w-[78rem] flex overflow-hidden
          rounded-t-[2rem] lg:rounded-[2rem]"
        style={dialogShellStyle}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(118deg, transparent 0%, rgba(255,255,255,0.78) 49%, transparent 55%),
              linear-gradient(102deg, transparent 0%, rgba(198,167,92,0.08) 35%, transparent 41%)
            `,
          }}
        />
        {/* Close */}
        <button
          onClick={doClose} aria-label="Cerrar"
          className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center
            rounded-full bg-[#111113] border border-[#111113]/10 text-[#F8F3E9]/70
            hover:text-white hover:bg-[#1B1B1E] transition-all duration-200 cursor-pointer"
        >
          <X size={12} strokeWidth={1.8} />
        </button>

        {/* ══ COL 1 — Image ════════════════════════════════════════════════ */}
        <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 relative overflow-hidden">
          <img
            src={course.img} alt={course.title}
            decoding="async"
            className="modal-img w-full h-full object-cover object-top will-change-transform"
            style={{ minHeight: '100%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113]/58 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111113]/16" />
          <div className="absolute inset-0 border-r border-[#C6A75C]/14" />
          <div className="absolute inset-[14px] rounded-[1.6rem] border border-[#F1D79B]/32 pointer-events-none" />
          <div className="absolute inset-y-6 right-0 w-px bg-gradient-to-b from-transparent via-[#E5C97D]/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 select-none">
            <span className="text-overline-soft text-[#F6E2B1] block mb-1.5">
              {course.tag}
            </span>
            <span className="font-serif italic text-[4.5rem] font-bold text-white/[0.16] leading-none">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* ══ COL 2 — Content + Info form ══════════════════════════════════ */}
        <div className="flex-1 flex flex-col border-x border-[#111113]/[0.06]
          overflow-y-auto"
          style={{
            ...contentColumnStyle,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(198,167,92,0.18) transparent'
          }}
        >
          {/* Mobile image banner */}
          <div className="lg:hidden relative h-44 overflow-hidden shrink-0">
            <img src={course.img} alt={course.title}
              decoding="async"
              className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111113]/50 to-transparent" />
          </div>

          <div className="relative flex flex-col flex-1 p-6 xl:p-8 gap-5">
            {/* Heading */}
            <div className="m-item shrink-0">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-4 h-px bg-gradient-to-r from-[#C6A75C] to-[#111113]/10" />
                <span className="text-overline-soft text-[#8D6A26]">
                  {course.tag}
                </span>
              </div>
              <h2 className="font-serif italic font-bold text-[1.7rem] xl:text-[1.95rem] text-[#17120C] leading-tight pr-8">
                {course.popup.headline}
              </h2>
            </div>

            <p className="m-item shrink-0 font-sans text-[13px] text-[#3D3326]/72 leading-[1.85] tracking-[-0.01em] max-w-[34rem]">
              {course.popup.body}
            </p>

            {/* Divider + form label */}
            <div className="m-item shrink-0 flex items-center gap-3 pt-2">
              <div className="flex-1 h-px bg-[#111113]/[0.08]" />
              <span className="text-overline-soft text-[#8D6A26] whitespace-nowrap">
                Solicita información
              </span>
              <div className="flex-1 h-px bg-[#111113]/[0.08]" />
            </div>

            {/* Form / Success */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="m-item flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-2 gap-2 content-start">
                  {course.popup.formFields.map(f => (
                    <div
                      key={f.name}
                      className={`flex flex-col gap-1 ${f.span === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}`}
                    >
                      <label
                        htmlFor={`f-${f.name}`}
                        className="text-ui-label text-[#5B4A36]/74"
                      >
                        {f.label}{f.required && <span className="text-[#C6A75C] ml-0.5">*</span>}
                      </label>
                      {renderField(f)}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-1.5 mt-1">
                  <button
                    type="submit"
                    className="w-full border border-[#111113]/14 text-[#17120C] bg-[#FFF8EC] font-sans font-medium
                      text-[11.5px] tracking-wide px-6 py-3 rounded-full cursor-pointer
                      hover:bg-[#F7EBD2] hover:border-[#C6A75C]/45 transition-all duration-300"
                  >
                    Solicitar información — sin compromiso
                  </button>
                  <span className="font-sans text-[10px] text-[#6B5A43]/50 tracking-wide">
                    No se realiza ningún cobro
                  </span>
                </div>

                {/* Mobile — Reserva directa separator */}
                <div className="lg:hidden flex flex-col items-center gap-5 mt-4 pt-5 border-t border-[#111113]/[0.06]">
                  <p className="font-sans text-[11px] text-[#6B5A43]/60 tracking-wide text-center">
                    También puedes reservar directamente
                  </p>
                  <button
                    type="button"
                    className="group w-full inline-flex items-center justify-center gap-2
                      bg-[#181311] text-[#F8F1E3] font-sans font-semibold text-[11px] tracking-[0.1em]
                      px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300
                      hover:bg-[#1E1816] hover:border-[#E3C678]/55 hover:shadow-[0_9px_22px_rgba(17,17,19,0.15)]
                      shadow-[0_4px_14px_rgba(17,17,19,0.1)] border border-[#C6A75C]/32"
                  >
                    Reservar ahora
                    <ArrowRight size={12} className="text-[#E3C678] group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                  <span className="font-sans text-[10px] text-[#8E6A26]/80 tracking-[0.06em]">
                    Confirmación inmediata · plazas limitadas
                  </span>
                </div>
              </form>
            ) : (
              <div className="m-item flex flex-col items-center justify-center flex-1 gap-4 text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#C6A75C]/10 border border-[#C6A75C]/30
                  flex items-center justify-center">
                  <Check size={16} className="text-[#C6A75C]" strokeWidth={2.5} />
                </div>
                <div className="space-y-1.5">
                  <p className="font-serif italic text-lg text-[#17120C]">Consulta recibida.</p>
                  <p className="font-sans text-[12px] text-[#4B4030]/68 max-w-[240px] leading-[1.75]">
                    Te contactaremos en las próximas 24 h. No se ha realizado ningún cobro.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ COL 3 — Reserva directa ══════════════════════════════════════ */}
        <div className="hidden lg:flex w-[260px] xl:w-[300px] shrink-0 flex-col p-6 xl:p-7 gap-0">
          <div
            className="m-item relative flex flex-1 flex-col justify-between rounded-[1.85rem] border border-[#C9A84C]/28 p-6 xl:p-7 overflow-hidden"
            style={{
              ...reserveColumnStyle,
              background: `
                radial-gradient(circle at top left, rgba(17,17,19,0.05) 0%, transparent 22%),
                linear-gradient(180deg, rgba(255,252,247,0.98) 0%, rgba(242,233,217,0.98) 100%)
              `,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.3]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 88% 14%, rgba(187,28,28,0.1) 0%, transparent 16%),
                  radial-gradient(circle at 16% 86%, rgba(198,167,92,0.1) 0%, transparent 18%),
                  linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.6) 46%, transparent 52%),
                  linear-gradient(100deg, transparent 0%, rgba(17,17,19,0.04) 38%, transparent 43%)
                `,
              }}
            />
            <div className="absolute inset-[10px] rounded-[1.5rem] border border-[#F0D79D]/34 pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                <p className="text-overline-soft text-[#8E6A26]">
                  Reserva directa
                </p>
              </div>
              <h3 className="font-serif italic text-[1.72rem] leading-[1.06] text-[#17120C] mb-4 max-w-[12rem]">
                Confirma tu plaza sin esperar.
              </h3>
              <p className="font-sans text-[11px] text-[#6B5A43]/55 leading-[1.7] mb-10 max-w-[11rem]">
                También puedes reservar directamente si ya estás decidido/a.
              </p>
              <div className="flex items-center gap-3 mb-10">
                <span className="w-10 h-px bg-gradient-to-r from-[#B91C1C]/55 to-transparent" />
                <span className="text-overline-soft text-[#6E5641]/72">
                  Entrada prioritaria
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                className="group w-full inline-flex items-center justify-center gap-2.5
                  bg-[#181311] text-[#F9F2E6] font-sans font-semibold text-[11px] tracking-[0.11em]
                  px-5 py-[0.68rem] rounded-full cursor-pointer transition-all duration-300
                  hover:bg-[#1F1917] hover:border-[#E5C980]/55 hover:shadow-[0_10px_24px_rgba(17,17,19,0.18)]
                  shadow-[0_5px_15px_rgba(17,17,19,0.12)] border border-[#C6A75C]/34"
              >
                <span>Reservar ahora</span>
                <ArrowRight
                  size={12}
                  className="text-[#E9D39E] group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </button>
              <p className="text-center font-sans text-[10px] text-[#8E6A26]/78 tracking-[0.06em]">
                Confirmación inmediata · plazas limitadas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COURSES SECTION ──────────────────────────────────────────────────────────
export default function Courses() {
  const containerRef = useRef(null);
  const courseRefs   = useRef([]);

  const [activeModal, setActiveModal] = useState(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const courseNodes = courseRefs.current.filter(Boolean);

      // Header Intro
      gsap.from('.courses-header-anim', {
        y: 60, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.courses-intro', start: 'top 80%' },
      });

      // Course Scroll Effects
      courseNodes.forEach((courseEl) => {
        const mediaEl   = courseEl.querySelector('.course-media');
        const imgEl     = courseEl.querySelector('.course-image');
        const contentEl = courseEl.querySelector('.course-content');

        // 3D Image Parallax on Scroll
        if (mediaEl) {
          gsap.set(mediaEl, { y: -140, scale: 1.12, rotationX: 7, rotationZ: -0.8, force3D: true });
          gsap.fromTo(mediaEl,
            { y: -140, scale: 1.12, rotationX: 7, rotationZ: -0.8, force3D: true },
            {
              y: 140,
              scale: 1.02,
              rotationX: -7,
              rotationZ: 0.8,
              ease: 'none',
              scrollTrigger: {
                trigger: courseEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (imgEl) {
          gsap.set(imgEl, { scale: 1.04, force3D: true });
          gsap.to(imgEl, {
            y: 70,
            ease: 'none',
            scrollTrigger: {
              trigger: courseEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        // Content Fade & Slide Up
        gsap.from(contentEl, {
          y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: courseEl, start: 'top 65%' },
        });
      });

    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="formaciones"
      ref={containerRef}
      className="w-full overflow-hidden relative text-[#17120C] scroll-mt-32"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(255,255,255,0.92) 0%, transparent 20%),
          radial-gradient(circle at 90% 14%, rgba(198,167,92,0.12) 0%, transparent 18%),
          radial-gradient(circle at 82% 72%, rgba(185,28,28,0.05) 0%, transparent 14%),
          linear-gradient(180deg, #FFFCF7 0%, #F8F1E4 42%, #FBF8F2 100%)
        `,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(17,17,19,0.26) 0.9px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Intro Header */}
      <div className="courses-intro w-full px-6 md:px-16 py-32 md:py-48 max-w-5xl mx-auto text-center relative z-10">
        <h3 className="courses-header-anim text-overline text-[#8E6A26] mb-6 flex items-center justify-center gap-4">
          <span className="inline-block w-8 h-[1px] bg-[#C9A84C]/50" />
          El Catálogo
          <span className="inline-block w-8 h-[1px] bg-[#C9A84C]/50" />
        </h3>
        <h2 className="courses-header-anim font-serif italic text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-[#17120C] mb-8">
          Formaciones <span className="text-[#C9A84C]">Exclusivas</span>.
        </h2>
        <p className="courses-header-anim max-w-2xl mx-auto text-copy-dark">
          Especializaciones profundas para profesionales que buscan dominar cada técnica a la perfección.
        </p>
      </div>

      {/* Courses — Alternating Layout */}
      <div className="w-full relative z-20 pb-32">
        {courses.map((course, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              ref={el => {
                courseRefs.current[idx] = el;
              }}
              className="w-full min-h-[90vh] md:min-h-[100svh] relative flex items-center py-20 md:py-0 border-t border-[#111113]/[0.08]"
              style={{ perspective: '1200px' }}
            >
              <div className={`w-full max-w-[100rem] mx-auto px-6 md:px-16 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-12 xl:gap-24 relative z-10`}>

                {/* Image Side — clickable */}
                <div
                  className="w-full lg:w-[48%] relative rounded-[3rem] overflow-hidden group shadow-[0_28px_70px_rgba(17,17,19,0.14)] transform-gpu cursor-pointer"
                  style={{ aspectRatio: '3/4' }}
                  onClick={() => setActiveModal(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalles de ${course.title}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveModal(idx); }}
                >
                  <div className="course-media absolute inset-0 will-change-transform">
                    <img
                      src={course.img}
                      alt={course.title}
                      loading="lazy"
                      decoding="async"
                      className="course-image absolute left-0 top-[-22%] w-full h-[146%] object-cover object-top grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113]/32 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 border-[1px] border-[#111113]/10 rounded-[3rem] pointer-events-none transition-colors duration-700 group-hover:border-[#C9A84C]/42" />
                  <div className="absolute inset-[12px] rounded-[2.45rem] border border-[#E8CC86]/28 pointer-events-none transition-colors duration-700 group-hover:border-[#E8CC86]/52" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/85 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-10 right-0 w-px bg-gradient-to-b from-transparent via-[#D8B866]/68 to-transparent pointer-events-none" />

                  {/* Hover hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="flex items-center gap-2.5 bg-[#FFF9EE]/88 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#111113]/10 shadow-[0_10px_26px_rgba(17,17,19,0.1)]">
                      <span className="text-overline-soft text-[#17120C]">Ver detalles</span>
                      <ArrowRight size={11} className="text-[#B91C1C]" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="course-content w-full lg:w-[48%] flex flex-col items-start xl:px-8 relative">

                  {/* Background number */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif italic font-bold text-[#111113]/[0.05] pointer-events-none select-none -z-10">
                    0{idx + 1}
                  </div>

                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <span className="text-overline-soft text-[#8E6A26] bg-white/82 px-4 py-2 rounded-full border border-[#111113]/10 backdrop-blur-md shadow-[0_10px_24px_rgba(17,17,19,0.06)]">
                      {course.tag}
                    </span>
                  </div>

                  <h3 className="font-serif italic font-bold text-4xl md:text-5xl xl:text-6xl text-[#17120C] mb-6 md:mb-8 leading-[1.05] tracking-tight">
                    {course.title}
                  </h3>

                  <p className="font-sans text-[1rem] leading-[1.85] tracking-[-0.015em] text-[#3D3326]/74 max-w-lg mb-12">
                    {course.desc}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => setActiveModal(idx)}
                    className="group relative inline-flex items-center justify-center bg-[#111113] border border-[#111113]/10 text-[#FFF8EC] font-sans font-bold text-sm px-8 md:px-10 py-4 md:py-5 rounded-full overflow-hidden transition-all duration-500 hover:border-[#C9A84C]/40 hover:shadow-[0_14px_34px_rgba(17,17,19,0.14)] cursor-pointer"
                  >
                    <span className="absolute inset-0 w-0 bg-[#C9A84C] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
                    <span className="relative z-10 flex items-center gap-3 group-hover:text-[#111113] transition-colors duration-300">
                      Ver Detalles
                      <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal — mounts only when active, manages its own animation lifecycle */}
      {activeModal !== null && (
        <CourseModal
          course={courses[activeModal]}
          index={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}

    </section>
  );
}
