"use client";

import { useEffect, useMemo, useState } from "react";
import PropertyCard, { PropertyCardData } from "@/components/PropertyCard";

const AUTO_ADVANCE_MS = 6000;

export default function FeaturedPropertiesCarousel() {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [index, setIndex] = useState(0);
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

  useEffect(() => {
    if (properties.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % properties.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [properties.length]);

  const slides = useMemo(() => {
    const chunkSize = 6;
    const chunks = [] as PropertyCardData[][];
    for (let i = 0; i < properties.length; i += chunkSize) {
      chunks.push(properties.slice(i, i + chunkSize));
    }
    return chunks;
  }, [properties]);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!properties.length) {
    return (
      <p className="rounded-xl bg-gray-100 p-8 text-center text-gray-600">
        No hay propiedades destacadas todavía. Agregá algunas desde el panel de admin.
      </p>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div
          className="flex transition-transform duration-700"
          style={{ width: `${slides.length * 100}%`, transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((group, slideIndex) => (
            <div key={slideIndex} className="min-w-full p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((property) => (
                  <PropertyCard key={property.id} p={property} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Slide anterior"
          onClick={() => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))}
          className="absolute left-2 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 text-black shadow hover:bg-white"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Próximo slide"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className="absolute right-2 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-full bg-white/80 text-black shadow hover:bg-white"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
