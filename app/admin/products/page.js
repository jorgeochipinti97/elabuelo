"use client";

import { NavbarAdmin } from "@/app/components/NavbarAdmin";
import useProductos from "@/app/hooks/useProducts";
import { formattwo } from "@/app/utils/currency";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { productos } = useProductos();
const router = useRouter()
  const [products, setProducts] = useState(productos);

  const deleteProduct = async (_id) => {
    try {
      const productDeleted = await axios.delete("/api/product", {
        data: { _id: _id },
      });
      productDeleted.status == 200 && alert("producto eliminado exitosamente");
      const newProducts = products.filter((e) => e._id == _id);
      setProducts(newProducts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    productos && setProducts(productos);
  }, [productos]);

  return (
    <>
      <div className="h-screen w-full flex flex-col lg:flex-row">
        <NavbarAdmin />
        <main className="flex-1 p-5 pt-32  bg-white ml-64">
          <table className="w-11/12">
            <thead className="mx-2 border-2 ">
              <tr className="mx-2">
                <th className="text-black">-</th>
                <th className="text-black">Nombre del producto</th>
                <th className="text-black">Categoria</th>
                <th className="text-center text-black">Precio</th>

                <th className="text-center text-black ">
                  <div className="flex justify-center">
                    <svg
                      width={30}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>note-edit</title>
                      <path d="M21 10V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H11V19.13L19.39 10.74C19.83 10.3 20.39 10.06 21 10M14 4.5L19.5 10H14V4.5M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83Z" />
                    </svg>
                  </div>
                </th>

                <th className="text-center text-black ">
                  <div className="flex justify-center">
                    <svg
                      width={30}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>delete-empty</title>
                      <path d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((e) => (
                  <tr key={e.titulo} className="mx-2 border-2 border-gray">
                    <td className="text-black text-center">
                      <img src={e.images[0]} alt="" width={100} />
                    </td>
                    <td className="text-black text-center">{e.titulo}</td>
                    <td className="text-black text-center">{e.categoria}</td>
                    <td className=" text-black text-center">
                      {formattwo(e.precio)}
                    </td>
                    <td className=" ">
                      <div className="flex items-center justify-center">
                        <button
                          className="ml-2 bg-sky-900 px-2 rounded-lg"
                          variant="destructive"
                          onClick={()=> router.push(`/admin/products/${e.slug}`)}
                        >
                          Editar{" "}
                        </button>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex items-center justify-center">
                        <button
                          className="ml-2 bg-red-900 px-2 rounded-lg"
                          variant="destructive"
                          onClick={() => deleteProduct(e._id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Page;
