"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else router.replace("/admin/login");
      })
      .catch(() => router.replace("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      router.replace("/admin/login");
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Panel de administración</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/propiedades"
            className="rounded-lg border border-primary bg-primary/10 px-4 py-2 font-medium text-primary hover:bg-primary/20"
          >
            Gestionar propiedades
          </Link>
          <Link
            href="/admin/usuarios"
            className="rounded-lg border border-primary bg-primary/10 px-4 py-2 font-medium text-primary hover:bg-primary/20"
          >
            Gestionar usuarios
          </Link>
          <button type="button" onClick={handleLogout} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
            Cerrar sesión
          </button>
        </div>
      </div>
      <p className="text-black">Conectado como <strong>{user.email}</strong>. Desde aquí podés gestionar propiedades y usuarios.</p>
    </div>
  );
}
