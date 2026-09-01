import { describe, expect, it } from 'vitest';
import { getTimeRemaining, LAUNCH_DATE } from './launch';

describe('getTimeRemaining', () => {
  it('desglosa el tiempo restante en días, horas, minutos y segundos', () => {
    const now = new Date('2026-09-13T14:30:15+02:00');
    expect(getTimeRemaining(LAUNCH_DATE, now)).toMatchObject({
      finished: false,
      days: 2,
      hours: 2,
      minutes: 29,
      seconds: 45,
    });
  });

  it('se queda a cero cuando la fecha ya ha pasado', () => {
    const remaining = getTimeRemaining(LAUNCH_DATE, new Date('2026-09-15T17:00:01+02:00'));
    expect(remaining).toMatchObject({ finished: true, days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
