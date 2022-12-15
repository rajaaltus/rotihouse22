import React, { Fragment, Suspense, useEffect, useState } from "react";
import Product from "./Product";
import { useProduct } from "../hooks/useProduct";
import ProductLoader from "./ProductLoader";
import useCommon from "../hooks/useCommon";
import { CartItem } from "../helpers/types";
import FoodType from "./FoodType";
const ProductGrid = () => {
  const { loading } = useProduct("/dishes?active=true&_sort=new:desc");
  const { filteredProducts } = useCommon();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 w-full pb-8 lg:pb-16 ">
        {loading && (
          <>
            <ProductLoader />
            <ProductLoader />
            <ProductLoader />
            <ProductLoader />
            <ProductLoader />
            <ProductLoader />
          </>
        )}

        {!loading && filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((item: CartItem) => (
            <Fragment key={item.id}>
              <Product product={item} key={item.id} />
            </Fragment>
          ))
        ) : (
          <div>No Products found!</div>
        )}
      </div>
      <div className="sticky z-20 bottom-0 w-full  flex items-center justify-center border-gray-100 border-b border-opacity-10">
        <FoodType />
      </div>
    </>
  );
};

export default ProductGrid;
