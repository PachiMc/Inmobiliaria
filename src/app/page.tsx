import Slider from "@/components/Slider";
import SearchBox from "@/components/SearchBox";
import FeaturedPropertiesCarousel from "@/components/FeaturedPropertiesCarousel";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Slider />

      <main className="mx-auto -mt-20 max-w-7xl px-4 pb-16 sm:px-6">
        <div className="relative z-10 mx-auto mb-10 max-w-4xl rounded-3xl border border-white/30 bg-white/85 p-5 shadow-2xl backdrop-blur sm:p-8">
          <h1 className="text-center text-3xl font-extrabold text-primary sm:text-4xl">Encontrá tu próximo hogar con confianza</h1>
          <p className="mt-3 text-center text-black sm:text-lg">Búsqueda rápida por tipo, operación y ubicación. Propiedades verificadas a un clic.</p>
          <div className="mt-6">
            <SearchBox />
          </div>
        </div>

        <section className="mb-14 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-cyan-50 p-6 shadow-inner">
          <h2 className="mb-4 text-2xl font-bold text-primary">Por qué elegirnos</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-primary">Atención personalizada</h3>
              <p className="mt-2 text-black">Te acompañamos en cada paso, análisis de oferta y cierre de operación.</p>
            </article>
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-primary">Propiedades verificadas</h3>
              <p className="mt-2 text-black">Cada inmueble se valida previamente para evitar sorpresas.</p>
            </article>
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-primary">Financiamiento y asesoría</h3>
              <p className="mt-2 text-black">Te conectamos con opciones de crédito y seguro más convenientes.</p>
            </article>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-primary">Propiedades destacadas</h2>
            <Link href="/propiedades" className="rounded-lg border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20">
              Ver todas las propiedades
            </Link>
          </div>
          <FeaturedPropertiesCarousel />
        </section>

        <section className="mb-14 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-primary">Sobre Nosotros</h2>
          <p className="max-w-3xl text-black">
            Somos una inmobiliaria con más de 10 años de experiencia ayudando a clientes a comprar, vender y alquilar propiedades con seguridad.
            Nuestro equipo está especializado en mercado local y asesoramiento legal y fiscal.
          </p>
          <Link href="/nosotros" className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-black hover:bg-primary-light">
            Conocé más →
          </Link>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-primary">Contactanos</h2>
          <p className="text-black">¿Tenés dudas o querés asesoramiento personalizado? Enviános un mensaje o comunicate por WhatsApp.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contacto" className="rounded-lg border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20">
              Formulario de contacto
            </Link>
            <Link href="/" className="rounded-lg border border-green-500 bg-green-100 px-5 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-200">
              WhatsApp directo
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
