"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
}

export default function AdminUsuariosPage() {
  const router = useRouter();
  const [list, setList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionOk, setSessionOk] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          setSessionOk(false);
          router.replace("/admin/login");
          return;
        }
        setSessionOk(true);
        return fetch("/api/admin/users");
      })
      .then((res) => (res && res.ok ? res.json() : []))
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, [router]);

  const deleteUser = async (id: number) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) setList((prev) => prev.filter((u) => u.id !== id));
  };

  if (sessionOk === false || (!loading && !sessionOk)) return null;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-black">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Gestionar usuarios</h1>
        <div className="flex gap-2">
          <Link href="/admin" className="rounded border border-gray-300 px-4 py-2 font-medium text-black hover:bg-gray-50">Volver al panel</Link>
          <Link href="/admin/usuarios/nueva" className="rounded border border-primary bg-primary/10 px-4 py-2 font-medium text-primary hover:bg-primary/20">Nuevo usuario</Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b p-2 text-left text-sm font-semibold">ID</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Email</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Nombre</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Creado</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2 font-mono text-sm">{u.id}</td>
                <td className="p-2 text-sm">{u.email}</td>
                <td className="p-2 text-sm">{u.name || "—"}</td>
                <td className="p-2 text-sm">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="p-2">
                  <Link href={`/admin/usuarios/${u.id}`} className="mr-2 text-sm text-primary hover:underline">Editar</Link>
                  {u.email !== "admin@propiedades.com" && (
                    <button type="button" onClick={() => deleteUser(u.id)} className="text-sm text-red-600 hover:underline">Eliminar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <p className="py-8 text-center text-black">No hay usuarios. Creá uno desde &quot;Nuevo usuario&quot;.</p>
        )}
      </div>
    </div>
  );
}