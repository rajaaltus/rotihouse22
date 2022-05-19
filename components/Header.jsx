import React from "react";
import { useCart } from "../hooks/useCart";
import Logo from "./Logo";

const Header = ({ handleOpen }) => {
  const { itemCount } = useCart();
  return (
    <div className="sticky top-0 z-50 w-full h-16  bg-black px-4">
      <div className="max-w-7xl mx-auto text-white flex items-center justify-between h-full">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-400 w-12 h-auto px-2 py-1 rounded-sm">
            <Logo />
          </div>
          <span className="text-2xl font-semibold tracking-wide">
            Rotihouse
          </span>
        </div>
        <button onClick={handleOpen}>Cart ({itemCount})</button>
      </div>
    </div>
  );
};

export default Header;
