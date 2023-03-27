import Head from "next/head";
import localData from "../public/data.json";
import NavBar from "@/components/Navbar/NavBar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getEvents,
  getRegisteredEvents,
  getUser,
  isUserDetailsEmpty,
} from "@/utils/getData";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import { signOut } from "@/utils/signOut";
import { Events } from "@/interface/Events";
import { Participation } from "@/interface/Participation";
import { User } from "@supabase/supabase-js";

export async function getServerSideProps() {
  const data = await getEvents();

  return {
    props: { data },
  };
}

export default function Dashboard({ data }: { data: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState<any>({});

  const [amount, setAmount] = useState(0);
  const [showPaymentBtn, setShowPaymentBtn] = useState(false);
  const [user, setUser] = useState<User>();

  //stored event ids of registered events
  //needed for checking if user has registered for an event or not
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    Promise.all([
      isUserDetailsEmpty().then((value) => {
        if (value) {
          router.push("/profile");
        }
      }),
      getUser().then((user) => {
        setIsLoading(false);
        if (user === null) {
          redirect("/");
        } else {
          setUser(user);
        }
      }),
      getRegisteredEvents({
        select: `events(id, fees),registration_cancelled`,
      }).then((data) => {
        let amount = 0;
        if (data) {
          const temp = data.map((item: Participation) => item.events!.id);
          data.forEach((item: Participation) => {
            if (!item.registration_cancelled) amount += item.events!.fees!;
          });
          if (amount > 0) {
            setShowPaymentBtn(true);
          }
          setAmount(amount);
          setRegisteredEvents(temp);
        }
      }),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <>Loading</>;
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
        {/* {showPaymentBtn && (
          <Link
            className="button fixed right-10 bottom-10 w-32 h-10"
            href="/events/registered"
          >
            Pay ₹ {amount}
          </Link>
        )} */}
        <div className="flex flex-row justify-end mr-4 ">
          <Link
            className="w-fit hover:bg-green-600 action:bg-green-600 rounded py-2 px-4 mt-32"
            href="/events/registered"
            style={{
              color: "white",
            }}
          >
            Registered Events
          </Link>
          <Link
            className="w-fit hover:bg-gray-600 action:bg-gray-600 rounded py-2 px-4 mt-32"
            href="/profile"
            style={{
              color: "white",
            }}
          >
            Edit Profile
          </Link>
          <button
            className="w-fit hover:bg-red-600 action:bg-red-600 rounded py-2 px-4 mt-32"
            style={{
              color: "white",
            }}
            onClick={() => {
              signOut();
              router.replace("/");
            }}
          >
            Sign Out!
          </button>
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
                {event.multiple_registrations_allowed ||
                !(
                  !event.multiple_registrations_allowed &&
                  registeredEvents.includes(event.id)
                ) ? (
                  <Button
                    text="Pre-Register!"
                    onClick={() => {
                      setEventData(event);
                      setOpen(!open);
                    }}
                  />
                ) : (
                  <span className="bg-green-700 rounded-sm py-1 px-2 text-white mt-5">
                    Registered!
                  </span>
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
        setRegisteredEvents={setRegisteredEvents}
        registeredByEmail={user !== undefined ? user.email : ""}
      />
    </>
  );
}
