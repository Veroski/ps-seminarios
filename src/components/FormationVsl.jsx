import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const VIDEO_ID = 'tXrkBmz_psI';

function loadYouTubePlayer() {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  return new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.append(script);
    }
  });
}

export default function FormationVsl() {
  const playerElement = useRef(null);
  const player = useRef(null);
  const fallbackAttempted = useRef(false);
  const [needsTouch, setNeedsTouch] = useState(false);

  useEffect(() => {
    let active = true;

    loadYouTubePlayer().then((YT) => {
      if (!active) return;
      player.current = new YT.Player(playerElement.current, {
        videoId: VIDEO_ID,
        host: 'https://www.youtube-nocookie.com',
        playerVars: { autoplay: 1, mute: 0, playsinline: 1, rel: 0 },
        events: {
          onReady: ({ target }) => target.playVideo(),
          onAutoplayBlocked: ({ target }) => {
            if (fallbackAttempted.current) return setNeedsTouch(true);
            fallbackAttempted.current = true;
            target.mute();
            target.playVideo();
          },
        },
      });
    });

    return () => {
      active = false;
      player.current?.destroy();
    };
  }, []);

  const startWithSound = () => {
    setNeedsTouch(false);
    player.current?.unMute();
    player.current?.playVideo();
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
          <div className="relative aspect-video overflow-hidden rounded-[1.15rem] bg-black md:rounded-[1.35rem]">
            <div ref={playerElement} className="size-full" aria-label="Patricia Songel explica el método de sus formaciones" />
            {needsTouch && (
              <button
                type="button"
                onClick={startWithSound}
                className="absolute inset-0 flex items-center justify-center bg-black/35 text-white"
                aria-label="Reproducir vídeo con sonido"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-white text-[#0A0A0A]"><Play className="ml-1" size={22} /></span>
              </button>
            )}
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-copy-dark">
          Descubre el método con el que Patricia enseña a analizar cada piel, diseñar con intención y trabajar con seguridad desde el primer día.
        </p>
      </div>
    </section>
  );
}
