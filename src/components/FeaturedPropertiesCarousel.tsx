"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import PropertyCard, { PropertyCardData } from "@/components/PropertyCard";

const MAX_ITEMS = 5;

function GroupCarousel({ title, items }: { title: string; items: PropertyCardData[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: items.length > 1, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi || items.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => window.clearInterval(interval);
  }, [emblaApi, items.length]);

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
      <div className="relative">
        <div className="overflow-hidden px-2 pb-2" ref={emblaRef}>
          <div className="flex">
            {items.map((property) => (
              <div key={property.id} className="min-w-0 flex-[0_0_88%] pr-4 sm:flex-[0_0_58%] lg:flex-[0_0_42%]">
                <PropertyCard p={property} variant="light" />
              </div>
            ))}
          </div>
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/55 p-2 text-white backdrop-blur transition hover:bg-black/75"
              aria-label={`Ver ${title.toLowerCase()} anteriores`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/55 p-2 text-white backdrop-blur transition hover:bg-black/75"
              aria-label={`Ver más ${title.toLowerCase()}`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
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
      <GroupCarousel title="Alquileres destacados" items={alquileres} />
    </div>
  );
}
