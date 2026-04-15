import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-bold !text-white">Chaya Gorelik</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Negocios inmobiliarios con respaldo profesional: tasaciones, subastas y remates con matrícula habilitante, y asesoría jurídica
              integral con revisión detallada de documentación.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold !text-white">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="!text-white font-semibold transition-colors hover:!text-gray-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/propiedades" className="!text-white font-semibold transition-colors hover:!text-gray-300">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="!text-white font-semibold transition-colors hover:!text-gray-300">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="!text-white font-semibold transition-colors hover:!text-gray-300">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold !text-white">Servicios</h4>
            <ul className="space-y-2 text-sm font-medium text-white">
              <li>Venta y alquiler de propiedades</li>
              <li>Tasaciones profesionales</li>
              <li>Subastas y remates (Colegio de Martilleros)</li>
              <li>Asesoría jurídica integral y revisión documental</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold !text-white">Contacto</h4>
            <div className="space-y-2 text-sm font-medium text-white">
              <p>
                <span className="block font-semibold">Email:</span>
                <a href="mailto:contacto@inmobiliaria.com" className="!text-white transition-colors hover:!text-gray-300">
                  contacto@inmobiliaria.com
                </a>
              </p>
              <p>
                <span className="block font-semibold">Teléfono:</span>
                +54 9 11 1234 5678
              </p>
              <p>
                <span className="block font-semibold">Dirección:</span>
                Calle Principal 123, Ciudad
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Chaya Gorelik · Negocios Inmobiliarios. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
