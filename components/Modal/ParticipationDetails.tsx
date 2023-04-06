import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "../CloseIcon";

export default function ParticipationDetails({
  open,
  setOpen,
  title,
  children,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg px-4 py-4">
                <Dialog.Title
                  as="h3"
                  className="mb-3 font-semibold leading-6 text-gray-900 text-3xl"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold leading-6 text-gray-900 text-3xl">
                      {title}
                    </h3>
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                        onClick={() => setOpen(false)}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
