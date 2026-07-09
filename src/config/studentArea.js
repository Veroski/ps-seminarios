function optionalHttpsUrl(env, key) {
  const value = env[key]?.trim();
  if (!value) return '';

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${key} must be an HTTPS URL`);
  }

  if (url.protocol !== 'https:') {
    throw new Error(`${key} must be an HTTPS URL`);
  }

  return url.toString().replace(/\/$/, '');
}

export function buildStudentAreaConfig(env) {
  const portalUrl = optionalHttpsUrl(env, 'VITE_GHL_PORTAL_URL');

  return Object.freeze({
    internalPath: '/alumnos',
    portalUrl,
    loginUrl: portalUrl || '/alumnos',
    auth: Object.freeze({
      provider: 'GoHighLevel Client Portal',
      learnerApp: 'GoKollab',
      requiresPortalUrl: true,
      publicSiteRole: 'redirect-only',
    }),
    checkout: Object.freeze({
      micropigmentacion:
        optionalHttpsUrl(env, 'VITE_GHL_CHECKOUT_MICRO') ||
        optionalHttpsUrl(env, 'VITE_STRIPE_MICRO'),
      glowlips:
        optionalHttpsUrl(env, 'VITE_GHL_CHECKOUT_GLOWLIPS') ||
        optionalHttpsUrl(env, 'VITE_STRIPE_GLOWLIPS'),
    }),
  });
}

export const studentAreaConfig = buildStudentAreaConfig(import.meta.env);
