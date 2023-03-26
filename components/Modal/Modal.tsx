import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getNumberWithOrdinal } from "@/utils/dataHelper";
import Button from "../Button";

export default function Modal({
  open,
  setOpen,
  event,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  event: any;
}) {
  const [teamName, setTeamName] = useState<string>("");
  const [team, setTeam] = useState<any>([""]);

  console.log(event.min_team_size)

  const renderFormFields = (size: number) => {
    return Array(size)
      .fill(0)
      .map((_, index) => {
        return (
          <div className="sm:col-span-4 mt-1 w-96" key={index}>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {getNumberWithOrdinal(index + 1)} Member Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                required={index <= event.min_team_size - 1}
                onChange={(e) => {
                  const newTeam = [...team];
                  newTeam[index] = e.target.value;
                  setTeam(newTeam);
                }}
              />
            </div>
          </div>
        );
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

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
          <div className="flex min-h-full items-end justify-center p-4 text-center  sm:items-center sm:p-0">
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
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className=" font-semibold leading-6 text-gray-900 text-3xl"
                      >
                        {event.name}
                      </Dialog.Title>
                      <div className="mt-2">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          Rules
                        </h3>
                        <p
                          className="text-sm text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: event.rules_regulations,
                          }}
                        />
                      </div>
                      <p
                        className="mt-2"
                      >
                        {event.type === "TEAM" && (
                          <form
                            className="grid grid-cols-1 gap-y-6 sm:grid-cols-6"
                            onSubmit={handleSubmit}
                          >
                            <div className="sm:col-span-3 mt-4">
                              <label
                                htmlFor="Team Name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Team Name
                              </label>
                              <div className="mt-2 w-96">
                                <input
                                  type="text"
                                  name="TeamName"
                                  required={true}
                                  id="TeamName"
                                  autoComplete="off"
                                  className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Team Name"
                                  onChange={(e) => setTeamName(e.target.value)}
                                />
                              </div>
                            </div>
                            {renderFormFields(event.team_size)}
                            <div
                              className="sm:col-span-6"
                            >
                            <button
                              type="submit"
                              className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                            >Submit</button>
                            <button
                              type="button"
                              className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >Cancel</button>
                            </div>
                          </form>
                        )}
                      </p>
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
  );
}
