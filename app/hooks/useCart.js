"use client";
import { useState } from "react";

function useShoppingCart() {
  const [cart, setCart] = useState([]);
  const cartItems = cart.length;

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartItems,
  };
}

export default useShoppingCart;
