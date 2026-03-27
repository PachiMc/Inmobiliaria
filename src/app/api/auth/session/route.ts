import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json({ user: { id: payload.userId, email: payload.email } });
}
