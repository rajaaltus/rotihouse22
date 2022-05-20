import { ShoppingBagIcon } from "@heroicons/react/solid";
import React from "react";
import { useCart } from "../hooks/useCart";

const FloatingCart = ({ handleOpen }) => {
  const { itemCount } = useCart();
  return (
    <>
      {itemCount > 0 && (
        <div
          onClick={handleOpen}
          className="fixed top-1/2 right-8 z-50 h-auto hover:cursor-pointer group "
        >
          <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shadow-yellow-400 hover:scale-110 duration-200 ease-in-out">
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg text-sm">
              {itemCount}
            </div>
            <ShoppingBagIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCart;
