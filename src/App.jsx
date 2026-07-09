import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Positioning from './components/Positioning';
import Biography from './components/Biography';
import Philosophy from './components/Philosophy';
import Curriculum from './components/Curriculum';
import Courses from './components/Courses';
import TargetAudience from './components/TargetAudience';
import StudentResults from './components/StudentResults';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import FloatingCTA from './components/FloatingCTA';
import Seo from './components/Seo';
import AvisoLegal from './pages/AvisoLegal';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';
import MicropigmentacionPage from './pages/MicropigmentacionPage';
import GlowlipsPage from './pages/GlowlipsPage';
import CejasPage from './pages/CejasPage';
import ConocePatricia from './pages/ConocePatricia';
import PedirCita from './pages/PedirCita';
import AlumnosPage from './pages/AlumnosPage';
import NotFound from './pages/NotFound';

const SITE = 'https://www.patriciasongel.es';

const HOME_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}/#webpage`,
    url: `${SITE}/`,
    name: 'Patricia Songel | Micropigmentación y formación en Valencia',
    description: 'Patricia Songel, campeona de España en micropigmentación 2023 y 2025. Especialista en cejas, labios y ojos en La Eliana, Valencia. Formaciones presenciales en toda España.',
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#person` },
    inLanguage: 'es-ES',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Formaciones de micropigmentación de Patricia Songel',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Curso Micropigmentación 3.0',
        url: `${SITE}/formacion/micropigmentacion`,
        description: 'Formación presencial completa en micropigmentación facial: cejas, labios y ojos.',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Glowlips Masterclass',
        url: `${SITE}/formacion/glowlips`,
        description: 'Masterclass de micropigmentación de labios con la técnica exclusiva Glowlips.',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Hairstrokes Masterclass',
        url: `${SITE}/formacion/hairstrokes`,
        description: 'Masterclass de cejas pelo a pelo con técnica hairstrokes.',
      },
    ],
  },
];

function Home() {
  return (
    <main className="font-sans bg-surface text-primary min-h-[100svh]">
      <Seo
        title="Patricia Songel | Micropigmentación y formación en Valencia"
        description="Patricia Songel, campeona de España en micropigmentación 2023 y 2025. Especialista en cejas, labios y ojos en La Eliana, Valencia. Formaciones presenciales en toda España. Pide tu consulta gratuita."
        canonical={`${SITE}/`}
        image={`${SITE}/patricia-portrait.webp`}
        imageAlt="Patricia Songel, especialista en micropigmentación y formadora en Valencia"
        jsonLd={HOME_JSON_LD}
      />
      <Navbar />
      <Hero />
      <Positioning />
      <Biography />
      <Philosophy />
      <Curriculum />
      <Courses />
      <TargetAudience />
      <StudentResults />
      <Footer />
      <FloatingCTA />
    </main>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conoce-a-patricia" element={<ConocePatricia />} />
        <Route path="/pedir-cita" element={<PedirCita />} />
        <Route path="/alumnos" element={<AlumnosPage />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/formacion/micropigmentacion" element={<MicropigmentacionPage />} />
        <Route path="/formacion/glowlips" element={<GlowlipsPage />} />
        <Route path="/formacion/hairstrokes" element={<CejasPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;
