"use client";

import Link from "next/link";
import { NavbarAdmin } from "../components/NavbarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Component() {
  const [queries, setQueries] = useState([]);
  const getQuery = async () => {
    const data = await axios.get("/api/query");
    setQueries(data.data);
  };

  useEffect(() => {
    getQuery();
  }, []);
  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      <NavbarAdmin />
      <main className="flex-1 p-5 pt-24  bg-white  ml-64">
        <div className="flex flex-col ">
          <p className="text-slate-950 text-5xl text-center mb-10">Newsletter</p>
          <div className="flex justify-around">
          <table className="w-11/12">
            <thead className="mx-2 border-2 ">
              <tr className="mx-2">

                <th className="text-black">Nombre</th>
                <th className="text-black">Email</th>
                <th className="text-center text-black">Celular</th>

                <th className="text-center text-black ">
Código Postal
                </th>

             
              </tr>
            </thead>
            <tbody>
              {queries &&
                queries.map((e) => (
                  <tr key={e.titulo} className="mx-2 border-2 border-gray">
          
                    <td className="text-black text-center">{e.name}</td>
                    <td className="text-black text-center">{e.email}</td>
                    <td className="text-black text-center">{e.phone}</td>
                    <td className="text-black text-center">{e.zipCode}</td>
           
          
                  </tr>
                ))}
            </tbody>
          </table>
       
          </div>
        </div>
      </main>
    </div>
  );
}
