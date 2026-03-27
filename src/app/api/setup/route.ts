import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

/**
 * POST /api/setup - Crea el usuario admin si no existe ningún usuario.
 * Solo funciona cuando la tabla users está vacía. Llamar una sola vez.
 * Body: { "email": "admin@propiedades.com", "password": "admin123" }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email || "admin@propiedades.com";
    const password = body?.password || "admin123";

    const existing = await query<{ count: string }[]>("SELECT COUNT(*) as count FROM users");
    const count = parseInt(existing?.[0]?.count ?? "0", 10);
    if (count > 0) {
      return NextResponse.json(
        { error: "Ya existen usuarios. Usá el login normal o cambiá la contraseña desde la base de datos." },
        { status: 400 }
      );
    }

    const password_hash = await hashPassword(password);
    await query(
      "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)",
      [email, password_hash, "Admin"]
    );

    return NextResponse.json({
      ok: true,
      message: `Usuario creado: ${email}. Ahora podés iniciar sesión.`,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    console.error("Setup error:", e);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? message : "Error al crear usuario" },
      { status: 500 }
    );
  }
}
