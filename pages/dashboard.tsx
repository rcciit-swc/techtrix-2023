import Head from "next/head";
import localData from "../public/data.json";
import NavBar from "@/components/Navbar/NavBar";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/getSession";
import { useEffect, useState } from "react";
import { getData } from "@/utils/getData";
import Image from "next/image";
import Button from "@/components/Button";


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

export default function Dashboard({ data }: { data: any}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSession().then((token) => {
      setIsLoading(false);
      if (!token) {
        redirect("/");
      }
    });
  });

  if (isLoading) {
    return <>Loading</>;
  }

  console.log(data[0].events)

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
        <div
        className="flex flex-row flex-wrap items-center justify-center h-full w-full"
        >
          {
            data[0].events.map((event: any) => {



              return (
                <div
                className="flex flex-col items-center justify-center h-96 w-96 m-4  rounded-xl shadow-xl"
                  key={event.id}
                >
                  <Image
                  src={`${event.poster_image}.png`}
                  alt={event.name}
                  width={200}
                  height={200}
                  />
                  <h1 className="text-2xl font-bold text-white">{event.name}</h1>
                  <Button
                  text="Register Now"
                  />
                </div>
              )
            })
          }
        </div>
      </main>
    </>
  );
}