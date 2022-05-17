import Link from "next/link";
import React from "react";
import Fb from "./icons/Fb";
import Ig from "./icons/Ig";

const Footer = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-12 text-gray-500">
      <div className="w-full h-12 flex items-center justify-between">
        <div>© Copyrights - Rotihouse Indian Restaurant. 2022.</div>
        <div>
          Made with &#10084;&#65039; by{" "}
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
