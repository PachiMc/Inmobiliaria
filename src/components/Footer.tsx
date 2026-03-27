import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo y Descripción */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-bold !text-white">Inmobiliaria</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tu socio confiable en el mundo inmobiliario. Encontramos el hogar perfecto para ti con profesionalismo y dedicación.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="mb-4 text-lg font-bold !text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="!text-white font-semibold hover:!text-gray-300 transition-colors">Inicio</Link></li>
              <li><Link href="/propiedades" className="!text-white font-semibold hover:!text-gray-300 transition-colors">Propiedades</Link></li>
              <li><Link href="/nosotros" className="!text-white font-semibold hover:!text-gray-300 transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="!text-white font-semibold hover:!text-gray-300 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="mb-4 text-lg font-bold !text-white">Servicios</h4>
            <ul className="space-y-2 text-sm text-white font-medium">
              <li>Venta de Propiedades</li>
              <li>Alquiler de Inmuebles</li>
              <li>Asesoramiento Inmobiliario</li>
              <li>Gestión de Propiedades</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-4 text-lg font-bold !text-white">Contacto</h4>
            <div className="space-y-2 text-sm text-white font-medium">
              <p>
                <span className="block font-semibold">Email:</span>
                <a href="mailto:contacto@inmobiliaria.com" className="!text-white hover:!text-gray-300 transition-colors">
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

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Inmobiliaria. Todos los derechos reservados. | Diseñado con ❤️ para encontrar tu hogar ideal.
          </p>
        </div>
      </div>
    </footer>
  );
}
