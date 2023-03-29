import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment,useEffect,useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { validateUPIID } from "@/utils/validateUPIID";
import { validatePhoneNumber } from "@/utils/validatePhoneNumber";

const PaymentModal = ({
  open,
  setOpen,
  //   event,
  //   cancelButtonRef,
  //   handleSubmit,
  amount,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  //   event: any;
  //   cancelButtonRef: any;
  //   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  amount: number;
}) => {
  const [transactionID, setTransactionID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [upiID, setUpiID] = useState("");
  const [paymentScreenShot, setPaymentScreenShot] = useState<File>();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(isFormEmpty())
  },[transactionID, phoneNumber, upiID, paymentScreenShot])

  const isFormEmpty = () => {
    return (
      !transactionID.trim().length ||
      !phoneNumber.trim().length ||
      !upiID.trim().length ||
      !paymentScreenShot
    );  
  }

  const formValidation = () => {
    if(isFormEmpty()){
      toast.error("Please fill all the fields")
      return false;
    }
    else {
      if(!validateUPIID(upiID)){
        toast.error("Please enter a valid UPI ID")
        return false;
      } else if(!validatePhoneNumber(phoneNumber)){
        toast.error("Please enter a valid Phone Number")
        return false;
      } 
    }
    return true
  }
  

  const handleTransactionID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionID(e.target.value);
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleUpiID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpiID(e.target.value);
  };

  const handlePaymentScreenShot = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && e.target.files.length > 0) {
      console.log(e.target.files[0]);
			setPaymentScreenShot(e.target.files[0]);
		}
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formValidation()) return;
    console.log(transactionID, phoneNumber, upiID, paymentScreenShot);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          //   initialFocus={cancelButtonRef}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4  ">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className=" font-semibold leading-6 text-gray-900 text-3xl w-full"
                        >
                          <div className="flex justify-between items-center w-full">
                            <h3 className="font-semibold leading-6 text-gray-900 text-3xl">
                              Pay : {amount}
                            </h3>
                            <div>
                              <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                onClick={() => setOpen(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-lg text-gray-500">
                          <div className="w-full flex justify-center">
                            <Image
                              src={"https://i.imgur.com/81iFuMV.png"}
                              alt={"upiqrcode"}
                              width={200}
                              height={400}
                            />
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Transaction ID
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={transactionID}
                                onChange={handleTransactionID}
                              />
                            </div>
                            <div className="mt-4">
                              <label
                                htmlFor="Phone Number"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Phone Number used during Payment
                              </label>
                              <input
                                id="Phone Number"
                                name="Phone Number"
                                type="telephone"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={phoneNumber}
                                onChange={handlePhoneNumber}
                              />
                            </div>
                            <div className="mt-4">
                              <label
                                htmlFor="Phone Number"
                                className="block text-sm font-medium text-gray-700"
                              >
                                UPI Id from which the payment is made
                              </label>
                              <input
                                id="Phone Number"
                                name="Phone Number"
                                type="telephone"
                                autoComplete="telephone"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={upiID}
                                onChange={handleUpiID}
                              />
                            </div>
                            <div className="mt-4">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Payment ScreenShot
                              </label>
                              <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file_input"
                                type="file"
                                onChange={handlePaymentScreenShot}
                                required
                              />
                            </div>
                            <div className="flex justify-center w-full">
                              <button type="submit" className="button mt-4">
                                  Submit
                              </button>
                            </div>
                          </form>
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ToastContainer />
    </>
  );
};

export default PaymentModal;
