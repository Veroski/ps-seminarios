import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   Configuration
   ═══════════════════════════════════════════════════════════ */
const TOTAL_FRAMES = 97;
const PRELOAD_BATCH = 12;
const PRELOAD_DELAY = 60;
const SCROLL_HEIGHT = '280vh';
const FRAME_END_POINT = 'bottom 64%';

const ACHIEVEMENTS = [
  { label: 'Campeona de España', year: '2023 y 2025' },
  { label: 'Campeona de Dubái', year: '2024' },
  { label: 'Ponente y juez', year: 'internacional' },
  { label: 'Organizadora del congreso', year: 'The Beauty Experts Dubai' },
];

/* ═══════════════════════════════════════════════════════════
   Frame Loader — progressive preloading
   ═══════════════════════════════════════════════════════════ */
const frameSrc = (i) => `/hero-ps/frame_${String(i).padStart(6, '0')}.webp`;

function createFrameLoader(total, onFirstReady) {
  const frames = new Array(total);
  let firstFired = false;

  function loadFrame(index) {
    return new Promise((resolve) => {
      if (frames[index]?.complete && frames[index].naturalWidth) {
        resolve(frames[index]);
        return;
      }
      const img = new Image();
      img.decoding = 'async';
      img.fetchPriority = index === 0 ? 'high' : 'low';
      img.onload = () => {
        frames[index] = img;
        if (!firstFired && index === 0) {
          firstFired = true;
          onFirstReady(img);
        }
        resolve(img);
      };
      img.onerror = () => resolve(null);
      img.src = frameSrc(index + 1);
    });
  }

  async function preloadAll() {
    await loadFrame(0);
    for (let s = 1; s < total; s += PRELOAD_BATCH) {
      const end = Math.min(s + PRELOAD_BATCH, total);
      const batch = [];
      for (let i = s; i < end; i++) batch.push(loadFrame(i));
      await Promise.all(batch);
      if (s + PRELOAD_BATCH < total) await new Promise((r) => setTimeout(r, PRELOAD_DELAY));
    }
  }

  function getFrame(i) {
    const img = frames[i];
    return img?.complete && img.naturalWidth ? img : null;
  }

  return { preloadAll, getFrame };
}

/* ═══════════════════════════════════════════════════════════
   Canvas Renderer — object-fit: cover (fills panel, crops)
   ═══════════════════════════════════════════════════════════ */
