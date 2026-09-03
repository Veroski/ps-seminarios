import { describe, expect, it } from 'vitest';
import handler, { validateFormationLead } from '../../api/formacion';

/* global process */

describe('validateFormationLead', () => {
  const valid = {
    formacion: 'cejas-online',
    nombre: 'Ana Pérez',
    email: 'ana@example.com',
    telefono: '+34 600 000 000',
    experiencia: 'Iniciación',
  };

  it('accepts a known formation and marks online waitlists', () => {
    expect(validateFormationLead(valid)?.formation).toMatchObject({ title: 'Brows Shadow Online', online: true });
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

  it.each([
    ['cejas-online', 'Brows Shadow Online'],
    ['labios-online', 'Glow Lips Online'],
  ])('creates an online opportunity for %s', async (formacion, title) => {
    const previousKey = process.env.GHL_PRIVATE_KEY;
    const previousLocation = process.env.GHL_LOCATION_ID;
    const previousFetch = globalThis.fetch;
    const calls = [];
    process.env.GHL_PRIVATE_KEY = 'test-key';
    process.env.GHL_LOCATION_ID = 'test-location';
    globalThis.fetch = async (url, options) => {
      calls.push({ url, options });
      return { ok: true, json: async () => ({ contact: { id: 'contact-123' } }) };
    };
    const response = { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };

    await handler({ method: 'POST', body: { ...valid, formacion } }, response);

    const opportunity = calls.find(({ url }) => url === 'https://services.leadconnectorhq.com/opportunities/');
    expect(response).toMatchObject({ statusCode: 200, body: { ok: true } });
    expect(opportunity).toBeTruthy();
    expect(JSON.parse(opportunity.options.body)).toMatchObject({
      contactId: 'contact-123',
      name: `${title} · Ana Pérez`,
      pipelineId: 'ZsTAuRYdsh0nLXyeeHn8',
      pipelineStageId: 'c8aa5b3f-c97b-4756-9579-a6f065d6a73e',
      status: 'open',
    });

    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.GHL_PRIVATE_KEY;
    else process.env.GHL_PRIVATE_KEY = previousKey;
    if (previousLocation === undefined) delete process.env.GHL_LOCATION_ID;
    else process.env.GHL_LOCATION_ID = previousLocation;
  });
});
