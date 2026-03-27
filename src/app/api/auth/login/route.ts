import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createToken } from "@/lib/auth";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === "true",
  sameSite: (process.env.COOKIE_SAMESITE as "lax" | "strict" | "none") || "lax",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
    }
    const user = await verifyPassword(email, password);
    if (!user) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }
    const token = await createToken(user);
    const res = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
    res.cookies.set("session", token, COOKIE_OPTIONS);
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error al iniciar sesión";
    console.error("Login error:", e);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? message : "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
