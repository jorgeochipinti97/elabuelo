"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

import React from "react";
import useRadialBackground from "@/app/hooks/useRadialBackground";

// Foto de un sillón

// Título: "Comodidad Clásica"
// Body: "Descubre la elegancia y el confort en nuestros sillones, diseñados para realzar cada espacio de tu hogar."
// Foto de colchones apilados

// Título: "Calidad en Cada Capa"
// Body: "Nuestra variedad de colchones se adapta a tus necesidades, ofreciendo el soporte y confort que mereces."
// Foto de un box (sommier con colchón tipo cajón)

// Título: "Innovación en Descanso"
// Body: "Explora nuestra línea de box, la solución perfecta para un sueño reparador y un aprovechamiento óptimo del espacio."
// Foto de sillas y respaldos

// Título: "Estilo y Funcionalidad"
// Body: "Cada silla y respaldo está pensado para brindar comodidad y agregar un toque distintivo a tus ambientes."
// Foto de la fábrica

// Título: "Tradición Artesanal"
// Body: "Conoce el corazón de 'El Abuelo', donde la pasión y la experiencia se unen para crear productos de calidad excepcional."

const cards = [
  {
    title: "Comodidad Clásica",
    body: "Descubre la elegancia y el confort en nuestros sillones, diseñados para realzar cada espacio de tu hogar.",
    img: "sillon.png",
  },
  {
    title: "Calidad en Cada Capa",
    body: "Nuestra variedad de colchones se adapta a tus necesidades, ofreciendo el soporte y confort que mereces.",
    img: "colchon.png",
  },
  {
    title: "Innovación en Descanso",
    body: "Explora nuestra línea de box, la solución perfecta para un sueño reparador y un aprovechamiento óptimo del espacio.",
    img: "box.png",
  },
  {
    title: "Estilo y Funcionalidad",
    body: "Cada silla y respaldo está pensado para brindar comodidad y agregar un toque distintivo a tus ambientes.",
    img: "sillas.png",
  },
  {
    title: "Tradición Artesanal",
    body: "Conoce el corazón de 'El Abuelo', donde la pasión y la experiencia se unen para crear productos de calidad excepcional.",
    img: "5.png",
  },
];

export const SliderCoverflow = () => {
  const radialStyle = useRadialBackground();
  return (
    <div className="w-screen">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.5}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper w-screen"
      >
        {cards.map((e) => (
          <SwiperSlide
            className="bg-slate-200 rounded-xl h-full p-4"
            style={radialStyle}
          >
            <div className="flex lg:flex-row flex-col justify-center items-center">
              <div className="my-2 lg:my-0">
                <p className="text-slate-800 text-center font-bold text-3xl lg:text-5xl leading-7" >{e.title}</p>
                <p className="text-slate-800 text-center text-xs lg:text-md mt-5">{e.body}</p>
              </div>
              <img className="lg:w-5/12 w-9/12" src={e.img} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
