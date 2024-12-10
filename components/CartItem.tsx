import { XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { FC } from "react";
import { useCart } from "../hooks/useCart";
import Carter from "./Carter";
import axios from "axios";
import { formatCurrency } from "../helpers/util";
import Modal from "./Modal";
import type { CartItemType } from "../helpers/types";

interface CartItemProps {
  item: CartItemType;
}
const CartItem: FC<CartItemProps> = ({ item }) => {
  const { total, removeProduct } = useCart();
  return (
    <div
      className={`group w-full h-auto flex justify-start items-center  py-4 md:py-7 border-b border-gray-100 border-opacity-20 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden  flex-shrink-0 cursor-pointer mx-4 border border-gray-100 border-opacity-30">
        <Image
          src={item.image?.url}
          width={112}
          height={112}
          loading="eager"
          alt={item.name || "Product Image"}
          className=" object-cover opacity-75"
        />
        <div
          className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
          onClick={() => removeProduct(item)}
          role="button"
        >
          <XCircleIcon className="relative text-white w-8 text-sm transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <span className="text-md font-semibold text-white">{item?.name}</span>
        <span className="text-xs font-medium uppercase text-yellow-100 mb-2.5">
          {formatCurrency(item.price)}
        </span>

        <div className="w-1/2">
          <Carter product={item} />
        </div>
        <span className="relative font-semibold text-sm md:text-base text-heading leading-5 text-yellow-500 py-1">
          {formatCurrency(item.price * item.qty)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
