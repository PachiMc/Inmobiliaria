"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SLIDES = [
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", alt: "Casa moderna", title: "Encontrá tu próximo hogar" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80", alt: "Interior", title: "Venta y alquiler de propiedades" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", alt: "Casa con jardín", title: "Asesoramiento profesional" },
];

export default function Slider() {
  return (
    <section className="relative h-[420px] w-full overflow-hidden bg-gray-900 sm:h-[500px]">
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
    </section>
  );
}
