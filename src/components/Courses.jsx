import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ──────────────────────────────────────────────────────────────────────
const courses = [
  {
    title: "Curso Básico de Micropigmentación",
    desc: "Los cimientos de la élite. Domina la técnica desde 0 con una base sólida teórica y práctica. Comprende el por qué de cada movimiento, cómo responde la piel y desarrolla un criterio profesional desde el primer día.",
    tag: "Fundamentos",
    img: "/micro20_pagina1.webp",
    path: "/formacion/micropigmentacion",
  },
  {
    title: "Glow Lips",
    desc: "Efecto labio mordido y saturación perfecta. Consigue resultados voluminosos, naturales y sin bordes marcados. La técnica de labios más demandada del mercado, con metodología clínica y artística.",
    tag: "Especialización",
    img: "/glowlips_pagina1.webp",
    path: "/formacion/glowlips",
  },
];

// ─── COURSES SECTION ──────────────────────────────────────────────────────────
export default function Courses() {
  const containerRef = useRef(null);
  const courseRefs   = useRef([]);
  const navigate     = useNavigate();

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
                  onClick={() => navigate(course.path)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalles de ${course.title}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(course.path); }}
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
                    onClick={() => navigate(course.path)}
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

    </section>
  );
}
