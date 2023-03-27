import NavBar from "@/components/Navbar/NavBar";
import { Participation } from "@/interface/Participation";
import { cancelRegistration } from "@/utils/cancelRegistration";
import { getData, getRegisteredEvents } from "@/utils/getData";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import localData from "../../public/data.json";

export async function getServerSideProps() {
  const eventData = await Promise.all([
    getData({
      table: "events",
      select: "name, poster_image",
    }),
  ]);

  return {
    props: { eventData },
  };
}

const Events = ({ eventData }: { eventData: any }) => {
  const [data, setData] = useState<Participation[]>([]);

  const getEventPoster = (eventName: string) => {
    let eventPoster = eventData[0].events.find(
      (event: any) => event.name === eventName
    ).poster_image;
    return (
      <Image
        className="event_logo"
        src={`${eventPoster}.png`}
        alt={`${eventName} Logo`}
        fill
        style={{ objectFit: "contain" }}
      />
    );
  };

  useEffect(() => {
    getRegisteredEvents({}).then((data) => {
      if (data) setData(data);
    });
  }, []);

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
        className="h-screen"
      >
        <NavBar />
        <h1 className="text-5xl font-semibold text-center text-white dark:text-gray-100 pt-10">
          Registered Events
        </h1>
        {data.length === 0 ? (
          <span className="text-red-500 text-center text-lg p-5 w-full flex flex-row flex-wrap items-center justify-center">
            You have not registered for any event yet!
          </span>
        ) : (
          <>
            <span className="text-center flex flex-row flex-wrap items-start justify-center text-lg mt-4 text-gray-300">
              Registration of only unpaid events can be cancelled!
            </span>
            <div className="flex flex-row flex-wrap items-start justify-center h-screen w-full">
              {" "}
              {data.map((registrationData, index) => {
                return (
                  <div
                    className="flex flex-col items-center justify-center h-96 w-96 m-4  rounded-xl shadow-xl p-4 gap-2"
                    key={`event__${index}`}
                  >
                    <div className="w-40 h-40 relative">
                      {registrationData.events &&
                        getEventPoster(registrationData.events.name)}
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
                              const newData = data;
                              newData[index].registration_cancelled = false;
                              setData([...newData]);
                            });
                          }}
                          className="bg-green-700 text-white rounded py-2 px-4 hover:bg-green-800 action:bg-green-800"
                        >
                          Keep Registration
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Events;
