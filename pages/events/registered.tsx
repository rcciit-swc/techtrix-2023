import NavBar from "@/components/Navbar/NavBar";
import { Participation } from "@/interface/Participation";
import { getData, getRegisteredEvents } from "@/utils/getData";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import localData from "../../public/data.json";

export async function getServerSideProps() {
  const eventData = await Promise.all([
    getData({
      table: "events",
    }),
  ]);

  return {
    props: { eventData },
  };
}

const Events = ({ eventData }: { eventData: any }) => {
  const [data, setData] = useState<Participation[]>([]);

  console.log(eventData[0].events);

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
        className="h-full"
      >
        <NavBar />
        <h1 className="text-5xl font-semibold text-center text-white dark:text-gray-100 pt-10">
          Registered Events
        </h1>
        <div className="flex flex-row flex-wrap items-center justify-center h-full w-full">
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
                {
                  registrationData.team_name && (
                    <h1 className="text-xl font-semibold text-center text-white dark:text-gray-100">
                      <b>Team Name:</b> {registrationData.team_name}
                    </h1>
                  )
                }
                {
                  registrationData.team_name && (
                    <h1 className="text-lg font-bold text-center text-white dark:text-gray-100">
                      <b>Team Members:</b>
                    </h1>
                  )
                }
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
        {/* <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Event
                </th>
                <th scope="col" className="px-6 py-3">
                  Team Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Team Members
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((registrationData, index) => {
                return (
                  <tr
                    key={`table__${index}`}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {registrationData.events && registrationData.events.name}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {registrationData.team_name}
                    </th>
                    {
                      registrationData.team_member_0 && registrationData.team_member_1 && registrationData.team_member_2 && registrationData.team_member_3 && registrationData.team_member_4 && registrationData.team_member_5 ?(
                        <td className="px-6 py-4">{`${registrationData.team_member_0}, ${registrationData.team_member_1}, ${registrationData.team_member_2}, ${registrationData.team_member_3}, ${registrationData.team_member_4}, ${registrationData.team_member_5}`}</td>
                      ):(
                        <td className="px-6 py-4"></td>)
                    }
                    
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </main>
    </>
  );
};

export default Events;
