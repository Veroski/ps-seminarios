import { useEffect, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo, { SITE } from '../components/Seo';

const palette = {
  light: '#F9F4E9',
  warm: '#E9DEC9',
  dark: '#0A0A0A',
  mid: '#262222',
  text: '#0A0A0A',
  muted: '#625C5C',
  lightText: '#F3EDE2',
};

const fields = [
  { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre', required: true, span: 2 },
  { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.com', required: true },
  { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+34 000 000 000', required: true },
  { name: 'activa', label: '¿Practicas micropigmentación actualmente?', type: 'select', options: ['Sí, activamente', 'Sí, esporádicamente', 'No, aún no'], required: true, span: 2 },
  { name: 'experiencia', label: 'Experiencia con cejas', type: 'select', options: ['Sin experiencia', 'Iniciación', 'Intermedio', 'Avanzado'], span: 2 },
  { name: 'inversion', label: '¿Cuánto estás dispuesto/a a invertir?', type: 'select', options: ['Menos de 1.000 €', 'Entre 1.000 y 1.500 €', 'Más de 1.500 €'], required: true, span: 2 },
  { name: 'mensaje', label: '¿Qué quieres aprender?', type: 'textarea', placeholder: 'Cuéntanos tu objetivo...', span: 2 },
];

const includes = [
  'Dossier formativo completo',
  'Bolsa de tela, libreta y bolígrafo',
  'Compás áureo y regla de cejas',
  'Kit de agujas, látex con diseño y pigmento de cejas',
  'Lápiz de diseño y kit de desechables',
  'Diploma acreditativo y almuerzos de los días presenciales',
];

const topics = [
  'Fundamentos de micropigmentación, piel, fototipos y bioseguridad',
  'Máquinas, agujas, fuente de alimentación, movimiento, velocidad y ángulos',
  'Diseño de cejas con compás áureo y patrones europeos, asiáticos y masculinos',
  'Demostración y práctica de hairstrokes en papel, látex y modelo real',
  'Cuidados previos y posteriores, colorimetría, pigmentología y corrección',
  'Marketing, redes sociales e imagen corporativa para rentabilizar tu trabajo',
];

export default function HairstrokesIniciacionPage() {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleInput = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formacion: 'Hairstrokes Iniciación' }),
      });
      if (!response.ok) throw new Error('Error de red');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const renderField = (field) => {
    const props = {
      id: `hsi-${field.name}`,
      name: field.name,
      required: field.required,
      value: formData[field.name] || '',
      onChange: handleInput,
      className: 'w-full rounded-lg border px-3.5 py-2.5 text-sm font-sans focus:outline-none',
      style: { background: palette.lightText, borderColor: 'rgba(44,26,14,0.14)', color: palette.text },
    };
    if (field.type === 'select') return <select {...props}><option value="">Seleccionar…</option>{field.options.map((option) => <option key={option}>{option}</option>)}</select>;
    if (field.type === 'textarea') return <textarea {...props} rows={3} placeholder={field.placeholder} className={`${props.className} resize-none`} />;
    return <input {...props} type={field.type} placeholder={field.placeholder} />;
  };

  return (
    <main className="font-sans" style={{ background: palette.light, color: palette.text }}>
      <Seo
        title="Hairstrokes Iniciación | Formación presencial · Patricia Songel"
        description="Formación presencial de iniciación en hairstrokes: tres días, 24 horas, modelo real, kit de inicio y seguimiento posterior en La Eliana, Valencia."
        canonical={`${SITE}/formacion/hairstrokes-iniciacion`}
        image={`${SITE}/hairstrokes_iniciacion_banner.webp`}
        imageAlt="Hairstrokes Iniciación · Formación presencial con Patricia Songel"
      />
      <Navbar />

      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-[#0A0A0A]">
        <img src="/hairstrokes_iniciacion_banner.webp" alt="Hairstrokes Iniciación" className="absolute inset-0 h-full w-full object-cover object-center opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-40 md:px-16 md:pb-24">
          <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#F3EDE2]/70">Formación presencial · Iniciación</p>
          <h1 className="max-w-3xl font-serif text-6xl font-bold italic leading-[0.9] text-[#F3EDE2] md:text-8xl">Hairstrokes <span className="text-[#E9DEC9]">Iniciación</span></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F3EDE2]/70 md:text-lg">La base completa para empezar a trabajar cejas pelo a pelo con precisión, diseño estratégico y acompañamiento real.</p>
          <a href="#formulario" className="mt-8 inline-flex rounded-full bg-[#F3EDE2] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A]">Solicitar información →</a>
        </div>
      </section>

      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#0A0A0A]/50">La formación</p>
            <h2 className="font-serif text-4xl font-bold italic leading-tight md:text-5xl">Donde empieza el realismo.</h2>
            <p className="mt-6 max-w-2xl leading-[1.9] text-[#625C5C]">Un programa profesional pensado para construir una base sólida desde cero: teoría, diseño, práctica en plantilla de látex, demostración y trabajo sobre modelo real.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['3 días', 'presencial'], ['24 h', 'totales'], ['máx. 6', 'alumnas'], ['15 días', 'seguimiento']].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-[#0A0A0A]/10 bg-white/55 p-5"><strong className="block font-mono text-xl">{value}</strong><span className="mt-2 block text-xs text-[#625C5C]">{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E9DEC9] px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#0A0A0A]/50">Temario</p>
          <h2 className="mb-10 max-w-2xl font-serif text-4xl font-bold italic leading-tight md:text-5xl">Todo lo que necesitas para empezar bien.</h2>
          <div className="grid gap-3 md:grid-cols-2">{topics.map((topic, index) => <div key={topic} className="flex gap-4 rounded-2xl border border-[#0A0A0A]/10 bg-white/55 p-5"><span className="font-mono text-xs text-[#0A0A0A]/45">{String(index + 1).padStart(2, '0')}</span><span className="text-sm leading-relaxed text-[#625C5C]">{topic}</span></div>)}</div>
        </div>
      </section>

      <section className="bg-[#262222] px-6 py-16 text-[#F3EDE2] md:px-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#F3EDE2]/50">Desarrollo</p>
          <h2 className="mb-10 font-serif text-4xl font-bold italic leading-tight md:text-5xl">Tres días para construir tu técnica.</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Día 01', 'Teoría, diseño y patrones. Práctica en papel y plantilla de látex.'],
              ['Día 02', 'Demostración de hairstrokes y práctica en látex y diseño sobre modelo real.'],
              ['Día 03', 'Trabajo completo sobre modelo real, correcciones y entrega de diplomas.'],
            ].map(([day, text]) => <div key={day} className="rounded-2xl border border-[#F3EDE2]/10 bg-[#F3EDE2]/[0.05] p-6"><span className="font-mono text-xs text-[#F3EDE2]/60">{day}</span><p className="mt-5 text-sm leading-relaxed text-[#F3EDE2]/75">{text}</p></div>)}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[#F3EDE2]/60">Después de la formación tendrás 15 días de tareas prácticas corregidas individualmente y apoyo ilimitado en un grupo de WhatsApp.</p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <div><p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#0A0A0A]/50">Qué incluye</p><h2 className="mb-8 font-serif text-4xl font-bold italic leading-tight">Todo preparado para practicar.</h2><ul className="space-y-3">{includes.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#625C5C]"><span className="text-[#0A0A0A]">—</span>{item}</li>)}</ul></div>
          <div className="rounded-3xl bg-[#0A0A0A] p-8 text-[#F3EDE2] md:p-10"><p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#F3EDE2]/55">Información práctica</p><p className="mt-6 font-serif text-5xl font-bold italic">1.300 €</p><p className="mt-2 text-sm text-[#F3EDE2]/65">Formación exenta de IVA · La Eliana, Valencia</p><div className="mt-8 space-y-3 border-t border-[#F3EDE2]/15 pt-6 text-sm text-[#F3EDE2]/70"><p>Reserva de plaza: 250 € por Bizum al 647 122 470.</p><p>Fechas a consultar. La reserva no es reembolsable.</p><p>El dermógrafo no está incluido.</p></div></div>
        </div>
      </section>

      <section id="formulario" className="bg-[#E9DEC9] px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-2xl"><div className="mb-10 text-center"><p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#0A0A0A]/50">Solicita información</p><h2 className="mt-4 font-serif text-4xl font-bold italic">Empieza tu camino en hairstrokes.</h2><p className="mt-4 text-sm text-[#625C5C]">Rellena el formulario y te contactaremos en las próximas 24 h.</p></div>{status === 'success' ? <div className="rounded-3xl bg-white/65 p-12 text-center"><p className="font-serif text-3xl font-bold italic">¡Gracias por tu interés!</p><p className="mt-4 text-sm text-[#625C5C]">Hemos recibido tu solicitud y nos pondremos en contacto contigo.</p></div> : <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white/65 p-6 md:p-8"><div className="grid grid-cols-2 gap-3">{fields.map((field) => <div key={field.name} className={field.span === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}><label htmlFor={`hsi-${field.name}`} className="mb-1.5 block text-xs font-medium">{field.label}{field.required && <span className="ml-0.5">*</span>}</label>{renderField(field)}</div>)}</div>{status === 'error' && <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"><AlertCircle size={16} />No se pudo enviar. Inténtalo de nuevo.</div>}<button type="submit" disabled={status === 'loading'} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0A] py-4 text-sm font-semibold text-[#F3EDE2]">{status === 'loading' ? <><Loader2 size={16} className="animate-spin" />Enviando…</> : 'Solicitar información'}</button><p className="text-center text-[10px] text-[#625C5C]/70">Sin compromiso y sin cobro.</p></form>}</div>
      </section>

      <Footer />
      <Link to="/formaciones" className="fixed bottom-4 left-4 z-40 rounded-full bg-[#0A0A0A] px-4 py-2 text-xs font-semibold text-[#F3EDE2] shadow-lg">← Formaciones</Link>
    </main>
  );
}
