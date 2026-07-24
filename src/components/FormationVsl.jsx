export default function FormationVsl() {
  return (
    <section id="conoce-el-metodo" className="relative overflow-hidden bg-[#F3EDE2] px-6 py-20 text-[#0A0A0A] scroll-mt-32 md:px-16 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(10,10,10,0.35) 0.8px, transparent 0.9px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div className="max-w-xl">
          <p className="text-overline text-[#0A0A0A]/60">Formación profesional</p>
          <h2 className="mt-6 font-serif text-5xl italic leading-[0.96] tracking-tight md:text-6xl lg:text-7xl">
            La formación que te da criterio.
          </h2>
          <p className="mt-8 max-w-lg text-copy-dark">
            Descubre el método con el que Patricia enseña a analizar cada piel, diseñar con intención y trabajar con seguridad desde el primer día.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[#F3EDE2]/70 bg-[#0A0A0A] p-3 shadow-[0_24px_60px_rgba(10,10,10,0.2)] md:rounded-[2rem] md:p-4">
          <div className="flex items-center justify-between px-2 pb-3 pt-1 md:px-3 md:pb-4">
            <p className="text-overline text-[#F3EDE2]/70">Conoce el método</p>
            <span className="h-px w-10 bg-[#F3EDE2]/25" />
          </div>
          <video
            className="aspect-video w-full rounded-[1.15rem] bg-black object-cover md:rounded-[1.35rem]"
            controls
            playsInline
            preload="metadata"
            poster="/videos/formaciones-vsl.webp"
            aria-label="Patricia Songel explica el método de sus formaciones"
          >
            <source src="/videos/formaciones-vsl.mp4" type="video/mp4" />
            Tu navegador no admite la reproducción de vídeo.
          </video>
          <p className="px-2 pb-1 pt-4 text-sm text-[#F3EDE2]/80 md:px-3">Patricia Songel · Formación profesional</p>
        </div>
      </div>
    </section>
  );
}
