import FeaturedPropertiesCarousel from "@/components/FeaturedPropertiesCarousel";
import Slider from "@/components/Slider";
import SearchHero from "@/components/SearchHero";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="relative left-1/2 right-1/2 -mt-4 flex h-[50vh] max-h-[60vh] w-screen max-w-none -translate-x-1/2 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 w-full">
          <Slider />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl pt-10 sm:pt-12">
        <div className="mb-6">
          <SearchHero />
        </div>

        <section className="mb-14 text-center">
          <h2 className="mb-6 text-2xl font-bold text-white">Seguinos en redes sociales</h2>
          <div className="flex justify-center gap-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/15"
              aria-label="Facebook"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/15"
              aria-label="Instagram"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.5 2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 7.75a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Z"/>
              </svg>
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Propiedades destacadas</h2>
            <Link
              href="/propiedades"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
            >
              Ver todas las propiedades
            </Link>
          </div>
          <FeaturedPropertiesCarousel />
        </section>

        <section className="mb-16 rounded-3xl border border-white/15 bg-white p-6 shadow-inner sm:p-8">
          <h2 className="mb-2 text-2xl font-bold text-black">Servicios y valor agregado</h2>
          <p className="mb-6 max-w-3xl text-slate-600">
            Formación y respaldo profesional con foco en operaciones seguras, documentación impecable y acompañamiento integral.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-black">Tasaciones</h3>
              <p className="mt-2 text-slate-700">
                Tasación profesional para definir valores de mercado con criterio técnico y respaldo documental.
              </p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-black">Subastas y remates</h3>
              <p className="mt-2 text-slate-700">
                Realización de remates y subastas con matrícula habilitante e inscripción correspondiente en el Colegio de Martilleros.
              </p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-black">Asesoría jurídica integral</h3>
              <p className="mt-2 text-slate-700">
                Acompañamiento legal en el análisis de pros y contras de cada operación, con revisión exhaustiva de la documentación para
                evitar sorpresas negativas.
              </p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-black">Atención personalizada</h3>
              <p className="mt-2 text-slate-700">Te acompañamos en cada paso, desde la primera visita hasta el cierre.</p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-black">Propiedades verificadas</h3>
              <p className="mt-2 text-slate-700">Cada inmueble se revisa con antelación para reducir riesgos y tiempos perdidos.</p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-black">Financiamiento y seguros</h3>
              <p className="mt-2 text-slate-700">Te conectamos con opciones de crédito y coberturas alineadas a tu perfil.</p>
            </article>
          </div>
        </section>

        <section className="mb-14 rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Sobre nosotros</h2>
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Contacto rápido</p>
              <p className="mt-5 whitespace-nowrap text-xl font-semibold leading-tight text-white sm:text-2xl">+54 9 11 1234 5678</p>
              <p className="mt-3 text-slate-400">Asesoramiento inmediato y coordinación de visitas.</p>
            </div>
            <div>
              <p className="text-slate-300">
                Somos <span className="font-semibold text-white">Chaya Gorelik · Negocios Inmobiliarios</span>, con trayectoria en compra,
                venta y alquiler, respaldados por formación profesional y cumplimiento normativo —incluyendo actuación en subastas y remates
                bajo la órbita del Colegio de Martilleros— y un enfoque legal que prioriza la lectura fina de cada expediente.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/nosotros"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Conocé más →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-sm sm:p-8">
          <h2 className="mb-3 text-2xl font-bold text-white">Contactanos</h2>
          <p className="text-slate-300">¿Tenés dudas o querés asesoramiento personalizado? Enviános un mensaje o comunicate por WhatsApp.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
            >
              Formulario de contacto
            </Link>
            <Link
              href="/"
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
            >
              WhatsApp directo
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
