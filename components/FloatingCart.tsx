import { ShoppingCartIcon } from "@heroicons/react/outline";
import React, { FC } from "react";
import { useCart } from "../hooks/useCart";
import { motion } from "framer-motion";

interface IFloatingCart {
  handleOpen: () => void;
}

const FloatingCart: FC<IFloatingCart> = ({ handleOpen }) => {
  const { itemCount } = useCart();
  return (
    <>
      {itemCount > 0 ? (
        <motion.div
          onClick={handleOpen}
          className="fixed top-1/2 right-8 z-50 h-auto hover:cursor-pointer group"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          key={itemCount}
        >
          <div className="relative w-12 h-12 bg-yellow-400 ring-4 ring-opacity-60  ring-yellow-400 rounded-full flex items-center justify-center   hover:scale-110 duration-200 ease-in-out">
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-100  flex items-center justify-center shadow-md  text-sm font-semibold">
              {itemCount}
            </div>
            <ShoppingCartIcon className="w-6 h-6 text-black" />
          </div>
        </motion.div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FloatingCart;
