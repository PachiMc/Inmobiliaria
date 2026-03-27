import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { updateProperty, deleteProperty, getPropertyById } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAuth(request, async () => {
    try {
      const id = parseInt((await params).id, 10);
      if (isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      }
      const prop = await getPropertyById(id, false);
      if (!prop) {
        return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
      }
      return NextResponse.json(prop);
    } catch (e) {
      return NextResponse.json({ error: "Error" }, { status: 500 });
    }
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAuth(request, async () => {
    try {
      const id = parseInt((await params).id, 10);
      if (isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      }
      const body = await request.json();
      const prop = await updateProperty(id, {
        codigo: body.codigo,
        titulo: body.titulo,
        descripcion: body.descripcion,
        tipo: body.tipo,
        operacion: body.operacion,
        direccion: body.direccion,
        precio: body.precio != null ? Number(body.precio) : undefined,
        moneda: body.moneda,
        dormitorios: body.dormitorios != null ? Number(body.dormitorios) : undefined,
        banos: body.banos != null ? Number(body.banos) : undefined,
        metros_cuadrados: body.metros_cuadrados != null ? Number(body.metros_cuadrados) : undefined,
        destacado: body.destacado,
        activo: body.activo,
        images: Array.isArray(body.images) ? body.images : undefined,
      });
      if (!prop) {
        return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
      }
      return NextResponse.json(prop);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
    }
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAuth(_request, async () => {
    try {
      const id = parseInt((await params).id, 10);
      if (isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      }
      const ok = await deleteProperty(id);
      if (!ok) {
        return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
      }
      return NextResponse.json({ ok: true });
    } catch (e) {
      return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
    }
  });
}
