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
import AvisoLegal from './pages/AvisoLegal';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';

function Home() {
  return (
    <main className="font-sans bg-surface text-primary min-h-[100svh]">
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
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;
