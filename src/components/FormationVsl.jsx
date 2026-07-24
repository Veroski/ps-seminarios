import { useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

export default function FormationVsl() {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const toggleSound = () => {
    const video = videoRef.current;
    const next = !soundOn;
    setSoundOn(next);
    if (video) {
      video.muted = !next;
      // Safari pauses playback when a muted-autoplay video is unmuted via JS;
      // re-trigger play() so the video doesn't get stuck paused.
      void video.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

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
          <div className="relative">
            <video
              ref={videoRef}
              className="aspect-video w-full rounded-[1.15rem] bg-black object-cover md:rounded-[1.35rem]"
              autoPlay
              muted={!soundOn}
              playsInline
              preload="auto"
              poster="/videos/formaciones-vsl.webp"
              aria-label="Patricia Songel explica el método de sus formaciones"
              onClick={togglePlay}
              onPlay={() => setIsPaused(false)}
              onPause={() => setIsPaused(true)}
            >
              <source src="/videos/formaciones-vsl.mp4" type="video/mp4" />
              Tu navegador no admite la reproducción de vídeo.
            </video>

            {isPaused && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center rounded-[1.15rem] bg-black/25 transition md:rounded-[1.35rem]"
                aria-label="Reproducir vídeo"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#0A0A0A]">
                  <Play size={22} className="ml-1" />
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleSound}
              className="absolute right-4 top-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/30 bg-black/70 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur transition hover:border-white/60 hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-5 md:top-5 md:px-4"
              aria-label={soundOn ? 'Silenciar vídeo' : 'Activar sonido'}
              aria-pressed={soundOn}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden sm:inline">{soundOn ? 'Sonido activado' : 'Activar sonido'}</span>
            </button>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-copy-dark">
          Descubre el método con el que Patricia enseña a analizar cada piel, diseñar con intención y trabajar con seguridad desde el primer día.
        </p>
      </div>
    </section>
  );
}
