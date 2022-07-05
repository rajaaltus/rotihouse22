import React, { useEffect, useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import { formatCurrency } from "../helpers/util";
import WhatsappIcon from "../components/icons/whatsapp-icon";
import { useCart } from "../hooks/useCart";
import Link from "next/link";

const Checkout = () => {
  const { cartItems: items, total } = useCart();
  const [downloadLink, setDownloadLink] = useState("");
  const [user, setUser] = useState({ username: "" });

  const filteredItems = items?.map(
    (item, i) => `${i + 1}.${item.name}-${item.qty}`
  );

  const makeOrder = () => {
    const data = new Blob(
      [
        `Hi, ${user?.username}, Your Order is: \n`,
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
    setUser(JSON.parse(sessionStorage.getItem("user") || "{}"));
    makeOrder();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="mt-48 w-full px-6 lg:px-32 h-full">
      {user && <Address username={user?.username || "Customer"} />}
      {items?.map((item, index) => (
        <div
          key={index}
          className="py-2 border-b-4 border-gray-300 border-dotted"
        >
          <OrderItem index={index} item={item} key={index} />
        </div>
      ))}
      <div className="flex items-center justify-between text-md lg:text-2xl font-semibold py-2 w-full">
        <p>Total</p>
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
          download
        </a>
        <ReactWhatsapp
          number="+8562058026838"
          message={`Name: ${
            user?.username
          },\nMy Order is:\n${filteredItems.join("\n")}\nTotal: ${total}`}
          element="button"
        >
          <span className="capitalize bg-gray-600 rounded-full px-8 h-12 text-white font-semibold tracking-wide flex items-center space-x-1">
            <WhatsappIcon /> <span>Send order</span>
          </span>
        </ReactWhatsapp>
      </div>

      <div className="w-full flex items-center justify-center mt-16">
        <Link href="/">
          <a className="py-3 w-48 bg-yellow-400 text-black rounded-lg font-semibold shadow-lg text-center">
            Go to home
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
  return (
    <>
      <h3 className="text-xl font-semibold py-2">
        Dear <span className="text-indigo-700"> {username},</span>
      </h3>
      <p className="pb-4">Please check your order</p>
    </>
  );
};
