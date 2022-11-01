import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import useCommon from "../hooks/useCommon";
import { useTranslation } from "react-i18next";

interface IFoodType {
  foodType: "vegetarian" | "non_vegetarian" | "null";
}
const FoodType = () => {
  const { typeFilter, clearFilter } = useCommon();
  const [isVeg, setIsVeg] = useState("null");
  const { t } = useTranslation(["common"]);

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
    <div className="relative flex items-center  justify-center lg:justify-between h-12  w-full  lg:w-64 mx-auto mt-4 text-gray-800">
      {isVeg !== "null" && (
        <div className="absolute right-16 top-1 lg:-right-8 lg:top-2 text-gray-300">
          <button
            onClick={handleClear}
            className="underline hover:text-gray-800"
            aria-label="clear-filter"
          >
            <XCircleIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      )}
      <button
        onClick={handleVeg}
        className="relative w-1/4 lg:w-1/2 border-r text-sm lg:text-md font-semibold  h-full  bg-yellow-400   hover:bg-yellow-500 duration-200  rounded-bl-xl"
      >
        {isVeg === "veg" && (
          <div className="absolute top-1 right-2">
            <CheckCircleIcon className="w-4 h-4 text-gray-800" />
          </div>
        )}
        {t("veg")}
      </button>
      <button
        onClick={handleNonVeg}
        className="relative w-1/4 lg:w-1/2 h-full text-sm lg:text-md font-semibold  duration-200 bg-yellow-400 hover:bg-yellow-500 rounded-br-xl "
        name="clear-filter"
        aria-label="non-veg"
      >
        {isVeg === "non-veg" && (
          <div className="absolute top-1 right-2">
            <CheckCircleIcon className="w-4 h-4 text-gray-800" />
          </div>
        )}
        {t("non-veg")}
      </button>
    </div>
  );
};

export default FoodType;
