"use client";
import React from "react";
import { CartProvider } from "./context/cart/CartProvider";

export function Providers({ children }) {
  return (
    <>
      <CartProvider>{children}</CartProvider>
    </>
  );
}
