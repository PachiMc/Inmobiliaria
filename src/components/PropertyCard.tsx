import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  compact = false,
  variant = "dark"
}: { 
  p: PropertyCardData;
  isSelected?: boolean;
  onSelect?: () => void;
  compact?: boolean;
  variant?: "dark" | "light";
}) {
  const router = useRouter();
  const img = p.images?.[0]?.url || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80";
  const detailsHref = `/propiedad/${p.id}`;
  const waText = encodeURIComponent(
    `¡Hola! Quiero más información sobre: ${p.titulo || p.codigo}`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  const handleCardClick = () => {
    if (onSelect) {
      onSelect();
      return;
    }
    router.push(detailsHref);
  };

  // Versión compacta para sidebar del mapa
  if (compact) {
    return (
      <div 
        className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition ${
          isSelected ? 'bg-white/10 border-primary shadow-md' : 'bg-slate-950 border-white/10 hover:border-white/20'
        }`}
        onClick={onSelect}
      >
        <div className="relative h-28 w-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={img}
            alt={p.titulo || p.codigo}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-white">{formatPrecio(p.precio, p.moneda)}</p>
          <h3 className="text-lg font-semibold text-white line-clamp-1">{p.titulo || p.codigo}</h3>
          <p className="mt-1 text-base text-slate-400 line-clamp-1">{p.direccion}</p>
          <ul className="mt-2 flex gap-3.5 text-base text-slate-400">
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
      className={`flex flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-0.5 hover:shadow-xl transform-gpu ${
        variant === "light"
          ? isSelected
            ? "border-slate-300 bg-white ring-2 ring-black/10 shadow-2xl"
            : "border-slate-200 bg-white shadow-sm"
          : isSelected
            ? "border-white/80 bg-slate-900 ring-2 ring-white/30 shadow-2xl"
            : "border-white/10 bg-slate-950 shadow-sm"
      }`}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
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
          <span className="absolute left-2 top-2 rounded bg-white px-2 py-0.5 text-xs font-medium text-black">
            Destacado
          </span>
        )}
        <span className={`absolute right-2 top-2 rounded px-2 py-0.5 text-xs font-medium ${variant === "light" ? "bg-black/65 text-white" : "bg-white/10 text-white"}`}>
          {p.operacion === "alquiler" ? "Alquiler" : "Venta"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className={`text-xs font-semibold ${variant === "light" ? "text-slate-900" : "text-white"}`}>
          {formatPrecio(p.precio, p.moneda)}
        </p>
        <h3 className={`mt-1 text-sm font-semibold line-clamp-1 ${variant === "light" ? "text-slate-900" : "text-white"}`}>{p.titulo || p.codigo}</h3>
        {p.direccion && <p className={`text-xs line-clamp-1 ${variant === "light" ? "text-slate-600" : "text-slate-400"}`}>{p.direccion}</p>}
        <ul className={`mt-2 flex flex-wrap gap-2 text-xs ${variant === "light" ? "text-slate-600" : "text-slate-400"}`}>
          {p.metros_cuadrados != null && <li>📐 {p.metros_cuadrados}m²</li>}
          {p.dormitorios > 0 && <li>🛏️ {p.dormitorios}</li>}
          {p.banos > 0 && <li>🚿 {p.banos}</li>}
        </ul>
        <div className="mt-2 flex gap-1.5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex flex-1 items-center justify-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${
              variant === "light"
                ? "border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700"
                : "border-white/20 bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            WhatsApp
          </a>
          <Link
            href={detailsHref}
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium ${
              variant === "light"
                ? "border-slate-900 bg-slate-900 text-white hover:bg-black"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
          >
            Detalles
          </Link>
        </div>
      </div>
    </article>
  );
}
