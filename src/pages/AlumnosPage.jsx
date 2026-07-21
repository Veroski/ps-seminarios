import React from 'react';
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import PageTopBar from '../components/PageTopBar';
import Seo, { SITE } from '../components/Seo';
import { studentAreaConfig } from '../config/studentArea';

const authSteps = [
  {
    icon: UserRoundCheck,
    title: 'Compra o alta validada',
    text: 'La compra se completa desde un checkout de GHL o una alta manual. GHL crea o actualiza el contacto de la alumna.',
  },
  {
    icon: ShieldCheck,
    title: 'Permiso asignado en GHL',
    text: 'Un workflow concede la oferta del curso, añade la comunidad privada y marca el contacto como alumna activa.',
  },
  {
    icon: LockKeyhole,
    title: 'Login en Client Portal',
    text: 'La autenticación no vive en esta web pública. La sesión, contraseña y recuperación de acceso las gestiona GoHighLevel Client Portal / GoKollab.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}/alumnos#webpage`,
    url: `${SITE}/alumnos`,
    name: 'Área de alumnos Patricia Songel',
    description: 'Acceso para alumnas de las formaciones de Patricia Songel. Login mediante GoHighLevel Client Portal y GoKollab.',
    isPartOf: { '@id': `${SITE}/#website` },
    inLanguage: 'es-ES',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Área de alumnos', item: `${SITE}/alumnos` },
    ],
  },
];

export default function AlumnosPage() {
  const hasPortal = Boolean(studentAreaConfig.portalUrl);

  return (
    <main className="min-h-[100svh] bg-surface text-primary overflow-x-hidden">
      <Seo
        title="Área de alumnos | Login formaciones Patricia Songel"
        description="Inicia sesión en el área de alumnos de Patricia Songel. Acceso a cursos, comunidad y materiales mediante GoHighLevel Client Portal y GoKollab."
        canonical={`${SITE}/alumnos`}
        image={`${SITE}/patricia-portrait.webp`}
        imageAlt="Área de alumnos de Patricia Songel"
        jsonLd={jsonLd}
      />
      <PageTopBar ctaLabel="Pedir acceso" ctaHref="/pedir-cita" />

      <section className="relative px-6 md:px-16 pt-36 md:pt-44 pb-16 md:pb-24 bg-surface">
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(10,10,10,0.12),transparent)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-overline text-accent mb-5">Área privada de alumnas</p>
            <h1 className="font-serif italic font-bold text-5xl md:text-7xl leading-[0.96] tracking-normal mb-7">
              Iniciar sesión en la academia.
            </h1>
            <p className="font-sans text-base md:text-lg leading-[1.9] text-primary/65 max-w-xl">
              Desde aquí se accede a cursos, comunidad, materiales y seguimiento online. La web pública de Patricia Songel
              solo muestra el acceso; la autenticación real se hace en el portal seguro de GoHighLevel.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              {hasPortal ? (
                <a
                  href={studentAreaConfig.portalUrl}
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-primary text-surface px-7 py-4 rounded-full font-sans text-sm font-semibold hover:scale-[1.02] transition-transform"
                >
                  Iniciar sesión
                  <ArrowRight size={16} />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-3 bg-primary/10 text-primary/50 px-7 py-4 rounded-full font-sans text-sm font-semibold cursor-not-allowed"
                >
                  Iniciar sesión
                  <LockKeyhole size={16} />
                </button>
              )}
              <Link
                to="/pedir-cita"
                className="inline-flex items-center justify-center border border-primary/15 text-primary/75 px-7 py-4 rounded-full font-sans text-sm font-semibold hover:border-accent/50 hover:text-accent transition-colors"
              >
                Solicitar acceso
              </Link>
            </div>

            {!hasPortal ? (
              <p className="mt-5 font-sans text-sm leading-relaxed text-primary/55 max-w-xl">
                Falta configurar `VITE_GHL_PORTAL_URL` con el subdominio final del Client Portal. Cuando esté activo,
                este botón abrirá directamente el login de alumnas.
              </p>
            ) : null}
          </div>

          <div className="border border-primary/10 bg-white/70 p-6 md:p-8 rounded-[1.5rem] shadow-[0_24px_70px_rgba(13,13,18,0.08)]">
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-primary/10">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-primary/40">Proveedor de auth</p>
                <h2 className="font-sans font-semibold text-xl mt-2">{studentAreaConfig.auth.provider}</h2>
              </div>
              <span className="w-12 h-12 rounded-full bg-accent/12 flex items-center justify-center">
                <LockKeyhole size={20} className="text-accent" />
              </span>
            </div>

            <dl className="grid gap-4 py-6 border-b border-primary/10">
              <div className="flex items-start justify-between gap-5">
                <dt className="font-sans text-sm text-primary/55">App alumna</dt>
                <dd className="font-sans text-sm font-semibold text-right">{studentAreaConfig.auth.learnerApp}</dd>
              </div>
              <div className="flex items-start justify-between gap-5">
                <dt className="font-sans text-sm text-primary/55">Rol de esta web</dt>
                <dd className="font-sans text-sm font-semibold text-right">Redirección y explicación</dd>
              </div>
              <div className="flex items-start justify-between gap-5">
                <dt className="font-sans text-sm text-primary/55">Estado</dt>
                <dd className="font-sans text-sm font-semibold text-right">{hasPortal ? 'Login conectado' : 'Pendiente de URL GHL'}</dd>
              </div>
            </dl>

            <p className="pt-6 font-sans text-sm leading-[1.8] text-primary/60">
              No se publican tokens, Location ID ni claves privadas en React. Si más adelante se necesita una capa propia
              para video con marca de agua individual, esa API tendrá que vivir en backend.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 md:py-24 bg-[#F1EDED]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-px bg-accent" />
            <p className="text-overline text-accent">Cómo funciona el acceso</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {authSteps.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-surface border border-primary/10 p-6 rounded-2xl">
                <span className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Icon size={18} className="text-accent" />
                </span>
                <h3 className="font-sans font-semibold text-lg mb-3">{title}</h3>
                <p className="font-sans text-sm leading-[1.8] text-primary/60">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-3 text-primary/65">
            <CheckCircle2 size={18} className="text-accent mt-1 shrink-0" />
            <p className="font-sans text-sm leading-[1.8]">
              Resumen técnico: PatriciaSongel.es no guarda contraseñas de alumnas. GHL emite la sesión del Client Portal,
              controla recuperación de contraseña y aplica permisos de curso/comunidad según workflows.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
