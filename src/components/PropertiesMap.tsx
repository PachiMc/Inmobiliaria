import dynamic from "next/dynamic";
import type { PropertyCardData } from "@/components/PropertyCard";

const PropertiesMapLeaflet = dynamic(() => import("@/components/PropertiesMapLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-slate-950 text-white">
      <p>Cargando mapa...</p>
    </div>
  ),
});

export default function PropertiesMap(props: {
  properties: PropertyCardData[];
  onMarkerClick?: (propertyId: number) => void;
  selectedPropertyId?: number | null;
}) {
  return <PropertiesMapLeaflet {...props} />;
}
