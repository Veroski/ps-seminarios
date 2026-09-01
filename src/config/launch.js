/* Apertura de plazas de las formaciones online.
   15 de septiembre, 17:00h (hora peninsular · CEST, UTC+2). */
export const LAUNCH_DATE = '2026-09-15T17:00:00+02:00';

export const LAUNCH_LABEL = '15 de septiembre · 17:00h';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Tiempo restante hasta `target`. Nunca devuelve valores negativos. */
export function getTimeRemaining(target = LAUNCH_DATE, now = Date.now()) {
  const diff = Math.max(0, new Date(target).getTime() - new Date(now).getTime());

  return {
    finished: diff === 0,
    total: diff,
    days: Math.floor(diff / DAY),
    hours: Math.floor(diff / HOUR) % 24,
    minutes: Math.floor(diff / MINUTE) % 60,
    seconds: Math.floor(diff / SECOND) % 60,
  };
}
