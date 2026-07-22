import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';

const SITE = 'https://www.patriciasongel.es';

const Section = ({ num, title, children }) => (
  <div className="mb-12">
    <div className="flex items-baseline gap-4 mb-5">
      <span className="font-mono text-xs text-[#0A0A0A]/70" style={{ letterSpacing: '0.08em' }}>{num}</span>
      <h2 className="font-sans font-semibold text-base tracking-widest uppercase text-[#0A0A0A]" style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}>
        {title}
      </h2>
    </div>
    <div className="space-y-4 text-[#262222]/75 leading-relaxed" style={{ fontSize: '0.93rem', letterSpacing: '-0.01em', lineHeight: 1.85 }}>
      {children}
    </div>
  </div>
);

export default function Privacidad() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-[100svh] bg-[#F3EDE2]">
      <Seo
        title="Política de Privacidad | Patricia Songel"
        description="Política de privacidad y tratamiento de datos personales del sitio web de Patricia Songel — micropigmentación y formación en Valencia."
        canonical={`${SITE}/privacidad`}
        robots="noindex, follow"
      />
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        {/* Header */}
        <div className="mb-20 border-b border-[#0A0A0A]/10 pb-16">
          <p className="font-mono text-xs text-[#0A0A0A] mb-6 tracking-widest uppercase" style={{ letterSpacing: '0.24em' }}>02 — Legal</p>
          <h1 className="font-serif italic text-5xl md:text-6xl text-[#0A0A0A] mb-4" style={{ letterSpacing: '-0.02em' }}>Política de<br />Privacidad</h1>
          <p className="font-sans text-sm text-[#262222]/50 mt-4" style={{ letterSpacing: '-0.01em' }}>Última actualización: marzo 2026 · Conforme a RGPD</p>
        </div>

        <Section num="01" title="Responsable del tratamiento">
          <p>Patricia Songel es responsable del tratamiento de sus datos personales en el sitio web. Puede contactar a través del formulario de contacto disponible en el sitio.</p>
          <p>El tratamiento de datos se realiza de conformidad con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos Personales (LOPDGDD).</p>
        </Section>

        <Section num="02" title="Datos que recopilamos">
          <p>Este sitio web puede recopilar información personal que usted facilita voluntariamente a través de formularios, incluyendo nombre, correo electrónico y otros datos que decida proporcionar.</p>
          <p>También recopilamos datos de navegación a través de cookies y análisis web, únicamente con su consentimiento previo.</p>
        </Section>

        <Section num="03" title="Finalidad del tratamiento">
          <p>Los datos personales se tratan para:</p>
          <ul className="space-y-2 mt-3 ml-4">
            {[
              'Responder a consultas e inquietudes',
              'Enviar información solicitada',
              'Mejorar la experiencia del usuario mediante análisis estadísticos',
              'Cumplir con obligaciones legales',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2.5 w-1 h-1 bg-[#0A0A0A] rounded-full flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section num="04" title="Conservación de datos">
          <p>Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados, o conforme a los plazos establecidos por la ley. Una vez cumplida la finalidad, los datos serán eliminados o anonimizados.</p>
        </Section>

        <Section num="05" title="Destinatarios">
          <p>Sus datos pueden ser compartidos con proveedores técnicos necesarios para el funcionamiento del sitio, como servicios de alojamiento y análisis web. Estos proveedores están obligados por contrato a mantener la confidencialidad de sus datos.</p>
        </Section>

        <Section num="06" title="Derechos del usuario">
          <p>De conformidad con el RGPD, tiene derecho a:</p>
          <ul className="space-y-2 mt-3 ml-4">
            {['Acceder a sus datos', 'Rectificar información inexacta', 'Solicitar la eliminación de sus datos', 'Limitar el tratamiento', 'Oponerme al tratamiento', 'Portabilidad de datos'].map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2.5 w-1 h-1 bg-[#0A0A0A] rounded-full flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">Para ejercer estos derechos, contacte a través del formulario de contacto del sitio web. Si considera que su derecho ha sido vulnerado, puede presentar una reclamación ante la autoridad de protección de datos competente.</p>
        </Section>

        <Section num="07" title="Cookies">
          <p>Este sitio utiliza cookies técnicas necesarias para su funcionamiento, así como cookies analíticas y publicitarias si usted las autoriza. Puede gestionar sus preferencias en el banner de cookies que aparece al acceder al sitio.</p>
        </Section>

        <Section num="08" title="Seguridad">
          <p>Se han implementado medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, alteración o pérdida.</p>
        </Section>
      </div>

      {/* Footer strip */}
      <div className="border-t border-[#0A0A0A]/8 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-sans text-xs text-[#0A0A0A]/30" style={{ letterSpacing: '-0.01em' }}>© {new Date().getFullYear()} Patricia Songel</span>
          <div className="flex gap-6 font-sans text-xs text-[#0A0A0A]/40" style={{ letterSpacing: '-0.01em' }}>
            <Link to="/aviso-legal" className="hover:text-[#0A0A0A] transition-colors">Aviso Legal</Link>
            <Link to="/terminos" className="hover:text-[#0A0A0A] transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
