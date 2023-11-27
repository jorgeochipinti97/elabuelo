"use client";
import Link from "next/link";

import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useContext, useEffect, useState } from "react";
import useProductos from "@/app/hooks/useProducts";
import { formattwo } from "@/app/utils/currency";
import { CartContext } from "@/app/context/cart/CartContext";
import { ItemCounter } from "@/app/components/ItemCounter";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { push } = useRouter();
  const { productos } = useProductos();
  const { addProductToCart } = useContext(CartContext);
  const [quantity_, setQuantity_] = useState(0);

  const [size, setSize] = useState();
  const [producto, setProducto] = useState();
  const [tempCartProduct, setTempCartProduct] = useState({});

  useEffect(() => {
    const productoFilter = productos.filter((e) => e.slug == params.slug);
    productos && setProducto(productoFilter[0]);
  }, [productos]);
  useEffect(() => {
    producto &&
      setTempCartProduct({
        _id: producto._id,
        image: producto.images[0],
        precio: producto.precio,
        slug: producto.slug,
        titulo: producto.titulo,
        quantity: 1,
      });
  }, [producto]);

  useEffect(() => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  }, [size]);

  const addOrRemove = (value) => {
    if (value === -1) {
      if (tempCartProduct.quantity === 1) return;

      return onUpdateQuantity(tempCartProduct.quantity - 1);
    }

    if (tempCartProduct.quantity >= 10) return;

    onUpdateQuantity(tempCartProduct.quantity + 1);
  };
  const onUpdateQuantity = (quantity) => {
    setQuantity_(quantity);
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };
  useEffect(() => {
    console.log(tempCartProduct.size);
  }, [tempCartProduct]);

  const onHandleClickAddToCart = () => {
    if (producto.categoria === "sommiers" && !size) {
      alert("Seleccione un tamaño, por favor.");
      return;
    }
    addProductToCart(tempCartProduct);
    push("/cart");
  };

  return (
    <section className="w-full min-h-screen  lg:py-32 bg-zinc-50">
      <div className="container flex lg:flex-row flex-col items-start gap-8 px-4 md:px-6">
        <div className="w-12/12 lg:w-8/12 mt-20 lg:mt-0 ">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper full"
          >
            {producto &&
              producto.images.map((e) => (
                <SwiperSlide key={e}>
                  <img src={e} alt="" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="space-y-6  w-full">
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 capitalize">
            {producto && producto.titulo}
          </h1>
          <p className="text-2xl font-semibold">
            {producto ? (
              producto.descuento > 0 ? (
                <>
                  <span className="text-red-500 line-through">
                    {formattwo(producto.precio)}
                  </span>{" "}
                  <span className="text-green-500">
                    {formattwo(
                      producto.precio -
                        (producto.precio * producto.descuento) / 100
                    )}
                  </span>
                </>
              ) : (
                <span className="text-zinc-900">
                  {formattwo(producto.precio)}
                </span>
              )
            ) : (
              // Puedes mostrar un mensaje de carga o un spinner aquí
              <span>Cargando...</span>
            )}
          </p>

          {size && (
            <div className="flex items-center space-x-2">
              <button
                size="icon"
                variant="outline"
                onClick={() => addOrRemove(-1)}
              >
                <svg
                  className=" w-6 h-6 border-2 rounded-full "
                  fill="black"
                  height="24"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12h14" />
                </svg>
                <span className="sr-only">Decrease quantity</span>
              </button>
              <div className="border-zinc-800 px-3 py-1 rounded-md text-center text-black">
                {tempCartProduct.quantity}
              </div>
              <button
                size="icon"
                variant="outline"
                onClick={() => addOrRemove(1)}
              >
                <svg
                  className=" w-6 h-6 border-2 rounded-full "
                  fill="none"
                  height="24"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <span className="sr-only">Increase quantity</span>
              </button>
            </div>
          )}
          {producto &&
            (producto.categoria.toLowerCase() === "sommiers" ||
              producto.categoria.toLowerCase() === "combo") &&
            producto.talles.some((talle) => talle.stock > 0) && (
              <div className="flex space-x-2">
                {producto.talles.map((talle, index) =>
                  talle.stock > 0 ? (
                    <button
                      key={index}
                      onClick={() => setSize(talle.nombre)}
                      className={`w-fit px-2 h-12 rounded-md   ${
                        size == talle.nombre
                          ? "bg-slate-800 text-slate-50"
                          : "bg-zinc-50 border-2 border-slate-800 text-slate-900"
                      } hover:bg-slate-600 hover:text-slate-50 shadow-xl`}
                    >
                      {talle.nombre}
                    </button>
                  ) : (
                    <></>
                  )
                )}
              </div>
            )}

          <p className="text-xs text-zinc-500  capitalize text-justify">
            {producto && producto.descripcion}
          </p>
          <section className="flex w-full  items-start flex-col justify-center  py-5 lg:py-0">
            <div className="w-full flex justify-start  ">
              <button
                className="px-5 h-12 rounded-lg flex items-center justify-center  bg-sky-500 text-zinc-50 shadow-sm font-bold lg:mt-10"
                onClick={() => onHandleClickAddToCart()}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <title>cart-plus</title>
                    <path d="M11 9H13V6H16V4H13V1H11V4H8V6H11M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18M17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18M7.2 14.8V14.7L8.1 13H15.5C16.2 13 16.9 12.6 17.2 12L21.1 5L19.4 4L15.5 11H8.5L4.3 2H1V4H3L6.6 11.6L5.2 14C5.1 14.3 5 14.6 5 15C5 16.1 5.9 17 7 17H19V15H7.4C7.3 15 7.2 14.9 7.2 14.8Z" />
                  </svg>
                </span>
                Agregar al carrito
              </button>
            </div>
            <div className="w-full hidden lg:flex mt-20">
              {/* <img src="/meli.png" alt="mercadopago" className="w-3/12" /> */}
              <div className="flex flex-col justify-center items-center">
                <span className="flex justify-center">
                  <svg
                    className="w-3/12  rounded-full border-2 border-green-600 p-2"
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
              <div className="flex flex-col justify-center items-center">
                <span className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3/12  rounded-full border-2 border-green-600 p-2"
                    viewBox="0 0 256 256"
                  >
                    <g
                      id="galaSecure0"
                      fill="none"
                      stroke="green"
                      stroke-dasharray="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="4"
                      stroke-opacity="1"
                      stroke-width="16"
                    >
                      <path
                        id="galaSecure1"
                        d="m 127.99999,239.96468 c 0,0 95.98506,-31.99503 95.98506,-111.98257"
                      />
                      <path
                        id="galaSecure2"
                        d="M 223.98505,127.98211 V 31.997059 c 0,0 -31.99502,-15.997511 -95.98506,-15.997511"
                      />
                      <path
                        id="galaSecure3"
                        d="m 128,239.96468 c 0,0 -95.985056,-31.99503 -95.985056,-111.98257"
                      />
                      <path
                        id="galaSecure4"
                        d="M 32.014944,127.98211 V 31.997059 c 0,0 31.995019,-15.997509 95.985056,-15.997509"
                      />
                      <path
                        id="galaSecure5"
                        d="M 191.99003,63.99208 C 128,111.9846 112.00249,175.97464 112.00249,175.97464 c 0,0 -15.997511,-19.0946 -31.995019,-31.99502"
                      />
                    </g>
                  </svg>
                </span>
                <p className="text-slate-950 font-extralight">Pago seguro</p>
              </div>
              <div className="flex flex-col justify-center items-center   w-fit">
                <span className="flex justify-center">
                  <svg
                    className="w-3/12  rounded-full border-2 border-green-600 p-2"
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
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
