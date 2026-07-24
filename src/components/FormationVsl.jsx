import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function FormationVsl() {
  const [soundOn, setSoundOn] = useState(false);

  return (
    <section id="conoce-el-metodo" className="relative overflow-hidden bg-[#F3EDE2] px-6 pb-14 text-[#0A0A0A] scroll-mt-32 md:px-16 md:pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(10,10,10,0.35) 0.8px, transparent 0.9px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="relative rounded-[1.75rem] border border-[#F3EDE2]/70 bg-[#0A0A0A] p-3 shadow-[0_24px_60px_rgba(10,10,10,0.2)] md:rounded-[2rem] md:p-4">
          <div className="flex items-center justify-between px-2 pb-3 pt-1 md:px-3 md:pb-4">
            <p className="text-overline text-[#F3EDE2]/70">Conoce el método</p>
            <span className="h-px w-10 bg-[#F3EDE2]/25" />
          </div>
          <video
            className="aspect-video w-full rounded-[1.15rem] bg-black object-cover md:rounded-[1.35rem]"
            autoPlay
            controls
            muted={!soundOn}
            playsInline
            preload="auto"
            poster="/videos/formaciones-vsl.webp"
            aria-label="Patricia Songel explica el método de sus formaciones"
          >
            <source src="/videos/formaciones-vsl.mp4" type="video/mp4" />
            Tu navegador no admite la reproducción de vídeo.
          </video>
          <button
            type="button"
            onClick={() => setSoundOn((value) => !value)}
            className="absolute right-6 top-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-black/70 px-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur transition hover:border-white/60 hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-7 md:top-6"
            aria-label={soundOn ? 'Silenciar vídeo' : 'Activar sonido'}
            aria-pressed={soundOn}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {soundOn ? 'Sonido activado' : 'Activar sonido'}
          </button>
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-copy-dark">
          Descubre el método con el que Patricia enseña a analizar cada piel, diseñar con intención y trabajar con seguridad desde el primer día.
        </p>
      </div>
    </section>
  );
}
