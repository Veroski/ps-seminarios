import { useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════
   Seo — lightweight per-page <head> manager (no dependencies)
   Sets title, meta description, canonical, Open Graph / Twitter
   tags and injects JSON-LD structured data. All tags are tagged
   with data-seo so they can be reconciled on every navigation.
   ═══════════════════════════════════════════════════════════ */

const SITE_NAME = 'Patricia Songel';
const DEFAULT_IMAGE = 'https://patriciasongel.com/wp-content/uploads/Patricia-Songel_micropigmentacion-cejas-e1748856196123.jpg';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"][data-seo]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute('data-seo', '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"][data-seo]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('data-seo', '');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd = [],
}) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    upsertMeta('name', 'description', description);
    upsertLink('canonical', canonical);

    // Open Graph
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:locale', 'es_ES');

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    // JSON-LD structured data
    const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    const scripts = blocks.filter(Boolean).map((data) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', '');
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });

    return () => {
      document.title = previousTitle;
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, canonical, image, type, jsonLd]);

  return null;
}
