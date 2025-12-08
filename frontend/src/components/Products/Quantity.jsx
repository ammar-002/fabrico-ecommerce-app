import React, { useState } from "react";

const Quantity = ({ quantity, setQuantity,product }) => {
  const stock = product.stock; // Assuming a fixed stock value for demonstration
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex  items-center gap-2 bg-blue-100 px-2 py-[1px] rounded-full w-fit shadow-sm">
      <button
        onClick={decrement}
        className="cursor-pointer bg-blue-600 text-white text-sm font-bold w-6 h-6 rounded-full hover:bg-blue-700 transition flex items-center justify-center"
      >
        -
      </button>
      <span className="text-base font-semibold text-blue-900 min-w-[20px] text-center">
        {count}
      </span>
      <button
      disabled={count>= stock}
        onClick={increment}
        className="cursor-pointer bg-blue-600 text-white text-sm font-bold w-6 h-6 rounded-full hover:bg-blue-700 transition flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
