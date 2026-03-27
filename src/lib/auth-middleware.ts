import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function getSessionUser(request: NextRequest): { userId: number; email: string } | null {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload ? { userId: payload.userId, email: payload.email } : null;
}

export function requireAuth(
  request: NextRequest,
  handler: (req: NextRequest, userId: number) => Promise<NextResponse>
) {
  const user = getSessionUser(request);
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return handler(request, user.userId);
}
