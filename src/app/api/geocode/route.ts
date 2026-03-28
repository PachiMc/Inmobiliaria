import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();

    if (!q) {
      return NextResponse.json({ error: "Parámetro q requerido" }, { status: 400 });
    }

    const text = encodeURIComponent(q);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}&limit=1&addressdetails=0`,
      {
        headers: {
          "User-Agent": "Landing-Propiedades/1.0 (contacto local)",
          "Accept-Language": "es",
        },
        next: { revalidate: 60 * 60 * 24 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Servicio de geocoding no disponible" },
        { status: response.status }
      );
    }

    const data = (await response.json()) as Array<{ lat?: string; lon?: string }>;
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ lat: null, lng: null });
    }

    const lat = Number(data[0].lat);
    const lng = Number(data[0].lon);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return NextResponse.json({ lat: null, lng: null });
    }

    return NextResponse.json({ lat, lng });
  } catch {
    return NextResponse.json({ error: "Error al geocodificar" }, { status: 500 });
  }
}
