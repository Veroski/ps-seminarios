import { AlertCircle, ArrowLeft, Check, Loader2, LockKeyhole } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { formationsBySlug } from '../data/formations';

const SITE = 'https://www.patriciasongel.es';
const inputClass = 'w-full border border-[#1F1F1F]/15 bg-white px-3.5 py-3 font-sans text-sm text-[#1F1F1F] outline-none transition focus:border-[#C6A75C] focus:ring-2 focus:ring-[#C6A75C]/15';

function Field({ label, required, children }) {
  return (
    <label className="flex flex-col gap-1.5 font-sans text-xs font-medium text-[#1F1F1F]/70">
      <span>{label}{required && <span className="ml-0.5 text-[#C6A75C]">*</span>}</span>
      {children}
    </label>
  );
}

export default function CourseFormPage() {
  const { slug } = useParams();
  const formation = formationsBySlug[slug];
  const [form, setForm] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!formation) return <Navigate to="/formaciones" replace />;

  const update = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/formacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formacion: formation.slug }),
      });

      if (!response.ok) throw new Error('No se pudo enviar el formulario');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const canonical = `${SITE}/formacion/${formation.slug}`;
  const title = `${formation.title} | Patricia Songel`;
  const description = formation.online
    ? `${formation.title}: plazas completas. Apúntate a la lista de espera para recibir aviso cuando abramos nuevas plazas.`
    : `${formation.title} con Patricia Songel. Solicita información mediante el formulario sin compromiso.`;

  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#F7F7F5] px-4 py-6 text-[#1F1F1F] sm:px-6 sm:py-10">
      <Seo title={title} description={description} canonical={canonical} image={`${SITE}${formation.image}`} imageAlt={formation.title} />
      <div aria-hidden="true" className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(31,31,31,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(31,31,31,0.035)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div aria-hidden="true" className="absolute -right-36 -top-36 size-[28rem] rounded-full bg-[#C6A75C]/10 blur-3xl" />

      <section className="relative mx-auto w-full max-w-3xl border border-[#1F1F1F]/10 bg-[#ECEBE7]/90 p-5 shadow-[0_24px_80px_rgba(31,31,31,0.1)] backdrop-blur-sm sm:p-8 lg:p-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <Link to="/formaciones" className="inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#1F1F1F]/58 transition hover:text-[#1F1F1F]">
            <ArrowLeft aria-hidden="true" size={14} />
            Formaciones
          </Link>
          <Link to="/" aria-label="Ir al inicio" className="font-serif text-2xl font-semibold tracking-[-0.08em]">PS</Link>
        </div>

        <header className="mb-7 text-center">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-[#1F1F1F]/48">{formation.eyebrow}</p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,6vw,3.5rem)] font-bold italic leading-none tracking-[-0.04em]">{formation.title}</h1>
          <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-relaxed text-[#1F1F1F]/62">
            {formation.online ? 'Déjanos tus datos para avisarte en cuanto abramos nuevas plazas.' : 'Rellena el formulario y te contactaremos para darte toda la información.'}
          </p>
        </header>

        {formation.online && (
          <div className="mb-6 flex items-start gap-3 border border-[#C6A75C]/35 bg-[#C6A75C]/10 p-4 text-left">
            <LockKeyhole aria-hidden="true" className="mt-0.5 shrink-0 text-[#8A7138]" size={18} />
            <p className="font-sans text-sm leading-relaxed text-[#1F1F1F]/75">
              Todas las plazas de esta formación online están completas. Abriremos nuevas plazas muy pronto. Envía el formulario y te añadiremos a la lista de espera.
            </p>
          </div>
        )}

        {status === 'success' ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-5 text-center" role="status">
            <span className="grid size-14 place-items-center rounded-full border border-[#C6A75C]/35 bg-[#C6A75C]/12 text-[#8A7138]"><Check aria-hidden="true" size={24} /></span>
            <div>
              <h2 className="font-serif text-3xl font-bold italic">{formation.online ? 'Ya estás en la lista.' : 'Solicitud recibida.'}</h2>
              <p className="mt-2 font-sans text-sm text-[#1F1F1F]/62">Te contactaremos muy pronto. Gracias por tu interés.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre completo" name="nombre" required>
                <input className={inputClass} id="nombre" name="nombre" autoComplete="name" required value={form.nombre || ''} onChange={update} placeholder="Tu nombre" />
              </Field>
              <Field label="Correo electrónico" name="email" required>
                <input className={inputClass} id="email" name="email" type="email" autoComplete="email" required value={form.email || ''} onChange={update} placeholder="tu@correo.com" />
              </Field>
              <Field label="Teléfono" name="telefono" required>
                <input className={inputClass} id="telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" required value={form.telefono || ''} onChange={update} placeholder="+34 000 000 000" />
              </Field>
              <Field label={formation.experienceLabel} name="experiencia" required>
                <select className={`${inputClass} appearance-none`} id="experiencia" name="experiencia" required value={form.experiencia || ''} onChange={update}>
                  <option value="">Seleccionar…</option>
                  {formation.experienceOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </Field>
              {formation.investmentOptions && (
                <div className="sm:col-span-2">
                  <Field label="¿Cuánto estás dispuesto/a a invertir?" name="inversion" required>
                    <select className={`${inputClass} appearance-none`} id="inversion" name="inversion" required value={form.inversion || ''} onChange={update}>
                      <option value="">Seleccionar…</option>
                      {formation.investmentOptions.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </Field>
                </div>
              )}
              <div className="sm:col-span-2">
                <Field label="¿Alguna pregunta?" name="mensaje">
                  <textarea className={`${inputClass} min-h-20 resize-y`} id="mensaje" name="mensaje" maxLength={2000} value={form.mensaje || ''} onChange={update} placeholder="Cuéntanos qué quieres saber…" />
                </Field>
              </div>
            </div>

            {status === 'error' && (
              <p className="flex items-center gap-2 bg-red-50 p-3 font-sans text-sm text-red-700" role="alert">
                <AlertCircle aria-hidden="true" size={17} />
                Hubo un error al enviar. Inténtalo de nuevo.
              </p>
            )}

            <button type="submit" disabled={status === 'loading'} className="flex w-full items-center justify-center gap-2 bg-[#1F1F1F] px-5 py-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#F7F7F5] transition hover:bg-[#C6A75C] hover:text-[#1F1F1F] disabled:cursor-wait disabled:opacity-65">
              {status === 'loading' && <Loader2 aria-hidden="true" className="animate-spin" size={17} />}
              {status === 'loading' ? 'Enviando…' : formation.online ? 'Unirme a la lista de espera' : 'Solicitar información'}
            </button>
            <p className="text-center font-sans text-[0.65rem] leading-relaxed text-[#1F1F1F]/48">
              Sin cobros. Tus datos se tratarán según nuestra <Link to="/privacidad" className="underline underline-offset-2">política de privacidad</Link>.
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
