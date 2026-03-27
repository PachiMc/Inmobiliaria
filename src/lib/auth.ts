import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { query } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production-secret-key";
const JWT_EXPIRES = "7d";

export interface User {
  id: number;
  email: string;
  name: string | null;
}

export interface JWTPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const rows = await query<{ id: number; email: string; name: string | null; password_hash: string }[]>(
    "SELECT id, email, name, password_hash FROM users WHERE email = $1",
    [email]
  );
  if (!rows?.length) return null;
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  return { id: user.id, email: user.email, name: user.name };
}

export async function createToken(user: User): Promise<string> {
  return jwt.sign({ userId: user.id, email: user.email } as JWTPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
