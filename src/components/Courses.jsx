import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formations } from '../data/formations';

function CourseCard({ formation, className = '' }) {
  return (
    <Link
      to={`/formacion/${formation.slug}`}
      aria-label={`${formation.online ? 'Apuntarme a la lista de espera de' : 'Solicitar información sobre'} ${formation.title}`}
      className={`course-card group relative block aspect-video min-h-0 overflow-hidden border border-[#1F1F1F]/10 bg-[#ECEBE7] shadow-[0_16px_40px_rgba(31,31,31,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A75C] ${className}`}
    >
      <img
        src={formation.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/90 via-[#1F1F1F]/12 to-white/5" />

      {formation.online && (
        <>
          <div className="absolute inset-0 bg-[#1F1F1F]/24 backdrop-saturate-50" />
          <div className="absolute right-3 top-3 flex items-center gap-1.5 border border-white/35 bg-[#1F1F1F]/70 px-2.5 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-white backdrop-blur-md md:right-4 md:top-4">
            <LockKeyhole aria-hidden="true" size={12} />
            Completo
          </div>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 md:p-5">
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[0.48rem] uppercase tracking-[0.2em] text-white/68 md:text-[0.55rem]">
            {formation.eyebrow}
          </p>
          <h2 className="font-serif text-[clamp(1rem,2vw,1.65rem)] font-bold italic leading-none text-white">
            {formation.title}
          </h2>
        </div>
        <span className="grid size-8 shrink-0 place-items-center border border-white/35 bg-white/10 text-white backdrop-blur-md transition-colors group-hover:bg-[#C6A75C] group-hover:text-[#1F1F1F] md:size-10">
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
    <section id="formaciones" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#F7F7F5] px-4 pb-5 pt-24 text-[#1F1F1F] md:px-8 md:pb-7 md:pt-28">
      <div aria-hidden="true" className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(31,31,31,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(31,31,31,0.035)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative mx-auto w-full max-w-[92rem]">
        <header className="mb-4 text-center md:mb-5">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[#1F1F1F]/50">Instituto Patricia Songel</p>
          <h1 className="mt-2 font-sans text-[clamp(1.7rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.055em]">
            Precisión clínica. <span className="font-serif font-normal italic text-[#C6A75C]">Formación experta.</span>
          </h1>
        </header>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4">
          {onsite.map((formation, index) => (
            <CourseCard
              key={formation.slug}
              formation={formation}
              className={index === 2 ? 'col-span-2 w-[calc(50%-0.3125rem)] justify-self-center md:col-span-1 md:w-auto' : ''}
            />
          ))}
        </div>

        <div className="mb-2.5 mt-4 flex items-center gap-3 md:mb-3 md:mt-5">
          <span className="h-px flex-1 bg-[#1F1F1F]/12" />
          <p className="shrink-0 font-mono text-[0.5rem] uppercase tracking-[0.24em] text-[#1F1F1F]/52 md:text-[0.56rem]">
            Formaciones online · Lista de espera
          </p>
          <span className="h-px flex-1 bg-[#1F1F1F]/12" />
        </div>

        <div className="mx-auto grid max-w-[61rem] grid-cols-2 gap-2.5 md:gap-4">
          {online.map((formation) => <CourseCard key={formation.slug} formation={formation} />)}
        </div>
      </div>
    </section>
  );
}
