"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBox from "@/components/SearchBox";
import PropertyCard from "@/components/PropertyCard";
import PropertiesMap from "@/components/PropertiesMap";
import type { PropertyCardData } from "@/components/PropertyCard";

function PropiedadesContent() {
  const searchParams = useSearchParams();
  const [list, setList] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "map">("map");
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const propertyItemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const tipo = searchParams.get("tipo") || "";
    const operacion = searchParams.get("operacion") || "";
    const q = searchParams.get("q") || "";
    const params = new URLSearchParams();
    if (tipo) params.set("tipo", tipo);
    if (operacion) params.set("operacion", operacion);
    if (q) params.set("q", q);
    setLoading(true);
    fetch(`/api/properties?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setList(Array.isArray(data) ? data : []);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, [searchParams]);

  useEffect(() => {
    if (viewMode !== "map" || selectedPropertyId == null) return;

    const selectedItem = propertyItemRefs.current[selectedPropertyId];
    if (!selectedItem) return;

    selectedItem.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [selectedPropertyId, viewMode]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-9rem)] bg-black rounded-3xl border border-white/10 shadow-sm">
      {/* Header */}
      <div className="border-b border-white/10 bg-slate-950/90 px-4 py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Propiedades</h1>
            {!loading && <p className="text-sm text-slate-400 mt-1">{list.length} disponible{list.length !== 1 ? "s" : ""}</p>}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`px-5 py-2.5 rounded-lg font-medium transition text-sm ${
                viewMode === "map"
                  ? "border border-white/20 bg-white/10 text-white shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              🗺️ Mapa
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-5 py-2.5 rounded-lg font-medium transition text-sm ${
                viewMode === "list"
                  ? "border border-white/20 bg-white/10 text-white shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              📋 Lista
            </button>
          </div>
        </div>
        <div>
          <SearchBox />
        </div>
      </div>

      {/* Main Content */}
      {viewMode === "map" ? (
        !loading && list.length > 0 ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:h-[calc(100vh-9.5rem)] lg:flex-row lg:gap-0">
            <div className="relative flex h-[620px] min-h-0 w-full flex-col gap-3 bg-slate-950/70 p-3 lg:h-full lg:w-[45%] lg:p-4">
              <div className="flex h-[76px] shrink-0 flex-col justify-center rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <h2 className="font-semibold text-white">Propiedades encontradas</h2>
                <p className="mt-1 text-xs text-slate-400">Haz clic para ver en el mapa</p>
              </div>
              <div className="properties-map-results-body min-h-0 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
                <div className="property-results-scroll h-full overflow-y-auto overscroll-contain">
                  <div className="space-y-3 p-4 sm:p-5">
                    {list.map((p) => (
                      <div
                        key={p.id}
                        ref={(element) => {
                          propertyItemRefs.current[p.id] = element;
                        }}
                      >
                        <PropertyCard
                          p={p}
                          isSelected={selectedPropertyId === p.id}
                          onSelect={() => setSelectedPropertyId(p.id)}
                          compact={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex h-[620px] min-h-0 w-full flex-col gap-3 bg-slate-950/70 p-3 lg:h-full lg:w-[55%] lg:p-4">
              <div className="flex h-[76px] shrink-0 items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <div>
                  <h2 className="font-semibold text-white">Mapa de propiedades</h2>
                  <p className="text-xs text-slate-400 mt-1">Vista más amplia para comparar resultados y ubicación</p>
                </div>
                <p className="text-xs text-slate-500">{list.length} resultado{list.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="properties-map-results-body min-h-0 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                <PropertiesMap
                  properties={list}
                  onMarkerClick={(propertyId) => setSelectedPropertyId(propertyId)}
                  selectedPropertyId={selectedPropertyId}
                />
              </div>
            </div>
          </div>
        ) : !loading && list.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center">
              <p className="text-slate-400 mb-2">No se encontraron propiedades</p>
              <p className="text-sm text-slate-500">Intenta con otros filtros</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-12">
            <p className="text-slate-400">Cargando propiedades...</p>
          </div>
        )
      ) : (
        /* Vista de lista */
        <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-900" />
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-2">No se encontraron propiedades</p>
              <p className="text-sm text-slate-500">Intenta con otros filtros</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {list.map((p) => (
                <PropertyCard key={p.id} p={p} compact={false} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PropiedadesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col h-screen bg-black">
          <div className="border-b border-white/10 bg-slate-950/90 px-4 py-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Propiedades</h1>
          </div>
        </div>
      }
    >
      <PropiedadesContent />
    </Suspense>
  );
}
