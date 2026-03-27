"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PropertyForm from "@/components/PropertyForm";

interface Property {
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
  images?: { id: number; url: string; orden: number }[];
}

export default function EditarPropiedadPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [prop, setProp] = useState<Property | null>(null);
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.replace("/admin/login");
          return;
        }
        setAuth(true);
        return fetch(`/api/admin/properties/${id}`);
      })
      .then((res) => (res && res.ok ? res.json() : null))
      .then(setProp)
      .catch(() => setProp(null));
  }, [id, router]);

  const onSuccess = () => {
    router.push("/admin/propiedades");
    router.refresh();
  };

  if (auth === null || (auth && prop === null && id)) {
    return <div className="p-8">Cargando...</div>;
  }
  if (auth && prop === null) {
    return (
      <div className="p-8">
        <p>Propiedad no encontrada.</p>
        <Link href="/admin/propiedades" className="text-primary hover:underline">Volver</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link href="/admin/propiedades" className="mb-6 inline-block text-primary hover:underline">← Volver a propiedades</Link>
      <h1 className="mb-6 text-2xl font-bold text-primary">Editar propiedad</h1>
      <PropertyForm initial={prop!} propertyId={id} onSuccess={onSuccess} />
    </div>
  );
}
