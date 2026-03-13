import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 63;
const frameSrc = (i) => `/frames_deduped/frame_${String(i).padStart(5, '0')}.webp`;

function drawCover(ctx, img, w, h) {
  if (!img.naturalWidth || !img.naturalHeight) return;
  const imgAr = img.naturalWidth / img.naturalHeight;
  const canvasAr = w / h;
  let sx, sy, sw, sh;
  if (imgAr > canvasAr) {
    sh = img.naturalHeight;
    sw = sh * canvasAr;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = sw / canvasAr;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
}

export default function Hero() {
  const sectionRef        = useRef(null);
  const canvasRef         = useRef(null);
  const contentRef        = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const images            = useRef([]);
  const currentFrame      = useRef(0);
  const rafPending        = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setCanvasSize() {
      // Use the canvas element's actual rendered dimensions so the draw
      // resolution matches whether it's full-width (mobile) or right-panel (desktop).
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    }
    setCanvasSize();

    function renderFrame(idx) {
      const img = images.current[idx];
      if (img?.complete && img.naturalWidth) {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        drawCover(canvasCtx, img, canvas.width, canvas.height);
      }
    }

    // Frame 0 loads first — no blank start
    const firstImg = new Image();
    firstImg.onload = () => renderFrame(0);
    firstImg.src = frameSrc(0);
    images.current[0] = firstImg;

    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      images.current[i] = img;
    }

    function onResize() {
      setCanvasSize();
      renderFrame(currentFrame.current);
    }
    window.addEventListener('resize', onResize);

    // gsap.context() scopes all Hero animations so cleanup never touches
    // triggers from Curriculum, Courses, or any other section.
    const gsapCtx = gsap.context(() => {
      if (!prefersReduced) {
        // Frame scrub — 180vh range, scrub:1.5 for deliberate cinematic pace
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate: (self) => {
            const idx = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(self.progress * (TOTAL_FRAMES - 1))
            );
            if (idx !== currentFrame.current) {
              currentFrame.current = idx;
              if (!rafPending.current) {
                rafPending.current = true;
                requestAnimationFrame(() => {
                  renderFrame(currentFrame.current);
                  rafPending.current = false;
                });
              }
            }
          },
        });

        // Scroll indicator fade
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '18% top',
            scrub: true,
          },
        });
      }

      // Entrance animation — copy fades up on load
      const els = contentRef.current?.querySelectorAll('[data-reveal]');
      if (els?.length && !prefersReduced) {
        gsap.fromTo(
          els,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.14, duration: 1.1, ease: 'power3.out', delay: 0.3 }
        );
      } else if (els?.length) {
        gsap.set(els, { opacity: 1, y: 0 });
      }

      // Refresh all sections' scroll positions after Hero's height is established
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      gsapCtx.revert();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: '180vh' }}
      className="relative"
      aria-label="Hero"
    >
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: '#0D0D12' }}
      >

        {/* ══════════════════════════════════════════════════
            RIGHT: frame canvas — 100% on mobile, 58% on desktop
        ══════════════════════════════════════════════════ */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">

          {/* Feathered left edge — canvas light bleeds into dark bg */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-10 pointer-events-none"
            style={{
              width: '38%',
              background: 'linear-gradient(to right, #0D0D12 0%, rgba(13,13,18,0.82) 30%, rgba(13,13,18,0.28) 65%, transparent 100%)',
            }}
          />

          {/* Top vignette — navbar readability */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{
              height: '22%',
              background: 'linear-gradient(to bottom, rgba(13,13,18,0.55) 0%, transparent 100%)',
            }}
          />

          {/* Bottom vignette — optional, keeps edge clean */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
            style={{
              height: '18%',
              background: 'linear-gradient(to top, rgba(13,13,18,0.65) 0%, transparent 100%)',
            }}
          />

          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="w-full h-full"
            style={{ display: 'block', willChange: 'contents' }}
          />
        </div>

        {/* ══════════════════════════════════════════════════
            LEFT: dark panel + ambient glow from video edge
        ══════════════════════════════════════════════════ */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[48%] pointer-events-none">

          {/* Ambient glow — radiates from right (where canvas is) inward */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 110% 55%, rgba(201,168,76,0.22) 0%, rgba(180,110,55,0.10) 38%, transparent 62%),
                radial-gradient(ellipse at 95% 30%, rgba(220,180,100,0.10) 0%, transparent 40%),
                radial-gradient(ellipse at 95% 80%, rgba(160,90,50,0.08) 0%, transparent 35%)
              `,
            }}
          />
        </div>

        {/* ══════════════════════════════════════════════════
            CONTENT — left column on desktop, bottom on mobile
        ══════════════════════════════════════════════════ */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-20 flex flex-col justify-end
            px-6 sm:px-10 md:px-14 pb-20 md:pb-28
            md:w-[50%]"
        >
          <div className="max-w-xl">
            <p
              data-reveal
              className="font-sans font-semibold text-[0.64rem] md:text-[0.72rem] tracking-[0.32em] uppercase mb-5"
              style={{ color: 'rgba(244,237,225,0.50)' }}
            >
              Formación profesional en micropigmentación
            </p>

            <h1
              data-reveal
              className="font-serif italic text-surface text-[3rem] sm:text-[4.2rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.9] tracking-tighter mb-7"
            >
              Maestría<br />Magistral.
            </h1>

            <p
              data-reveal
              className="max-w-sm font-sans text-[0.88rem] md:text-[0.92rem] leading-[1.85] tracking-[-0.015em] mb-10"
              style={{ color: 'rgba(244,237,225,0.62)' }}
            >
              Aprende micropigmentación con Patricia Songel, campeona internacional, 
              ponente y juez en competiciones del sector.
            </p>

            <button
              data-reveal
              className="magnetic-btn bg-accent text-primary px-7 py-3.5 rounded-[2rem] font-sans text-sm font-bold cursor-pointer"
              style={{ boxShadow: '0 0 24px rgba(201,168,76,0.22)' }}
            >
              <span className="magnetic-btn-content">
                Reservar plaza en la próxima formación
              </span>
            </button>
          </div>
        </div>

        {/* Mobile-only bottom vignette so text is legible on small screens */}
        <div
          aria-hidden="true"
          className="md:hidden absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: '55%',
            background: 'linear-gradient(to top, rgba(13,13,18,0.90) 0%, rgba(13,13,18,0.40) 55%, transparent 100%)',
          }}
        />

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          aria-hidden="true"
          className="absolute bottom-8 right-8 z-30 flex flex-col items-end gap-3 select-none"
        >
          <span
            className="font-mono text-[0.56rem] tracking-[0.22em] uppercase"
            style={{
              color: 'rgba(244,237,225,0.38)',
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
          <div
            className="w-px"
            style={{
              height: '36px',
              background: 'linear-gradient(to bottom, rgba(244,237,225,0.38), transparent)',
            }}
          />
        </div>

      </div>
    </section>
  );
}
