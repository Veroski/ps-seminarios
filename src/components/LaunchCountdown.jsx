import { useEffect, useState } from 'react';
import { getTimeRemaining, LAUNCH_DATE, LAUNCH_LABEL } from '../config/launch';

/* Cuenta atrás hasta la apertura de plazas de las formaciones online.
   Se renderiza en la home (sección Próximos lanzamientos) y en el
   formulario de cada formación online. */

const UNITS = [
  ['days', 'Días', 'día', 'días'],
  ['hours', 'Horas', 'hora', 'horas'],
  ['minutes', 'Min', 'minuto', 'minutos'],
  ['seconds', 'Seg', 'segundo', 'segundos'],
];

const pad = (value) => String(value).padStart(2, '0');

/* "1 día, 0 horas…" — los lectores de pantalla leen el aria-label, no las cifras. */
const spellOut = (remaining) => UNITS
  .map(([key, , one, many]) => `${remaining[key]} ${remaining[key] === 1 ? one : many}`)
  .join(', ')
  .replace(/, ([^,]+)$/, ' y $1');

export default function LaunchCountdown({ className = '' }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining());

  useEffect(() => {
    if (remaining.finished) return undefined;
    const id = setInterval(() => setRemaining(getTimeRemaining()), 1000);
    return () => clearInterval(id);
  }, [remaining.finished]);

  const deadline = new Date(LAUNCH_DATE).toISOString();

  return (
    <div
      className={`mx-auto flex w-full max-w-md flex-col items-center gap-3 border border-[#0A0A0A]/10 bg-white/55 px-5 py-4 backdrop-blur-sm md:max-w-lg ${className}`}
    >
      <p className="text-center text-[0.5rem] font-semibold uppercase tracking-[0.24em] text-[#0A0A0A]/52 md:text-[0.56rem]">
        {remaining.finished ? 'Plazas abiertas' : `Apertura de plazas · ${LAUNCH_LABEL}`}
      </p>

      {remaining.finished ? (
        <p className="text-center font-serif text-lg font-bold italic leading-tight text-[#0A0A0A]">
          Las plazas ya están abiertas.
        </p>
      ) : (
        <time
          dateTime={deadline}
          aria-label={`Faltan ${spellOut(remaining)} para la apertura de plazas`}
          className="flex items-start justify-center gap-2 md:gap-3.5"
        >
          {UNITS.map(([key, label], index) => (
            <div key={key} className="flex items-start gap-2 md:gap-3.5">
              {index > 0 && (
                <span aria-hidden="true" className="pt-0.5 font-mono text-xl font-light leading-none text-[#0A0A0A]/22 md:text-2xl">
                  :
                </span>
              )}
              <div className="flex min-w-[2.6rem] flex-col items-center gap-1 md:min-w-[3.1rem]">
                <span className="font-mono text-2xl font-semibold leading-none tabular-nums tracking-[-0.02em] text-[#0A0A0A] md:text-[1.75rem]">
                  {pad(remaining[key])}
                </span>
                <span className="text-[0.44rem] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A]/45 md:text-[0.5rem]">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </time>
      )}
    </div>
  );
}
