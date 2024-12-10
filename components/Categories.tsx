import React, { Fragment, useEffect, useState } from "react";
import useCommon from "../hooks/useCommon";
import { useProduct } from "../hooks/useProduct";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { products, loading } = useProduct();
  const { setFilter, totalProducts } = useCommon();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (products) {
      const uniqueCategories = Array.from(
        new Set(products.map((product:any) => JSON.stringify(product.categories)))
      ).map(str => JSON.parse(str as string));

      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleCategoryFilter = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setFilter(categoryId);
  };

  return (
    <div className="relative w-full lg:w-full group h-24 bg-yellow-400 bg-opacity-10 backdrop-blur-2xl flex flex-col border-b border-gray-200 border-opacity-20">
      <div className="flex items-center overflow-x-scroll scrollbar-hide whitespace-nowrap lg:justify-center space-x-8 h-full px-8 group-hover:lg:translate-x-0 group-hover:-translate-x-8 duration-700" >
        {!loading && (
          <button 
            className={`relative  font-semibold bg-transparent border-2 border-yellow-500 rounded-full px-6 py-2 hover:scale-105 hover:drop-shadow-lg duration-200 active:scale-95 flex items-center space-x-2 ${
              selectedCategory === 0 ? 'bg-yellow-500 text-black' : 'text-yellow-400'
            }`}
            onClick={() => handleCategoryFilter(0)}
          >
            <span >All</span>
            <span className="absolute -top-3 right-0 bg-yellow-100 text-black w-6 h-6 font-medium flex items-center justify-center rounded-full text-sm">
              {totalProducts}
            </span>
          </button>
        )}

        {!loading && categories.length > 0 ? (
          categories.map((category) => (
            <Fragment key={category.id}>
              <button
                className={`relative  font-semibold bg-transparent border-2 border-yellow-500 rounded-full px-6 py-2 hover:scale-105 hover:drop-shadow-lg duration-200 active:scale-95 flex items-center space-x-2 ${
                  selectedCategory === category.id ? 'bg-yellow-500 text-black' : 'text-yellow-400'
                }`}
                onClick={() => handleCategoryFilter(category.id)}
              >
                <span>{category.name}</span>
                <span className="absolute -top-3 right-0 bg-yellow-100 font-medium text-black w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  {products?.filter((p:any) => p.categories.id === category.id).length || 0}
                </span>
              </button>
            </Fragment>
          ))
        ) : (
          <p>No Categories right now!</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
