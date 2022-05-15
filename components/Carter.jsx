import React, { Fragment, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { useAuth } from "../context/auth/AuthContext";

const Carter = ({ product }) => {
  const { authReady } = useAuth();
  const [isInCart, setIsInCart] = useState(false);
  const { increase, addProduct, decrease, cartItems, removeProduct } =
    useCart();

  const getQty = (product) => {
    return (
      cartItems[cartItems.findIndex((item) => item.id === product.id)] &&
      cartItems[cartItems.findIndex((item) => item.id === product.id)].qty
    );
  };

  useEffect(() => {
    const check =
      cartItems[cartItems.findIndex((item) => item.id === product.id)] || null;
    check ? setIsInCart(true) : setIsInCart(false);
  }, [cartItems, product.id]);

  return (
    <div className="flex items-center justify-between flex-row-reverse bg-red-600 rounded-full bg-opacity-80">
      {isInCart && getQty(product) > 0 && (
        <button className="btn" onClick={() => increase(product)}>
          +
        </button>
      )}

      {!isInCart && (
        <button className="btn-lg" onClick={() => addProduct(product)}>
          <PlusCircleIcon className="w-5 h-5" />
        </button>
      )}

      {isInCart && <span className="px-4 text-white">{getQty(product)}</span>}

      {isInCart && getQty(product) > 1 && (
        <button className="btn" onClick={() => decrease(product)}>
          -
        </button>
      )}

      {isInCart && getQty(product) === 1 && (
        <button
          className="trash btn flex items-center justify-center"
          onClick={() => removeProduct(product)}
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Carter;
