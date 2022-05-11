import React, { Fragment, Suspense, useEffect, useState } from "react";
import Product from "./Product";
import { useProduct } from "../hooks/useProduct";
import ProductLoader from "./ProductLoader";
import useCommon from "../hooks/useCommon";

const ProductGrid = () => {
  const { loading } = useProduct("/dishes");
  const { filteredProducts, filterKey } = useCommon();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 w-full pb-8 lg:pb-16">
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
        filteredProducts.map((item) => (
          <Fragment key={item.id}>
            <Product product={item} key={item.id} />
          </Fragment>
        ))
      ) : (
        <p>No Products found!</p>
      )}
    </div>
  );
};

export default ProductGrid;
