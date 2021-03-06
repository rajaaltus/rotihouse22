import { XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { FC } from "react";
import { useCart } from "../hooks/useCart";
import Carter from "./Carter";
import axios from "axios";
import { formatCurrency } from "../helpers/util";
import Modal from "./Modal";
import { CartItem } from "../helpers/types";

interface CartItemProps {
  item: CartItem;
}
const CartItem: FC<CartItemProps> = ({ item }) => {
  const { total, removeProduct } = useCart();
  return (
    <div
      className={`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer mx-4">
        <Image
          src={axios.defaults.baseURL + item.image?.url}
          width={112}
          height={112}
          loading="eager"
          alt={item.name || "Product Image"}
          className="bg-gray-300 object-cover"
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
        <span className="text-md font-semibold text-indigo-800">
          {item?.name}
        </span>
        <span className="text-xs font-medium uppercase text-gray-500 mb-2.5">
          Unit price &middot;&nbsp;
          {formatCurrency(item.price)}
        </span>

        <span className="font-semibold text-sm md:text-base text-heading leading-5">
          {formatCurrency(item.price * item.qty)}
        </span>
        <div className="w-1/2">
          <Carter product={item} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
