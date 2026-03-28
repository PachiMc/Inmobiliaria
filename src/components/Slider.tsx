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

export default function Slider() {
  return (
    <section className="relative w-screen h-[560px] overflow-hidden bg-gray-900 sm:h-[660px] lg:h-[760px]">
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
