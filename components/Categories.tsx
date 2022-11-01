import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import useCommon from "../hooks/useCommon";
import FoodType from "./FoodType";

const Categories = () => {
  const { categories, loading } = useCategories("/categories?isactive=true");
  const { setFilter, totalProducts } = useCommon();

  return (
    <div className="relative w-full lg:w-full group h-24  bg-yellow-400 flex flex-col ">
      <div className="absolute z-20 -bottom-12 w-full">
        <FoodType />
      </div>
      <div className="flex items-center overflow-x-scroll scrollbar-hide whitespace-nowrap lg:justify-center space-x-8 h-full px-8 group-hover:lg:translate-x-0 group-hover:-translate-x-8 duration-700">
        {!loading && categories && categories.length > 0 && (
          <>
            <button
              className="relative text-black font-semibold bg-transparent border-2 border-yellow-500 rounded-full px-6 py-2 hover:scale-105 hover:drop-shadow-lg duration-200 active:scale-95 flex items-center space-x-2"
              onClick={() => setFilter(0)}
            >
              <span className=""> {"All"}</span>
              <span className=" bg-yellow-100 w-6 h-6  flex items-center justify-center rounded-full text-sm">
                {totalProducts}
              </span>
            </button>
          </>
        )}

        {!loading && categories && categories.length > 0 ? (
          categories.map((item: any) => (
            <Fragment key={item.id}>
              <button
                key={item.id}
                className="relative text-black font-semibold bg-transparent border-2 border-yellow-500 rounded-full px-6 py-2 hover:scale-105 hover:drop-shadow-lg duration-200 active:scale-95 flex items-center space-x-2"
                onClick={() => setFilter(item.id)}
              >
                <span>{item.name}</span>
                <span className=" bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">
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
