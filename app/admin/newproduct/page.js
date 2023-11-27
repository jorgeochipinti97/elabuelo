"use client";

import Link from "next/link";
import { ProductForm } from "../../components/ProductForm";
import { NavbarAdmin } from "@/app/components/NavbarAdmin";
import { useEffect } from "react";

const NewProduct = () => {
  useEffect(() => {
    // Esta función se ejecutará cuando se detecte un evento de rueda del mouse
    const disableScroll = (event) => {
      // Comprueba si el elemento activo es un input y su tipo es 'number'
      const activeElement = document.activeElement;
      if (activeElement && activeElement.type === 'number') {
        event.preventDefault();
      }
    };

    // Añade el controlador de eventos al window, solo si está definido (es decir, en el navegador)
    if (typeof window !== 'undefined') {
      window.addEventListener('wheel', disableScroll, { passive: false });
    }

    // La función de limpieza se ejecuta al desmontar el componente
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('wheel', disableScroll);
      }
    };
  }, []);
  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      <NavbarAdmin />
      <main className="flex-1 p-5 pt-32  bg-white ml-64">
        <ProductForm isUpdating={false}/>
   
      </main>
    </div>
  );
};

export default NewProduct;
