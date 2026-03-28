"use client";

import { useEffect, useRef, useState } from "react";
import SearchBox from "./SearchBox";

export default function SearchHero() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-auto mx-auto w-full max-w-4xl rounded-[2.5rem] border border-white/30 bg-black/45 p-6 shadow-2xl backdrop-blur-xl transition-all duration-700 sm:p-8 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0"
      }`}
    >
      <h1
        className={`text-center text-3xl font-extrabold text-white transition-all duration-700 sm:text-4xl ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
        style={{
          transitionDelay: isVisible ? "0.1s" : "0s",
        }}
      >
        Encontrá tu próximo hogar con confianza
      </h1>
      <p
        className={`mt-3 text-center text-slate-300 transition-all duration-700 sm:text-lg ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
        style={{
          transitionDelay: isVisible ? "0.2s" : "0s",
        }}
      >
        Búsqueda rápida por tipo, operación y ubicación. Propiedades verificadas a un clic.
      </p>
      <div
        className={`mt-6 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
        style={{
          transitionDelay: isVisible ? "0.3s" : "0s",
        }}
      >
        <SearchBox />
      </div>
    </div>
  );
}
