import { NextRequest, NextResponse } from "next/server";
import { getProperties } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo") || undefined;
    const operacion = searchParams.get("operacion") || undefined;
    const q = searchParams.get("q") || undefined;
    const destacadoParam = searchParams.get("destacado");
    const destacado = destacadoParam === "true" ? true : destacadoParam === "false" ? false : undefined;
    const list = await getProperties({ tipo, operacion, codigoOrDireccion: q, destacado });
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al listar propiedades" }, { status: 500 });
  }
}
