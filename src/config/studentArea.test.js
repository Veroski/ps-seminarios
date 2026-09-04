import { describe, expect, it } from 'vitest';
import { buildStudentAreaConfig } from './studentArea';

describe('buildStudentAreaConfig', () => {
  it('keeps an internal student page visible even when the GHL portal URL is pending', () => {
    const config = buildStudentAreaConfig({});

    expect(config.internalPath).toBe('/alumnos');
    expect(config.loginUrl).toBe('https://app.patriciasongel.es');
    expect(config.auth.provider).toBe('Firebase Authentication');
    expect(config.auth.requiresPortalUrl).toBe(false);
  });

  it('prefers GHL checkout URLs and preserves legacy Stripe fallback', () => {
    const config = buildStudentAreaConfig({
      VITE_GHL_PORTAL_URL: 'https://alumnos.example.com',
      VITE_GHL_CHECKOUT_MICRO: 'https://pay.example.com/micro',
      VITE_STRIPE_GLOWLIPS: 'https://buy.stripe.com/glow',
    });

    expect(config.portalUrl).toBe('https://alumnos.example.com');
    expect(config.loginUrl).toBe('https://app.patriciasongel.es');
    expect(config.checkout.micropigmentacion).toBe('https://pay.example.com/micro');
    expect(config.checkout.glowlips).toBe('https://buy.stripe.com/glow');
  });

  it('uses clean portal routes only on the student subdomain', () => {
    const config = buildStudentAreaConfig({}, 'app.patriciasongel.es');

    expect(config.isStudentApp).toBe(true);
    expect(config.loginUrl).toBe('/');
    expect(config.coursesPath).toBe('/formaciones');
    expect(config.coursePath('micropigmentacion')).toBe('/formaciones/micropigmentacion');
  });

  it('rejects non-https external URLs', () => {
    expect(() =>
      buildStudentAreaConfig({
        VITE_GHL_PORTAL_URL: 'javascript:alert(1)',
      }),
    ).toThrow('VITE_GHL_PORTAL_URL must be an HTTPS URL');
  });
});
