"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@propiedades.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [setupMessage, setSetupMessage] = useState("");
  const [setupLoading, setSetupLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión");
    }
    setLoading(false);
  };

  const handleSetup = async () => {
    setSetupMessage("");
    setSetupLoading(true);
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@propiedades.com", password: "admin123" }),
      });
      const data = await res.json();
      if (res.ok) {
        setSetupMessage("Usuario admin creado. Usá admin@propiedades.com y contraseña admin123 para entrar.");
        setPassword("admin123");
      } else {
        setSetupMessage(data.error || "Error al crear usuario.");
      }
    } catch {
      setSetupMessage("Error de conexión. Revisá que la base de datos esté corriendo y el .env tenga DATABASE_URL.");
    }
    setSetupLoading(false);
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold text-primary">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-black">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-2.5 font-medium text-black hover:bg-primary-light disabled:opacity-70">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {setupMessage && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${setupMessage.startsWith("Usuario admin") ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>
          {setupMessage}
        </div>
      )}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="mb-2 text-center text-sm text-gray-500">¿Primera vez? Creá el usuario admin:</p>
        <button
          type="button"
          onClick={handleSetup}
          disabled={setupLoading}
          className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-70"
        >
          {setupLoading ? "Creando..." : "Crear usuario admin (admin@propiedades.com / admin123)"}
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        <Link href="/" className="text-primary hover:underline">Volver al inicio</Link>
      </p>
    </div>
  );
}
