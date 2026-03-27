/**
 * Crear usuario admin en la base de datos.
 * Ejecutar: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed-admin.ts
 * Requiere: DATABASE_URL en .env
 * Contraseña por defecto: admin123
 */
import * as bcrypt from "bcryptjs";
import { Pool } from "pg";

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("Falta DATABASE_URL en el entorno. Creá un archivo .env con DATABASE_URL=postgresql://...");
    process.exit(1);
  }
  const pool = new Pool({ connectionString });
  const hash = await bcrypt.hash("admin123", 10);
  await pool.query(
    `INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET password_hash = $2, name = $3`,
    ["admin@propiedades.com", hash, "Admin"]
  );
  console.log("Usuario admin creado: admin@propiedades.com / admin123");
  await pool.end();
}
seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
