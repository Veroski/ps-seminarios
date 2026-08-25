import { describe, expect, it } from 'vitest';
import { validateFormationLead } from '../../api/formacion';

describe('validateFormationLead', () => {
  const valid = {
    formacion: 'cejas-online',
    nombre: 'Ana Pérez',
    email: 'ana@example.com',
    telefono: '+34 600 000 000',
    experiencia: 'Iniciación',
  };

  it('accepts a known formation and marks online waitlists', () => {
    expect(validateFormationLead(valid)?.formation).toMatchObject({ title: 'Cejas Online', online: true });
  });

  it('rejects unknown formations and malformed contact data', () => {
    expect(validateFormationLead({ ...valid, formacion: 'inventada' })).toBeNull();
    expect(validateFormationLead({ ...valid, email: 'no-es-un-email' })).toBeNull();
    expect(validateFormationLead({ ...valid, telefono: '123' })).toBeNull();
  });

  it('keeps the required questions from each presencial form', () => {
    const glowlips = { ...valid, formacion: 'glowlips', activa: 'Sí, activamente', inversion: 'Más de 1.500 €' };
    expect(validateFormationLead(glowlips)?.activa).toBe('Sí, activamente');
    expect(validateFormationLead({ ...glowlips, activa: '' })).toBeNull();
  });
});
