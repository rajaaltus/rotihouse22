import { ShoppingCartIcon } from "@heroicons/react/outline";
import React, { FC } from "react";
import { useCart } from "../hooks/useCart";

interface IFloatingCart {
  handleOpen: () => void;
}

const FloatingCart: FC<IFloatingCart> = ({ handleOpen }) => {
  const { itemCount } = useCart();
  return (
    <>
      {itemCount > 0 ? (
        <div
          onClick={handleOpen}
          className="fixed top-1/2 right-8 z-50 h-auto hover:cursor-pointer group "
        >
          <div className="relative w-12 h-12 bg-yellow-400 ring-4 ring-opacity-60  ring-yellow-400 rounded-full flex items-center justify-center   hover:scale-110 duration-200 ease-in-out">
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400  flex items-center justify-center shadow-md  text-sm">
              {itemCount}
            </div>
            <ShoppingCartIcon className="w-6 h-6 text-black" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FloatingCart;
