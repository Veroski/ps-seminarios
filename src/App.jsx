import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Positioning from './components/Positioning';
import Biography from './components/Biography';
import Philosophy from './components/Philosophy';
import Curriculum from './components/Curriculum';
import Courses from './components/Courses';
import TargetAudience from './components/TargetAudience';
import StudentResults from './components/StudentResults';
import Closing from './components/Closing';
import Footer from './components/Footer';

function App() {
  return (
    <main className="font-sans bg-surface text-primary min-h-screen">
      <Navbar />
      <Hero />
      <Positioning />
      <Biography />
      <Philosophy />
      <Curriculum />
      <Courses />
      <TargetAudience />
      <StudentResults />
      <Closing />
      <Footer />
    </main>
  );
}

export default App;
