import React, { Fragment } from "react";
import Product from "./Product";
import { useProduct } from "../hooks/useProduct";
import ProductLoader from "./ProductLoader";
import useCommon from "../hooks/useCommon";
import { CartItemType } from "../helpers/types";
import FoodType from "./FoodType";

const ProductGrid = () => {
  const { filterKey } = useCommon();
  const { products, loading } = useProduct(filterKey);

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

        {!loading && products && products.length > 0 ? (
          products.map((item: CartItemType) => (
            <Fragment key={item.id}>
              <Product product={item} key={item.id} />
            </Fragment>
          ))
        ) : (
          <div>No Products found!</div>
        )}
      </div>
      <div className="sticky z-20 bottom-0 w-full flex items-center justify-center border-gray-100 border-b border-opacity-10">
        <FoodType />
      </div>
    </>
  );
};

export default ProductGrid;
