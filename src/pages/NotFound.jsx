import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Seo, { SITE } from '../components/Seo';

export default function NotFound() {
  return (
    <div
      className="min-h-[100svh] flex flex-col items-center justify-center px-6 text-center"
      style={{ background: '#F3EDE2', color: '#0A0A0A' }}
    >
      <Navbar />
      <Seo
        title="Página no encontrada | Patricia Songel"
        description="La página que buscas no existe. Vuelve al inicio de Patricia Songel — micropigmentación y formación en Valencia."
        canonical={`${SITE}/404`}
        robots="noindex, follow"
      />
      <p
        className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4"
        style={{ color: '#0A0A0A' }}
      >
        Error 404
      </p>
      <h1
        className="font-serif italic font-bold mb-4 leading-tight"
        style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', color: '#0A0A0A' }}
      >
        Página no encontrada.
      </h1>
      <p className="font-sans text-sm mb-10 max-w-xs leading-relaxed" style={{ color: '#625C5C' }}>
        El enlace que has seguido no existe o ha cambiado de dirección.
      </p>
      <Link
        to="/"
        className="font-sans font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
        style={{ background: '#0A0A0A', color: '#F3EDE2' }}
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
