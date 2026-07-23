import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const shorts = [
  {
    name: 'África Martínez',
    meta: 'Testimonio de alumna',
    src: '/videos/africa-testimonio.mp4',
    poster: '/videos/africa-testimonio.webp',
  },
  {
    name: 'Natalia Bou',
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

  const video = isInViewport ? (
    <video
      ref={videoRef}
      key={activeShort.src}
      className="h-full w-full object-cover"
      autoPlay
      loop
      muted={!soundOn}
      playsInline
      preload="auto"
      poster={activeShort.poster}
      onCanPlay={(event) => {
        if (isInViewport) void event.currentTarget.play().catch(() => setSoundOn(false));
      }}
    >
      <source src={activeShort.src} type="video/mp4" />
    </video>
  ) : (
    <img className="h-full w-full object-cover" src={activeShort.poster} alt="" loading="lazy" />
  );

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
          <h2 className="mt-5 font-serif text-4xl italic leading-none text-white md:text-5xl">
            Una formación que deja huella.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#F3EDE2]/70 md:text-base">
            La experiencia de quienes ya han confiado en Patricia Songel para dar el siguiente paso.
          </p>
        </header>

        <div className="relative mx-auto mt-10 h-[350px] max-w-4xl select-none md:mt-12 md:h-[485px]">
          {[-1, 0, 1].map((offset) => {
            const index = wrap(active + offset);
            const short = shorts[index];
            const isCenter = offset === 0;
            const cardClass = `testimonial-rail-card aspect-[9/16] w-[172px] overflow-hidden rounded-2xl border bg-black text-left shadow-2xl transition-[transform,filter,opacity,border-color] duration-500 ease-out md:w-[270px] ${isCenter ? 'z-20 border-white/20 ring-1 ring-white/10' : 'z-10 cursor-pointer border-white/10'}`;
            const cardStyle = {
              filter: isCenter ? 'none' : 'blur(4px) brightness(0.5)',
              opacity: isCenter ? 1 : 0.48,
            };

            if (isCenter) {
              return (
                <div key={`${active}-${offset}`} className={cardClass} data-position="center" style={cardStyle}>
                  {video}
                  <button
                    type="button"
                    onClick={() => setSoundOn((value) => !value)}
                    className="absolute bottom-3 right-3 rounded-full border border-white/25 bg-black/65 p-2.5 text-white/80 backdrop-blur transition hover:border-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label={soundOn ? 'Silenciar vídeo' : 'Activar sonido'}
                  >
                    {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                </div>
              );
            }

            return (
              <button
                key={`${active}-${offset}`}
                type="button"
                onClick={() => select(active + offset)}
                aria-label={`Ver testimonio de ${short.name}`}
                className={cardClass}
                data-position={offset < 0 ? 'left' : 'right'}
                style={cardStyle}
              >
                <img className="h-full w-full object-cover" src={short.poster} alt="" loading="lazy" />
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-6 text-center md:mt-10 md:flex-row md:text-left">
          <div>
            <p className="text-overline text-[#F3EDE2]/60">{activeShort.meta}</p>
            <h3 className="mt-2 font-serif text-3xl italic text-white md:text-4xl">{activeShort.name}</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 p-1 backdrop-blur">
            <button type="button" onClick={() => select(active - 1)} className="rounded-full p-3 text-white/55 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Testimonio anterior">
              <ChevronLeft size={19} />
            </button>
            <span className="min-w-12 text-center font-sans text-[0.65rem] tracking-[0.2em] text-[#F3EDE2]/70">{active + 1} / {shorts.length}</span>
            <button type="button" onClick={() => select(active + 1)} className="rounded-full p-3 text-white/55 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="Siguiente testimonio">
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
