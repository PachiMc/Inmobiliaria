"use client";

import { useState } from "react";

const TIPOS = ["Casa", "Departamento", "Terreno", "PH", "Oficina", "Local Comercial", "Quinta", "Monoambiente"];
const OPERACIONES = [{ value: "venta", label: "Venta" }, { value: "alquiler", label: "Alquiler" }];

interface InitialProp {
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

interface PropertyFormProps {
  initial?: InitialProp;
  propertyId?: number;
  onSuccess: () => void;
}

export default function PropertyForm({ initial, propertyId, onSuccess }: PropertyFormProps) {
  const [codigo, setCodigo] = useState(initial?.codigo ?? "");
  const [titulo, setTitulo] = useState(initial?.titulo ?? "");
  const [descripcion, setDescripcion] = useState(initial?.descripcion ?? "");
  const [tipo, setTipo] = useState(initial?.tipo ?? "Casa");
  const [operacion, setOperacion] = useState(initial?.operacion ?? "venta");
  const [direccion, setDireccion] = useState(initial?.direccion ?? "");
  const [precio, setPrecio] = useState(initial?.precio != null ? String(initial.precio) : "");
  const [moneda, setMoneda] = useState(initial?.moneda ?? "USD");
  const [dormitorios, setDormitorios] = useState(initial?.dormitorios ?? 0);
  const [banos, setBanos] = useState(initial?.banos ?? 0);
  const [metros_cuadrados, setMetrosCuadrados] = useState(initial?.metros_cuadrados != null ? String(initial.metros_cuadrados) : "");
  const [destacado, setDestacado] = useState(initial?.destacado ?? false);
  const [activo, setActivo] = useState(initial?.activo ?? true);
  const [images, setImages] = useState<string[]>(initial?.images?.map((i) => i.url) ?? [""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addImage = () => setImages((prev) => [...prev, ""]);
  const removeImage = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));
  const setImageUrl = (i: number, url: string) =>
    setImages((prev) => {
      const next = [...prev];
      next[i] = url;
      return next;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const payload = {
      codigo,
      titulo,
      descripcion: descripcion || null,
      tipo,
      operacion,
      direccion: direccion || null,
      precio: precio ? Number(precio) : null,
      moneda,
      dormitorios: Number(dormitorios) || 0,
      banos: Number(banos) || 0,
      metros_cuadrados: metros_cuadrados ? Number(metros_cuadrados) : null,
      destacado,
      activo,
      images: images.filter(Boolean),
    };
    const url = propertyId ? `/api/admin/properties/${propertyId}` : "/api/admin/properties";
    const method = propertyId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al guardar");
        setLoading(false);
        return;
      }
      onSuccess();
    } catch {
      setError("Error de conexión");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div>
        <label className="mb-1 block text-sm font-medium">Código *</label>
        <input value={codigo} onChange={(e) => setCodigo(e.target.value)} required className="w-full rounded border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Título *</label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="w-full rounded border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={4} className="w-full rounded border border-gray-300 px-3 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Tipo *</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2">
            {TIPOS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Operación *</label>
          <select value={operacion} onChange={(e) => setOperacion(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2">
            {OPERACIONES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Dirección</label>
        <input value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Precio</label>
          <input type="number" step="any" value={precio} onChange={(e) => setPrecio(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Moneda</label>
          <select value={moneda} onChange={(e) => setMoneda(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2">
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Dormitorios</label>
          <input type="number" min={0} value={dormitorios} onChange={(e) => setDormitorios(Number(e.target.value))} className="w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Baños</label>
          <input type="number" min={0} value={banos} onChange={(e) => setBanos(Number(e.target.value))} className="w-full rounded border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">m²</label>
          <input type="number" min={0} step="any" value={metros_cuadrados} onChange={(e) => setMetrosCuadrados(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={destacado} onChange={(e) => setDestacado(e.target.checked)} />
          <span className="text-sm">Destacado</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
          <span className="text-sm">Activo</span>
        </label>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">URLs de imágenes</label>
          <button type="button" onClick={addImage} className="text-sm text-primary hover:underline">+ Agregar</button>
        </div>
        {images.map((url, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input value={url} onChange={(e) => setImageUrl(i, e.target.value)} placeholder="https://..." className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm" />
            <button type="button" onClick={() => removeImage(i)} className="rounded border border-red-300 px-2 text-red-600 hover:bg-red-50">Quitar</button>
          </div>
        ))}
      </div>
      <button type="submit" disabled={loading} className="rounded-lg bg-primary px-6 py-2.5 font-medium text-black hover:bg-primary-light disabled:opacity-70">
        {loading ? "Guardando..." : propertyId ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
