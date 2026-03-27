"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Property {
  id: number;
  codigo: string;
  titulo: string | null;
  tipo: string;
  operacion: string;
  precio: number | null;
  moneda: string;
  activo: boolean;
  images?: { url: string }[];
}

export default function AdminPropiedadesPage() {
  const router = useRouter();
  const [list, setList] = useState<Property[]>([]);
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
        return fetch("/api/admin/properties");
      })
      .then((res) => (res && res.ok ? res.json() : []))
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, [router]);

  const deleteProp = async (id: number) => {
    if (!confirm("¿Eliminar esta propiedad?")) return;
    const res = await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    if (res.ok) setList((prev) => prev.filter((p) => p.id !== id));
  };

  if (sessionOk === false || (!loading && !sessionOk)) return null;
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Gestionar propiedades</h1>
        <div className="flex gap-2">
          <Link href="/admin" className="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">Volver al panel</Link>
          <Link href="/admin/propiedades/nueva" className="rounded border border-primary bg-primary/10 px-4 py-2 font-medium text-primary hover:bg-primary/20">Nueva propiedad</Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b p-2 text-left text-sm font-semibold">Imagen</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Código</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Título</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Tipo</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Operación</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Precio</th>
              <th className="border-b p-2 text-left text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">
                  <div className="relative h-12 w-16 overflow-hidden rounded bg-gray-100">
                    <Image
                      src={p.images?.[0]?.url || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&q=80"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </td>
                <td className="p-2 font-mono text-sm">{p.codigo}</td>
                <td className="p-2 text-sm line-clamp-1">{p.titulo || "—"}</td>
                <td className="p-2 text-sm">{p.tipo}</td>
                <td className="p-2 text-sm">{p.operacion}</td>
                <td className="p-2 text-sm">{p.precio != null ? `${p.moneda} ${p.precio}` : "Consultar"}</td>
                <td className="p-2">
                  <Link href={`/admin/propiedades/${p.id}`} className="mr-2 text-sm text-primary hover:underline">Editar</Link>
                  <button type="button" onClick={() => deleteProp(p.id)} className="text-sm text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <p className="py-8 text-center text-gray-500">No hay propiedades. Creá una desde &quot;Nueva propiedad&quot;.</p>
        )}
      </div>
    </div>
  );
}
