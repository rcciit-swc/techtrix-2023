import Head from "next/head";
import localData from "../public/data.json";
import NavBar from "@/components/Navbar/NavBar";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/getSession";
import { useEffect, useState } from "react";
import { getData, isUserEmpty } from "@/utils/getData";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import { signOut } from "@/utils/signOut";

export async function getServerSideProps() {
  const data = await Promise.all([
    getData({
      table: "events",
    }),
  ]);

  return {
    props: { data },
  };
}

export default function Dashboard({ data }: { data: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    isUserEmpty().then((value) => {
      if (value) {
        router.push("/profile");
      }
    });
    getSession().then((token) => {
      setIsLoading(false);
      if (!token) {
        redirect("/");
      }
    });
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
        <div className="flex flex-row justify-end mt-2 mr-4">
          <Link
            className="w-fit hover:bg-gray-600 action:bg-gray-600 rounded py-2 px-4"
            href="/profile"
            style={{
              color: "white",
            }}
          >
            Edit Profile
          </Link>
          <button
            className="w-fit hover:bg-red-600 action:bg-red-600 rounded py-2 px-4"
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
          {data[0].events.map((event: any) => {
            return (
              <div
                className="flex flex-col items-center justify-center h-96 w-96 m-4  rounded-xl shadow-xl"
                key={`event__${event.id}`}
              >
                <div
                className="w-40 h-40 relative"
                >
                  <Image
                    className="event_logo"  
                    src={`${event.poster_image}.png`}
                    alt={event.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h1 className="text-2xl font-bold text-white">{event.name}</h1>
                <Button
                  text="Register Now"
                  onClick={() => {
                    setEventData(event);
                    setOpen(!open);
                  }}
                />
              </div>
            );
          })}
        </div>
      </main>
      <Modal open={open} setOpen={setOpen} event={eventData} />
    </>
  );
}
