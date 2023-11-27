"use client";
import { NavbarAdmin } from "@/app/components/NavbarAdmin";
import { ProductForm } from "@/app/components/ProductForm";
import useProductos from "@/app/hooks/useProducts";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { productos } = useProductos();
  const [product, setProduct] = useState();

  useEffect(() => {
    const product_ =
      productos && productos.filter((e) => e.slug == params.slug);
    setProduct(product_[0]);
  }, [productos]);

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
        <NavbarAdmin />
      <main className="flex-1 p-5 pt-24  bg-white ml-64">
        <ProductForm product={product} isUpdating/>
      </main>
    </div>
  );
}
