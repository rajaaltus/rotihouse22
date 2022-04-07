import React, { Fragment, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { TrashIcon } from "@heroicons/react/solid";

const Carter = ({ product }) => {
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
    <div className="absolute top-3 right-3">
      <div className="flex items-center justify-between flex-row-reverse">
        {isInCart && getQty(product) > 0 && (
          <button className="btn" onClick={() => increase(product)}>
            +
          </button>
        )}

        {!isInCart && (
          <button className="btn-lg" onClick={() => addProduct(product)}>
            Add
          </button>
        )}

        {isInCart && <span className="px-4">{getQty(product)}</span>}

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
    </div>
  );
};

export default Carter;
