"use client";

import { useEffect, useState, Suspense } from "react";
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

  return (
    <div className="flex flex-col min-h-[calc(100vh-9rem)] bg-slate-50 rounded-2xl border border-gray-200 p-0 shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Propiedades</h1>
            {!loading && <p className="text-sm text-gray-500 mt-1">{list.length} disponible{list.length !== 1 ? "s" : ""}</p>}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`px-5 py-2.5 rounded-lg font-medium transition text-sm ${
                viewMode === "map" 
                  ? "bg-primary text-black shadow-sm" 
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              🗺️ Mapa
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-5 py-2.5 rounded-lg font-medium transition text-sm ${
                viewMode === "list" 
                  ? "bg-primary text-black shadow-sm" 
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
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
          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Mapa (ocupa 2/3 en desktop, todo en mobile) */}
            <div className="flex flex-1 relative">
              <PropertiesMap 
                properties={list} 
                onMarkerClick={(propertyId) => setSelectedPropertyId(propertyId)}
                selectedPropertyId={selectedPropertyId}
              />
            </div>

            {/* Lista Sidebar (1/3 en desktop, hidden en mobile) */}
            <div className="hidden lg:flex lg:w-1/3 flex-col bg-white border-l border-gray-200">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Propiedades encontradas</h2>
                <p className="text-xs text-gray-500 mt-1">Haz clic para ver en el mapa</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-2 p-3 sm:p-4">
                  {list.map((p) => (
                    <PropertyCard 
                      key={p.id} 
                      p={p} 
                      isSelected={selectedPropertyId === p.id}
                      onSelect={() => setSelectedPropertyId(p.id)}
                      compact={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : !loading && list.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 mb-2">No se encontraron propiedades</p>
              <p className="text-sm text-gray-500">Intenta con otros filtros</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Cargando propiedades...</p>
          </div>
        )
      ) : (
        /* Vista de lista */
        <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-200" />
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-2">No se encontraron propiedades</p>
              <p className="text-sm text-gray-500">Intenta con otros filtros</p>
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
    <Suspense fallback={
      <div className="flex flex-col h-screen bg-white">
        <div className="border-b border-gray-100 bg-white px-4 py-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Propiedades</h1>
        </div>
      </div>
    }>
      <PropiedadesContent />
    </Suspense>
  );
}
