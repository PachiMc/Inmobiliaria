import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { deleteUser, getUserById, updateUser } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return requireAuth(request, async () => {
    try {
      const { id } = await params;
      const userId = parseInt(id);
      if (isNaN(userId)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      const user = await getUserById(userId);
      if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
      // Don't return password_hash
      const { password_hash, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
    }
  });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return requireAuth(request, async () => {
    try {
      const { id } = await params;
      const userId = parseInt(id);
      if (isNaN(userId)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      const body = await request.json();
      const updateData: any = {};
      if (body.email !== undefined) updateData.email = body.email;
      if (body.name !== undefined) updateData.name = body.name;
      if (body.password) updateData.password_hash = await hashPassword(body.password);
      const user = await updateUser(userId, updateData);
      if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
      // Don't return password_hash
      const { password_hash, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 });
    }
  });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return requireAuth(request, async () => {
    try {
      const { id } = await params;
      const userId = parseInt(id);
      if (isNaN(userId)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      
      // Check if user is the admin user
      const user = await getUserById(userId);
      if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
      if (user.email === "admin@propiedades.com") {
        return NextResponse.json({ error: "No se puede eliminar el usuario administrador" }, { status: 403 });
      }
      
      const deleted = await deleteUser(userId);
      if (!deleted) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
      return NextResponse.json({ success: true });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 });
    }
  });
}