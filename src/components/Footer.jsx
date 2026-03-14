import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] text-surface mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
        <div className="flex flex-col max-w-sm">
          <h2 className="font-serif italic font-bold text-3xl mb-4">Patricia Songel Academy</h2>
          <p className="max-w-sm text-copy-light">
            Formación de élite en micropigmentación para profesionales que quieren dominar la técnica, diferenciarse y competir al más alto nivel internacional.
          </p>
          
          <div className="mt-8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-overline-soft text-surface/50">Agenda abierta</span>
          </div>
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
            <a href="#" className="hover:text-accent transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-accent transition-colors">Privacidad</a>
            <a href="#" className="hover:text-accent transition-colors">Términos</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-surface/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <span className="font-sans text-xs text-surface/40">© {new Date().getFullYear()} Patricia Songel Academy. All rights reserved.</span>
        <span className="text-overline-soft text-surface/20">Edición clínica 2026</span>
      </div>
    </footer>
  );
}
