"use client";
import axios from "axios";
import React, { useState } from "react";

export const FormQuery = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");

  const validateForm = () => {
    const inputs = [name, zipCode, phone, email];
    return inputs.every(input => input.trim().length >= 3);
  };

  const postQuery = async () => {
    const newQuery = await axios.post("/api/query", {
      name: name,
      email: email,
      phone: phone,
      zipCode: zipCode,
    });
    alert("El formulario ha sido enviado");
    newQuery.data.success && setName("");
    newQuery.data.success && setEmail("");
    newQuery.data.success && setPhone("");
    newQuery.data.success && setZipCode("");
  };

  const onSubmit = () => {
    try {
      validateForm() && postQuery()
      !validateForm() && alert('completa todos los campos por favor')

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col w-11/12 items-start justify-center  bg-slate-950/50 py-2 rounded-lg  px-10  ">
      <label className="rounded-lg bg-red-950 text-white px-2 text-2xl my-2 ">
        Nombre
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="py-1 focus:outline-none border-2 text-slate-950 px-2 focus:border-red-800 rounded-lg my-2 w-full"
      ></input>
      <label className="rounded-lg bg-red-950 text-white px-2 text-2xl my-2 ">
        Código Postal
      </label>
      <input
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        type="text"
        className="py-1 focus:outline-none border-2 text-slate-950 px-2 focus:border-red-800 rounded-lg my-2 w-full"
      ></input>
      <label className="rounded-lg bg-red-950 text-white px-2 text-2xl my-2 ">
        Celular
      </label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        className="py-1 focus:outline-none border-2 text-slate-950 px-2 focus:border-red-800 rounded-lg my-2 w-full"
      ></input>
      <label className="rounded-lg bg-red-950 text-white px-2 text-2xl my-2 ">
        Email
      </label>
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="py-1 focus:outline-none border-2 text-slate-950 px-2 focus:border-red-800 rounded-lg my-2 w-full"
      ></input>
      <div className="w-full flex justify-center my-2">
        <button
          className="border-2 border-sky-950 py-2 px-4 rounded-lg bg-sky-500/80"
          onClick={() => onSubmit()}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
