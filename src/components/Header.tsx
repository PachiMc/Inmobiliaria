"use client";

import Image from "next/image";
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
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl shadow-sm border-b border-white/10">
      <div className="container flex items-center justify-between py-2.5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/Logo.png"
            alt="Inmobiliaria"
            width={150}
            height={40}
            loading="eager"
            className="h-auto w-auto object-contain"
          />
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-lg font-semibold transition ${
                pathname === href ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          
          <Link
            href="/admin"
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-base font-semibold text-white hover:bg-white/15"
          >
            Admin
          </Link>
        </nav>
        <button
          type="button"
          className="rounded p-2 text-white md:hidden"
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
        <div className="border-t border-white/10 bg-black/95 px-4 py-3 md:hidden">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-2.5 text-base font-semibold transition ${
                pathname === href ? "text-white" : "text-white/80 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-base font-medium text-white hover:bg-white/15"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
