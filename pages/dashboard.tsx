import Head from "next/head";
import localData from "../public/data.json";
import NavBar from "@/components/Navbar/NavBar";
import { useEffect, useState } from "react";
import {
  getEvents,
  getRegisteredEvents,
  getUserProfile,
  isUserDetailsEmpty,
} from "@/utils/getData";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "@/utils/signOut";
import { Events } from "@/interface/Events";
import { Participation } from "@/interface/Participation";
import { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/SupabaseClient";
import { ParticipatedEvents } from "@/interface/ParticipatedEvents";

const Modal = dynamic(() => import("@/components/Modal/Modal"), {
  loading: () => <></>,
  ssr: false,
});

export async function getServerSideProps() {
  const data = await getEvents(
    "id,name,poster_image,multiple_registrations_allowed,min_team_size,fees,type,team_size,rules_regulations"
  );

  return {
    props: { data },
  };
}

export default function Dashboard({
  data,
  user,
  isLoading,
}: {
  data: any;
  user: User | null;
  isLoading: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState<Events>({
    id: 0,
    name: "",
    poster_image: "",
    multiple_registrations_allowed: false,
    min_team_size: 0,
    fees: 0,
    type: "",
    team_size: 0,
    rules_regulations: "",
  } as Events);

  const [amount, setAmount] = useState(0);
  const [showPaymentBtn, setShowPaymentBtn] = useState(false);

  const [showCoordinatorPage, setShowCoordinatorPage] = useState(false);

  //stored event ids of registered events
  //needed for checking if user has registered for an event or not
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);

  const [participatedEvents, setParticipatedEvents] = useState<
    ParticipatedEvents[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user === null) {
        router.replace("/");
      }
      Promise.all([
        isUserDetailsEmpty().then((value) => {
          if (value) {
            router.replace("/profile");
          }
        }),
        getUserProfile(user!.id, "role").then((profile) => {
          if (profile[0].role !== "participant") setShowCoordinatorPage(true);
        }),
        supabase
          .rpc("search_email_in_registered_event", {
            email: user!.email,
          })
          .then((val) => {
            setParticipatedEvents(val.data);
          }),
        getRegisteredEvents({
          select: `events(id, fees),registration_cancelled,transaction_id`,
          email: user!.email!,
        }).then((data) => {
          let amount = 0;
          if (data) {
            const temp = data.map((item: Participation) => item.events!.id);
            data.forEach((item: Participation) => {
              if (!item.registration_cancelled && item.transaction_id === null)
                amount += item.events!.fees!;
            });
            if (amount > 0) {
              setShowPaymentBtn(true);
            }
            setAmount(amount);
            setRegisteredEvents(temp);
          }
        }),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function checkIfParticipatedInEvent(id: number) {
    const tempEventId = participatedEvents.map((item) => item.event_id);
    return tempEventId.includes(id);
  }

  return (
    <>
      <Head>
        <title>{`${localData["title"]} Dashboard`}</title>
        <meta name="description" content="RCCIIT's Official Techfest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="h-full"
        style={{
          background:
            "linear-gradient(146deg, rgba(16,16,16,0.8800770308123249) 39%, rgba(0,0,0,0.9164915966386554) 88%)",
        }}
      >
        <NavBar />
        {showPaymentBtn && (
          <button
            onClick={() => {
              router.push({
                pathname: "/events/registered",
              });
            }}
            className="button fixed right-10 bottom-10 w-32 h-10"
          >
            Pay ₹ {amount}
          </button>
        )}
        <div className="flex flex-col items-end w-full text-white pr-4">
          <div className="py-2 px-4 mt-32 flex flex-row items-center">
            <span>{`Hi ${user?.user_metadata.name.split(" ")[0]}!`}</span>
            <Image
              src={user?.user_metadata.avatar_url ?? ""}
              alt=""
              width="30"
              height="30"
              className="rounded-full ml-3"
            />
          </div>
          <div className="flex flex-row">
            <Link
              className="w-fit hover:bg-green-600 action:bg-green-600 rounded py-2 px-4"
              href={{
                pathname: "/events/registered",
              }}
            >
              Registered Events
            </Link>
            <Link
              className="w-fit hover:bg-gray-600 action:bg-gray-600 rounded py-2 px-4"
              href="/profile"
            >
              Edit Profile
            </Link>
            <button
              className="w-fit hover:bg-red-600 action:bg-red-600 rounded py-2 px-4"
              onClick={() => {
                signOut();
                router.replace("/");
              }}
            >
              Sign Out!
            </button>
          </div>
          {showCoordinatorPage && (
            <Link
              className="w-fit hover:bg-blue-600 action:bg-blue-600 rounded py-2 px-4"
              href="/coordinator"
            >
              Coordinator Page
            </Link>
          )}
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center h-full w-full">
          {data.map((event: Events) => {
            return (
              <div
                className="flex flex-col items-center justify-center h-96 w-96 m-4  rounded-xl shadow-2xl"
                key={`event__${event.id}`}
              >
                <div className="w-40 h-40 relative">
                  <Image
                    className="event_logo"
                    src={`${event.poster_image}.png`}
                    alt={event.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h1 className="text-2xl font-bold text-white">{event.name}</h1>
                {checkIfParticipatedInEvent(event.id) ? (
                  event.multiple_registrations_allowed ? (
                    <Button
                      text="Register!"
                      onClick={() => {
                        setEventData(event);
                        setOpen(!open);
                      }}
                    />
                  ) : (
                    <span className="bg-green-700 rounded-sm py-1 px-2 text-white mt-5">
                      Registered!
                    </span>
                  )
                ) : (
                  <Button
                    text="Register!"
                    onClick={() => {
                      setEventData(event);
                      setOpen(!open);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </main>
      <Modal
        open={open}
        setOpen={setOpen}
        event={eventData}
        setShowPayment={setShowPaymentBtn}
        setAmount={setAmount}
        registeredEvents={registeredEvents}
        participatedEvents={participatedEvents}
        setParticipatedEvents={setParticipatedEvents}
        setRegisteredEvents={setRegisteredEvents}
        registeredByEmail={user?.email}
      />
    </>
  );
}
