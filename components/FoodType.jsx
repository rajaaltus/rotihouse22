import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import useCommon from "../hooks/useCommon";

const FoodType = () => {
  const { typeFilter, clearFilter } = useCommon();
  const [isVeg, setIsVeg] = useState("veg" | "non-veg" | "null");

  const handleClear = () => {
    setIsVeg("null");
    clearFilter();
  };
  const handleVeg = () => {
    setIsVeg("veg");
    typeFilter("vegetarian");
  };
  const handleNonVeg = () => {
    setIsVeg("non-veg");
    typeFilter("non_vegetarian");
  };

  return (
    <div className="relative flex items-center  justify-center lg:justify-between h-12  w-full  lg:w-64 mx-auto mt-4 text-yellow-400">
      {isVeg !== "null" && (
        <div className="absolute right-16 top-1 lg:-right-8 lg:top-2 text-gray-700">
          <button
            onClick={handleClear}
            className="underline hover:text-gray-800"
          >
            <XCircleIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}
      <button
        onClick={handleVeg}
        className="relative w-1/4 lg:w-1/2 border-r text-sm lg:text-md font-semibold border-yellow-400 h-full  bg-gray-800   hover:bg-gray-900 duration-200  rounded-bl-full shadow-md shadow-yellow-200"
      >
        {isVeg === "veg" && (
          <div className="absolute top-1 right-2">
            <CheckCircleIcon className="w-4 h-4 text-green-600" />
          </div>
        )}
        Veg
      </button>
      <button
        onClick={handleNonVeg}
        className="relative w-1/4 lg:w-1/2 h-full text-sm lg:text-md font-semibold  duration-200 bg-gray-800 hover:bg-gray-900 rounded-br-full shadow-md shadow-yellow-200"
      >
        {isVeg === "non-veg" && (
          <div className="absolute top-1 right-2">
            <CheckCircleIcon className="w-4 h-4 text-green-600" />
          </div>
        )}
        Non-Veg
      </button>
    </div>
  );
};

export default FoodType;