function drawCover(ctx, img, cw, ch) {
  const iw = img.naturalWidth, ih = img.naturalHeight;
  if (!iw || !ih) return;
  const ir = iw / ih, cr = cw / ch;
  let sx, sy, sw, sh;
  if (ir > cr) { sh = ih; sw = sh * cr; sx = (iw - sw) / 2; sy = 0; }
  else         { sw = iw; sh = sw / cr; sx = 0; sy = (ih - sh) / 2; }
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

/* ═══════════════════════════════════════════════════════════
   Hero Component
   ═══════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const leftPanelRef = useRef(null);
  const achievementRefs = useRef([]);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);
  const currentFrame = useRef(0);
  const rafPending = useRef(false);
  const loaderRef = useRef(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const resizeRafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

    /* ── Canvas sizing ── */
    function setCanvasSize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvasSizeRef.current.width = w;
      canvasSizeRef.current.height = h;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function renderFrame(idx) {
      if (!loaderRef.current) return;
      const img = loaderRef.current.getFrame(idx ?? currentFrame.current);
      if (img) {
        const { width, height } = canvasSizeRef.current;
        drawCover(ctx, img, width, height);
      }
    }

    setCanvasSize();

    /* ── Loader ── */
    const loader = createFrameLoader(TOTAL_FRAMES, (firstImg) => {
      const { width, height } = canvasSizeRef.current;
      drawCover(ctx, firstImg, width, height);
    });
    loaderRef.current = loader;
    loader.preloadAll();

    /* ── Resize ── */
    function onResize() {
      if (resizeRafRef.current) return;
      resizeRafRef.current = requestAnimationFrame(() => {
        setCanvasSize();
        renderFrame();
        resizeRafRef.current = 0;
      });
    }
    window.addEventListener('resize', onResize, { passive: true });

    /* ── GSAP animations ── */
    const gsapCtx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* — Entrance stagger — */
      if (!prefersReduced) {
        const entranceEls = [taglineRef.current, titleRef.current, descRef.current];
        gsap.fromTo(entranceEls,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.18, duration: 1.2, ease: 'power3.out', delay: 0.4 }
        );
      }

      /* — Frame scrub — */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: FRAME_END_POINT,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1)));

          /* Achievement index from scroll progress */
          if (targetIdx === currentFrame.current) return;
          currentFrame.current = targetIdx;

          if (!rafPending.current) {
            rafPending.current = true;
            requestAnimationFrame(() => {
              renderFrame();
              rafPending.current = false;
            });
          }
        },
      });

      /* — Achievement items: scroll-driven crossfade — */
      achievementRefs.current.forEach((el, i) => {
        if (!el) return;

        const segmentStart = i / ACHIEVEMENTS.length;
        const segmentEnd = (i + 1) / ACHIEVEMENTS.length;
        const fadeInEnd = segmentStart + (segmentEnd - segmentStart) * 0.15;
        const fadeOutStart = segmentEnd - (segmentEnd - segmentStart) * 0.15;

        // Fade in
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${segmentStart * 100}% top`,
              end: `${fadeInEnd * 100}% top`,
              scrub: true,
            },
          }
        );

        // Fade out (except last)
        if (i < ACHIEVEMENTS.length - 1) {
          gsap.to(el, {
            opacity: 0, y: -18,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${fadeOutStart * 100}% top`,
              end: `${segmentEnd * 100}% top`,
              scrub: true,
            },
          });
        }
      });

      /* — Progress bar — */
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      gsapCtx.revert();
      window.removeEventListener('resize', onResize);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ height: SCROLL_HEIGHT }}
      className="relative"
      aria-label="Hero"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-[100svh] md:h-screen w-full overflow-hidden flex flex-col md:flex-row">

        {/* ══════════════════════════════════════════════════════
            LEFT PANEL — Content + Gradient
        ══════════════════════════════════════════════════════ */}
        <div
          ref={leftPanelRef}
          className="relative z-10 w-full md:w-[46%] h-auto min-h-[50svh] md:h-full flex flex-col justify-center
                     px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20
                     order-2 md:order-1 overflow-visible md:overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse at 15% 85%, rgba(201,168,76,0.12) 0%, transparent 45%),
              radial-gradient(ellipse at 85% 20%, rgba(201,168,76,0.1) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 50%, rgba(246,244,236,0.8) 0%, transparent 70%),
              linear-gradient(155deg, #F9F7F2 0%, #F5F1E8 35%, #F0EBE0 100%)
            `,
          }}
        >
          {/* Marble vein overlay (Light edition) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.14]"
            style={{
              backgroundImage: `
                linear-gradient(137deg, transparent 30%, rgba(198,167,92,0.25) 32%, transparent 34%),
                linear-gradient(152deg, transparent 55%, rgba(198,167,92,0.18) 56.5%, transparent 58%),
                linear-gradient(118deg, transparent 68%, rgba(198,167,92,0.2) 69.5%, transparent 71%),
                linear-gradient(165deg, transparent 15%, rgba(198,167,92,0.15) 16.5%, transparent 18%),
                linear-gradient(142deg, transparent 78%, rgba(198,167,92,0.12) 79%, transparent 80%)
              `,
            }}
          />
          {/* Subtle light ambient glow */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-[50%] pointer-events-none hidden md:block"
            style={{
              background: 'linear-gradient(to left, rgba(201,168,76,0.04) 0%, transparent 100%)',
            }}
          />
          {/* Subtle quartz shimmer (Light edition) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.2]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 25%, rgba(255,255,255,1) 0%, transparent 1px),
                radial-gradient(circle at 70% 65%, rgba(255,255,255,1) 0%, transparent 1px),
                radial-gradient(circle at 55% 40%, rgba(255,255,255,0.8) 0%, transparent 1.5px)
              `,
              backgroundSize: '100px 100px'
            }}
          />

          {/* Content container */}
          <div className="relative z-10 max-w-lg">

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="font-mono text-[0.58rem] md:text-[0.64rem] tracking-[0.35em] uppercase mb-5 md:mb-7"
              style={{ color: '#8E6A26' }}
            >
              Patricia Songel
            </p>

            {/* Title */}
            <h1
              ref={titleRef}
              className="mb-5 md:mb-7"
            >
              <span
                className="block font-sans font-semibold text-[1.4rem] sm:text-[1.6rem] md:text-[1.75rem] lg:text-[2rem] leading-[1.15] tracking-[-0.02em]"
                style={{ color: '#17120C' }}
              >
                Formación profesional
              </span>
              <span
                className="block font-serif italic text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1] tracking-[-0.03em] mt-1"
                style={{ color: '#C9A84C' }}
              >
                en micropigmentación
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="font-sans text-[0.82rem] md:text-[0.88rem] leading-[1.85] tracking-[-0.01em] max-w-sm mb-8 md:mb-12"
              style={{ color: '#5B4A36' }}
            >
              Aprende micropigmentación con Patricia Songel, campeona internacional,
              ponente y juez en competiciones del sector.
            </p>

            {/* Desktop CTA to courses */}
            <div className="hidden md:block mb-8 md:mb-12">
              <div
                className="hero-cta-wrapper group relative rounded-full cursor-pointer
                           hover:scale-[1.03] active:scale-[0.98]
                           transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              >
                <div
                  className="hero-cta-border absolute -inset-[2px] rounded-full"
                  aria-hidden="true"
                />
                <a
                  href="#formaciones"
                  className="relative z-10 inline-flex px-8 py-3.5 rounded-full
                             font-sans text-[0.82rem] font-semibold tracking-[0.04em] uppercase
                             cursor-pointer transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C 0%, #D4B65E 50%, #C9A84C 100%)',
                    color: '#0D0D12',
                    boxShadow: '0 4px 24px rgba(201,168,76,0.25), 0 1px 3px rgba(0,0,0,0.3)',
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.28) 55%, transparent 80%)',
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Ver formaciones</span>
                </a>
                <div
                  className="hero-cta-glow absolute -inset-[6px] rounded-full pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* ── Achievements carousel ── */}
            <div className="relative h-[52px] md:h-[58px] mb-14 md:mb-12 overflow-hidden">
              {/* Thin gold accent line */}
              <div
                className="absolute top-0 left-0 w-8 h-px"
                style={{ background: '#C9A84C' }}
              />

              {ACHIEVEMENTS.map((ach, i) => (
                <div
                  key={i}
                  ref={(el) => (achievementRefs.current[i] = el)}
                  className="absolute top-3 left-0 w-full"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <span
                    className="block font-sans font-semibold text-[0.82rem] md:text-[0.9rem] tracking-[-0.01em]"
                    style={{ color: '#17120C' }}
                  >
                    {ach.label}
                  </span>
                  <span
                    className="block font-serif italic text-[0.78rem] md:text-[0.84rem] mt-0.5"
                    style={{ color: '#8E6A26' }}
                  >
                    {ach.year}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Scroll progress bar — bottom of left panel */}
          <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden hidden md:block">
            <div
              ref={progressRef}
              className="h-full origin-left"
              style={{
                transform: 'scaleX(0)',
                background: 'linear-gradient(to right, rgba(201,168,76,0.4), rgba(201,168,76,0.15))',
              }}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            RIGHT PANEL — Frame canvas
        ══════════════════════════════════════════════════════ */}
        <div className="relative w-full md:w-[54%] h-[55vh] md:h-full order-1 md:order-2 bg-[#F9F7F2]">

          {/* Left feather — blends canvas into left panel */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-10 pointer-events-none hidden md:block"
            style={{
              width: '25%',
              background: 'linear-gradient(to right, #F9F7F2 0%, rgba(249,247,242,0.7) 35%, rgba(249,247,242,0.15) 70%, transparent 100%)',
            }}
          />

          {/* Top vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{
              height: '20%',
              background: 'linear-gradient(to bottom, rgba(234,228,212,0.4) 0%, transparent 100%)',
            }}
          />

          {/* Bottom vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
            style={{
              height: '15%',
              background: 'linear-gradient(to top, rgba(234,228,212,0.5) 0%, transparent 100%)',
            }}
          />

          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="w-full h-full block"
            style={{ willChange: 'contents' }}
          />
        </div>

      </div>
    </section>
  );
}
