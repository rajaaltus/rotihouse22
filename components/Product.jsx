import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carter from "./Carter";
import { formatCurrency } from "../helpers/utils";
import { Transition } from "@headlessui/react";

const Product = ({ product }) => {
  const { name, price, image } = product;

  return (
    <Transition
      show={!!name}
      enter="duration-300"
      enterFrom="scale-0"
      enterTo="scale-1"
      leave="duration-200"
      leaveFrom="scale-1"
      leaveTo="scale-0"
    >
      <div className="relative w-full h-full bg-white rounded-lg shadow-2xl">
        <div className="flex flex-col justify-between h-full rounded-full">
          <div className="relative mt-8 mx-auto w-48 h-48 rounded-full text-center">
            <Image
              src={axios.defaults.baseURL + image.url}
              alt="image"
              layout="fill"
              className="object-cover object-center rounded-full  scale-100 hover:scale-105 duration-500 ease-in-out"
            />
          </div>
          <div className="p-8">
            <h3 className="capitalize truncate font-medium">{name}</h3>
            <p className="text-md font-bold text-gray-500">
              {formatCurrency(price)}
            </p>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <Carter product={product} />
        </div>
      </div>
    </Transition>
  );
};

export default Product;
