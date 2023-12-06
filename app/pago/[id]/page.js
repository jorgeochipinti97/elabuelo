"use client";
import axios from "axios";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [order_, setOrder_] = useState();
  const params = useParams();
  const searchParams = useSearchParams();
  const getAndPutOrder = async () => {
    const data = await axios.get("/api/orders");
    const order = data.data.filter((e) => e._id == params.id);
    searchParams.get("status") == "approved" && setOrderStatus();
const modify = await axios.put('/api/orders',{
  ...order[0], isPaid:true
})
console.log(modify)
    setOrder_(order[0]);
  };
  useEffect(() => {
  searchParams &&   getAndPutOrder();
  }, []);

  const setOrderStatus = async () => {
    // const data = await axios.put('/api/orders',{
    // })
  };
  return (
    <>
    {order_ && (

      <div className="h-screen pt-28">
        <p className="text-slate-800">Tu pago se ha procesado con éxito</p>
        <p className="text-slate-800">Tu numero de orden es {order_._id}</p>
        <p className="text-slate-800">Contactate con nosotros para obtener la informacion sobre el envio</p>
      </div>
        )}
    </>
  );
}
