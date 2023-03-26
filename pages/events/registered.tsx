import NavBar from "@/components/Navbar/NavBar";
import { Participation } from "@/interface/Participation";
import { getRegisteredEvents } from "@/utils/getData";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import localData from "../../public/data.json";

const Events = () => {
  const [data, setData] = useState<Participation[]>([]);

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
      <NavBar />
      <main
        style={{
          background:
            "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
        }}
        className="h-full"
      >
        <div className="h-full flex flex-col w-full justify-center items-center">
          <div className="flex flex-row w-full justify-evenly items-center py-16 flex-wrap">
            <div className="flex flex-col items-center justify-center h-full w-full md:w-1/2 xl:w-1/2 px-16">
              <h1 className="text-6xl font-semibold text-white py-3 text-right">
                Registered Events
              </h1>
              <h2 className="text-xl  text-white py-2 text-right">
                Events you have registered in!
              </h2>
            </div>
            <div className="my-8">
              <Image
                src="https://i.imgur.com/3iFfGAP.png"
                alt="techTrix"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto">
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
                    ></th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {registrationData.team_name}
                    </th>
                    <td className="px-6 py-4">{`${registrationData.team_member_0}, ${registrationData.team_member_1}, ${registrationData.team_member_2}, ${registrationData.team_member_3}, ${registrationData.team_member_4}, ${registrationData.team_member_5}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Events;
