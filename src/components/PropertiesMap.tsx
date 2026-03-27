"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { PropertyCardData } from "@/components/PropertyCard";
import "leaflet/dist/leaflet.css";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Componente de control del mapa
const MapController = dynamic(() => import("react-leaflet").then(() => {
  const { useMap } = require("react-leaflet");
  return {
    default: function MapController({ selectedPropertyId, markers }: { selectedPropertyId?: number | null; markers: any[] }) {
      const map = useMap();

      useEffect(() => {
        if (!selectedPropertyId || !map) return;

        const selectedMarker = markers.find(marker => marker.id === selectedPropertyId);
        if (selectedMarker) {
          map.setView(selectedMarker.latlng, 15, { animate: true });
        }
      }, [selectedPropertyId, markers, map]);

      return null;
    }
  };
}), { ssr: false });

// NO usamos Google Maps como fuente primaria de coordenadas.
// Solo usamos coordenadas directas (lat/lng) o geocoding OpenStreetMap (Nominatim).
function parsePropertyLatLng(p: PropertyCardData): [number, number] | null {
  const latField = (p as any).latitud ?? (p as any).latitude ?? null;
  const lngField = (p as any).longitud ?? (p as any).longitude ?? null;
  if (latField != null && lngField != null) {
    const lat = Number(latField);
    const lng = Number(lngField);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return [lat, lng];
    }
  }
  return null;
}

export default function PropertiesMap({ 
  properties, 
  onMarkerClick,
  selectedPropertyId 
}: { 
  properties: PropertyCardData[];
  onMarkerClick?: (propertyId: number) => void;
  selectedPropertyId?: number | null;
}) {
  const [geocoded, setGeocoded] = useState<Record<number, [number, number]>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Fix for Leaflet default icons in Next.js - importar dinámicamente
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        const DefaultIcon = L.default.icon({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
        L.default.Marker.prototype.setIcon(DefaultIcon);
      });
    }
  }, []);

  function getPropertyCoords(p: PropertyCardData): [number, number] | null {
    // Preferimos coordenadas explícitas (lat/lng) y después geocoding OSM
    const manual = parsePropertyLatLng(p);
    if (manual) return manual;
    return null;
  }

  const markers = useMemo(() => {
    return properties
      .map((p) => {
        const manual = getPropertyCoords(p);
        const fallback = geocoded[p.id];
        const latlng = manual || fallback || null;
        if (!latlng) return null;
        return {
          id: p.id,
          title: p.titulo || p.codigo,
          direccion: p.direccion || "Dirección no disponible",
          latlng,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [properties, geocoded]);

  useEffect(() => {
    const pending = properties.filter((p) => !getPropertyCoords(p) && p.direccion && !geocoded[p.id]);

    if (!pending.length) return;

    (async () => {
      for (const p of pending) {
        try {
          const text = encodeURIComponent(p.direccion || "");
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${text}&limit=1`);
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
              setGeocoded((prev) => ({ ...prev, [p.id]: [lat, lon] }));
            }
          }
        } catch {
          // fallback: no geocode
        }
      }
    })();
  }, [properties, geocoded]);

  if (!isClient) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p>Cargando mapa...</p>
        </div>
      </div>
    );
  }

  if (markers.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-white p-8 text-center text-gray-900">
        <div>
          <p className="font-semibold text-lg">📍 No se encontraron ubicaciones</p>
          <p className="text-sm mt-2 text-gray-600">Las propiedades necesitan coordenadas válidas (Google Maps o dirección).</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        // Centro inicial en Santa Fe, Argentina
        center={[-31.6333, -60.7000]}
        zoom={12}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.latlng}
            eventHandlers={{
              click: () => onMarkerClick?.(marker.id),
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{marker.title}</strong><br />
                {marker.direccion}
              </div>
            </Popup>
          </Marker>
        ))}
        <MapController selectedPropertyId={selectedPropertyId} markers={markers} />
      </MapContainer>
    </div>
  );
}
