import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Courses from '../components/Courses';
import Curriculum from '../components/Curriculum';
import TargetAudience from '../components/TargetAudience';
import StudentResults from '../components/StudentResults';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

const SITE = 'https://www.patriciasongel.es';

export default function Formaciones() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-[100svh] bg-surface font-sans text-primary">
      <Seo
        title="Formaciones de micropigmentación | Patricia Songel"
        description="Descubre las formaciones presenciales de Patricia Songel: Formación 3 técnicas, Glowlips y Hairstrokes. Formación técnica, práctica y acompañamiento profesional en La Eliana, Valencia."
        canonical={`${SITE}/formaciones`}
        image={`${SITE}/micro20_pagina1.webp`}
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
      <Curriculum />
      <TargetAudience />
      <StudentResults />
      <Footer />
    </main>
  );
}
