import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Inmobiliaria Jade | Chaya Gorelik · Negocios Inmobiliarios",
  description:
    "Venta y alquiler, tasaciones profesionales, subastas y remates con respaldo del Colegio de Martilleros, y asesoría jurídica integral con revisión documental.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="min-h-screen bg-black text-white">
          <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
            {children}
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
