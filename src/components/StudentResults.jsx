import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StudentResults() {
  const sectionRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animations
      gsap.from('.results-text', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      gsap.from('.case-card', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });

      // Floating badges
      gsap.to('.badge-float-left', {
        y: -10,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      gsap.to('.badge-float-right', {
        y: 10,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Tilt Effect for individual cards
  const addTiltEffect = (cardElement) => {
    const card = cardElement;
    if (!card) return;

    // We store the quickTo functions on the DOM unmounted to clean them up,
    // but quickTo is performant and attached to GSAP's ticker
    const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
    let rect = null;
    let pointerX = 0;
    let pointerY = 0;
    let rafId = 0;

    const updateRect = () => {
      rect = card.getBoundingClientRect();
    };

    const renderTilt = () => {
      if (!rect) updateRect();
      if (!rect || !rect.width || !rect.height) {
        rafId = 0;
        return;
      }

      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const moveX = (pointerX - cardCenterX) / (rect.width / 2);
      const moveY = (pointerY - cardCenterY) / (rect.height / 2);
      xTo(moveX * 15);
      yTo(moveY * -15);
      rafId = 0;
    };

    const handleMouseMove = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(renderTilt);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3.out" });
    };

    const handleMouseEnter = () => updateRect();

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mousemove", handleMouseMove, { passive: true });
    card.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", updateRect, { passive: true });

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", updateRect);
      if (rafId) cancelAnimationFrame(rafId);
    };
  };

  useEffect(() => {
    const cleanupLeft = addTiltEffect(leftCardRef.current);
    const cleanupRight = addTiltEffect(rightCardRef.current);

    return () => {
      if (cleanupLeft) cleanupLeft();
      if (cleanupRight) cleanupRight();
    };
  }, []);

  return (
    <section id="resultados" ref={sectionRef} className="py-24 md:py-40 bg-[#0A0A0C] relative overflow-hidden flex flex-col justify-center items-center rounded-[3rem] border border-white/5 mx-2 md:mx-6 my-12 scroll-mt-32" style={{ clipPath: 'inset(0 round 3rem)' }}>

      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-0 right-0 w-[80vw] md:w-[60vw] aspect-square bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_60%)] rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 text-center relative z-20 mb-16 md:mb-24 pointer-events-none">
        <h3 className="results-text text-overline text-[#C9A84C] mb-6 flex items-center justify-center gap-4">
            <span className="inline-block w-6 md:w-12 h-[1px] bg-[#C9A84C]/50"></span>
            El Impacto Real
            <span className="inline-block w-6 md:w-12 h-[1px] bg-[#C9A84C]/50"></span>
        </h3>
        <h2 className="results-text font-serif italic text-4xl md:text-6xl lg:text-7xl text-white mb-8">
            Casos de <span className="text-[#C9A84C]">Éxito</span>
        </h2>
        <p className="results-text max-w-2xl mx-auto text-copy-light">
            Profesionales que han confiado en mis formaciones y hoy aplican estas técnicas excepcionales en su trabajo diario con absoluta precisión.
        </p>
      </div>

      {/* Grid of Success Cases */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative z-20" style={{ perspective: '1500px' }}>

        {/* Left Case ("Near" Image) */}
        <div
           className="case-card w-full flex justify-center relative group isolate"
           style={{ transformStyle: 'preserve-3d' }}
        >
           {/* Glow effect behind */}
           <div className="absolute inset-y-0 w-[120%] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)] blur-2xl pointer-events-none z-0"></div>

           <div
             ref={leftCardRef}
             className="relative flex items-center justify-center w-full aspect-[4/5] max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm cursor-default md:cursor-crosshair z-10"
             style={{ transformStyle: 'preserve-3d' }}
           >
              {/* Inner depth layer */}
              <div className="absolute inset-4 rounded-[2rem] border border-[#C9A84C]/20 pointer-events-none" style={{ transform: 'translateZ(-30px)' }}></div>

              <img
                src="/casos exito near.png"
                alt="Caso de éxito micropigmentación 1"
                loading="lazy"
                decoding="async"
                className="w-[90%] h-[90%] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] pointer-events-none"
                style={{ transform: 'translateZ(50px)' }}
              />

              <div
                className="badge-float-left absolute bottom-6 left-4 md:left-[-40px] z-30 bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-full flex items-center gap-2.5 md:gap-3 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none"
                style={{ transform: 'translateZ(80px)' }}
              >
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></div>
                  <div className="flex flex-col items-start gap-1">
                      <span className="text-overline-soft text-surface/[0.58] leading-none">Aplicación Diaria</span>
                      <span className="font-sans font-bold text-xs md:text-sm text-white leading-none tracking-wide">Precisión 100%</span>
                  </div>
              </div>
           </div>
        </div>

        {/* Right Case ("Far" Image) */}
        <div
           className="case-card w-full flex justify-center relative group isolate md:pt-24"
           style={{ transformStyle: 'preserve-3d' }}
        >
           {/* Glow effect behind */}
           <div className="absolute inset-y-0 w-[120%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-2xl pointer-events-none z-0"></div>

           <div
             ref={rightCardRef}
             className="relative flex items-center justify-center w-full aspect-[4/5] max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm cursor-default md:cursor-crosshair z-10"
             style={{ transformStyle: 'preserve-3d' }}
           >
              {/* Inner depth layer */}
              <div className="absolute inset-4 rounded-[2rem] border border-white/10 pointer-events-none" style={{ transform: 'translateZ(-30px)' }}></div>

              <img
                src="/casos exito far.png"
                alt="Caso de éxito micropigmentación 2"
                loading="lazy"
                decoding="async"
                className="w-[90%] h-[90%] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] pointer-events-none"
                style={{ transform: 'translateZ(50px)' }}
              />

              <div
                className="badge-float-right absolute top-6 right-4 md:right-[-40px] z-30 bg-[#1A1A1A]/90 backdrop-blur-xl border border-[#C9A84C]/30 px-4 py-3 md:px-6 md:py-4 rounded-full flex items-center gap-2.5 md:gap-3 drop-shadow-[0_10px_30px_rgba(201,168,76,0.15)] pointer-events-none"
                style={{ transform: 'translateZ(80px)' }}
              >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <div className="flex flex-col items-start gap-1">
                      <span className="text-overline-soft text-surface/[0.58] leading-none">Master Result</span>
                      <span className="font-sans font-bold text-xs md:text-sm text-[#C9A84C] leading-none tracking-wide">Nivel Avanzado</span>
                  </div>
              </div>
           </div>
        </div>

      </div>

    </section>
  );
}
