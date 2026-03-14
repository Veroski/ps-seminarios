import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('formaciones');
    if (coursesSection) {
      window.scrollTo({
        top: coursesSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="w-full bg-[#0A0A0C] pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] text-surface mt-10 relative overflow-hidden">
      {/* Ambient glow in footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-2xl aspect-square bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center mb-20">
        <button
          onClick={scrollToCourses}
          className="group relative inline-flex w-full sm:w-auto items-center justify-center bg-[#FAF8F5] text-[#0A0A0C] font-sans font-bold text-sm px-8 sm:px-10 py-5 rounded-full overflow-hidden hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-[0_0_30px_rgba(250,248,245,0.1)]"
        >
          <span className="absolute inset-0 w-full h-full bg-[#C9A84C] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"></span>
          <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
            Ver próximas formaciones
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-24 relative z-10">
        <div className="flex flex-col max-w-sm">
          <p className="max-w-sm text-copy-light leading-relaxed opacity-70">
            Si quieres aprender micropigmentación con una base técnica sólida, comprender realmente cómo funciona la piel y desarrollar criterio profesional en tu trabajo, <span className="text-accent">estaré encantada de acompañarte en ese proceso.</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 font-sans text-sm w-full md:w-auto">
          <div className="flex flex-col gap-4">
            <h4 className="text-overline-soft text-surface/[0.42] mb-2">Explorar</h4>
            <a href="#autoridad" className="hover:text-accent transition-colors">Autoridad</a>
            <a href="#biography" className="hover:text-accent transition-colors">Patricia</a>
            <a href="#philosophy" className="hover:text-accent transition-colors">Filosofía</a>
            <a href="#programa" className="hover:text-accent transition-colors">Programa</a>
            <a href="#formaciones" className="hover:text-accent transition-colors">Formaciones</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-overline-soft text-surface/[0.42] mb-2">Información</h4>
            <Link to="/aviso-legal" className="hover:text-accent transition-colors">Aviso Legal</Link>
            <Link to="/privacidad" className="hover:text-accent transition-colors">Privacidad</Link>
            <Link to="/terminos" className="hover:text-accent transition-colors">Términos</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-surface/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
        <span className="font-sans text-xs text-surface/40">© {new Date().getFullYear()} Patricia Songel Academy. All rights reserved.</span>
        <span className="text-overline-soft text-surface/20">Edición clínica 2026</span>
      </div>
    </footer>
  );
}

