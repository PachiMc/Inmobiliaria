"use client";

import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { PropertyCardData } from "@/components/PropertyCard";
import "leaflet/dist/leaflet.css";

function parsePropertyLatLng(p: PropertyCardData): [number, number] | null {
  const source = p as unknown as Record<string, unknown>;
  const latField = source.latitud ?? source.latitude ?? source.lat ?? null;
  const lngField = source.longitud ?? source.longitude ?? source.lng ?? source.lon ?? null;

  if (latField != null && lngField != null) {
    const lat = Number(latField);
    const lng = Number(lngField);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return [lat, lng];
    }
  }

  const mapsUrl = p.google_maps;
  if (!mapsUrl) return null;

  try {
    const atMatch = mapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
      return [Number(atMatch[1]), Number(atMatch[2])];
    }

    const parsed = new URL(mapsUrl);
    const q = parsed.searchParams.get("q") || parsed.searchParams.get("query");
    if (!q) return null;

    const coords = q.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
    if (coords) {
      return [Number(coords[1]), Number(coords[2])];
    }
  } catch {
    return null;
  }

  return null;
}

function getAddressBasedCoords(p: PropertyCardData): [number, number] | null {
  const direccion = (p.direccion || "").toLowerCase();
  if (!direccion) return null;

  const cityCenters: Array<{ keys: string[]; center: [number, number] }> = [
    { keys: ["santo tome", "santo tomé"], center: [-31.6628, -60.7653] },
    { keys: ["recreo"], center: [-31.4906, -60.732] },
    { keys: ["rosario"], center: [-32.9442, -60.6505] },
    { keys: ["santa fe"], center: [-31.6333, -60.7] },
  ];

  const match = cityCenters.find((city) => city.keys.some((key) => direccion.includes(key)));
  if (!match) return null;

  const idSeed = (p.id % 17) + 1;
  const latOffset = (((idSeed * 37) % 23) - 11) * 0.0016;
  const lngOffset = (((idSeed * 53) % 23) - 11) * 0.0016;

  return [match.center[0] + latOffset, match.center[1] + lngOffset];
}

function MapViewport({
  markers,
  selectedPropertyId,
}: {
  markers: { id: number; latlng: [number, number] }[];
  selectedPropertyId?: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  useEffect(() => {
    if (!markers.length) return;

    if (selectedPropertyId) {
      const selectedMarker = markers.find((marker) => marker.id === selectedPropertyId);
      if (selectedMarker) {
        map.flyTo(selectedMarker.latlng, 15, { duration: 0.8 });
      }
      return;
    }

    if (markers.length === 1) {
      map.setView(markers[0].latlng, 14);
      return;
    }

    map.fitBounds(markers.map((marker) => marker.latlng), { padding: [32, 32] });
  }, [map, markers, selectedPropertyId]);

  return null;
}

export default function PropertiesMapLeaflet({
  properties,
  onMarkerClick,
  selectedPropertyId,
}: {
  properties: PropertyCardData[];
  onMarkerClick?: (propertyId: number) => void;
  selectedPropertyId?: number | null;
}) {
  const [geocoded, setGeocoded] = useState<Record<number, [number, number]>>({});

  useEffect(() => {
    const defaultIcon = L.icon({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  useEffect(() => {
    const pending = properties.filter((p) => !parsePropertyLatLng(p) && p.direccion && !geocoded[p.id]);
    if (!pending.length) return;

    let cancelled = false;

    (async () => {
      for (const property of pending) {
        try {
          const response = await fetch(`/api/geocode?q=${encodeURIComponent(property.direccion || "")}`);
          if (!response.ok) continue;
          const data = await response.json();
          const lat = Number(data?.lat);
          const lng = Number(data?.lng);
          if (!cancelled && !Number.isNaN(lat) && !Number.isNaN(lng)) {
            setGeocoded((prev) => ({ ...prev, [property.id]: [lat, lng] }));
          }
        } catch {
          continue;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [properties, geocoded]);

  const markers = useMemo(() => {
    return properties
      .map((property) => {
        const latlng = parsePropertyLatLng(property) || geocoded[property.id] || getAddressBasedCoords(property);
        if (!latlng) return null;

        return {
          id: property.id,
          title: property.titulo || property.codigo,
          direccion: property.direccion || "Dirección no disponible",
          latlng,
        };
      })
      .filter((marker): marker is NonNullable<typeof marker> => marker !== null);
  }, [geocoded, properties]);

  if (!markers.length) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-white p-8 text-center text-slate-900">
        <div>
          <p className="text-lg font-semibold">No se encontraron ubicaciones</p>
          <p className="mt-2 text-sm text-slate-600">Las propiedades no tienen coordenadas ni una dirección utilizable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={[-31.6333, -60.7]}
        zoom={12}
        scrollWheelZoom={true}
        className="absolute inset-0 z-0 h-full w-full"
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
              <div className="text-sm text-slate-900">
                <strong>{marker.title}</strong>
                <br />
                {marker.direccion}
              </div>
            </Popup>
          </Marker>
        ))}
        <MapViewport markers={markers} selectedPropertyId={selectedPropertyId} />
      </MapContainer>
    </div>
  );
}
