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
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(241,237,237,0.42),rgba(241,237,237,0.12),rgba(241,237,237,0.42))]"
      />

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 pb-12 pt-24 text-center sm:px-10">
        <div className="max-w-5xl">
          <h1 className="font-serif text-[clamp(2.25rem,7vw,6.2rem)] leading-[0.92] tracking-[0.1em] text-[#0A0A0A]">
            PATRICIA SONGEL
          </h1>
          <p className="mt-5 font-sans text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#0A0A0A]/75 sm:text-xs md:mt-7 md:text-sm">
            Micropigmentación y belleza
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:mt-12">
            <a
              href="/formaciones"
              className="inline-flex min-w-52 items-center justify-center rounded-sm bg-[#0A0A0A] px-8 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#F1EDED] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Ver formaciones
            </a>
            <a
              href="/pedir-cita"
              className="inline-flex min-w-52 items-center justify-center rounded-sm border border-[#0A0A0A]/60 bg-[#F1EDED]/20 px-8 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#0A0A0A] transition-colors duration-300 hover:bg-[#F1EDED]/70"
            >
              Pedir cita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
