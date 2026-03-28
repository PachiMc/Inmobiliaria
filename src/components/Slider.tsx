"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SLIDES = [
  { src: "/Slider-1.jpg", alt: "Slider principal 1", title: "Encontrá tu próximo hogar" },
  { src: "/Slider-2.jpg", alt: "Slider principal 2", title: "Venta y alquiler de propiedades" },
  { src: "/Slider-3.jpg", alt: "Slider principal 3", title: "Asesoramiento profesional" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com",
    label: "Facebook",
    user: "Inmobiliaria Oficial",
    accent: "hover:border-blue-500/70 hover:bg-blue-600 hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
        <path d="M13.42 21v-7.73H16l.39-3.01h-2.97V8.34c0-.87.24-1.47 1.49-1.47h1.59V4.18A21.2 21.2 0 0 0 14.17 4c-2.29 0-3.86 1.4-3.86 3.98v2.28H7.73v3.01h2.58V21h3.11Z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    user: "@inmobiliaria",
    accent: "hover:border-fuchsia-500/70 hover:bg-fuchsia-600 hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.85 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
      </svg>
    ),
  },
  {
    href: "mailto:contacto@inmobiliaria.com",
    label: "Mail",
    user: "contacto@inmobiliaria.com",
    accent: "hover:border-amber-500/70 hover:bg-amber-500 hover:text-slate-950",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
        <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.28L12 12.4l8-5.12V7H4Zm16 10V9.34l-7.46 4.77a1 1 0 0 1-1.08 0L4 9.34V17h16Z" />
      </svg>
    ),
  },
];

export default function Slider() {
  return (
    <section className="relative w-screen h-[600px] overflow-hidden bg-gray-900 sm:h-[700px] lg:h-[800px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="h-full"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={slide.src}>
            <div className="relative h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center px-4 sm:bottom-7">
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-white sm:gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={social.label}
              className={`group inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/25 px-2.5 py-1.5 text-white shadow-sm backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 ${social.accent}`}
            >
              <span className="rounded-full border border-white/20 bg-black/30 p-1.5 text-white transition group-hover:border-white/40 group-hover:bg-black/20">
                {social.icon}
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/75">{social.label}</span>
                <span className="hidden text-xs font-semibold text-white sm:block">{social.user}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
