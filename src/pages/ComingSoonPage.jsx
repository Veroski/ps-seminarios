import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo, { SITE } from '../components/Seo';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE}/alumnos#webpage`,
  url: `${SITE}/alumnos`,
  name: 'Área de alumnas Patricia Songel',
  description: 'Próximamente: área privada para las alumnas de Patricia Songel.',
  isPartOf: { '@id': `${SITE}/#website` },
  inLanguage: 'es-ES',
};

export default function ComingSoonPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-[100svh] overflow-x-hidden bg-surface text-primary">
      <Seo
        title="Área de alumnas | Patricia Songel"
        description="Próximamente: área privada para las alumnas de las formaciones de Patricia Songel."
        canonical={`${SITE}/alumnos`}
        image={`${SITE}/patricia-portrait.webp`}
        imageAlt="Área de alumnas de Patricia Songel"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section id="proximamente" className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-6 pb-16 pt-32 text-center scroll-mt-32 md:px-16 md:pt-40">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.9),transparent_42%),linear-gradient(135deg,rgba(243,237,226,0.2),rgba(10,10,10,0.06))]" />
        <div className="relative max-w-2xl">
          <p className="text-overline mb-6 text-primary/55">Área de alumnas</p>
          <h1 className="font-serif text-5xl italic leading-[0.98] tracking-tight md:text-7xl">
            Próximamente.
          </h1>
          <p className="mx-auto mt-7 max-w-lg font-sans text-base leading-[1.85] text-primary/65 md:text-lg">
            Estamos preparando un espacio privado para acompañar a nuestras alumnas durante su formación.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
