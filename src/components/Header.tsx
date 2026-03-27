"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl shadow-sm border-b border-gray-200">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="text-xl font-black tracking-tight text-primary">
          Inmobiliaria
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium transition hover:text-primary ${
                pathname === href ? "text-primary" : "text-black"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded border border-primary bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20"
          >
            Admin
          </Link>
        </nav>
        <button
          type="button"
          className="rounded p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t bg-white px-4 py-3 md:hidden">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block py-2 font-medium text-black hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded border border-primary bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
