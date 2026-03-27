import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { createProperty, getPropertiesAll } from "@/lib/db";

export async function GET(request: NextRequest) {
  return requireAuth(request, async () => {
    try {
      const list = await getPropertiesAll();
      return NextResponse.json(list);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error al listar" }, { status: 500 });
    }
  });
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async () => {
    try {
      const body = await request.json();
      const prop = await createProperty({
        codigo: body.codigo,
        titulo: body.titulo,
        descripcion: body.descripcion,
        tipo: body.tipo,
        operacion: body.operacion,
        direccion: body.direccion,
        precio: body.precio != null ? Number(body.precio) : undefined,
        moneda: body.moneda || "USD",
        dormitorios: body.dormitorios != null ? Number(body.dormitorios) : 0,
        banos: body.banos != null ? Number(body.banos) : 0,
        metros_cuadrados: body.metros_cuadrados != null ? Number(body.metros_cuadrados) : undefined,
        destacado: !!body.destacado,
        activo: body.activo !== false,
        images: Array.isArray(body.images) ? body.images : [],
      });
      return NextResponse.json(prop);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error al crear propiedad" }, { status: 500 });
    }
  });
}
