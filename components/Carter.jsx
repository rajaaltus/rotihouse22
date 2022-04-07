import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";

const Carter = ({ addItemToCart, removeItemFromCart, id }) => {
  const [isActive, setIsActive] = useState(false);
  const { cartItems } = useCart();
  const handleIncrement = () => {
    setIsActive(true);
    addItemToCart();
  };
  const handleDecrement = () => {
    removeItemFromCart();
  };

  return (
    <div className="absolute top-3 right-4">
      <div className="flex items-center justify-between  flex-row-reverse">
        <button
          className="w-10 h-10 bg-green-600 text-white rounded-full text-2xl font-semibold "
          onClick={handleIncrement}
        >
          +
        </button>
        {isActive && (
          <>
            {cartItems && cartItems[id] && (
              <span className="px-4">
                {cartItems && cartItems[id] && cartItems[id].qty}
              </span>
            )}
            <button
              className="w-10 h-10 bg-green-600 text-white rounded-full text-2xl font-semibold"
              onClick={handleDecrement}
            >
              -
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Carter;
