"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PropertyForm from "@/components/PropertyForm";

export default function NuevaPropiedadPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) router.replace("/admin/login");
        else setAuth(true);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  const onSuccess = () => {
    router.push("/admin/propiedades");
    router.refresh();
  };

  if (auth === null) return <div className="p-8">Cargando...</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link href="/admin/propiedades" className="mb-6 inline-block text-primary hover:underline">← Volver a propiedades</Link>
      <h1 className="mb-6 text-2xl font-bold text-primary">Nueva propiedad</h1>
      <PropertyForm onSuccess={onSuccess} />
    </div>
  );
}
