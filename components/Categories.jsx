import React, { Suspense, Fragment } from "react";
import { useCategories } from "../hooks/useCategories";
import useCommon from "../hooks/useCommon";

const Categories = () => {
  const { categories, loading } = useCategories("/categories");
  const { setFilter, totalProducts } = useCommon();
  return (
    <div className="w-full overflow-x-scroll scrollbar-hide whitespace-nowrap lg:w-full group h-24 bg-slate-200 mt-8 shadow-xl">
      <div className="flex items-center lg:justify-center space-x-8 h-full px-8 group-hover:lg:translate-x-0 group-hover:-translate-x-8 duration-700">
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
