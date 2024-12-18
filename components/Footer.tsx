import Link from "next/link";
import React from "react";
import Fb from "./icons/Fb";
import Ig from "./icons/Ig";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(["common"]);
  return (
    <div className="w-full lg:max-w-7xl mx-auto py-12 text-gray-500 ">
      <div className="w-full h-12  flex lg:flex-row flex-col  space-y-3 lg:space-y-0 items-center justify-center lg:justify-between px-8  lg:px-0">
        <div className="text-xs lg:text-sm">
          © {t("copyrights")} - {t("rotihouse")} {t("indian restaurant")}. 2025.
        </div>
        <div className="text-xs lg:text-sm">
          {t("made with")} &#10084;&#65039; {t("by")}{" "}
          <Link href="https://www.altusinfotech.com">
            <a target="_blank" className="hover:text-indigo-600">
              ALTUS
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-start space-x-4">
          <Link href={"https://www.facebook.com/rotihouselao"}>
            <a
              target="_blank"
              className="hover:text-indigo-500"
              aria-label="facebook"
            >
              <Fb />
            </a>
          </Link>
          <Link href={"https://www.instagram.com/rotihouselao"}>
            <a
              target="_blank"
              className="hover:text-indigo-500"
              aria-label="instagram"
            >
              <Ig />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
