import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Section = ({ num, title, children }) => (
  <div className="mb-12">
    <div className="flex items-baseline gap-4 mb-5">
      <span className="font-mono text-xs text-[#C9A84C]/70" style={{ letterSpacing: '0.08em' }}>{num}</span>
      <h2 className="font-sans font-semibold text-base tracking-widest uppercase text-[#0D0D12]" style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}>
        {title}
      </h2>
    </div>
    <div className="space-y-4 text-[#2A2A35]/75 leading-relaxed" style={{ fontSize: '0.93rem', letterSpacing: '-0.01em', lineHeight: 1.85 }}>
      {children}
    </div>
  </div>
);

export default function Privacidad() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-[100svh] bg-[#F7F7F5]">
      {/* Top bar */}
      <div className="border-b border-[#0D0D12]/8 bg-[#F7F7F5]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-[#0D0D12]/50 hover:text-[#C9A84C] transition-colors duration-300 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
            <span className="font-sans text-xs tracking-widest uppercase font-medium" style={{ letterSpacing: '0.18em' }}>Volver</span>
          </Link>
          <span className="font-mono text-xs text-[#0D0D12]/30" style={{ letterSpacing: '0.06em' }}>SEMINARIOS / PRIVACIDAD</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        {/* Header */}
        <div className="mb-20 border-b border-[#0D0D12]/10 pb-16">
          <p className="font-mono text-xs text-[#C9A84C] mb-6 tracking-widest uppercase" style={{ letterSpacing: '0.24em' }}>02 — Legal</p>
          <h1 className="font-serif italic text-5xl md:text-6xl text-[#0D0D12] mb-4" style={{ letterSpacing: '-0.02em' }}>Política de<br />Privacidad</h1>
          <p className="font-sans text-sm text-[#2A2A35]/50 mt-4" style={{ letterSpacing: '-0.01em' }}>Última actualización: marzo 2026 · Conforme a RGPD</p>
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
                <span className="mt-2.5 w-1 h-1 bg-[#C9A84C] rounded-full flex-shrink-0" />
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
                <span className="mt-2.5 w-1 h-1 bg-[#C9A84C] rounded-full flex-shrink-0" />
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
      <div className="border-t border-[#0D0D12]/8 bg-[#F7F7F5]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-sans text-xs text-[#0D0D12]/30" style={{ letterSpacing: '-0.01em' }}>© {new Date().getFullYear()} Patricia Songel</span>
          <div className="flex gap-6 font-sans text-xs text-[#0D0D12]/40" style={{ letterSpacing: '-0.01em' }}>
            <Link to="/aviso-legal" className="hover:text-[#C9A84C] transition-colors">Aviso Legal</Link>
            <Link to="/terminos" className="hover:text-[#C9A84C] transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
