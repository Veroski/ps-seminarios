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

export default function Terminos() {
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
          <span className="font-mono text-xs text-[#0D0D12]/30" style={{ letterSpacing: '0.06em' }}>SEMINARIOS / TÉRMINOS</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        {/* Header */}
        <div className="mb-20 border-b border-[#0D0D12]/10 pb-16">
          <p className="font-mono text-xs text-[#C9A84C] mb-6 tracking-widest uppercase" style={{ letterSpacing: '0.24em' }}>03 — Legal</p>
          <h1 className="font-serif italic text-5xl md:text-6xl text-[#0D0D12] mb-4" style={{ letterSpacing: '-0.02em' }}>Términos y<br />Condiciones</h1>
          <p className="font-sans text-sm text-[#2A2A35]/50 mt-4" style={{ letterSpacing: '-0.01em' }}>Última actualización: marzo 2026</p>
        </div>

        <Section num="01" title="Objeto">
          <p>Estos Términos y Condiciones regulan el acceso y uso de este sitio web. El acceso y uso del sitio implica la aceptación íntegra de los presentes términos.</p>
        </Section>

        <Section num="02" title="Acceso y disponibilidad">
          <p>El acceso a este sitio web es libre y gratuito. El titular se reserva el derecho de restringir, suspender o cancelar el acceso en cualquier momento, especialmente en caso de incumplimiento de estos términos.</p>
          <p>El sitio web se proporciona "tal cual", sin garantías de disponibilidad continua, precisión o funcionamiento sin errores.</p>
        </Section>

        <Section num="03" title="Conducta del usuario">
          <p>El usuario se compromete a utilizar este sitio de forma lícita y responsable. Específicamente, se prohíbe:</p>
          <ul className="space-y-2 mt-3 ml-4">
            {[
              'Transmitir contenido ilegal, ofensivo o dañino',
              'Intentar obtener acceso no autorizado a sistemas o datos',
              'Introducir virus o malware',
              'Infringir derechos de propiedad intelectual',
              'Utilizar técnicas de spam o scraping',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2.5 w-1 h-1 bg-[#C9A84C] rounded-full flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section num="04" title="Propiedad intelectual">
          <p>Todos los contenidos de este sitio web están protegidos por las leyes de propiedad intelectual. Se prohíbe cualquier reproducción, distribución o modificación sin autorización previa.</p>
        </Section>

        <Section num="05" title="Limitación de responsabilidad">
          <p>El titular no se responsabiliza de:</p>
          <ul className="space-y-2 mt-3 ml-4">
            {[
              'Daños derivados del uso del sitio',
              'Pérdida de datos o información',
              'Interrupciones o errores en el servicio',
              'Contenido de sitios de terceros enlazados',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2.5 w-1 h-1 bg-[#C9A84C] rounded-full flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section num="06" title="Enlaces externos">
          <p>Este sitio puede contener enlaces a sitios de terceros. El titular no controla, revisa ni es responsable del contenido, políticas de privacidad o prácticas de dichos sitios. Acceder a ellos es bajo su propia responsabilidad.</p>
        </Section>

        <Section num="07" title="Modificación de términos">
          <p>El titular se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente tras su publicación. Se recomienda revisar periódicamente estos términos.</p>
        </Section>

        <Section num="08" title="Ley aplicable y jurisdicción">
          <p>Estos términos se rigen por la ley española. Cualquier disputa será resuelta ante los juzgados competentes de España, conforme a la legislación vigente.</p>
        </Section>

        <Section num="09" title="Contacto">
          <p>Para cualquier cuestión relacionada con estos términos, puede dirigirse a través del formulario de contacto disponible en el sitio web.</p>
        </Section>
      </div>

      {/* Footer strip */}
      <div className="border-t border-[#0D0D12]/8 bg-[#F7F7F5]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-sans text-xs text-[#0D0D12]/30" style={{ letterSpacing: '-0.01em' }}>© {new Date().getFullYear()} Patricia Songel</span>
          <div className="flex gap-6 font-sans text-xs text-[#0D0D12]/40" style={{ letterSpacing: '-0.01em' }}>
            <Link to="/aviso-legal" className="hover:text-[#C9A84C] transition-colors">Aviso Legal</Link>
            <Link to="/privacidad" className="hover:text-[#C9A84C] transition-colors">Privacidad</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
