import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Closing() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.closing-content', {
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Infinite slow breath background
      gsap.to('.ambient-light', {
        scale: 1.1,
        opacity: 0.6,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCourses = () => {
    const coursesSection = document.getElementById('formaciones');
    if (coursesSection) {
      // Smooth scroll to courses section
      window.scrollTo({
        top: coursesSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="cta" ref={sectionRef} className="bg-[#0A0A0C] text-surface py-32 md:py-48 relative overflow-hidden flex flex-col items-center justify-center text-center border-t border-white/5 rounded-t-[4rem] -mb-8 z-10 scroll-mt-32">

      {/* Ambient breathing light */}
      <div className="ambient-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-2xl aspect-square bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center">

        {/* Diamond Icon */}
        <div className="closing-content w-4 h-4 mb-16 relative">
           <div className="absolute inset-0 bg-[#C9A84C] rotate-45 shadow-[0_0_15px_rgba(201,168,76,0.6)]"></div>
           <div className="absolute left-1/2 -translate-x-1/2 -top-8 bottom-[-2rem] w-[1px] bg-gradient-to-b from-transparent via-[#C9A84C]/50 to-transparent"></div>
        </div>

        {/* Copy */}
        <h2 className="closing-content font-serif italic text-3xl md:text-5xl lg:text-6xl text-white leading-tight md:leading-[1.1] mb-12">
            "Si quieres aprender micropigmentación con una base técnica sólida, comprender realmente cómo funciona la piel y desarrollar criterio profesional en tu trabajo, <span className="text-[#C9A84C]">estaré encantada de acompañarte en ese proceso.</span>"
        </h2>

        {/* Closing Label */}
        <p className="closing-content text-overline text-surface/[0.42] mb-16">
            — Patricia Songel
        </p>

        {/* CTA Button */}
        <div className="closing-content mb-8">
            <button
                onClick={scrollToCourses}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center bg-[#FAF8F5] text-[#0A0A0C] font-sans font-bold text-sm px-8 sm:px-10 py-5 rounded-full overflow-hidden hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-[0_0_30px_rgba(250,248,245,0.1)]"
            >
                {/* Background sliding hover effect */}
                <span className="absolute inset-0 w-full h-full bg-[#C9A84C] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"></span>

                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                    Ver próximas formaciones
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
            </button>
        </div>

        {/* Status Indicator */}
        <div className="closing-content w-full flex items-center justify-center gap-3">
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-overline-soft text-surface/[0.42]">Plazas limitadas disponibles</span>
        </div>

      </div>
    </section>
  );
}
