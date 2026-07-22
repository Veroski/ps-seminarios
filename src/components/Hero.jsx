import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] md:h-screen" aria-label="Hero">
      <div className="min-h-[100svh] md:h-screen w-full overflow-hidden flex flex-col md:flex-row">
        <div
          className="relative z-10 w-full md:w-[46%] min-h-[50svh] md:h-full flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 order-2 md:order-1"
          style={{
            background: 'linear-gradient(155deg, #F1EDED 0%, #F7F4F4 100%)',
          }}
        >
          <div className="relative z-10 max-w-lg">
            <p className="font-mono text-[0.58rem] md:text-[0.64rem] tracking-[0.35em] uppercase mb-5 md:mb-7 text-[#625C5C]">
              Patricia Songel
            </p>

            <h1 className="mb-5 md:mb-7 font-serif italic leading-[1] tracking-[-0.03em] text-[#0A0A0A]">
              <span className="block text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem]">
                Formación profesional
              </span>
              <span className="block text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] mt-1">
                en micropigmentación
              </span>
            </h1>

            <p className="font-sans text-[0.82rem] md:text-[0.88rem] leading-[1.85] tracking-[-0.01em] max-w-sm mb-8 md:mb-12 text-[#625C5C]">
              Aprende micropigmentación con Patricia Songel, campeona internacional,
              ponente y juez en competiciones del sector.
            </p>

            <a
              href="#formaciones"
              className="inline-flex px-8 py-3.5 rounded-full bg-[#0A0A0A] text-[#F1EDED] font-sans text-[0.82rem] font-semibold tracking-[0.04em] uppercase hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300"
            >
              Ver formaciones
            </a>

            <div className="mt-10 md:mt-12 pt-3 border-t border-[#0A0A0A]/20">
              <span className="block font-sans font-semibold text-[0.82rem] md:text-[0.9rem] tracking-[-0.01em] text-[#0A0A0A]">
                Campeona de España
              </span>
              <span className="block font-serif italic text-[0.78rem] md:text-[0.84rem] mt-0.5 text-[#625C5C]">
                2023 y 2025
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-[54%] h-[55vh] md:h-full order-1 md:order-2 bg-[#F1EDED]">
          <img
            src="/ps-hero.webp"
            alt="Patricia Songel, micropigmentación y belleza"
            width="2160"
            height="2700"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden md:block w-1/4 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #F1EDED 0%, transparent 100%)' }}
          />
        </div>
      </div>
    </section>
  );
}
