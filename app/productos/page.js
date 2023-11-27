"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import useProductos from "../hooks/useProducts";
import { formattwo } from "../utils/currency";
import { ProductList } from "../components/ProductList";
import { CategoryFilter } from "../components/CategoryFilter";
import PriceRangeFilter from "../components/PriceRangeFilter";
import { SubcategoryFilter } from "../components/SubcategoryFilter";

export default function Page() {
  const { productos } = useProductos();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const handlePriceChange = (newPrice) => {
    setPriceRange({ ...priceRange, max: newPrice });
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const filterProducts = () => {
      const filtered = productos.filter((product) => {
        const matchesPrice =
          product.precio >= priceRange.min && product.precio <= priceRange.max;

        if (selectedCategory.toLowerCase() == "todos") {
          return matchesPrice;
        }
        const matchesCategory = selectedCategory
          ? product.subcategoria.toLowerCase() ===
            selectedCategory.toLowerCase()
          : true;
        return matchesCategory && matchesPrice;
      });

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedCategory, priceRange, productos]);

  const [orden, setOrden] = useState("precioAsc");

  useEffect(() => {
    const productosOrdenados = filteredProducts.slice().sort((a, b) => {
      if (orden === "precioAsc") {
        return a.precio - b.precio;
      } else if (orden === "precioDesc") {
        return b.precio - a.precio;
      }
      // Añadir más condiciones de ordenamiento si es necesario
    });

    setFilteredProducts(productosOrdenados);
  }, [orden]);
  return (
    <>
      {" "}
      <div className="min-h-screen bg-white pt-20">
        <div className="  py-3 lg:py-16 ">
          <div className="  flex  justify-center flex-col lg:flex-row">
            <div className="  ">
              <div className="lg:sticky lg:top-20">
                <div className=" mx-4  lg:border-r-2 border-black lg:pr-5">
                  <section className=" ">
                    <p className=" text-black text-xl font-bold tracking-tight">
                      Filtrar por categoria  <br/><span className="text-slate-900 text-lg"> {selectedCategory.toUpperCase()}</span>
                    </p>
                    {/* <div>
                    <CategoryFilter onCategoryChange={handleCategoryChange} />
                  </div> */}
                    <div>
                      <SubcategoryFilter
                        onCategoryChange={handleCategoryChange}
                      />
                    </div>
                  </section>
                  <section className="w-full mt-10">
                    <div className="container">
                      <div>
                        <PriceRangeFilter
                          onPriceChange={handlePriceChange}
                          maxPrice={priceRange.max}
                        />
                      </div>
                    </div>
                  </section>
                  <section>
                    {" "}
                    <div>
                      <div className="container mx-auto p-4">
                        <div className="mb-4">
                          <label
                            htmlFor="orden"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Ordenar por
                          </label>
                          <select
                            id="orden"
                            value={orden}
                            defaultValue={"precioDesc"}
                            onChange={(e) => setOrden(e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:red-indigo-500 sm:text-sm"
                          >
                            <option value="precioAsc">Menor precio</option>
                            <option value="precioDesc">Mayor precio</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="lg:flex-1  flex justify-center">
              <ProductList productos={filteredProducts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
