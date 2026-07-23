const shorts = [
  {
    name: 'Africa Mart\u00ednez',
    src: '/videos/africa-testimonio.mp4',
    poster: '/videos/africa-testimonio.webp',
  },
  {
    name: 'Natalia Beou',
    src: '/videos/natalia-testimonio.mp4',
    poster: '/videos/natalia-testimonio.webp',
  },
];

export default function FormationShorts() {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const [isInViewport, setIsInViewport] = useState(false);

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
    if (!isInViewport) return;

    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
      void video.play().catch(() => undefined);
    });
  }, [isInViewport]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-[#F3EDE2] md:px-16 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.18), transparent 34%), radial-gradient(circle, rgba(243,237,226,0.28) 0.7px, transparent 0.8px)', backgroundSize: 'auto, 28px 28px' }}
      />
      <div className="relative mx-auto max-w-4xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-overline text-[#F3EDE2]/60">Testimonios de alumnas</p>
          <h2 className="mt-5 font-serif text-4xl italic leading-none text-white md:text-6xl">
            Una formaci&oacute;n que deja huella.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#F3EDE2]/70 md:text-base">
            La experiencia de quienes ya han confiado en Patricia Songel para dar el siguiente paso.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-7 sm:grid-cols-2 md:mt-16">
          {shorts.map((short, index) => (
            <article key={short.name} className="group relative rounded-[1.35rem] border border-[#F3EDE2]/20 bg-[#F3EDE2]/5 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.28)] transition-transform duration-500 hover:-translate-y-1 hover:border-[#F3EDE2]/45">
              {isInViewport ? (
                <video
                  ref={(video) => { videoRefs.current[index] = video; }}
                  className="aspect-[9/16] w-full rounded-[1rem] border border-[#F3EDE2]/10 bg-[#0A0A0A] object-cover"
                  autoPlay
                  controls
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={short.poster}
                  aria-label={`Testimonio de ${short.name}`}
                  onCanPlay={(event) => {
                    if (isInViewport) void event.currentTarget.play().catch(() => undefined);
                  }}
                >
                  <source src={short.src} type="video/mp4" />
                  Tu navegador no permite reproducir este v&iacute;deo.
                </video>
              ) : (
                <img
                  className="aspect-[9/16] w-full rounded-[1rem] border border-[#F3EDE2]/10 bg-[#0A0A0A] object-cover"
                  src={short.poster}
                  alt={`Testimonio de ${short.name}`}
                  loading="lazy"
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from 'react';
