import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Inmobiliaria | Venta y Alquiler de Propiedades",
  description: "Encontrá tu próximo hogar. Propiedades en venta y alquiler.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="min-h-screen bg-slate-50 text-slate-900">
          <div className="container pt-4">{children}</div>
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
