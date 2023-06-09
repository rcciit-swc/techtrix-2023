import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getNumberWithOrdinal } from "@/utils/dataHelper";
import {
  newSoloRegistration,
  newTeamRegistration,
} from "@/utils/newRegistration";
import { ToastContainer, toast } from "react-toastify";
import { ParticipatedEvents } from "@/interface/ParticipatedEvents";
import { Events } from "@/interface/Events";
import CloseIcon from "../CloseIcon";

export default function Modal({
  open,
  setOpen,
  event,
  setShowPayment,
  setAmount,
  registeredEvents,
  setRegisteredEvents,
  registeredByEmail,
  participatedEvents,
  setParticipatedEvents,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  event: Events;
  setShowPayment: any;
  setAmount: any;
  /* ID of registered Events
   * Modified after new registration */
  registeredEvents: number[];
  setRegisteredEvents: any;
  registeredByEmail: string | undefined;
  participatedEvents: ParticipatedEvents[];
  setParticipatedEvents: (participatedEvents: ParticipatedEvents[]) => void;
}) {
  const [teamName, setTeamName] = useState<string>("");
  const [team, setTeam] = useState<any[]>([""]);
  const [valoID, setValoID] = useState<any[]>([""]);

  const renderFormFields = (size: number) => {
    return Array(size)
      .fill(0)
      .map((_, index) => {
        return (
          <>
            <div
              className="sm:col-span-4 mt-1 md:w-96"
              key={`input__field__${index}`}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {getNumberWithOrdinal(index + 1)} Member Email
              </label>
              <div className="mt-2 ">
                <input
                  id="email"
                  name="email"
                  type="email"
                  readOnly={index === 0}
                  defaultValue={
                    registeredByEmail && index === 0 ? registeredByEmail : ""
                  }
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
            {event!.name === "Valorant" && (
              <div
                className="sm:col-span-4 mt-1 md:w-96"
                key={`vloid_input__field__${index}`}
              >
                <label
                  htmlFor="ValorantID"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {getNumberWithOrdinal(index + 1)} Valorant ID
                </label>
                <div className="mt-2 ">
                  <input
                    id="ValorantID"
                    name="ValorantID"
                    type="text"
                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Valorant ID"
                    required={index <= event!.min_team_size - 1}
                    onChange={(e) => {
                      const newId = [...valoID];
                      newId[index] = e.target.value;
                      setValoID(newId);
                    }}
                  />
                </div>
              </div>
            )}
          </>
        );
      });
  };

  function updateParticipatedEvents(id: number) {
    const tempParticipatedEvents = [...participatedEvents];

    tempParticipatedEvents.push({
      event_id: id,
      registered_by: "",
    });

    setParticipatedEvents(tempParticipatedEvents);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const emails = new Set();
    team.forEach((email) => {
      emails.add(email);
    });

    if (event!.name === "Valorant") {
      const ids = new Set();
      valoID.forEach((id) => {
        ids.add(id);
      });

      if (ids.size !== valoID.length) {
        toast.error("Duplicate Valorant IDs are not allowed!");
        return;
      }
    }

    if (emails.size !== team.length) {
      toast.error("Duplicate emails are not allowed!");
      return;
    }

    team[0] = registeredByEmail;

    newTeamRegistration({
      team_name: teamName,
      team_members: team,
      event_id: event!.id,
      valoId: valoID,
    })
      .then(() => {
        setRegisteredEvents((prev: any) => [...prev, event!.id]);
        toast.success("Registration Successful!");
        setOpen(false);
        setShowPayment(true);
        setAmount((prev: number) => prev + event!.fees);

        updateParticipatedEvents(event!.id);
      })
      .catch((err) => {
        toast.error(
          err.code === "23503"
            ? "Some/All emails are not registered on the platform!"
            : "Error! Try Again!"
        );
      });
  };

  const cancelButtonRef = useRef(null);

  return (
    <>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4  ">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className=" font-semibold leading-6 text-gray-900 text-3xl"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold leading-6 text-gray-900 text-3xl">
                              {event!.name}
                            </h3>
                            <div>
                              <button
                                type="button"
                                className="inline-flex justify-center p-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                onClick={() => setOpen(false)}
                              >
                                <CloseIcon />
                              </button>
                            </div>
                          </div>
                        </Dialog.Title>
                        <div className="mt-2">
                          <p
                            className="text-sm text-gray-500"
                            dangerouslySetInnerHTML={{
                              __html: event!.rules_regulations,
                            }}
                          />
                        </div>
                        {event!.type === "TEAM" && (
                          <p className="text-red-700 mt-4 text-sm">
                            All the emails should be registered on platform to
                            continue registration!
                          </p>
                        )}
                        <p className="mt-2">
                          {event!.type === "TEAM" && (
                            <form
                              className="grid grid-cols-1 gap-y-6 sm:grid-cols-6"
                              onSubmit={handleSubmit}
                            >
                              <div className="sm:col-span-3 mt-4 md:w-96">
                                <label
                                  htmlFor="Team Name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Team Name
                                </label>
                                <div className="mt-2 ">
                                  <input
                                    type="text"
                                    name="TeamName"
                                    required={true}
                                    id="TeamName"
                                    autoComplete="off"
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Team Name"
                                    onChange={(e) =>
                                      setTeamName(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              {renderFormFields(event!.team_size)}
                              <div className="sm:col-span-6">
                                <button
                                  type="submit"
                                  className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                                >
                                  Submit
                                </button>
                                <button
                                  type="button"
                                  className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          )}
                          {event!.type === "SOLO" && (
                            <button
                              type="submit"
                              className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                              onClick={() => {
                                newSoloRegistration({
                                  event_id: event!.id,
                                }).then(() => {
                                  toast.success("Registration Successful!");
                                  setOpen(false);
                                  setShowPayment(true);
                                  setAmount(
                                    (prev: number) => prev + event!.fees
                                  );
                                  setRegisteredEvents((prev: any) => [
                                    ...prev,
                                    event!.id,
                                  ]);

                                  updateParticipatedEvents(event!.id);
                                });
                              }}
                            >
                              Register Now!
                            </button>
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
      <ToastContainer />
    </>
  );
}
