import React, { FC, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import {
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { CartItemType } from "../helpers/types";
import { motion } from "framer-motion";

interface CarterProps {
  product: CartItemType;
}
const Carter: FC<CarterProps> = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const {
    increase,
    addProduct,
    decrease,
    cartItems,
    removeProduct,
  } = useCart();

  const getQty = (product: CartItemType) => {
    return (
      cartItems[
        cartItems.findIndex((item: CartItemType) => item.id === product.id)
      ] &&
      cartItems[cartItems.findIndex((item: CartItemType) => item.id === product.id)]
        .qty
    );
  };

  useEffect(() => {
    const check =
      (cartItems &&
        cartItems[
          cartItems.findIndex((item: CartItemType) => item.id === product.id)
        ]) ||
      null;
    check ? setIsInCart(true) : setIsInCart(false);
  }, [cartItems, product.id]);

  return (
    <div className="flex items-center justify-between flex-row-reverse bg-red-100 bg-opacity-30 rounded-md">
      {isInCart && getQty(product) > 0 && (
        <button
          className="btn flex items-center justify-center"
          onClick={() => increase(product)}
          type="button"
          aria-label="add"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      )}

      {!isInCart && (
        <button
          className="btn-lg"
          onClick={() => addProduct(product)}
          type="button"
          aria-label="add"
        >
          <PlusCircleIcon className="w-5 h-5" />
        </button>
      )}

      {isInCart && <span className="px-4 text-white">{getQty(product)}</span>}

      {isInCart && getQty(product) > 1 && (
        <button
          className="btn flex items-center justify-center"
          onClick={() => decrease(product)}
          type="button"
          aria-label="reduce"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
      )}

      {isInCart && getQty(product) === 1 && (
        <motion.button
          initial={{ x: -30 }}
          animate={{ x: 0 }}
          className="trash btn flex items-center justify-center"
          onClick={() => removeProduct(product)}
          type="button"
          aria-label="remove"
        >
          <TrashIcon className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
};

export default Carter;
