import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const [particles] = useState(() => Array.from({ length: 25 }, () => ({
    width: Math.random() * 3 + 1 + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
  })));

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const textNodes = textRefs.current.filter(Boolean);
      // Golden dust particles floating
      gsap.to('.gold-dust', {
        y: 'random(-50, 50)',
        x: 'random(-30, 30)',
        opacity: 'random(0.2, 0.6)',
        duration: 'random(4, 10)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 5,
          from: 'random'
        }
      });

      // Staggered reveal for layout elements
      gsap.from('.phi-header', {
        x: -30,
        opacity: 0,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.phi-header',
          start: 'top 85%',
        }
      });

      textNodes.forEach((text, i) => {
        gsap.from(text, {
          y: 30,
          opacity: 0,
          duration: 1.5,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          }
        });
      });

      // Overall background breathing effect
      gsap.to('.breath-bg', {
        opacity: 0.15,
        scale: 1.1,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Floating background character
      gsap.to('.bg-char', {
        y: -20,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-[#0D0D12] text-[#E8E4DD] scroll-mt-32"
    >
      {/* The Breathing Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="breath-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_60%_50%,rgba(201,168,76,0.06)_0%,transparent_70%)] opacity-100" />

        {/* Brand Monogram "PS" */}
        <div className="bg-char absolute right-0 top-1/2 -translate-y-1/2 font-serif italic font-bold select-none pointer-events-none leading-none text-[#C9A84C]/[0.04]"
          style={{ fontSize: 'clamp(12rem, 30vw, 28rem)', lineHeight: 1 }}>
          PS
        </div>
      </div>

      {/* Floating Golden Dust */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((style, i) => (
          <div
            key={i}
            className="gold-dust absolute rounded-full bg-[#C9A84C]/30 blur-[1px]"
            style={{ ...style, height: style.width }}
          />
        ))}
      </div>

      {/* Main Grid — two columns that always fit viewport */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-10 xl:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── LEFT COLUMN ─────────────────────────────── */}
        <div className="phi-header flex flex-col gap-8">
          {/* Eyebrow */}
          <span className="text-overline text-[#C9A84C]/68">Filosofía de Trabajo</span>

          {/* Main title */}
          <h2 className="font-serif italic text-5xl md:text-6xl xl:text-7xl text-[#FAF8F5] leading-[0.88] tracking-tight">
            La Belleza<br />
            de la <span className="text-[#C9A84C]">Responsabilidad.</span>
          </h2>

          {/* Divider */}
          <div className="h-px w-16 bg-gradient-to-r from-[#C9A84C]/50 to-transparent" />

          {/* Values list — fills space below title */}
          <ul className="flex flex-col gap-4">
            {[
              'Comprensión profunda de la piel',
              'Resultados que respetan cada rostro',
              'Técnica que sirve al arte, no al revés',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#C9A84C]/70 flex-shrink-0" />
                <span className="font-sans text-sm md:text-base text-[#E8E4DD]/72 leading-relaxed tracking-[-0.01em]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────── */}
        <div className="flex flex-col gap-8 md:gap-10">
          <p ref={el => { textRefs.current[0] = el; }} className="font-serif italic text-2xl md:text-3xl text-[#E8E4DD]/92 leading-tight">
            La micropigmentación tiene el poder de transformar un rostro, pero el verdadero arte reside en la contención y el respeto.
          </p>

          <p ref={el => { textRefs.current[1] = el; }} className="text-copy-light md:text-[1.05rem]">
            No se trata únicamente de aplicar pigmento; es un ejercicio de comprensión profunda de la biología cutánea y la armonía estética. Cada trazo es una promesa de equilibrio.
          </p>

          <blockquote ref={el => { textRefs.current[2] = el; }} className="border-l border-[#C9A84C]/30 pl-5">
            <p className="font-serif italic text-lg md:text-xl text-[#E8E4DD]/55 leading-snug">
              "Mi objetivo es crear resultados elegantes y naturales, asegurando que la técnica desaparezca para que solo brille la persona."
            </p>
          </blockquote>

          <p ref={el => { textRefs.current[3] = el; }} className="text-overline-soft text-[#C9A84C]/40">
            Elevando el estándar de la micropigmentación profesional.
          </p>
        </div>

      </div>
    </section>
  );
}
