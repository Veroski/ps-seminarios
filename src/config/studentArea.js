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
  return Object.freeze({
    portalUrl: optionalHttpsUrl(env, 'VITE_GHL_PORTAL_URL'),
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