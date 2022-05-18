import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import useCommon from "../hooks/useCommon";

const Categories = () => {
  const { categories, loading } = useCategories("/categories");
  const {
    setFilter,
    totalProducts,
    typeFilter,
    clearFilter,
    filteredProducts,
  } = useCommon();
  const [isVeg, setIsVeg] = useState("veg" | "non-veg" | "null");
  return (
    <div className="w-full  lg:w-full group h-40  bg-yellow-400 flex flex-col">
      <div className="relative flex items-center  justify-center lg:justify-between h-12 lg:h-16  w-full  lg:w-64 mx-auto mt-4 text-yellow-400">
        {isVeg !== "null" && (
          <div className="absolute right-16 top-1 lg:-right-8 lg:top-3 text-gray-700">
            <button
              onClick={() => [setIsVeg("null"), clearFilter()]}
              className="underline hover:text-gray-800"
            >
              <XCircleIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        )}
        <button
          onClick={() => [setIsVeg("veg"), typeFilter("vegetarian")]}
          className="relative w-1/4 lg:w-1/2 border-r border-yellow-400 h-full  bg-gray-800   hover:bg-gray-900 duration-200  rounded-l-full"
        >
          {isVeg === "veg" && (
            <div className="absolute top-1 right-2">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
            </div>
          )}
          Veg
        </button>
        <button
          onClick={() => [setIsVeg("non-veg"), typeFilter("non_vegetarian")]}
          className="relative w-1/4 lg:w-1/2 h-full  duration-200 bg-gray-800 hover:bg-gray-900 rounded-r-full"
        >
          {isVeg === "non-veg" && (
            <div className="absolute top-1 right-2">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
            </div>
          )}
          Non-Veg
        </button>
      </div>
      <div className="flex items-center overflow-x-scroll scrollbar-hide whitespace-nowrap lg:justify-center space-x-8 h-full px-8 group-hover:lg:translate-x-0 group-hover:-translate-x-8 duration-700">
        {!loading && categories && categories.length > 0 && (
          <>
            <button
              className="relative text-black bg-transparent border-2 border-yellow-500 rounded-full px-6 py-2 hover:scale-105 hover:drop-shadow-lg duration-200 active:scale-95"
              onClick={() => setFilter(0)}
            >
              <span className="px-4"> {"All"}</span>
              <span className="absolute -top-3 right-3 bg-slate-200 w-6 h-6  flex items-center justify-center rounded-full text-sm">
                {totalProducts}
              </span>
            </button>
          </>
        )}

        {!loading && categories && categories.length > 0 ? (
          categories.map((item) => (
            <Fragment key={item.id}>
              <button
                key={item.id}
                className="relative text-black bg-transparent border-2 border-yellow-500 rounded-full px-6 py-2 hover:scale-105 hover:drop-shadow-lg duration-200 active:scale-95"
                onClick={() => setFilter(item.id)}
              >
                {item.name}
                <span className="absolute -top-3 right-3 bg-slate-200 w-6 h-6  flex items-center justify-center rounded-full text-sm">
                  {item.dishes?.length}
                </span>
              </button>
            </Fragment>
          ))
        ) : (
          <p>No Catogories right now!</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
