// ─────────────────────────────────────────────────────────────
// Prerender estático de SEO.
// Tras `vite build`, genera un index.html por ruta con el <head>
// correcto (title, description, canonical, robots, OG, Twitter)
// inyectado en el HTML inicial. El cuerpo sigue siendo el SPA:
// React hidrata igual. Esto hace que Google (y crawlers que no
// ejecutan JS) vean la canonical y los meta correctos de cada
// página desde la primera respuesta HTML.
// ─────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes, SITE } from '../src/seo/routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function buildHtml(route) {
  const url = route.path === '/' ? `${SITE}/` : `${SITE}${route.path}`;
  const title = esc(route.title);
  const desc = esc(route.description);
  const image = esc(route.image || `${SITE}/patricia-portrait.webp`);
  const robots = esc(route.robots || 'index, follow');

  let html = template;

  const replaceMetaName = (name, content) => {
    html = html.replace(
      new RegExp(`(<meta name="${name}" content=")[^"]*(")`),
      `$1${content}$2`,
    );
  };
  const replaceMetaProp = (prop, content) => {
    html = html.replace(
      new RegExp(`(<meta property="${prop}" content=")[^"]*(")`),
      `$1${content}$2`,
    );
  };

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  replaceMetaName('description', desc);
  replaceMetaName('robots', robots);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<link rel="alternate" hreflang="es" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${url}$2`);
  replaceMetaProp('og:url', url);
  replaceMetaProp('og:title', title);
  replaceMetaProp('og:description', desc);
  replaceMetaProp('og:image', image);
  replaceMetaName('twitter:title', title);
  replaceMetaName('twitter:description', desc);
  replaceMetaName('twitter:image', image);

  return html;
}

let count = 0;
for (const route of routes) {
  const html = buildHtml(route);
  const outDir = route.path === '/' ? dist : join(dist, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf8');
  count += 1;
  console.log('  prerendered', route.path);
}
console.log(`✓ SEO prerender complete: ${count} routes`);
