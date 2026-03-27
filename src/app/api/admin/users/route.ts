import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { createUser, getUsers } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function GET(request: NextRequest) {
  return requireAuth(request, async () => {
    try {
      const list = await getUsers();
      return NextResponse.json(list);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error al listar usuarios" }, { status: 500 });
    }
  });
}

export async function POST(request: NextRequest) {
  return requireAuth(request, async () => {
    try {
      const body = await request.json();
      const password_hash = await hashPassword(body.password);
      const user = await createUser({
        email: body.email,
        password_hash,
        name: body.name,
      });
      // Don't return password_hash
      const { password_hash: _, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
    }
  });
}