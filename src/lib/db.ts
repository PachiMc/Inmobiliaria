import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

export interface Property {
  id: number;
  codigo: string;
  titulo: string | null;
  descripcion: string | null;
  tipo: string;
  operacion: string;
  direccion: string | null;
  precio: number | null;
  moneda: string;
  dormitorios: number;
  banos: number;
  metros_cuadrados: number | null;
  destacado: boolean;
  activo: boolean;
  google_maps?: string | null;
  created_at?: Date;
  updated_at?: Date;
  images?: { id: number; url: string; orden: number }[];
}

export interface PropertyInsert {
  codigo: string;
  titulo: string;
  descripcion?: string | null;
  tipo: string;
  operacion: string;
  direccion?: string | null;
  precio?: number | null;
  moneda?: string;
  dormitorios?: number;
  banos?: number;
  metros_cuadrados?: number | null;
  destacado?: boolean;
  activo?: boolean;
  images?: string[];
}

export async function query<T = unknown>(text: string, params?: unknown[]): Promise<T> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T;
  } finally {
    client.release();
  }
}

export async function getProperties(filters?: {
  tipo?: string;
  operacion?: string;
  codigoOrDireccion?: string;
  destacado?: boolean;
}): Promise<Property[]> {
  let sql = `
    SELECT p.*,
      COALESCE(
        (SELECT json_agg(json_build_object('id', pi.id, 'url', pi.url, 'orden', pi.orden) ORDER BY pi.orden)
         FROM property_images pi WHERE pi.property_id = p.id),
        '[]'::json
      ) AS images
    FROM properties p
    WHERE p.activo = true
  `;
  const params: (string | number | boolean)[] = [];
  let i = 1;
  if (filters?.tipo) {
    sql += ` AND p.tipo = $${i}`;
    params.push(filters.tipo);
    i++;
  }
  if (filters?.operacion) {
    sql += ` AND p.operacion = $${i}`;
    params.push(filters.operacion);
    i++;
  }
  if (filters?.destacado !== undefined) {
    sql += ` AND p.destacado = $${i}`;
    params.push(filters.destacado);
    i++;
  }
  if (filters?.codigoOrDireccion) {
    sql += ` AND (p.codigo ILIKE $${i} OR p.direccion ILIKE $${i} OR p.titulo ILIKE $${i})`;
    params.push(`%${filters.codigoOrDireccion}%`);
  }
  sql += ` ORDER BY p.destacado DESC, p.created_at DESC`;
  const rows = await query<(Property & { images: string })[]>(sql, params);
  return (rows || []).map((r) => ({
    ...r,
    images: typeof r.images === "string" ? JSON.parse(r.images || "[]") : (r.images || []),
  })) as Property[];
}

export async function getPropertyById(id: number, onlyActive = true): Promise<Property | null> {
  const sql = `
    SELECT p.*,
      COALESCE(
        (SELECT json_agg(json_build_object('id', pi.id, 'url', pi.url, 'orden', pi.orden) ORDER BY pi.orden)
         FROM property_images pi WHERE pi.property_id = p.id),
        '[]'::json
      ) AS images
    FROM properties p WHERE p.id = $1 ${onlyActive ? "AND p.activo = true" : ""}
  `;
  const rows = await query<(Property & { images: string })[]>(sql, [id]);
  if (!rows?.length) return null;
  const r = rows[0];
  return {
    ...r,
    images: typeof r.images === "string" ? JSON.parse(r.images || "[]") : (r.images || []),
  } as Property;
}

export async function getPropertiesAll(): Promise<Property[]> {
  const sql = `
    SELECT p.*,
      COALESCE(
        (SELECT json_agg(json_build_object('id', pi.id, 'url', pi.url, 'orden', pi.orden) ORDER BY pi.orden)
         FROM property_images pi WHERE pi.property_id = p.id),
        '[]'::json
      ) AS images
    FROM properties p ORDER BY p.destacado DESC, p.created_at DESC
  `;
  const rows = await query<(Property & { images: string })[]>(sql);
  return (rows || []).map((r) => ({
    ...r,
    images: typeof r.images === "string" ? JSON.parse(r.images || "[]") : (r.images || []),
  })) as Property[];
}

