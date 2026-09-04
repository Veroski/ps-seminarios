export const STUDENT_APP_HOST = 'app.patriciasongel.es';
export const STUDENT_APP_ORIGIN = `https://${STUDENT_APP_HOST}`;

function browserHostname() {
  return typeof window === 'undefined' ? '' : window.location.hostname;
}

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

export function buildStudentAreaConfig(env, hostname = browserHostname()) {
  const portalUrl = optionalHttpsUrl(env, 'VITE_GHL_PORTAL_URL');
  const checkoutEndpoint = optionalHttpsUrl(env, 'VITE_N8N_CHECKOUT_URL');
  const isStudentApp = hostname === STUDENT_APP_HOST;
  const coursesPath = isStudentApp ? '/formaciones' : '/alumnos/formaciones';

  return Object.freeze({
    appOrigin: STUDENT_APP_ORIGIN,
    isStudentApp,
    internalPath: isStudentApp ? '/' : '/alumnos',
    portalUrl,
    loginUrl: isStudentApp ? '/' : STUDENT_APP_ORIGIN,
    coursesPath,
    coursePath: (slug) => `${coursesPath}/${slug}`,
    thankYouPath: isStudentApp ? '/gracias' : '/alumnos/gracias',
    checkoutEndpoint,
    auth: Object.freeze({
      provider: 'Firebase Authentication',
      learnerApp: 'Área privada React',
      requiresPortalUrl: false,
      publicSiteRole: 'entry-point',
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
