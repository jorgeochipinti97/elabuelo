"use client";
import { NavbarAdmin } from "@/app/components/NavbarAdmin";
import { formattwo } from "@/app/utils/currency";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Order = () => {
  const pathname = usePathname();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const orders_ = await axios.get("/api/orders");
    setOrder(orders_.data.find((e) => pathname.includes(e._id)));
  };

  return (
    <>
      <div className="h-fit w-full flex flex-col lg:flex-row">
        <NavbarAdmin />
        <main className="flex-1 p-5 pt-32  bg-white  ml-64">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-5 text-slate-800">
              Detalles de Orden: {order._id}
            </h1>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">
                Información de la Orden
              </h2>
              <p className="text-slate-800">Total: {formattwo(order.total)}</p>
              <p className="text-slate-800">
                Estado de Pago: {order.isPaid ? "Pagado" : "Pendiente"}
              </p>
              <p className="text-slate-800">
                Fecha de Creación:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              {/* Otros detalles relevantes */}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">
                Dirección de Envío
              </h2>
              <p className="text-slate-800">
                Nombre: {order.shippingAddress && order.shippingAddress.name}
              </p>
              <p className="text-slate-800">
                Dirección:{" "}
                {order.shippingAddress && order.shippingAddress.address}
              </p>
              {/* Otros detalles de envío */}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">
                Artículos de la Orden
              </h2>
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item._id} className="mb-4">
                    <p className="text-slate-800">
                      {item.titulo} - {item.size} - Cantidad: {item.quantity}
                    </p>
                    <p className="text-slate-800">Precio: {formattwo(item.precio)}</p>
                    {/* Otros detalles del artículo */}
                  </div>
                ))}
            </div>

            <div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Marcar como Paga
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Order;
