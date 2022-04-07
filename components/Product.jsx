import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carter from "./Carter";

const Product = ({ product }) => {
  const { name, price } = product;

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
      <Carter product={product} />
    </div>
  );
};

export default Product;
