import React, { FC, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
interface HeaderProps {
  handleOpen: () => void;
}

const Header: FC<HeaderProps> = ({ handleOpen }) => {
  const [selectedLang, setSelectedLang] = useState("");
  const { i18n, t } = useTranslation(["common"]);
  const { itemCount } = useCart();
  const handleLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
    setSelectedLang(e.target.value);
  };
  useEffect(() => {
    const val = localStorage.getItem("i18nextLng") || "";
    setSelectedLang(val);
    if (val?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="sticky top-0 z-50 w-full h-16  bg-black px-4">
      <div className="max-w-7xl mx-auto text-white flex items-center justify-between h-full">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-400 w-12 h-auto px-2 py-1 rounded-sm">
            <Logo />
          </div>
          <span className="text-2xl font-semibold tracking-wide">
            {t("rotihouse")}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="bg-black"
            onChange={handleLanguage}
            value={selectedLang}
          >
            <option value="en">EN</option>
            <option value="lo">LA</option>
          </select>

          <div className="text-gray-600"> | </div>
          <button onClick={handleOpen}>
            {t("cart")} ({itemCount})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
