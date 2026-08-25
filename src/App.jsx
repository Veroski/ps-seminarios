import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CookieBanner from './components/CookieBanner';
import Seo from './components/Seo';
import AvisoLegal from './pages/AvisoLegal';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';
import CourseFormPage from './pages/CourseFormPage';
import MicropigmentacionPage from './pages/MicropigmentacionPage';
import GlowlipsPage from './pages/GlowlipsPage';
import CejasPage from './pages/CejasPage';
import HairstrokesIniciacionPage from './pages/HairstrokesIniciacionPage';
import ConocePatricia from './pages/ConocePatricia';
import PedirCita from './pages/PedirCita';
import AlumnosPage from './pages/AlumnosPage';
import Formaciones from './pages/Formaciones';
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
];

function Home() {
  return (
    <main className="font-sans bg-surface text-primary min-h-[100svh]">
      <Seo
        title="Patricia Songel | Micropigmentación y formación en Valencia"
        description="Patricia Songel, campeona de España en micropigmentación 2023 y 2025. Especialista en cejas, labios y ojos en La Eliana, Valencia. Formaciones presenciales en toda España. Pide tu consulta gratuita."
        canonical={`${SITE}/`}
        image={`${SITE}/ps-banner.webp`}
        imageAlt="Patricia Songel, micropigmentación y belleza"
        jsonLd={HOME_JSON_LD}
      />
      <Navbar />
      <Hero />
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
        <Route path="/formaciones" element={<Formaciones />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/formacion/micropigmentacion" element={<MicropigmentacionPage />} />
        <Route path="/formacion/glowlips" element={<GlowlipsPage />} />
        <Route path="/formacion/hairstrokes" element={<CejasPage />} />
        <Route path="/formacion/hairstrokes-iniciacion" element={<HairstrokesIniciacionPage />} />
        <Route path="/formacion/:slug" element={<CourseFormPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;
