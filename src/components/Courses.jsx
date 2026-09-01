import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formations } from '../data/formations';
import FormationVsl from './FormationVsl';
import LaunchCountdown from './LaunchCountdown';

function CourseCard({ formation, className = '' }) {
  return (
    <Link
      to={`/formacion/${formation.slug}`}
      data-course-card
      aria-label={`${formation.online ? 'Recibir aviso del lanzamiento de' : 'Solicitar información sobre'} ${formation.title}`}
      className={`course-card group relative block aspect-video min-h-0 overflow-hidden rounded-[1.25rem] border border-[#0A0A0A]/10 bg-[#E9DEC9] shadow-[0_16px_38px_rgba(17,17,19,0.11)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B91C1C] md:rounded-[1.75rem] ${className}`}
    >
      <img
        src={formation.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/82 via-[#0A0A0A]/5 to-transparent" />

      {formation.online && (
        <>
          <div className="absolute inset-0 bg-[#0A0A0A]/28 backdrop-saturate-50" />
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/35 bg-[#0A0A0A]/72 px-2.5 py-1.5 text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md md:right-4 md:top-4 md:text-[0.56rem]">
            <LockKeyhole aria-hidden="true" size={12} />
            Cerrado
          </div>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 md:p-5">
        <div className="min-w-0">
          <p className="mb-1 text-[0.48rem] font-semibold uppercase tracking-[0.2em] text-white/72 md:text-[0.55rem]">
            {formation.eyebrow}
          </p>
          <h2 className="font-serif text-[clamp(1rem,2vw,1.65rem)] font-bold italic leading-none text-white">
            {formation.title}
          </h2>
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/35 bg-white/12 text-white backdrop-blur-md transition-colors group-hover:bg-[#F3EDE2] group-hover:text-[#0A0A0A] md:size-10">
          <ArrowUpRight aria-hidden="true" size={17} />
        </span>
      </div>
    </Link>
  );
}

export default function Courses() {
  const onsite = formations.filter(({ online }) => !online);
  const online = formations.filter(({ online: isOnline }) => isOnline);

  return (
    <section
      id="formaciones"
      className="relative w-full overflow-hidden text-[#0A0A0A] scroll-mt-32"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(255,255,255,0.92) 0%, transparent 20%),
          radial-gradient(circle at 90% 14%, rgba(198,167,92,0.12) 0%, transparent 18%),
          radial-gradient(circle at 82% 72%, rgba(185,28,28,0.05) 0%, transparent 14%),
          linear-gradient(180deg, #F3EDE2 0%, #F3EDE2 42%, #F3EDE2 100%)
        `,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(17,17,19,0.26) 0.9px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] items-center px-4 pb-5 pt-24 md:px-8 md:pb-5 md:pt-24">
        <div className="mx-auto w-full max-w-[92rem]">
          <header className="mb-4 text-center md:mb-5">
            <h1 className="font-serif text-4xl font-bold italic leading-none tracking-tight md:text-5xl">
              Formaciones Exclusivas.
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#2E261A]/70 md:text-base">
              Especializaciones profundas para profesionales que buscan dominar cada técnica a la perfección.
            </p>
          </header>

          <FormationVsl />

          <p className="mb-2 text-center text-[0.52rem] font-semibold uppercase tracking-[0.24em] text-[#0A0A0A]/48 md:mb-3 md:text-[0.58rem]">
            Formaciones presenciales
          </p>
          <div className="courses-onsite-grid mx-auto grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-4">
            {onsite.map((formation) => (
              <CourseCard
                key={formation.slug}
                formation={formation}
              />
            ))}
          </div>

          <div className="mb-2.5 mt-14 flex items-center gap-3 md:mb-3 md:mt-20">
            <span className="h-px flex-1 bg-[#0A0A0A]/14" />
            <p className="shrink-0 text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-[#0A0A0A]/52 md:text-[0.56rem]">
              Próximos lanzamientos · Formaciones online
            </p>
            <span className="h-px flex-1 bg-[#0A0A0A]/14" />
          </div>

          <LaunchCountdown className="mb-4 md:mb-5" />

          <div className="courses-online-grid mx-auto grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-4">
            {online.map((formation) => <CourseCard key={formation.slug} formation={formation} />)}
          </div>
        </div>
      </div>

    </section>
  );
}
