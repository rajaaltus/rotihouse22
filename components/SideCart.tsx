import React, { Fragment, useState, useEffect, FC } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { ShoppingBagIcon, XIcon } from "@heroicons/react/solid";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";
import { formatCurrency } from "../helpers/util";
import EmptyCart from "./icons/EmptyCart";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";

interface SideCartProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const SideCart: FC<SideCartProps> = ({ open, onClose, onOpen }) => {
  const { t } = useTranslation(["common"]);
  const { cartItems, total } = useCart();
  const [show, setShow] = useState(false);
  const { authReady } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    authReady ? router.push("/checkout") : setShow(true);
  };

  const handleClose = () => {
    authReady && setShow(false);
  };
  useEffect(() => {
    authReady && setShow(false);
  }, [authReady]);
  return (
    <>
      {show && (
        <Modal
          onModalClose={() => setShow(false)}
          isOpen={show}
          onModalOpen={() => setShow(true)}
        >
          <>
            <h2 className="text-white">Login</h2>
            <hr className="py-4 opacity-30" />
            <LoginForm />
          </>
        </Modal>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={onClose}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-0 transition-opacity" />
            </Transition.Child>
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-200 sm:duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200 sm:duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col justify-between overflow-y-scroll bg-yellow-400 bg-opacity-10 backdrop-blur-2xl border-l border-gray-100 border-opacity-20 py-6">
                    <div className="px-4 sm:px-6 shadow-2xl">
                      <Dialog.Title className="inline-flex items-center gap-2 w-full text-lg font-medium text-white border-b border-gray-100 border-opacity-20 ">
                        <>
                          <ShoppingBagIcon className="text-white w-6 h-6" />
                          {t("shopping cart")}
                        </>
                      </Dialog.Title>
                    </div>
                    {cartItems.length > 0 ? (
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 max-h-screen overflow-y-scroll">
                        <div className="sticky z-50 top-0 h-8 w-full "></div>
                        {cartItems.map((item) => (
                          <CartItem item={item} key={item.id} />
                        ))}
                      </div>
                    ) : (
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                          <EmptyCart />
                          <span className="w-full text-center  font-bold pt-4 text-slate-200">
                            {t("your cart is empty")}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="relative px-8">
                      {authReady && (
                        <div className="absolute top-1/2">
                          <span>Login Success &amp; Ready to checkout</span>
                        </div>
                      )}
                      <button
                        disabled={cartItems.length == 0}
                        className="relative w-full bg-yellow-500 rounded-lg py-3 text-black text-center disabled:bg-slate-500 group"
                        onClick={handleCheckout}
                      >
                        <span className="lg:pr-2 pr-8">{t("checkout")}</span>
                        <span className="absolute right-2 top-2  bg-green-300 group-disabled:bg-slate-600 px-2 py-1 rounded-lg">
                          {formatCurrency(total)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SideCart;
