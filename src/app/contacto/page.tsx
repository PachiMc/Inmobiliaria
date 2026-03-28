export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contacto</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contactanos a través de nuestros canales o utiliza el formulario a continuación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Información de Contacto</h2>

            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 hover:border-white/20 transition-shadow">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-white">Correo Electrónico</h3>
              </div>
              <p className="text-slate-300">email@example.com</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 hover:border-white/20 transition-shadow">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="text-lg font-medium text-white">Teléfono</h3>
              </div>
              <p className="text-slate-300">+1 (123) 456-7890</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 hover:border-white/20 transition-shadow">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-medium text-white">Dirección</h3>
              </div>
              <ul className="text-slate-300 space-y-2">
                <li>Calle Ficticia 123, Ciudad, País</li>
                <li>Avenida Imaginaria 456, Ciudad, País</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-6">Envíanos un Mensaje</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-3xl border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-3xl border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-3xl border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Tu mensaje aquí..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/90 overflow-hidden shadow-xl">
          <div className="border-b border-white/10 bg-black/70 px-6 py-5">
            <h2 className="text-xl font-semibold text-white">Nuestra ubicación</h2>
            <p className="text-sm text-slate-400">Encontranos en el mapa para ver dónde queda la inmobiliaria.</p>
          </div>
          <iframe
            title="Ubicación inmobiliaria"
            className="h-96 w-full border-0"
            src="https://www.google.com/maps?q=Calle+Ficticia+123+Ciudad+Argentina&output=embed"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
