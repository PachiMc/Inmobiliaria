"use client";

import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";

export default function SearchHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="mb-4 text-center sm:text-left">
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Encontrá tu próximo hogar
        </h1>
      </div>
      <div className="rounded-2xl border border-white/15 bg-zinc-900 p-4 shadow-lg sm:p-5">
        <SearchBox />
      </div>
    </div>
  );
}
