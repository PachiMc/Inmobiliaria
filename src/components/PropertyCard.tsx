import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "5491112345678";

export interface PropertyCardData {
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
  destacado: boolean;
  google_maps?: string | null;
  images?: { id: number; url: string; orden: number }[];
}

function formatPrecio(precio: number | null, moneda: string): string {
  if (precio == null) return "Consultar";
  if (moneda === "USD") return `USD ${precio.toLocaleString("es-AR")}`;
  return `$ ${precio.toLocaleString("es-AR")}`;
}

export default function PropertyCard({ 
  p, 
  isSelected = false, 
  onSelect,
  compact = false 
}: { 
  p: PropertyCardData;
  isSelected?: boolean;
  onSelect?: () => void;
  compact?: boolean;
}) {
  const img = p.images?.[0]?.url || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80";
  const precioLabel = p.operacion === "alquiler" ? "Precio de alquiler" : "Precio de venta";
  const waText = encodeURIComponent(
    `¡Hola! Quiero más información sobre: ${p.titulo || p.codigo}`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  // Versión compacta para sidebar del mapa
  if (compact) {
    return (
      <div 
        className={`flex gap-3 p-2.5 rounded-lg border cursor-pointer transition ${
          isSelected ? 'bg-blue-50 border-primary shadow-md' : 'bg-white border-gray-200 hover:border-gray-300'
        }`}
        onClick={onSelect}
      >
        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={img}
            alt={p.titulo || p.codigo}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-primary">{formatPrecio(p.precio, p.moneda)}</p>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{p.titulo || p.codigo}</h3>
          <p className="text-xs text-gray-500 line-clamp-1">{p.direccion}</p>
          <ul className="mt-1 flex gap-2 text-xs text-gray-600">
            {p.metros_cuadrados != null && <li>📐 {p.metros_cuadrados}m²</li>}
            {p.dormitorios > 0 && <li>🛏️ {p.dormitorios}</li>}
            {p.banos > 0 && <li>🚿 {p.banos}</li>}
          </ul>
        </div>
      </div>
    );
  }

  // Versión normal para grid
  return (
    <article 
      className={`flex flex-col overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-0.5 hover:shadow-xl transform-gpu ${
        isSelected ? 'border-primary ring-2 ring-primary/70 shadow-lg' : 'border-gray-200 shadow-sm'
      }`}
      onClick={onSelect}
    >
      <div className="relative aspect-video bg-gray-100 transition-transform duration-300 hover:scale-[1.01] overflow-hidden">
        <Image
          src={img}
          alt={p.titulo || p.codigo}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {p.destacado && (
          <span className="absolute left-2 top-2 rounded bg-accent px-2 py-0.5 text-xs font-medium text-black">
            Destacado
          </span>
        )}
        <span className="absolute right-2 top-2 rounded bg-primary/90 px-2 py-0.5 text-xs font-medium text-black">
          {p.operacion === "alquiler" ? "Alquiler" : "Venta"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs font-semibold text-primary">
          {formatPrecio(p.precio, p.moneda)}
        </p>
        <h3 className="mt-1 font-semibold text-gray-900 text-sm line-clamp-1">{p.titulo || p.codigo}</h3>
        {p.direccion && <p className="text-xs text-gray-500 line-clamp-1">{p.direccion}</p>}
        <ul className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
          {p.metros_cuadrados != null && <li>📐 {p.metros_cuadrados}m²</li>}
          {p.dormitorios > 0 && <li>🛏️ {p.dormitorios}</li>}
          {p.banos > 0 && <li>🚿 {p.banos}</li>}
        </ul>
        <div className="mt-2 flex gap-1.5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-green-300 bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-200 flex-1 justify-center"
          >
            WhatsApp
          </a>
          <Link
            href={`/propiedad/${p.id}`}
            className="inline-flex items-center justify-center rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
          >
            Detalles
          </Link>
        </div>
      </div>
    </article>
  );
}
