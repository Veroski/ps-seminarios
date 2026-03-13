import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const positioningData = [
  "Más de 20 años en el mundo de la belleza",
  "Más de 8 años especializada en micropigmentación",
  "Miles de tratamientos realizados",
  "Campeona de España 2023 y 2025",
  "Campeona de Dubái 2024",
  "Ponente y juez internacional",
  "Organizadora del congreso The Beauty Experts Dubai"
];

export default function Positioning() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
      
      // Infinite horizontal scroll for the marquee
      gsap.to('.marquee-content', {
        xPercent: -50,
        ease: 'none',
        duration: 25,
        repeat: -1,
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="autoridad"
      ref={sectionRef}
      className="py-16 md:py-24 bg-surface text-primary border-b border-primary/10 overflow-hidden flex flex-col items-center scroll-mt-32"
    >
      <div className="w-full max-w-6xl px-6 mb-12 text-center md:text-left">
        <h2 className="text-overline text-accent mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-accent mr-3 animate-pulse"></span>
          Matrix de Autoridad
        </h2>
        <p className="font-serif italic text-2xl md:text-4xl text-primary/80 max-w-2xl leading-snug">
          El estándar más alto de la industria, avalado por décadas de experiencia e hitos internacionales.
        </p>
      </div>

      {/* Marquee Row */}
      <div className="w-full relative flex whitespace-nowrap overflow-hidden py-8 border-y border-primary/10">
        <div className="marquee-content flex gap-12 px-6 items-center">
          {[...positioningData, ...positioningData].map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-6"
            >
              <span className="font-sans text-lg md:text-xl font-medium tracking-tight whitespace-nowrap">
                {item}
              </span>
              <span className="font-serif italic text-2xl text-accent/50 opacity-50">✦</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Grid for desktop */}
      <div className="w-full max-w-6xl px-6 mt-16 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {positioningData.slice(0, 4).map((item, i) => (
          <div 
            key={i} 
            ref={el => itemsRef.current[i] = el}
            className="flex flex-col border-t border-primary/20 pt-4"
          >
            <span className="font-serif italic text-accent text-2xl mb-2">0{i + 1}</span>
            <span className="font-sans font-medium text-lg text-primary/82 leading-tight tracking-[-0.015em]">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
