import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const shorts = [
  {
    name: 'Africa Mart\u00ednez',
    meta: 'Testimonio de alumna',
    src: '/videos/africa-testimonio.mp4',
    poster: '/videos/africa-testimonio.webp',
  },
  {
    name: 'Natalia Beou',
    meta: 'Testimonio de alumna',
    src: '/videos/natalia-testimonio.mp4',
    poster: '/videos/natalia-testimonio.webp',
  },
];

const wrap = (value) => (value + shorts.length) % shorts.length;

export default function FormationShorts() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const activeShort = shorts[active];

  useEffect(() => {
    const section = sectionRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!section || reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting && entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.35], rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInViewport) return;
    video.muted = !soundOn;
    void video.play().catch(() => setSoundOn(false));
  }, [active, isInViewport, soundOn]);

  const select = (next) => {
    setSoundOn(false);
    setActive(wrap(next));
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-[#F3EDE2] md:px-16 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: `linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.68) 54%, rgba(10,10,10,0.46) 100%), url(${activeShort.poster})`, backgroundPosition: 'center', backgroundSize: 'cover', filter: 'blur(22px) saturate(1.25)', transform: 'scale(1.08)' }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(243,237,226,0.2),transparent_36%),linear-gradient(90deg,rgba(10,10,10,0.74),transparent_34%,transparent_66%,rgba(10,10,10,0.74))]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-overline text-[#F3EDE2]/60">Testimonios de alumnas</p>
          <h2 className="mt-5 font-serif text-4xl italic leading-none text-white md:text-6xl">
            Una formaci&oacute;n que deja huella.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#F3EDE2]/70 md:text-base">
            La experiencia de quienes ya han confiado en Patricia Songel para dar el siguiente paso.
          </p>
        </header>

        <div className="relative mx-auto mt-12 h-[390px] max-w-5xl select-none md:mt-16 md:h-[520px]" style={{ perspective: '1200px' }}>
          {[-1, 0, 1].map((offset) => {
            const index = wrap(active + offset);
            const short = shorts[index];
            const isCenter = offset === 0;

            return (
              <button
                key={`${active}-${offset}`}
                type="button"
                onClick={() => !isCenter && select(active + offset)}
                aria-label={isCenter ? `Reproduciendo testimonio de ${short.name}` : `Ver testimonio de ${short.name}`}
                className={`absolute left-1/2 top-1/2 aspect-[9/16] w-[190px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border bg-black text-left shadow-2xl transition-[transform,filter,opacity,border-color] duration-500 ease-out md:w-[294px] ${isCenter ? 'z-20 cursor-default border-white/20 ring-1 ring-white/10' : 'z-10 cursor-pointer border-white/10'}`}
                style={{
                  transform: `translate(-50%, -50%) translateX(calc(${offset} * clamp(10rem, 25vw, 18rem))) translateZ(${isCenter ? 0 : -180}px) rotateY(${offset * -20}deg) scale(${isCenter ? 1 : 0.78})`,
                  filter: isCenter ? 'none' : 'blur(4px) brightness(0.5)',
                  opacity: isCenter ? 1 : 0.48,
                }}
              >
                {isCenter && isInViewport ? (
                  <video
                    ref={videoRef}
                    key={short.src}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted={!soundOn}
                    playsInline
                    preload="auto"
                    poster={short.poster}
                    onCanPlay={(event) => {
                      if (isInViewport) void event.currentTarget.play().catch(() => setSoundOn(false));
                    }}
                  >
                    <source src={short.src} type="video/mp4" />
                  </video>
                ) : (
                  <img className="h-full w-full object-cover" src={short.poster} alt="" loading="lazy" />
                )}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setSoundOn((value) => !value)}
            className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/25 bg-black/65 p-2.5 text-white/80 backdrop-blur transition hover:border-white/50 hover:text-white"
            aria-label={soundOn ? 'Silenciar vídeo' : 'Activar sonido'}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-overline text-[#F3EDE2]/60">{activeShort.meta}</p>
            <h3 className="mt-2 font-serif text-3xl italic text-white md:text-4xl">{activeShort.name}</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 p-1 backdrop-blur">
            <button type="button" onClick={() => select(active - 1)} className="rounded-full p-3 text-white/55 transition hover:bg-white/10 hover:text-white" aria-label="Testimonio anterior">
              <ChevronLeft size={19} />
            </button>
            <span className="min-w-12 text-center font-sans text-[0.65rem] tracking-[0.2em] text-[#F3EDE2]/70">{active + 1} / {shorts.length}</span>
            <button type="button" onClick={() => select(active + 1)} className="rounded-full p-3 text-white/55 transition hover:bg-white/10 hover:text-white" aria-label="Siguiente testimonio">
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
