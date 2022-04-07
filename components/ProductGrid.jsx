import React from "react";
import Product from "./Product";
import { useCart } from "../hooks/useCart";
const products = [
  {
    id: 1,
    name: "headphone 1",
    price: 12.5,
  },
  {
    id: 2,
    name: "headphone 2",
    price: 9.98,
  },
  {
    id: 3,
    name: "headphone 3",
    price: 6,
  },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-8 w-full">
      {products.map((item) => (
        <Product product={item} key={item.id} />
      ))}
    </div>
  );
};

export default ProductGrid;
