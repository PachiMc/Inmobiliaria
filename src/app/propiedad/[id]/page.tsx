"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Carousel from "@/components/Carousel";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "5491112345678";

interface Property {
  id: number;
  codigo: string;
  titulo: string | null;
  descripcion: string | null;
  tipo: string;
  operacion: string;
  direccion: string | null;
  precio: number | null;
  moneda: string;
  dormitorios: number;
  banos: number;
  metros_cuadrados: number | null;
  images?: { id: number; url: string; orden: number }[];
}

function formatPrecio(precio: number | null, moneda: string): string {
  if (precio == null) return "Consultar";
  if (moneda === "USD") return `USD ${precio.toLocaleString("es-AR")}`;
  return `$ ${precio.toLocaleString("es-AR")}`;
}

export default function PropiedadPage() {
  const params = useParams();
  const id = Number(params.id);
  const [prop, setProp] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setLoading(false);
      return;
    }
    fetch(`/api/properties/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setProp)
      .catch(() => setProp(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="h-96 animate-pulse rounded-xl bg-slate-900" />
      </div>
    );
  }

  if (!prop) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center">
        <p className="text-white">Propiedad no encontrada.</p>
        <Link href="/propiedades" className="mt-4 inline-block text-primary hover:underline">
          Volver a propiedades
        </Link>
      </div>
    );
  }

  const waText = encodeURIComponent(`¡Hola! Me interesa esta propiedad: ${prop.titulo || prop.codigo}`);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/propiedades" className="mb-6 inline-block text-primary hover:underline">
        ← Volver a propiedades
      </Link>
      <div className="mb-8">
        <Carousel images={prop.images || []} alt={prop.titulo || prop.codigo} />
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="rounded bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary">
            {prop.operacion === "alquiler" ? "Alquiler" : "Venta"}
          </span>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{prop.titulo || prop.codigo}</h1>
          {prop.direccion && <p className="mt-1 text-slate-300">{prop.direccion}</p>}
          <p className="mt-4 text-lg font-semibold text-white">
            {prop.operacion === "alquiler" ? "Precio de alquiler: " : "Precio: "}
            {formatPrecio(prop.precio, prop.moneda)}
          </p>
          {prop.descripcion && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white">Descripción</h2>
              <p className="mt-2 whitespace-pre-wrap text-slate-300">{prop.descripcion}</p>
            </div>
          )}
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <h2 className="text-lg font-semibold text-white">Ubicación</h2>
            <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/70">
              <iframe
                title="Ubicación propiedad"
                className="h-80 w-full border-0"
                src={`https://www.google.com/maps?q=${encodeURIComponent(prop.direccion || prop.titulo || ":")}&output=embed`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
            <h2 className="text-lg font-semibold text-white">Características</h2>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li><strong>Código:</strong> {prop.codigo}</li>
              <li><strong>Tipo:</strong> {prop.tipo}</li>
              {prop.dormitorios > 0 && <li><strong>Dormitorios:</strong> {prop.dormitorios}</li>}
              {prop.banos > 0 && <li><strong>Baños:</strong> {prop.banos}</li>}
              {prop.metros_cuadrados != null && <li><strong>Metros cuadrados:</strong> {prop.metros_cuadrados} m²</li>}
            </ul>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white hover:bg-white/15"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
