
import React from "react";

export const ItemCounter = ({ currentValue, updatedQuantity, maxValue }) => {
  const addOrRemove = (value) => {
    if (value === -1) {
      if (currentValue === 1) return;

      return updatedQuantity(currentValue - 1);
    }

    if (currentValue >= maxValue) return;

    updatedQuantity(currentValue + 1);
  };
  return (
    <div className="flex items-center space-x-2">
      <button size="icon" variant="outline"  onClick={ () => addOrRemove(-1) }>
        <svg
          className=" w-6 h-6 border-2 rounded-full "
          fill="black"
          height="24"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 12h14" />
        </svg>
        <span className="sr-only">Decrease quantity</span>
      </button>
      <div className="border-zinc-800 px-3 py-1 rounded-md text-center text-black">
        {currentValue}
      </div>
      <button size="icon" variant="outline"  onClick={ () => addOrRemove(-1) }> 
        <svg
          className=" w-6 h-6 border-2 rounded-full "
          fill="none"
          height="24"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <span className="sr-only">Increase quantity</span>
      </button>
    </div>
  );
};
