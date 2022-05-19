import React, { Fragment, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";
import { formatCurrency } from "../helpers/utils";
import EmptyCart from "./icons/EmptyCart";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

const SideCart = ({ open, onClose, onOpen }) => {
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
        <Modal onModalClose={() => setShow(false)} isOpen={show}>
          <h2>Login</h2>
          <hr className="py-4" />
          <LoginForm />
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
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                  <div className="flex h-full flex-col justify-between overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {" "}
                        Shopping Cart{" "}
                      </Dialog.Title>
                    </div>
                    {cartItems.length > 0 ? (
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {cartItems.map((item) => (
                          <CartItem item={item} key={item.id} />
                        ))}
                      </div>
                    ) : (
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                          <EmptyCart />
                          <span className="w-full text-center  font-bold pt-4 text-slate-500">
                            Your Cart is Empty
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
                        className="relative w-full bg-green-700 rounded-lg py-3 text-white text-center disabled:bg-slate-500 group"
                        onClick={handleCheckout}
                      >
                        <span className="pr-2 ">Checkout</span>
                        <span className="absolute right-2 top-2  bg-green-800 group-disabled:bg-slate-600 px-2 py-1 rounded-lg">
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
