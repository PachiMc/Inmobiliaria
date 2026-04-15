import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Sobre nosotros</h1>
      <p className="text-lg text-slate-300">
        Somos <span className="font-semibold text-white">Chaya Gorelik · Negocios Inmobiliarios</span>, un equipo orientado a operaciones
        transparentes, con formación continua y foco en la experiencia del cliente.
      </p>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-xl font-semibold text-white">Servicios destacados</h2>
        <ul className="list-inside list-disc space-y-3 marker:text-white/80">
          <li>
            <span className="font-semibold text-white">Tasaciones:</span> informes y valores acordes al mercado, con criterio profesional y
            documentación ordenada.
          </li>
          <li>
            <span className="font-semibold text-white">Subastas y remates:</span> actuación habilitada con inscripción en el Colegio de
            Martilleros, acompañando cada instancia con claridad y rigor.
          </li>
          <li>
            <span className="font-semibold text-white">Asesoría jurídica integral:</span> evaluación de pros y contras en cada operación y
            revisión exhaustiva de la documentación para anticipar contingencias.
          </li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-slate-950/80 p-6">
        <h2 className="text-xl font-semibold text-white">Nuestro enfoque</h2>
        <p className="mt-3 text-slate-300">
          Priorizamos la lectura jurídica y técnica de cada caso, tiempos de respuesta ágiles y una comunicación directa. Creemos que la
          diferencia está en el detalle: menos sorpresas, más decisiones informadas.
        </p>
      </section>

      <div className="mt-10">
        <Link
          href="/contacto"
          className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
        >
          Coordiná una reunión →
        </Link>
      </div>
    </div>
  );
}
