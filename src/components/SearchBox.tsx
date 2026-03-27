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
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5 items-end">
        <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)} 
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition hover:border-gray-400"
        >
          {TIPOS.map((o) => <option key={o.value || "all"} value={o.value}>{o.label}</option>)}
        </select>
        
        <select 
          value={operacion} 
          onChange={(e) => setOperacion(e.target.value)} 
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition hover:border-gray-400"
        >
          {OPERACIONES.map((o) => <option key={o.value || "all"} value={o.value}>{o.label}</option>)}
        </select>
        
        <input 
          type="text" 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          placeholder="Código o dirección..." 
          className="sm:col-span-2 lg:col-span-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition hover:border-gray-400" 
        />
        
        <button 
          type="submit" 
          className="w-full lg:col-span-1 rounded-lg bg-primary text-black px-4 py-2 text-sm font-medium hover:bg-primary/90 transition shadow-sm hover:shadow-md"
        >
          🔍 Buscar
        </button>
      </div>
    </form>
  );
}
