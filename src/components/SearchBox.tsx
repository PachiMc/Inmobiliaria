"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TIPOS = [
  { value: "", label: "Todos los tipos" },
  { value: "Casa", label: "Casa" },
  { value: "Departamento", label: "Departamento" },
  { value: "Terreno", label: "Terreno" },
  { value: "PH", label: "PH" },
  { value: "Oficina", label: "Oficina" },
];
const OPERACIONES = [
  { value: "", label: "Venta o Alquiler" },
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
];

const fieldClass =
  "w-full rounded-2xl border border-zinc-600 bg-zinc-950 px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/15 transition hover:border-zinc-500";

export default function SearchBox() {
  const router = useRouter();
  const [tipo, setTipo] = useState("");
  const [operacion, setOperacion] = useState("");
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tipo) params.set("tipo", tipo);
    if (operacion) params.set("operacion", operacion);
    if (q.trim()) params.set("q", q.trim());
    router.push(`/propiedades?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid items-end gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={fieldClass}>
          {TIPOS.map((o) => (
            <option key={o.value || "all"} value={o.value} className="bg-zinc-950 text-white">
              {o.label}
            </option>
          ))}
        </select>

        <select value={operacion} onChange={(e) => setOperacion(e.target.value)} className={fieldClass}>
          {OPERACIONES.map((o) => (
            <option key={o.value || "all"} value={o.value} className="bg-zinc-950 text-white">
              {o.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Código o dirección..."
          className={`sm:col-span-2 lg:col-span-2 ${fieldClass}`}
        />

        <button
          type="submit"
          className="w-full rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-100 lg:col-span-1"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
