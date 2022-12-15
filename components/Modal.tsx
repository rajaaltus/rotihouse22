import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, ReactNode, useState } from "react";

interface ModalProps {
  onModalOpen: () => void;
  onModalClose: () => void;
  isOpen: boolean;
  children: ReactNode;
}
const Modal: FC<ModalProps> = ({
  onModalOpen,
  onModalClose,
  isOpen,
  children,
}) => {
  function closeModal() {
    onModalClose();
  }

  function openModal() {
    onModalOpen();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white bg-opacity-10 backdrop-blur-2xl border border-gray-100 border-opacity-20 px-8 py-6 text-left align-middle shadow-xl transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
