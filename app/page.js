"use client";
import Image from "next/image";
import Link from "next/link";
import { FormQuery } from "./components/FormQuery";
import { SliderCoverflow } from "./components/Sliders/SliderCoverflow";
import useProductos from "./hooks/useProducts";
import { format, formattwo } from "./utils/currency";

export default function Home() {
  const { productos } = useProductos();

  return (
    <div className="">
      <div
        className="h-screen "
        style={{
          backgroundImage:
            "  linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.1))",
          backgroundSize: "cover",
          backgroundPositionY: "80%",
          scrollSnapAlign: "start",
        }}
      >
        <section className="w-full pt-20 lg:py-12 py-4 bg-gray-300 h-screen text-white lg:pt-36 flex flex-col justify-start lg:px-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-blue-950 sm:text-5xl xl:text-6xl/none">
                    Descubre el Sueño Perfecto
                  </h1>
                  <p className="max-w-[600px] text-black md:text-xl font-light">
                    Calidad Superior, Confort Inigualable
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-black md:text-lg text-md font-extralight">
                    En nuestra fábrica de colchones, nos enorgullece ofrecerte
                    la máxima calidad en cada sueño. Cada uno de nuestros
                    colchones está diseñado meticulosamente para brindarte el
                    confort y el soporte que mereces. Utilizamos los materiales
                    más avanzados y técnicas de fabricación de vanguardia para
                    asegurarnos de que experimentes el sueño más placentero de
                    tu vida, noche tras noche.
                  </p>
                </div>
              </div>
              <div className=" justify-center flex ">
                <img
                  alt="Hero"
                  className="shadow  mx-auto aspect-video overflow-hidden rounded-xl  object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="/fondo3.png"
                  width="550"
                />
              </div>
            </div>
          </div>
          <div className="w-full  mt-20 justify-center items-center hidden lg:flex">
            <div className="grid grid-cols-4 border-2 rounded-full  bg-white py-0 lg:py-4 border-slate-100 shadow">
              <div className="flex flex-col justify-center items-center border-r-2 border-gray-400">
                <span className="flex justify-center">
                  <svg
                    className="w-2/12  rounded-full border-2 border-green-600 p-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>credit-card-check-outline</title>
                    <path d="M13 19C13 18.66 13.04 18.33 13.09 18H3V12H19V13C19.7 13 20.37 13.13 21 13.35V6C21 4.89 20.11 4 19 4H3C1.89 4 1 4.89 1 6V18C1 19.1 1.89 20 3 20H13.09C13.04 19.67 13 19.34 13 19M3 6H19V8H3V6M17.75 22L15 19L16.16 17.84L17.75 19.43L21.34 15.84L22.5 17.25L17.75 22" />
                  </svg>
                </span>
                <p className="text-slate-950 font-extralight">
                  Tarjeta de credito
                </p>
              </div>
              <div className="flex flex-col justify-center items-center  border-r-2 border-gray-400">
                <span className="flex justify-center">
                  <svg
                    className="w-2/12  rounded-full border-2 border-green-600 p-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>credit-card-check-outline</title>
                    <path d="M13 19C13 18.66 13.04 18.33 13.09 18H3V12H19V13C19.7 13 20.37 13.13 21 13.35V6C21 4.89 20.11 4 19 4H3C1.89 4 1 4.89 1 6V18C1 19.1 1.89 20 3 20H13.09C13.04 19.67 13 19.34 13 19M3 6H19V8H3V6M17.75 22L15 19L16.16 17.84L17.75 19.43L21.34 15.84L22.5 17.25L17.75 22" />
                  </svg>
                </span>
                <p className="text-slate-950 font-extralight">
                  Tarjeta de débito
                </p>
              </div>
              <div className="flex flex-col justify-center items-center  border-r-2 border-gray-400">
                <span className="flex justify-center">
                  <svg
                    className="w-2/12  rounded-full border-2 border-green-600 p-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>bank-check</title>
                    <path d="M17.8 21.2L15 18.2L16.2 17L17.8 18.6L21.4 15L22.6 16.4L17.8 21.2M13 10H10V17H12.1C12.2 16.2 12.6 15.4 13 14.7V10M16 10V12.3C16.6 12.1 17.3 12 18 12C18.3 12 18.7 12 19 12.1V10H16M12.1 19H2V22H13.5C12.8 21.2 12.3 20.1 12.1 19M21 6L11.5 1L2 6V8H21V6M7 17V10H4V17H7Z" />
                  </svg>
                </span>
                <p className="text-slate-950 font-extralight">
                  Transferencia bancaria
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="flex justify-center">
                  <svg
                    className="w-2/12  rounded-full border-2 border-green-600 p-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>truck</title>
                    <path d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z" />
                  </svg>
                </span>
                <p className="text-slate-950 font-extralight">
                  Envios a todo el país
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-center text-md lg:mt-10 mt-2  lg:text-xl text-slate-700 font-extralight">
            <span className="font-semibold">30%</span> de{" "}
            <span className="font-light">descuento</span> en efectivo,{" "}
            <span className="font-semibold"> listo para vos.</span>
          </h2>
        </section>
      </div>
      <div
        className="flex justify-start items-start  w-screen bg-slate-950 h-screen"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="mx-auto w-screen lg:pt-28 pt-5 ">
          <h2 className="text-5xl text-white font-bold text-center mb-5">
            Somos fabricantes
          </h2>
          <p className=" font-thin leading-loose text-white/80 text-center mb-10 mx-3">
            Nos enorgullece ser fabricantes de colchones de{" "}
            <span className="font-semibold">primera calidad y premium</span>.
            Nuestra dedicación a la{" "}
            <span className="font-semibold"> excelencia</span> se refleja en
            cada uno de nuestros productos.
          </p>

          <SliderCoverflow />
        </div>
      </div>
      <div className="min-h-screen bg-slate-50 w-screen snap-start flex-col flex justify-start pt-10 items-center">
        <span className="loader lg:mt-0" />
        <div className="mt-0 lg:mt-5">
          <p className=" text-3xl mt-3 lg:text-5xl font-bold text-slate-800">
            Conéctate con Nosotros
          </p>
          <p className="text-md lg:text-2xl text-slate-700 text-center">
            Visita Nuestro Local
          </p>
        </div>
        <div className="w-8/12 mt-5 md:w-600 md:h-450 aspect-ratio-16/9 md:aspect-ratio-none flex justify-center">
          <iframe
            className="rouded-full "
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3275.7107160254227!2d-58.43620222425059!3d-34.81321917287995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDQ4JzQ3LjYiUyA1OMKwMjYnMDEuMSJX!5e0!3m2!1ses!2sar!4v1700833499949!5m2!1ses!2sar"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <main
        className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-slate-900 "
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          scrollSnapAlign: "start",
        }}
      >
        <div className="  flex-wrap justify-around w-full  items-center  hidden lg:flex mt-10">
          {productos &&
            productos.slice(0, 4).map((e) => (
              <>
                <Link href={`/productos/${e.slug}`}>
                  <div className="w-auto  flex justify-center items-center flex-wrap">
                    <div className="w-full max-w-sm grid  ">
                      <div
                        className=" rounded-md shadow flex items-end justify-center"
                        style={{
                          height: "300px",
                          width: "300px",
                          backgroundImage: `url(${e.images[0]})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="backdrop-blur-sm border-t-2  w-full bg-white/80 border-gray-900 pb-2 rounded-b-lg pl-5 flex justify-start items-start flex-col">
                          <h3 className="font-semibold tracking-tight text-stone-800 ">
                            {e.titulo}
                          </h3>
                          <h4 className="font-semibold text-green-700 text-xl">
                            {formattwo(e.precio)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
        </div>
        <section className="flex lg:max-h-screen items-center justify-start flex-col ">
          <div>
            <p className="text-4xl text-center mt-20 mb-5">
              ¡No te pierdas nuestras ofertas exclusivas!
            </p>
            <div className="w-full flex justify-center">
              <p className="text-md text-justify mx-5  mb-5 font-thin w-10/12">
                Estamos <span className="font-light">comprometidos</span> a
                brindarte{" "}
                <span className="font-semibold">
                  el mejor descanso y confort
                </span>
                . Suscríbete para recibir nuestras ofertas exclusivas y consejos
                para{" "}
                <span className="font-light">
                  mejorar la calidad de tu sueño
                </span>
                . Al completar el formulario de contacto, no solo te mantendrás
                actualizado con nuestras promociones especiales, sino que
                también estarás listo para
                <span className="font-semibold ml-2">
                  recibir una atención personalizada
                </span>
                .
              </p>
            </div>
          </div>
          <FormQuery />
        </section>
      </main>

    </div>
  );
}
