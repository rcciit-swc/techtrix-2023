import NavBar from "@/components/Navbar/NavBar";
import { Events } from "@/interface/Events";
import { getUserProfile } from "@/utils/getData";
import { User } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import localData from "../public/data.json";
import { getEvents } from "@/utils/getData";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { Participation } from "@/interface/Participation";

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
  const [role, setRole] = useState<string | null>(null);
  const [events, setEvents] = useState<Events[]>([]);

  const [participationData, setParticipationData] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        getUserProfile(user.id, "role,id").then((profiles) => {
          setRole(profiles[0].role);
          if (profiles[0].role === "participant") router.replace("/");
          else {
            getEvents("id,name,convenor").then((events) =>
              setEvents(events as unknown as Events[])
            );

            // check if superadmin or convenor or coordinator
            if (profiles[0].role === "superadmin") {
              // get all events
            } else if (profiles[0].role === "convenor") {
              // get events of the convenor
            }
          }
        });
      } else {
        router.replace("/");
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function handleEventClick(event_id: number) {
    if (participationData["event"] === "Choose an event!") {
      alert("Please choose an event!");
      return;
    } else {
      if (participationData["event"] === "Choose an event!") {
        alert("Please choose an event!");
        return;
      }
    }
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
        <title>{`${localData["title"]} Profile`}</title>
        <meta name="description" content="RCCIIT's Official Techfest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="h-full flex flex-col items-center">
        {role === "coordinator" ? (
          <div className="pt-32 w-1/2">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose an event!</option>
              {events.map((event, index) => (
                <option
                  key={`event__option__${index}`}
                  value={event.id}
                  onClick={() => {
                    handleEventClick(event.id);
                  }}
                >
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="pt-32 flex justify-center items-center">
            You are not a coordinator!
          </div>
        )}
      </main>
    </>
  );
};

export default Coordinator;
