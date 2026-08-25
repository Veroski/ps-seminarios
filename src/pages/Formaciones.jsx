import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Courses from '../components/Courses';
import FormationShorts from '../components/FormationShorts';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

const SITE = 'https://www.patriciasongel.es';

export default function Formaciones() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-[100svh] bg-surface font-sans text-primary">
      <Seo
        title="Formaciones de micropigmentación | Patricia Songel"
        description="Descubre las formaciones presenciales y online de Patricia Songel: 4 técnicas, Glow Lips, Hairstrokes, Cejas Online y Labios Online."
        canonical={`${SITE}/formaciones`}
        image={`${SITE}/micro20_pagina1_horizontal.webp`}
        imageAlt="Formaciones de micropigmentación de Patricia Songel"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Formaciones de Patricia Songel',
          url: `${SITE}/formaciones`,
        }}
      />
      <Navbar />
      <Courses />
      <FormationShorts />
      <Footer />
    </main>
  );
}
