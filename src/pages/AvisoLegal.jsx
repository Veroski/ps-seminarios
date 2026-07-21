import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';

const SITE = 'https://www.patriciasongel.es';

const Section = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="font-sans font-semibold text-base tracking-widest uppercase text-accent mb-5" style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}>
      {title}
    </h2>
    <div className="space-y-4 text-[#262222]/75 leading-relaxed" style={{ fontSize: '0.93rem', letterSpacing: '-0.01em', lineHeight: 1.85 }}>
      {children}
    </div>
  </div>
);

export default function AvisoLegal() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-[100svh] bg-[#F1EDED]">
      <Seo
        title="Aviso Legal | Patricia Songel"
        description="Aviso legal e información del titular del sitio web de Patricia Songel — micropigmentación y formación en La Eliana, Valencia."
        canonical={`${SITE}/aviso-legal`}
        robots="noindex, follow"
      />
      {/* Top bar */}
      <div className="border-b border-[#0A0A0A]/8 bg-[#F1EDED]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-[#0A0A0A]/50 hover:text-[#0A0A0A] transition-colors duration-300 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
            <span className="font-sans text-xs tracking-widest uppercase font-medium" style={{ letterSpacing: '0.18em' }}>Volver</span>
          </Link>
          <span className="font-mono text-xs text-[#0A0A0A]/30" style={{ letterSpacing: '0.06em' }}>SEMINARIOS / LEGAL</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        {/* Header */}
        <div className="mb-20 border-b border-[#0A0A0A]/10 pb-16">
          <p className="font-mono text-xs text-[#0A0A0A] mb-6 tracking-widest uppercase" style={{ letterSpacing: '0.24em' }}>01 — Legal</p>
          <h1 className="font-serif italic text-5xl md:text-6xl text-[#0A0A0A] mb-6" style={{ letterSpacing: '-0.02em' }}>Aviso Legal</h1>
          <p className="font-sans text-sm text-[#262222]/50" style={{ letterSpacing: '-0.01em' }}>Última actualización: marzo 2026</p>
        </div>

        <Section title="I. Información del titular">
          <p>Este sitio web es propiedad y está administrado por Patricia Songel, dedicada a la formación y enseñanza. Para cualquier consulta, puede dirigirse a través del formulario de contacto disponible en el sitio web.</p>
        </Section>

        <Section title="II. Condiciones de uso">
          <p>El acceso a este sitio web implica la aceptación de los presentes términos y condiciones de uso. El titular se reserva el derecho de modificar unilateralmente la presentación, configuración, contenido y servicios del sitio web en cualquier momento.</p>
          <p>El usuario acepta utilizar el sitio de conformidad con la ley y se compromete a no utilizarlo de forma que pueda causar daños, interrupciones o interferencias.</p>
        </Section>

        <Section title="III. Propiedad intelectual">
          <p>Todos los contenidos de este sitio web —incluyendo textos, imágenes, gráficos, logotipos, código fuente y diseño— están protegidos por la legislación española e internacional sobre propiedad intelectual. Se prohíbe su reproducción total o parcial sin autorización previa escrita.</p>
        </Section>

        <Section title="IV. Limitación de responsabilidad">
          <p>El titular no garantiza que el sitio esté libre de interrupciones o errores, ni que funcione de forma ininterrumpida. No se responsabiliza de los daños o perjuicios derivados del uso del sitio o de su inaccesibilidad.</p>
          <p>Los enlaces a sitios de terceros se proporcionan únicamente con carácter informativo. El titular no se responsabiliza del contenido de terceros ni de sus políticas de privacidad.</p>
        </Section>

        <Section title="V. Cookies">
          <p>Este sitio utiliza cookies propias y de terceros. Consulte nuestra <Link to="/privacidad" className="text-[#0A0A0A] hover:underline decoration-[#0A0A0A]/40 underline-offset-2">Política de Privacidad</Link> para más información. Puede gestionar sus preferencias en el gestor de cookies disponible en el sitio.</p>
        </Section>

        <Section title="VI. Ley aplicable">
          <p>Este aviso legal se rige por la ley española. Cualquier controversia relacionada con el uso de este sitio será resuelta por los juzgados competentes según la legislación vigente.</p>
        </Section>
      </div>

      {/* Footer strip */}
      <div className="border-t border-[#0A0A0A]/8 bg-[#F1EDED]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-sans text-xs text-[#0A0A0A]/30" style={{ letterSpacing: '-0.01em' }}>© {new Date().getFullYear()} Patricia Songel</span>
          <div className="flex gap-6 font-sans text-xs text-[#0A0A0A]/40" style={{ letterSpacing: '-0.01em' }}>
            <Link to="/privacidad" className="hover:text-[#0A0A0A] transition-colors">Privacidad</Link>
            <Link to="/terminos" className="hover:text-[#0A0A0A] transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
