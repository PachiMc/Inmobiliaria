import FeaturedPropertiesCarousel from "@/components/FeaturedPropertiesCarousel";
import Slider from "@/components/Slider";
import SearchHero from "@/components/SearchHero";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative left-1/2 right-1/2 -mt-4 w-screen -translate-x-1/2">
        <Slider />
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6">
          <SearchHero />
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6">
        <section className="mb-14 rounded-3xl border border-white/30 bg-white p-6 shadow-inner">
          <h2 className="mb-4 text-2xl font-bold text-black">Por qué elegirnos</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-lg">
              <h3 className="text-lg font-semibold text-black">Atención personalizada</h3>
              <p className="mt-2 text-slate-700">Te acompañamos en cada paso, análisis de oferta y cierre de operación.</p>
            </article>
            <article className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-lg">
              <h3 className="text-lg font-semibold text-black">Propiedades verificadas</h3>
              <p className="mt-2 text-slate-700">Cada inmueble se valida previamente para evitar sorpresas.</p>
            </article>
            <article className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-lg">
              <h3 className="text-lg font-semibold text-black">Financiamiento y asesoría</h3>
              <p className="mt-2 text-slate-700">Te conectamos con opciones de crédito y seguro más convenientes.</p>
            </article>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Propiedades destacadas</h2>
            <Link href="/propiedades" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
              Ver todas las propiedades
            </Link>
          </div>
          <FeaturedPropertiesCarousel />
        </section>

        <section className="mb-14 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-white">Sobre Nosotros</h2>
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/70 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Contacto rápido</p>
              <p className="mt-5 whitespace-nowrap text-xl font-semibold leading-tight text-white sm:text-2xl">+54 9 11 1234 5678</p>
              <p className="mt-3 text-slate-400">Asesoramiento inmediato y disponibilidad para visitas.</p>
            </div>
            <div>
              <p className="text-slate-300">
                Somos una inmobiliaria con más de 10 años de experiencia ayudando a clientes a comprar, vender y alquilar propiedades con seguridad.
                Nuestro equipo está especializado en mercado local y asesoramiento legal y fiscal.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/nosotros" className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15">
                  Conocé más →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-white">Contactanos</h2>
          <p className="text-slate-300">¿Tenés dudas o querés asesoramiento personalizado? Enviános un mensaje o comunicate por WhatsApp.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contacto" className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15">
              Formulario de contacto
            </Link>
            <Link href="/" className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15">
              WhatsApp directo
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
