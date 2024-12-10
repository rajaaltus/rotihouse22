import React, { useEffect, useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import { formatCurrency } from "../helpers/util";
import WhatsappIcon from "../components/icons/whatsapp-icon";
import { useCart } from "../hooks/useCart";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cartItems: items, total } = useCart();
  const { t } = useTranslation(["common"]);
  const [downloadLink, setDownloadLink] = useState("");
  // const [user, setUser] = useState({ username: "" });
  const { user } = useAuth();
  const filteredItems = items?.map(
    (item, i) => `${i + 1}.${item.name}-${item.qty}`
  );

  const makeOrder = () => {
    const data = new Blob(
      [
        `Hi, ${user?.displayName}, Your Order is: \n`,
        filteredItems.join("\n"),
        `\n Total: ${total}`,
      ],
      {
        type: "text/plain",
      }
    );

    // this part avoids memory leaks
    if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);

    // update the download link state
    setDownloadLink(window.URL.createObjectURL(data));
  };
  useEffect(() => {
    // setUser(JSON.parse(sessionStorage.getItem("user") || "{}"));
    makeOrder();
    //eslint-disable-next-line
  }, [user]);
  console.log({user});
  return (
    <div className="mt-48 w-full px-6 lg:px-32 h-full">
      {user && <Address username={user?.displayName || t("customer")} />}
      {items?.map((item, index) => (
        <div
          key={index}
          className="py-2 border-b-4 border-gray-300 border-dotted"
        >
          <OrderItem index={index} item={item} key={index} />
        </div>
      ))}
      <div className="flex items-center justify-between text-md lg:text-2xl font-semibold py-2 w-full">
        <p>{t("total")}</p>
        {formatCurrency(total)}
      </div>

      <div className="pt-4 flex items-center space-x-4">
        <a
          // this attribute sets the filename
          download="list.txt"
          // link to the download URL
          href={downloadLink}
          className="capitalize bg-gray-600 rounded-full px-8 h-12 text-white font-semibold tracking-wide flex items-center "
        >
          {t("download")}
        </a>
        <ReactWhatsapp
          number="+8562058026838"
          message={`Name: ${
            user?.displayName
          },\nMy Order is:\n${filteredItems.join("\n")}\nTotal: ${total}`}
          element="button"
        >
          <span className="capitalize bg-gray-600 rounded-full px-8 h-12 text-white font-semibold tracking-wide flex items-center space-x-1">
            <WhatsappIcon /> <span>{t("send order")}</span>
          </span>
        </ReactWhatsapp>
      </div>

      <div className="w-full flex items-center justify-center mt-16">
        <Link href="/">
          <a className="py-3 w-48 bg-yellow-400 text-black rounded-lg font-semibold shadow-lg text-center">
            {t("go to home")}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;

const OrderItem = ({ index, item }: any) => {
  return (
    <div className="flex items-center justify-between text-sm lg:text-2xl py-1 w-full">
      <div className="w-1/2 truncate">
        {index + 1}. &nbsp;{item.name}
      </div>
      <div>({item.qty})x</div>
      {formatCurrency(item.price)}
    </div>
  );
};

const Address = ({ username }: any) => {
  const { t } = useTranslation(["common"]);
  return (
    <>
      <h3 className="text-2xl font-semibold py-2">
        {t("dear")} <span className="text-indigo-700"> {username},</span>
      </h3>
      <p className="pb-4 text-lg">{t("please check your order")}</p>
    </>
  );
};
