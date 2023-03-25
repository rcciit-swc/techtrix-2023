import Head from "next/head";
import localData from "../public/data.json";
import NavBar from "@/components/Navbar/NavBar";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/getSession";
import { useEffect, useState } from "react";

export default function Dashboard() {
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
      </main>
    </>
  );
}
