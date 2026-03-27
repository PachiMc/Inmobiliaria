import { NextRequest, NextResponse } from "next/server";
import { getPropertyById } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    const prop = await getPropertyById(id);
    if (!prop) {
      return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
    }
    return NextResponse.json(prop);
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
