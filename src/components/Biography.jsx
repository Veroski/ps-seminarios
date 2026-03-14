import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Biography() {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Image reveal
      gsap.from('.bio-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
      
      // Text stagger
      gsap.from('.bio-text-part', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bio-content',
          start: 'top 80%',
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="biography" 
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-16 bg-primary text-surface relative overflow-hidden scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Column: Images */}
        <div className="w-full lg:w-1/2 relative pb-20 md:pb-0">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden bio-image z-10">
            <img 
              src="/patricia-portrait.webp" 
              alt="Patricia Songel" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Floating awards image */}
          <div className="absolute bottom-0 right-0 md:-bottom-10 md:-right-10 w-[58%] md:w-2/3 max-w-[220px] md:max-w-[280px] rounded-2xl overflow-hidden border border-accent/20 bio-image z-20 shadow-2xl">
            <img 
              src="/patricia-premios.png.webp" 
              alt="Premios Internacionales" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Aesthetic background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-accent/5 blur-[100px] rounded-full z-0" />
        </div>
        
        {/* Right Column: Copy */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center bio-content mt-12 lg:mt-0">
          <h2 className="bio-text-part text-overline text-accent mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-accent mr-3 animate-pulse"></span>
            La Creadora
          </h2>
          
          <h3 className="bio-text-part font-serif italic font-bold text-4xl md:text-5xl lg:text-6xl text-surface tracking-tight leading-[1.1] mb-8">
            Patricia Songel
          </h3>
          
          <div className="bio-text-part font-sans flex flex-col gap-6 text-[15px] md:text-[16px] leading-[1.9] tracking-[-0.015em] text-[#F3ECE1]/74">
            <p>
              Con más de <strong className="text-surface font-semibold">20 años de dedicación absoluta</strong> al mundo de la belleza, mi carrera ha sido una búsqueda constante de la perfección técnica. 
            </p>
            <p>
              Desde mi especialización en micropigmentación en 2018, he realizado miles de tratamientos entendiendo la piel y el comportamiento del pigmento como una ciencia. Esta obsesión por la precisión me ha llevado a lo más alto en competiciones internacionales: <strong className="text-surface font-semibold text-accent">Campeona de España (2023, 2025) y Campeona de Dubái (2024).</strong>
            </p>
            <p>
              Hoy, comparto este conocimiento integral como <strong className="text-surface font-semibold">ponente, juez internacional</strong> y directora de mi propia academia, formando a la nueva élite de la micropigmentación.
            </p>
          </div>
          
          <div className="bio-text-part mt-12 pl-6 border-l-2 border-accent/40 relative">
            <p className="font-serif italic text-2xl md:text-3xl text-surface/90 leading-snug">
              “Menos es más. En la sencillez está la elegancia.”
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
