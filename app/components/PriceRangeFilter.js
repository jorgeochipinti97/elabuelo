// components/PriceRangeFilter.js

import { useState } from "react";
import { formattwo } from "../utils/currency";

const PriceRangeFilter = ({ onPriceChange, maxPrice }) => {
  const onChange = (e) => {
    setPriceFilter(e.target.value);
  };
  const [priceFilter, setPriceFilter] = useState(500000);

  return (
    <div>
      <p className=" text-black text-xl font-bold tracking-tight">
        Filtrar por precio  <br/><span className="text-slate-900 text-lg"> {formattwo(priceFilter)}</span>
      </p>
      <div>
        <input
          type="range"
          min="0"
          value={priceFilter}
          max={500000}
          defaultValue={500000}
          onChange={(e) => {
            onPriceChange(e.target.value)
            onChange(e)}}
          className="w-full" // Utilizando Tailwind CSS para el ancho completo.
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
