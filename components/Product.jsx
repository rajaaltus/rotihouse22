import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { TrashIcon } from "@heroicons/react/solid";

const Product = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const { name, price } = product;
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
    <div className="relative w-full h-96 bg-white rounded-lg shadow-2xl">
      <div className="flex flex-col justify-between h-full p-8">
        <Image
          src="/headphone.jpeg"
          alt="image"
          width={250}
          height={200}
          className="object-contain"
        />
        <div>
          <h2 className="capitalize">{name}</h2>
          <p className="text-lg font-bold text-gray-500">$ {price}</p>
        </div>
      </div>

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
    </div>
  );
};

export default Product;
