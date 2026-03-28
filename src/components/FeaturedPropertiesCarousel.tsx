"use client";

import { useEffect, useMemo, useState } from "react";
import PropertyCard, { PropertyCardData } from "@/components/PropertyCard";

const MAX_ITEMS = 5;

function GroupCarousel({ title, items }: { title: string; items: PropertyCardData[] }) {
  if (!items.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-center text-slate-400">
        No hay propiedades destacadas para {title.toLowerCase()}.
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-400">Las mejores opciones del momento.</p>
        </div>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
        {items.map((property) => (
          <div key={property.id} className="min-w-[280px] snap-start sm:min-w-[320px]">
            <PropertyCard p={property} variant="light" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FeaturedPropertiesCarousel() {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/properties?destacado=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          setProperties([]);
        }
      })
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  const ventas = useMemo(
    () => properties.filter((property) => property.operacion === "venta").slice(0, MAX_ITEMS),
    [properties]
  );

  const alquileres = useMemo(
    () => properties.filter((property) => property.operacion === "alquiler").slice(0, MAX_ITEMS),
    [properties]
  );

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {[1, 2].map((index) => (
          <div key={index} className="h-80 animate-pulse rounded-3xl bg-slate-900/80" />
        ))}
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 text-center text-slate-300">
        No hay propiedades destacadas todavía. Agregá algunas desde el panel de administrador.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GroupCarousel title="Ventas destacadas" items={ventas} />
      <GroupCarousel title="Alquileres destacadas" items={alquileres} />
    </div>
  );
}
