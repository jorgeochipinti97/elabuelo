// hooks/useProductos.js
import { useState, useEffect } from "react";
import mongoose from "mongoose";
import axios from "axios";

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductos = async () => {
      try {

        let url = "/api/products";
        const response = await axios.get(url);
        const products = response.data;
        setProductos(products);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, []);

  return { productos, loading, error };
};

export default useProductos;
