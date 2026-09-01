// ─────────────────────────────────────────────────────────────
// Fuente única de verdad del SEO por ruta.
// La usa el prerender estático (scripts/prerender-seo.mjs) para
// inyectar el <head> correcto en el HTML de cada ruta tras el build.
// Mantener en sync con los props <Seo> de cada página.
// ─────────────────────────────────────────────────────────────
export const SITE = 'https://www.patriciasongel.es';
const img = (p) => `${SITE}${p}`;

export const routes = [
  {
    path: '/',
    title: 'Patricia Songel | Micropigmentación y formación en Valencia',
    description: 'Patricia Songel, campeona de España en micropigmentación 2023 y 2025. Especialista en cejas, labios y ojos en La Eliana, Valencia. Formaciones presenciales en toda España. Pide tu consulta gratuita.',
    image: img('/ps-banner.webp'),
    robots: 'index, follow',
  },
  {
    path: '/conoce-a-patricia',
    title: 'Conoce a Patricia Songel | Especialista en micropigmentación en Valencia',
    description: 'Descubre quién es Patricia Songel: especialista en micropigmentación facial y diseño de cejas, labios y ojos en La Eliana, Valencia. Campeona internacional, +20 años de experiencia y trato personalizado. Pide tu consulta gratuita.',
    image: img('/patricia-portrait.webp'),
    robots: 'index, follow',
  },
  {
    path: '/pedir-cita',
    title: 'Pedir cita | Micropigmentación en La Eliana, Valencia · Patricia Songel',
    description: 'Pide tu cita de micropigmentación de cejas, labios u ojos con Patricia Songel en La Eliana, Valencia. Primera consulta gratuita. Llama al 647 12 24 70, escríbenos por WhatsApp o reserva desde el formulario.',
    image: img('/patricia-portrait.webp'),
    robots: 'index, follow',
  },
  {
    path: '/alumnos',
    title: 'Área de alumnas | Patricia Songel',
    description: 'Próximamente: área privada para las alumnas de las formaciones de Patricia Songel.',
    image: img('/patricia-portrait.webp'),
    robots: 'index, follow',
  },
  {
    path: '/formaciones',
    title: 'Formaciones de micropigmentación | Patricia Songel',
    description: 'Descubre las formaciones presenciales y online de Patricia Songel: 4 técnicas, Glow Lips Masterclass, Hairstrokes, Brows Shadow Online y Glow Lips Online.',
    image: img('/micro20_banner.webp'),
    robots: 'index, follow',
  },
  {
    path: '/formacion/micropigmentacion',
    title: 'Formación 4 técnicas | Patricia Songel — Valencia',
    description: 'Formación presencial completa en micropigmentación facial: cejas, labios y ojos. Impartida por Patricia Songel, campeona de España 2023 y 2025. Diploma acreditativo + 35 días de prácticas + seguimiento.',
    image: img('/micro20_banner.webp'),
    robots: 'index, follow',
  },
  {
    path: '/formacion/glowlips',
    title: 'Glowlips Masterclass | Labios con micropigmentación — Patricia Songel',
    description: 'Masterclass de micropigmentación de labios con la técnica Glowlips. Impartida por Patricia Songel, campeona WULOP Dubái 2024. Aprende a trabajar con naturalidad y precisión. Plazas limitadas.',
    image: img('/glowlips_masterclass_banner.webp'),
    robots: 'index, follow',
  },
  {
    path: '/formacion/hairstrokes',
    title: 'Hairstrokes Masterclass — Cejas pelo a pelo | Patricia Songel Valencia',
    description: 'Domina la técnica de hairstrokes con Patricia Songel, campeona de España. Masterclass presencial de 2 días en La Eliana, Valencia. Cejas ultrarrealistas sobre modelo real. Grupos reducidos.',
    image: img('/cejas_pagina1_horizontal.webp'),
    robots: 'index, follow',
  },
  {
    path: '/formacion/hairstrokes-iniciacion',
    title: 'Hairstrokes Iniciación | Formación presencial · Patricia Songel',
    description: 'Formación presencial de iniciación en hairstrokes: tres días, 24 horas, modelo real, kit de inicio y seguimiento posterior en La Eliana, Valencia.',
    image: img('/hairstrokes_iniciacion_banner.webp'),
    robots: 'index, follow',
  },
  {
    path: '/formacion/cejas-online',
    title: 'Brows Shadow Online · Próximo lanzamiento | Patricia Songel',
    description: 'Brows Shadow Online abre plazas el 15 de septiembre a las 17:00h. Deja tus datos para ser el primero en enterarte en cuanto abran las plazas.',
    image: img('/brows_shadow_online_banner.webp'),
    robots: 'index, follow',
  },
  {
    path: '/formacion/labios-online',
    title: 'Glow Lips Online · Próximo lanzamiento | Patricia Songel',
    description: 'Glow Lips Online abre plazas el 15 de septiembre a las 17:00h. Deja tus datos para ser el primero en enterarte en cuanto abran las plazas.',
    image: img('/glowlips_online_banner.webp'),
    robots: 'index, follow',
  },
  {
    path: '/aviso-legal',
    title: 'Aviso Legal | Patricia Songel',
    description: 'Aviso legal e información del titular del sitio web de Patricia Songel — micropigmentación y formación en La Eliana, Valencia.',
    image: img('/patricia-portrait.webp'),
    robots: 'noindex, follow',
  },
  {
    path: '/privacidad',
    title: 'Política de Privacidad | Patricia Songel',
    description: 'Política de privacidad y tratamiento de datos personales del sitio web de Patricia Songel — micropigmentación y formación en Valencia.',
    image: img('/patricia-portrait.webp'),
    robots: 'noindex, follow',
  },
  {
    path: '/terminos',
    title: 'Términos y Condiciones | Patricia Songel',
    description: 'Términos y condiciones de uso del sitio web y de las formaciones de Patricia Songel — micropigmentación en La Eliana, Valencia.',
    image: img('/patricia-portrait.webp'),
    robots: 'noindex, follow',
  },
];
