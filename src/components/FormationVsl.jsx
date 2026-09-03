export default function FormationVsl() {
  return (
    <section id="conoce-el-metodo" className="relative overflow-hidden bg-[#F3EDE2] px-6 pb-14 text-[#0A0A0A] scroll-mt-32 md:px-16 md:pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(10,10,10,0.35) 0.8px, transparent 0.9px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="relative rounded-[1.75rem] border border-[#F3EDE2]/70 bg-[#0A0A0A] p-3 shadow-[0_24px_60px_rgba(10,10,10,0.2)] md:rounded-[2rem] md:p-4">
          <div className="flex items-center justify-between px-2 pb-3 pt-1 md:px-3 md:pb-4">
            <p className="text-overline text-[#F3EDE2]/70">Conoce el método</p>
            <span className="h-px w-10 bg-[#F3EDE2]/25" />
          </div>
          <iframe
            className="aspect-video w-full rounded-[1.15rem] bg-black md:rounded-[1.35rem]"
            src="https://www.youtube-nocookie.com/embed/tXrkBmz_psI?rel=0"
            title="Patricia Songel explica el método de sus formaciones"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-copy-dark">
          Descubre el método con el que Patricia enseña a analizar cada piel, diseñar con intención y trabajar con seguridad desde el primer día.
        </p>
      </div>
    </section>
  );
}
