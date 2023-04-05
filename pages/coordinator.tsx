import NavBar from "@/components/Navbar/NavBar";
import { Events } from "@/interface/Events";
import { getEventDetailsFromId, getUserProfile } from "@/utils/getData";
import { User } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import localData from "../public/data.json";
import { getEvents } from "@/utils/getData";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { getParticipationInEvent } from "@/utils/getParticipationInEvent";

const Coordinator = ({
  user,
  isLoading,
}: {
  user: User | null;
  isLoading: boolean;
}) => {
  const router = useRouter();

  // general loading state
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState<string>("");

  // all events
  const [events, setEvents] = useState<Events[]>([]);

  const [participationData, setParticipationData] = useState<{
    [key: string]: any[];
  }>({});

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        getUserProfile(user.id, "role,id,coordinating_event_id").then(
          (profiles) => {
            if (profiles[0].role === "participant") router.replace("/");
            else {
              // check if superadmin or convenor or coordinator
              if (profiles[0].role === "superadmin") {
                getEvents("id,name").then((events) =>
                  setEvents(events as unknown as Events[])
                );
              } else if (profiles[0].role === "convenor") {
                // get events of the convenor
              } else if (profiles[0].role === "coordinator") {
                getEventDetailsFromId({
                  select: "id,name",
                  event_id: profiles[0].coordinating_event_id ?? 0,
                }).then((events) => {
                  setEvents(events as unknown as Events[]);
                });
              }
            }
          }
        );
      } else {
        router.replace("/");
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function handleEventClick(event_id: number, event_name: string) {
    setLoading(true);
    setSelectedEvent(event_name);

    if (participationData[event_name] === undefined) {
      getParticipationInEvent({
        match: {
          event_id: event_id,
        },
        select:
          "registered_by(name,email,phone),team_member_0,team_member_1,team_member_2,team_member_3,team_member_4,team_member_5,team_name,transaction_id,transaction_verified",
      }).then((data) => {
        setParticipationData({
          ...participationData,
          [event_name]: data,
        });
      });
    }
    setLoading(false);
  }

  if (loading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <Head>
        <title>{`${localData["title"]} Coordinator Dashboard`}</title>
        <meta name="description" content="RCCIIT's Official Techfest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="h-full flex flex-col items-center">
        <div className="pt-24 w-1/2">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option
              selected={true}
              style={{
                display: "none",
              }}
            >
              Choose an event!
            </option>
            {events.map((event, index) => (
              <option
                key={`event__option__${index}`}
                value={event.id}
                onClick={() => {
                  handleEventClick(event.id, event.name);
                }}
              >
                {event.name}
              </option>
            ))}
          </select>
        </div>
        {participationData[selectedEvent] && (
          <table className="table-auto w-screen text-center text-sm mt-5">
            <thead>
              <tr>
                <th className="w-12">Team Lead</th>
                <th>Phone</th>
                <th className="w-44">Team</th>
                <th className="w-8">Status</th>
              </tr>
            </thead>
            <tbody>
              {participationData[selectedEvent].map((data, index) => {
                return (
                  <tr
                    key={`participation__data__${index}`}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "rgba(77, 77, 77, 0.1)" : "#fff",
                    }}
                  >
                    <td className="px-2">{data.registered_by["name"]}</td>
                    <td className="px-2">
                      {
                        <a
                          className="text-blue-900"
                          href={`tel:${data.registered_by["phone"]}`}
                        >
                          {data.registered_by["phone"]}
                        </a>
                      }
                    </td>
                    <td className="px-2 text-xs">{data["team_name"]}</td>
                    <td className="px-2 text-xs">
                      {data["transaction_verified"] ? (
                        <span className="text-green-500">Verified</span>
                      ) : data["transaction_id"] !== null ? (
                        <span className="text-yellow-500">
                          Verification Pending
                        </span>
                      ) : (
                        <span className="text-red-500">Not Paid</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};

export default Coordinator;