export async function createProperty(data: PropertyInsert): Promise<Property> {
  const res = await query<{ id: number }[]>(
    `INSERT INTO properties (codigo, titulo, descripcion, tipo, operacion, direccion, precio, moneda, dormitorios, banos, metros_cuadrados, destacado, activo)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING id`,
    [
      data.codigo,
      data.titulo,
      data.descripcion ?? null,
      data.tipo,
      data.operacion,
      data.direccion ?? null,
      data.precio ?? null,
      data.moneda ?? "USD",
      data.dormitorios ?? 0,
      data.banos ?? 0,
      data.metros_cuadrados ?? null,
      data.destacado ?? false,
      data.activo ?? true,
    ]
  );
  const id = res[0]?.id;
  if (data.images?.length && id) {
    for (let i = 0; i < data.images.length; i++) {
      await query("INSERT INTO property_images (property_id, url, orden) VALUES ($1, $2, $3)", [id, data.images[i], i]);
    }
  }
  const created = await getPropertyById(id, false);
  return created!;
}

export async function updateProperty(id: number, data: Partial<PropertyInsert>): Promise<Property | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let i = 1;
  const map: Record<string, keyof PropertyInsert> = {
    codigo: "codigo",
    titulo: "titulo",
    descripcion: "descripcion",
    tipo: "tipo",
    operacion: "operacion",
    direccion: "direccion",
    precio: "precio",
    moneda: "moneda",
    dormitorios: "dormitorios",
    banos: "banos",
    metros_cuadrados: "metros_cuadrados",
    destacado: "destacado",
    activo: "activo",
  };
  for (const [col, key] of Object.entries(map)) {
    if (data[key] !== undefined) {
      fields.push(`${col} = $${i}`);
      values.push((data as Record<string, unknown>)[key]);
      i++;
    }
  }
  if (fields.length) {
    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);
    await query(`UPDATE properties SET ${fields.join(", ")} WHERE id = $${i}`, values);
  }
  if (data.images) {
    await query("DELETE FROM property_images WHERE property_id = $1", [id]);
    for (let j = 0; j < data.images.length; j++) {
      await query("INSERT INTO property_images (property_id, url, orden) VALUES ($1, $2, $3)", [id, data.images[j], j]);
    }
  }
  return getPropertyById(id, false);
}

export async function deleteProperty(id: number): Promise<boolean> {
  const client = await pool.connect();
  try {
    const res = await client.query("DELETE FROM properties WHERE id = $1", [id]);
    return (res.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: Date;
}

export interface UserInsert {
  email: string;
  password_hash: string;
  name?: string | null;
}

export async function getUsers(): Promise<User[]> {
  const sql = "SELECT id, email, password_hash, name, created_at FROM users ORDER BY created_at DESC";
  return await query<User[]>(sql);
}

export async function getUserById(id: number): Promise<User | null> {
  const sql = "SELECT id, email, password_hash, name, created_at FROM users WHERE id = $1";
  const rows = await query<User[]>(sql, [id]);
  return rows?.[0] || null;
}

export async function createUser(data: UserInsert): Promise<User> {
  const res = await query<{ id: number }[]>(
    "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id",
    [data.email, data.password_hash, data.name ?? null]
  );
  const id = res[0]?.id;
  const created = await getUserById(id);
  return created!;
}

export async function updateUser(id: number, data: Partial<UserInsert>): Promise<User | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let i = 1;
  if (data.email !== undefined) {
    fields.push(`email = $${i}`);
    values.push(data.email);
    i++;
  }
  if (data.password_hash !== undefined) {
    fields.push(`password_hash = $${i}`);
    values.push(data.password_hash);
    i++;
  }
  if (data.name !== undefined) {
    fields.push(`name = $${i}`);
    values.push(data.name);
    i++;
  }
  if (fields.length) {
    values.push(id);
    await query(`UPDATE users SET ${fields.join(", ")} WHERE id = $${i}`, values);
  }
  return getUserById(id);
}

export async function deleteUser(id: number): Promise<boolean> {
  const client = await pool.connect();
  try {
    const res = await client.query("DELETE FROM users WHERE id = $1", [id]);
    return (res.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}

export default pool;
