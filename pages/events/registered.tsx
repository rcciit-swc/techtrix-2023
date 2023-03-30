import Button from "@/components/Button";
import NavBar from "@/components/Navbar/NavBar";
import { Participation } from "@/interface/Participation";
import { cancelRegistration } from "@/utils/cancelRegistration";
import { getRegisteredEvents, getUser } from "@/utils/getData";
import { searchEmailInParticipation } from "@/utils/searchEmailInParticipation";
import { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import localData from "../../public/data.json";

const PaymentModal = dynamic(() => import("@/components/Modal/PaymentModal"), {
  loading: () => <></>,
});

const Events = () => {
  // all the registered events from participation table
  const [data, setData] = useState<Participation[]>([]);
  // stores the checkbox values for the registered events
  const [checked, setChecked] = useState<boolean[]>([]);

  const [user, setUser] = useState<User | null>(null);
  const [showPaymentModal, setshowPaymentModal] = useState<boolean>(false);
  const [loadingText, setshowText] = useState<string>("");

  const [amount, setAmount] = useState<number>(0);

  // stores all the participation ids of the events to be paid
  const [toBePaid, setToBePaid] = useState<string[]>([]);

  // events where user himself has not registered but is present in a team
  const [isTeamRegisteredEventsExpanded, setIsteamRegisteredEventsExpanded] =
    useState(false);
  const [isTeamRegisteredEventsLoading, setIsteamRegisteredEventsLoading] =
    useState(false);
  const [teamRegisteredEvents, setTeamRegisteredEvents] = useState<
    Participation[]
  >([]);

  async function getTeamRegisteredEvents() {
    setIsteamRegisteredEventsExpanded(!isTeamRegisteredEventsExpanded);
    setIsteamRegisteredEventsLoading(true);
    setshowText("loading");
    if (user === null) {
      const user = await getUser();
      setUser(user);
    }

    if (user && teamRegisteredEvents.length === 0) {
      const data = await searchEmailInParticipation(user.email ?? "");

      if (data.length > 0) {
        setTeamRegisteredEvents(data);
        setIsteamRegisteredEventsLoading(false);
      } else {
        setshowText("No events found");
        setIsteamRegisteredEventsLoading(false);
      }
    }
  }

  function showPaymentModalHandler() {
    const participationIDs: string[] = [];

    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        participationIDs.push(data[i].id);
      }
    }

    setToBePaid(participationIDs);

    setshowPaymentModal(true);
  }

  useEffect(() => {
    Promise.all([
      getUser().then((user) => {
        if (user) setUser(user);
      }),
      getRegisteredEvents({}).then((data) => {
        if (data) {
          setData(data);

          // only the events which have not been paid yet should be checked by default
          setChecked(
            data.map((item) => {
              if (item.transaction_id !== null && item.phone_number !== null)
                return false;
              return true;
            })
          );

          let tempAmount = 0;

          data.forEach((item: Participation) => {
            if (!item.registration_cancelled && item.transaction_id === null) {
              tempAmount += item.events!.fees!;
            }
          });
          setAmount(tempAmount);
        }
      }),
    ]);
  }, []);

  function handleCheckEvent(index: number) {
    // temp variable for manipulating checked array
    const newChecked = checked;

    newChecked[index] = !newChecked[index];
    setChecked([...newChecked]);

    // calculates new amount when a checkbox is checked
    const tempData = [...data];
    if (!newChecked[index]) {
      setAmount(amount - tempData[index]!.events!.fees ?? 0);
    } else {
      setAmount(amount + tempData[index]!.events!.fees ?? 0);
    }
  }

  function handleCancelRegistration(index: number, fees: number) {
    const newData = data;
    newData[index].registration_cancelled = false;
    setData([...newData]);

    if (checked[index]) {
      setAmount(amount + fees);
    }
  }

  return (
    <>
      <Head>
        <title>{`${localData["title"]} Events`}</title>
        <meta name="description" content="RCCIIT's Official Techfest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          background:
            "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
        }}
        className={
          (data && data.length > 0) ||
          (teamRegisteredEvents && teamRegisteredEvents.length > 0)
            ? "h-auto"
            : "h-screen"
        }
      >
        <NavBar />
        <h1 className="text-5xl font-semibold text-center text-white dark:text-gray-100 pt-32">
          Registered Events
        </h1>
        {data.length === 0 ? (
          <span className="text-red-500 text-center text-lg p-5 w-full flex flex-row flex-wrap items-center justify-center">
            You have not registered yourself for any event yet!
          </span>
        ) : (
          <>
            <span className="text-center flex flex-row flex-wrap items-start justify-center text-lg mt-4 text-gray-300">
              Registration of only unpaid events can be cancelled!
            </span>
            <div className="flex flex-row flex-wrap items-start justify-center h-auto w-full">
              {" "}
              {data.map((registrationData, index) => {
                return (
                  <div
                    className="flex flex-col items-center justify-center h-96 w-96 m-4  rounded-xl shadow-xl p-4 gap-2"
                    key={`event__${index}`}
                  >
                    <div className="w-40 h-40 relative">
                      {registrationData.events && (
                        <Image
                          className="event_logo"
                          src={`${registrationData.events.poster_image}.png`}
                          alt=""
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </div>
                    <h1 className="text-3xl font-thin text-center text-white dark:text-gray-100">
                      {registrationData.events && registrationData.events.name}
                    </h1>
                    {registrationData.team_name && (
                      <h1 className="text-xl font-semibold text-center text-white dark:text-gray-100">
                        <b>Team Name:</b> {registrationData.team_name}
                      </h1>
                    )}
                    {registrationData.team_name && (
                      <h1 className="text-lg font-bold text-center text-white dark:text-gray-100">
                        <b>Team Members:</b>
                      </h1>
                    )}
                    {
                      <ul className="text-base font-thin text-center text-white dark:text-gray-100">
                        {registrationData.team_member_0 && (
                          <li>{registrationData.team_member_0}</li>
                        )}
                        {registrationData.team_member_1 && (
                          <li>{registrationData.team_member_1}</li>
                        )}
                        {registrationData.team_member_2 && (
                          <li>{registrationData.team_member_2}</li>
                        )}
                        {registrationData.team_member_3 && (
                          <li>{registrationData.team_member_3}</li>
                        )}
                        {registrationData.team_member_4 && (
                          <li>{registrationData.team_member_4}</li>
                        )}
                        {registrationData.team_member_5 && (
                          <li>{registrationData.team_member_5}</li>
                        )}
                      </ul>
                    }
                    {registrationData.transaction_id === null &&
                      registrationData.transaction_verified === false &&
                      registrationData.registration_cancelled === false && (
                        <button
                          className="bg-red-700 text-white rounded py-2 px-4 hover:bg-red-800 action:bg-red-800"
                          onClick={() => {
                            cancelRegistration({
                              participation_id: registrationData.id,
                            }).then(() => {
                              const newData = data;
                              newData[index].registration_cancelled = true;
                              setData([...newData]);

                              if (checked[index]) {
                                setAmount(
                                  amount - registrationData!.events!.fees
                                );
                              }
                            });
                          }}
                        >
                          Cancel Registration!
                        </button>
                      )}
                    {registrationData.registration_cancelled && (
                      <>
                        <span className="text-base text-rose-600">
                          Registration Cancelled!
                        </span>
                        <button
                          onClick={() => {
                            cancelRegistration({
                              participation_id: registrationData.id,
                              cancel: false,
                            }).then(() => {
                              handleCancelRegistration(
                                index,
                                registrationData!.events!.fees
                              );
                            });
                          }}
                          className="bg-green-700 text-white rounded py-2 px-4 hover:bg-green-800 action:bg-green-800"
                        >
                          Keep Registration
                        </button>
                      </>
                    )}
                    {/* remove checkbox if registration is already cancelled */}
                    {registrationData.transaction_id === null &&
                      registrationData.registration_cancelled === false && (
                        <span className="flex items-center text-white">
                          <input
                            defaultChecked={checked[index]}
                            id="checked-checkbox"
                            type="checkbox"
                            onClick={() => {
                              handleCheckEvent(index);
                            }}
                            value=""
                            className="w-8 h-8 text-green-700 rounded"
                          />
                          <label className="ml-2">Pay now!</label>
                        </span>
                      )}
                  </div>
                );
              })}
            </div>
          </>
        )}
        {amount !== 0 && (
          <span className="flex flex-row justify-center rounded mt-2 mb-4">
            <Button
              onClick={() => {
                showPaymentModalHandler();
              }}
              text={`Pay ₹${amount}!`}
            />
          </span>
        )}
        <section className="pb-10">
          <div className="flex justify-center">
            <button
              onClick={
                teamRegisteredEvents.length > 0
                  ? () =>
                      setIsteamRegisteredEventsExpanded(
                        !isTeamRegisteredEventsExpanded
                      )
                  : async () => {
                      await getTeamRegisteredEvents();
                    }
              }
              className="text-white button"
            >
              Team events where you are participating
            </button>
          </div>
          {isTeamRegisteredEventsLoading ? (
            <span className="text-center flex flex-row flex-wrap items-center justify-center text-lg mt-4 text-gray-300">
              loading
            </span>
          ) : (
            <>
              {teamRegisteredEvents.length > 0 &&
              isTeamRegisteredEventsExpanded ? (
                <div className="flex flex-row flex-wrap items-start justify-center h-auto w-full">
                  {teamRegisteredEvents.map((registrationData, index) => {
                    return (
                      <div
                        className="flex flex-col items-center justify-center h-96 w-96 m-4  rounded-xl shadow-xl p-4 gap-2"
                        key={`team__events__${index}`}
                      >
                        <h1 className="text-3xl font-thin text-center text-white dark:text-gray-100">
                          {registrationData.events &&
                            registrationData.events.name}
                        </h1>
                        {registrationData.team_name && (
                          <h1 className="text-xl font-semibold text-center text-white dark:text-gray-100">
                            <b>Team Name:</b> {registrationData.team_name}
                          </h1>
                        )}
                        {registrationData.team_name && (
                          <h1 className="text-lg font-bold text-center text-white dark:text-gray-100">
                            <b>Registered by:</b>
                            <br></br>
                            <span>{registrationData.registered_by}</span>
                          </h1>
                        )}
                        {registrationData.team_name && (
                          <h1 className="text-lg font-bold text-center text-white dark:text-gray-100">
                            <b>Team Members:</b>
                          </h1>
                        )}
                        {
                          <ul className="text-base font-thin text-center text-white dark:text-gray-100">
                            {registrationData.team_member_0 && (
                              <li>{registrationData.team_member_0}</li>
                            )}
                            {registrationData.team_member_1 && (
                              <li>{registrationData.team_member_1}</li>
                            )}
                            {registrationData.team_member_2 && (
                              <li>{registrationData.team_member_2}</li>
                            )}
                            {registrationData.team_member_3 && (
                              <li>{registrationData.team_member_3}</li>
                            )}
                            {registrationData.team_member_4 && (
                              <li>{registrationData.team_member_4}</li>
                            )}
                            {registrationData.team_member_5 && (
                              <li>{registrationData.team_member_5}</li>
                            )}
                          </ul>
                        }
                      </div>
                    );
                  })}
                </div>
              ) : (
                <span className="text-center flex flex-row flex-wrap items-center justify-center text-lg mt-4 text-red-500">
                  No team events registered!
                </span>
              )}
            </>
          )}
        </section>
      </main>
      <PaymentModal
        open={showPaymentModal}
        setOpen={setshowPaymentModal}
        amount={amount}
        toBePaid={toBePaid}
        setToBePaid={setToBePaid}
        email={user?.email || ""}
        registeredEvents={data}
        setRegisteredEvents={setData}
        setChecked={setChecked}
      />
    </>
  );
};

export default Events;
