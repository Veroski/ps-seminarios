import React from 'react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#F1EDED]"
      aria-label="Patricia Songel"
    >
      <img
        src="/ps-banner.webp"
        alt=""
        width="2560"
        height="1440"
        fetchPriority="high"
        decoding="async"
        className="hero-banner absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="hero-veil absolute inset-0" />
      <div aria-hidden="true" className="hero-aura hero-aura-one absolute rounded-full" />
      <div aria-hidden="true" className="hero-aura hero-aura-two absolute rounded-full" />

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 pb-12 pt-24 text-center sm:px-10">
        <div className="hero-lockup max-w-6xl">
          <h1 className="font-brand text-[clamp(2.5rem,8vw,8.25rem)] leading-[0.9] tracking-[0.055em] text-[#0A0A0A]">
            PATRICIA SONGEL
          </h1>
          <div aria-hidden="true" className="mx-auto mt-6 h-px w-16 bg-[#0A0A0A]/45 md:mt-8 md:w-24" />
          <p className="mt-5 font-sans text-[0.6rem] font-light uppercase tracking-[0.29em] text-[#0A0A0A]/80 sm:text-xs md:mt-6 md:text-sm md:tracking-[0.38em]">
            Micropigmentación y belleza
          </p>

          <div className="mt-11 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:mt-14">
            <a
              href="/formaciones"
              className="hero-action hero-action-primary"
            >
              Ver formaciones
            </a>
            <a
              href="/pedir-cita"
              className="hero-action hero-action-secondary"
            >
              Pedir cita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
